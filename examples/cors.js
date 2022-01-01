const epyc = require('epyc');
const cors = require('cors');

epyc.use(cors());

epyc.get('/', (req, res) => res.json({ Hello: "World" }));

epyc.bootstrap(8080);