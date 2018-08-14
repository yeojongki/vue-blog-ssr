const webpackHot = require('webpack-hot-middleware');
const PassThrough = require('stream').PassThrough;

module.exports = (compiler, opts) => {
  const middleware = webpackHot(compiler, opts);
  return (ctx, next) => {
    let stream = new PassThrough();
    ctx.body = stream;
    return middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (state, headers) => {
        ctx.state = state;
        ctx.set(headers);
      },
    }, next);
  };
};