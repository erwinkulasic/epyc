const [http, https, urlPattern, queryStr] = [
	require('http'),
	require('https'),
	require('url-pattern'),
	require('qs')];

let epyc = {}, routes = [], plugins = [];

const Server = (useHttps, listener, port, options) =>
	(useHttps ? https : http)
		.createServer(options, listener)
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

const GetRoute = (req) => {
	const [url, query] = req.url.split('?');
	const [params, route] = LookupRoute(url);

	if (params === undefined) return undefined;

	req.params = params;
	req.query = queryStr.parse(query);

	return route;
};

(http.METHODS).forEach((method) =>
	(epyc[method.toLowerCase()] = (route, task) => routes.push({ method, task, route: new urlPattern(route) })));

epyc.use = (middelware) => {
	if(typeof middelware === 'function') plugins.push(middelware);
};

const Activator = (req, res, index) => {
	plugins[index](req, res, () => {
		if(index + 1 < plugins.length) Activator(req, res, index + 1);
	});
};

epyc.bootstrap = (
	port = 3000, 
	options = undefined, 
	https = false, 
	error = (req, res) => res.json({ error: req.url + ' not found.' })) =>
		(routes && Object.keys(routes).length !== 0) ? Server(https, (req, res) => {
				if(plugins.length !== 0) Activator(req, res, 0);
				const route = GetRoute(req);
				(route && route.method === req.method) ? route.task(req, ResponseFunctions(res)) : error(req, ResponseFunctions(res));
		}, port, options) : console.log("epyc: routes aren't defined.");

module.exports = epyc;