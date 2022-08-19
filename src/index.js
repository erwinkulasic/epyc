const http = require('http');
const https = require('https');
const url = require('parseurl');
const { match } = require('path-to-regexp');

function responseWrapper() {
    const instance = http.ServerResponse;

    Object.assign(instance.prototype, {
        send(value) {
            this.end(value)
        },
        status(code) {
            this.writeHead(code)
        },
        json(value) {
            this.setHeader('Content-Type', 'application/json')
            this.end(JSON.stringify(value))
        },
        html(value) {
            this.setHeader('Content-Type', 'text/html')
            this.end(value)
        },
        redirect(url) {
            this.writeHead(301, { Location: url })
            this.end()
        }
    })

    return instance;
}

function handler(req, res, routes, middelware) {
    const { pathname, query } = url(req);

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const isValid = route.path(pathname);

        if (isValid) {
            req.params = isValid.params;
            req.query = query;

            const chain = [...middelware, ...route.handlers];
            const next = () => chain.shift()(req, res, next);
            next();
        }
    }
}

function* getMethods(routes) {
    for (const methods of http.METHODS) {
        yield [
            methods.toLowerCase(),
            (path, ...handlers) => routes.push({ methods, path: match(path, { decode: decodeURIComponent }), handlers })
        ];
    }
}

function epyc() {
    let routes = []
    let middelware = []

    let structure = {
        bootstrap(port, options) {
            const opt = { ...(options || {}), ServerResponse: responseWrapper() }

            const server = (opt.https ? https : http).createServer(
                opt, (req, res) => handler(req, res, routes, middelware)
            );

            return server.listen(port, opt?.hostname, undefined, opt?.listen);
        },
        use(middelware) {
            middelware.push(middelware)
        }
    };

    for (const [name, action] of getMethods(routes)) {
        structure[name] = action;
    }

    return structure;
}

const instance = epyc();

module.exports = instance;
module.exports.default = instance;
module.exports.epyc = instance;