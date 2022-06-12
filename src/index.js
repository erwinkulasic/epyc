const https = require('https');
const http = require('http');
const { match } = require("path-to-regexp");
const response = require('./response');
const { onError } = require('./utils');
const url = require('parseurl');

function handler(req, res, routes, middleware, options) {
    const { pathname, query } = url(req);
    const route = lookup(pathname, routes);

    if (route && route.method === req.method) {
        req.params = route.params;
        req.query = query;
        
        const chain = [...middleware, ...route.handlers];
        const next = () => chain.shift()(req, res, next);
        next();
    } else {
        (options?.onError ? options.onError : onError)(req, res);
    }
}

function lookup(url, routes) {
    for (let i = 0; i < routes.length; i++) {
        const isValid = routes[i].path(url);

        if (isValid) {
            return {
                ...routes[i],
                params: isValid.params
            };
        }
    }

    return undefined;
}

function generateMethods(routes) {
    return http.METHODS.map(method => ({
        [method.toLowerCase()]: (path, ...handlers) => routes.push({
            method,
            path: match(path, { decode: decodeURIComponent }),
            handlers
        })
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function getServer(handler, options) {
    const serverInstance = options?.https
        ? https
        : http;

    return serverInstance
        .createServer(options, handler);
}

function epyc() {
    let routes = [];
    let middleware = [];

    return {
        ...generateMethods(routes),

        bootstrap(port, options = { 
            ServerResponse: response
        }) {
            const server = getServer((req, res) => handler(req, res, routes, middleware, options), options);
            return server.listen(port, options?.hostname, undefined, options?.listen);
        },

        use(handler) {
            middleware.push(handler);
        },
    }
}

const instance = { ...epyc(), onError };

module.exports = instance;
module.exports.epyc = instance;
module.exports.default = instance;