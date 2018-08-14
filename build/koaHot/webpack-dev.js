const webpackDev = require('webpack-dev-middleware');

module.exports = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts);
  let nextFlag = false;
  function nextFn() {
    nextFlag = true;
  }
  function devFn(ctx, next) {
    middleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.headers[name] = value;
      },
    }, nextFn);
    if (nextFlag) {
      nextFlag = false;
      return next();
    }
  }
  devFn.fileSystem = middleware.fileSystem;
  return devFn;
};