const [http, https, urlPattern, queryStr] = [
	require('http'),
	require('https'),
	require('url-pattern'),
	require('qs')];

let epyc 	= 	{}, 
	routes 	= 	[];

const Server = (useHttps, listener, port, options) =>
	(useHttps ? https : http)
		.createServer(options, listener)
		.listen(port);

const ResponseFunctions = (response) => {
	return {
		send: value => response.end(value),
		status: code => response.writeHead(code),
		setHeader: (name, value) => response.setHeader(name, value),
		json: value => {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(value));
		},
		html: value => {
			response.setHeader('Content-Type', 'text/html');
			response.end(value);
		},
	};
};

const LookupRoute = (url) => {
	for(let i = 0; i < routes.length; i++){
		let value = routes[i].route.match(url);
		if(value !== undefined)
			return [value, routes[i]];
	}
	return [undefined, undefined];
}

const GetRoute = (req) => {
	const [url, query] = req.url.split('?');
	let [params, route] = LookupRoute(url);

	if(params === undefined)
		return undefined;

	req.params = params;
	req.query = queryStr.parse(query);

	return route;
};

(http.METHODS).forEach((method) => epyc[method.toLowerCase()] = (route, action) => 
	routes.push({ method, action, route: new urlPattern(route) }));

epyc.bootstrap = (port = 3000, options = undefined, https = false, error = (req, res) => res.json({ error: req.url + ' not found.' })) =>
		(routes && Object.keys(routes).length !== 0) ? Server(https, (req, res) => {
			const route = GetRoute(req);
			((route && route.method === req.method) ? route.action(req, ResponseFunctions(res)) : error(req, ResponseFunctions(res)));
		}, port, options) : console.log("epyc: routes aren't defined.");

module.exports = epyc;