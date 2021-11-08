const http = require('http'),
    https = require('https'),
    urlPattern = require('url-pattern'),
    queryStr = require('qs');


var epyc = {},
    routes = [],
    plugins = [];

const server = (HttpState = false, listener, port = 0, options) =>
    (HttpState ? https : http)
        .createServer(options, listener)
        .listen(port)

const response = (res) => {
    return {
        send: value => res.end(value),
        setHeader: (name, value) => res.setHeader(name, value),
        status: code => res.writeHead(code),
        json: value => {
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(value))
        },
        html: value => {
            res.setHeader("Content-Type", "text/html")
            res.end(value)
        }
    }
};

const GetRoute = value => {
    const [url, qv] = value.split('?')

    for (let i = 0; i < routes.length; i++) {
        const { route, action, method } = routes[i];
        var params = new urlPattern(route).match(url);

        if (params === null)
            continue;

        var query = queryStr.parse(qv);

        return { route, action, method, params, query };
    }

    return undefined;
};


http.METHODS.forEach(method => epyc[method.toLowerCase()] =
    (route, action) => routes.push({ method, action, route }));

epyc.use = func => (typeof func === "function") ?? plugins.push(func);

epyc.bootstrap = (
    port = 3000 || process.env.Port,
    options = undefined,
    error = (req, res) => res.json({ error: req.url + " not found." })) =>
    (routes && Object.keys(routes).length !== 0) ? server(options !== undefined ? true : false, (req, res) => {
        const route = GetRoute(req.url);
        if (route) {
            req.params = route.params;
            req.query = route.query;
            (plugins.length !== 0 ?? plugins.map(e => e).call(req, res));
            ((route.method === req.method) ? route.action(req, response(res)) : error(req, response(res)));
        }
    }, port, options) : console.error("\x1B[31m" + JSON.stringify({ error: "no routes are defined." }));


module.exports = epyc;