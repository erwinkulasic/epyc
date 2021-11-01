const http = require('http');
let epyc = {}, routes = {}, plugin = [];

for (let method of ["get", "post", "put", "delete", "patch"])
    epyc[method] = (route, action) => routes[route] = { method: method.toUpperCase(), action };

Object.assign(epyc, {
    use: (pluginAction) => {
        if(typeof pluginAction === "function")
            plugin.push(pluginAction);
    },
    bootstrap: (port = undefined) => {
        if (Object.keys(routes).length === 0)
            return;

        http.createServer((req, res) => {
            const route = routes[req.url];
            if(route && req.method === route.method) {
                if(plugin.length > 0)
                {
                    for(let i = 0; i < plugin.length; i++)
                        plugin[i](req, res);
                }

                route.action(req, {
                    send: (value) => res.end(value),
                    setHeader: (name, value) => res.setHeader(name, value),
                    status: (code) => res.writeHead(code),
                    json: (value) => {
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(value));
                    },
                    html: (value) => {
                        res.setHeader("Content-Type", "text/html")
                        res.end(value)
                    }
                });
            }else {
                res.setHeader("Content-Type", "application/json")
                res.writeHead(404);
                res.end(JSON.stringify({ error: req.url + " not found." }))
            }

        }).listen(port ? port : 0);
    }
});

module.exports = epyc;