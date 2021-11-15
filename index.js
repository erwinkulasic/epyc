const [http, https, urlPattern, queryStr] = [
	require('http'),
	require('https'),
	require('url-pattern'),
	require('qs')];

let epyc = {}, routes = [];

const server = (HttpState = false, listener, port = 0, options) =>
	(HttpState ? https : http)
		.createServer(options, listener)
		.listen(port);

const response = (res) => {
	return {
		send: (value) => res.end(value),
		setHeader: (name, value) => res.setHeader(name, value),
		status: (code) => res.writeHead(code),
		json: (value) => {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(value));
		},
		html: (value) => {
			res.setHeader('Content-Type', 'text/html');
			res.end(value);
		},
	};
};

const GetRoute = (value) => {
	const [url, qv] = value.split('?');

	for (let i = 0; i < routes.length; i++) {
		var elem = routes[i];
		const params = elem.route.match(url);
		if (params !== null) {
			elem.params = params;
			elem.query = queryStr.parse(qv)
			return elem;
		}
	}

	return undefined;
};

http.METHODS.forEach((method) => epyc[method.toLowerCase()] =
	(route, action) => routes.push({ method, action, route: new urlPattern(route) }));

epyc.bootstrap = (port = (3000 || process.env.Port), options = undefined, error = (req, res) => res.json({ error: req.url + ' not found.' })) =>
	(routes && Object.keys(routes).length !== 0) ? server(options !== undefined ? true : false, (req, res) => {
		const route = GetRoute(req.url);
		if (route) {
			req.params = route.params;
			req.query = route.query;
			((route.method === req.method) ? route.action(req, response(res)) : error(req, response(res)));
		}
	}, port, options) : console.log("epyc: routes aren't defined.");


module.exports = epyc;
