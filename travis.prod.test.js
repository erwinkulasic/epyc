const { Console } = require('console');
const epyc = require('./index');

epyc.get('/', (req, res) => res.json({ Hello: "World" }));

const server = epyc.bootstrap(8080);

console.log("Node application is running without any problems.");

server.close();
//process.kill(0); cause a error

