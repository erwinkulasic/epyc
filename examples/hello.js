const epyc = require('../index');

epyc.get('/', (req, res) => res.json({ Hello: "World" }));

epyc.bootstrap(8080);