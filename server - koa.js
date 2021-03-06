const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
const path = require("path");
const serve = require("koa-static");
const favicon = require('koa-favicon');
const bodyParser = require('koa-bodyparser');
const { createBundleRenderer } = require("vue-server-renderer");

const resolve = file => path.resolve(__dirname, file);
const api = require('./api')

const isProd = process.env.NODE_ENV === "production"
const router = require('koa-router')()
//静态文件serve在koa-router的其他规则之上 
app.use(serve(resolve('../dist')))

app.use(api);
app.use(bodyParser());
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(router.routes())

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // // for component caching
    // cache: LRU({
    //   max: 1000,
    //   maxAge: 1000 * 60 * 15
    // }),
    // // this is only needed when vue-server-renderer is npm-linked
    // basedir: resolve('./dist'),
    // // recommended for performance
    runInNewContext: false
  }))
}


let renderer;
let readyPromise;
const templatePath = resolve("../index.html");
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, "utf-8");
  const bundle = require("../dist/vue-ssr-server-bundle.json");
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require("../dist/vue-ssr-client-manifest.json");
  renderer = createRenderer(bundle, {
    template,
    clientManifest,
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require("../build/setup-dev-server")(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

const render = async (ctx, next)=> {
  let req = ctx.req
  ctx.type = 'html'
  const s = Date.now()
  const context = {
    title: "服务端渲染测试", 
    url: req.url
  }
  ctx.body = await renderToString(context, s)
}

function renderToString(context, s) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        // console.error("renderToString error", err);
        reject(err);
      }
      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`);
      }
      resolve(html);
    });
  });
}

// 将 Vue 实例渲染为字符串
router.get('*', async (ctx, next) => {
  if(isProd) {
    return render(ctx, next)
  }else {
    await readyPromise
    return render(ctx, next)
  }
})

app.listen(3003)
  .on('listening', () => console.log('Your server is running at: http://localhost:3003'))
  .on('error', err => console.log(err))
