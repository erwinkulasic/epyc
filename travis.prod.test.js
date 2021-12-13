const { Console } = require('console');
const epyc = require('./index');

epyc.get('/', (req, res) => res.json({ Hello: "World" }));

epyc.bootstrap(8080);

console.log("Node application is running without any problems.");

process.kill(0);

