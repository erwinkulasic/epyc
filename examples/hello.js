const epyc = require('epyc');

epyc.get('/', (req, res) => res.json({ Hello: "World" }));

epyc.bootstrap(8080);