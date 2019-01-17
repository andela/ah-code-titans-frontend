const proxy = require("http-proxy-middleware");

// eslint-disable-next-line func-names
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://127.0.0.1:8000/"
    })
  );
};
