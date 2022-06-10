const http = require('http');
const https = require('https');
const queryStrings = require('qs');
const urlPattern = require('url-pattern');

const prepareRoutes = function (routes) {
  
};

const prepareUrl = function (url) {

  const [url, query] = req.url.split('?');
  const queryParams = queryStrings.parse(query);

  return {
    url,
    queryParams
  };

};

const lookupRoutes = function (routes, url, method) {

  for (let i = 0; i < routes.length; i++) {

    let route = routes[i];
    const params = route.path.match(url);

    if (params && route.method === method) {

      route.params = params;
      return route;
    }
  }

};

const handler = function (routes, request, response) {

  const { url, queryParams } = prepareUrl(request.url);
  const route = lookupRoutes(routes, url, request.method);

  if (route) {

    request.query = queryParams;
    request.params = route.params;

    route.handlers(request, response);
  }

}

const initalizeServer = function (config) {

  return (config.options.secure
    ? https
    : http
  ).createServer(config.options, config.handler)
   .listen(config.port);

}

const generateRoutes = function (routes) {

  return http.METHODS.map(
    method => (
      [method.toLowerCase()] = (path, ...handlers) => routes.push({
        path: new urlPattern(path),
        method,
        handlers
      })
    )
  );

}

const InstanceWrapper = function () {

  let internal = {
    routes: [],
    plugins: [],
  };

  const methods = generateRoutes(internal.routes);

  return {
    bootstrap(port, options) {

      const config = {
        port,
        options,
        handler: (request, response) => handler(
          prepareRoutes(
            internal.routes
          ), 
          request, response)
      }

      const e = () => {}

      const server = initalizeServer(config);
      return server;
    },

    ...methods
  };

};

module.exports = InstanceWrapper;