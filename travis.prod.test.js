
console.log("Initalize epyc for testing");
const epyc = require('./index');
const http = require('http');
const util = require('util');

console.log("define route for testing");
const obj = { Hello: "World" };
epyc.get('/', (req, res) => res.json(obj));

console.log("start the web server");
const server = epyc.bootstrap(8080);


console.log("fetch our route");
http.get("http://localhost:8080/", (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });


  resp.on('end', () => {
      let obj1 = JSON.parse(data);
    console.log(`response ${data}`);
    console.log("response is equale to our route object: " + util.isDeepStrictEqual(obj1, obj))
    console.log("Node application is running without any problems.");
    server.close();
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  server.close();
});


//process.kill(0); cause a error

