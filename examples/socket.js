const epyc = require('epyc');
const { Server } = require("socket.io");

epyc.get('/', (req, res) => res.send("Hello User"));

const instance = epyc.bootstrap(8080);
const io = new Server(instance);

io.on('connection', (data) => console.log('a user connected'));