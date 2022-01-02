const Http = require('http'),
	Https = require('https'),
	UrlPattern = require('url-pattern'),
	QueryStrings = require('qs'),
	ErrorTemplate = (req, res) => res.json({ error: req.url + ' not found or a mistake happend.' });

let epyc = {}, routes = [], plugins = [];

const Server = (useHttps, port, options, handler) =>
	(useHttps ? Https : Http)
		.createServer(options, handler)
		.listen(port);

const ResponseFunctions = (response) => {
	return {
		send: (value) => response.end(value),
		status: (code) => response.writeHead(code),
		setHeader: (name, value) => response.setHeader(name, value),
		json(value) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(value));
		},
		html(value) {
			response.setHeader('Content-Type', 'text/html');
			response.end(value);
		},
	};
};

const LookupRoute = (url) => {
	for (let i = 0; i < routes.length; i++) {
		let params = routes[i].route.match(url);
		if (params) return [params, routes[i]];
	}
	return [undefined, undefined];
};

const RouteHandler = (req, res, error) => {
	let index = 0;
	const [url, query] = req.url.split('?');
	const [params, route] = LookupRoute(url);

	if (params === undefined || route === undefined) {
		error(req, ResponseFunctions(res));
		return;
	}

	req.params = params;
	req.query = QueryStrings.parse(query);

	const Activator = (req, res) => plugins[index](req, res, () => {
		index++;
		if (index < plugins.length) Activator(req, res)
		else route.handler(req, ResponseFunctions(res));
	})

	plugins.length !== 0 ? Activator(req, res) : route.handler(req, ResponseFunctions(res));
};

for (let method of Http.METHODS) {
	epyc[method.toLowerCase()] = (route, handler) => routes.push({ method, handler, route: new UrlPattern(route) });
}

epyc.use = (middelware) => (typeof middelware === 'function') ? plugins.push(middelware) : undefined;

epyc.bootstrap = (port = 3000, options = undefined, https = false, error = ErrorTemplate) =>
	(routes && routes.length !== 0) ? Server(https, port, options, (req, res) => RouteHandler(req, res, error)) : undefined;

module.exports = epyc;