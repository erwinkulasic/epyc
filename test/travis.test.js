/**
 *  TRAVIS CI TEST
 *   ---------------
 *  This test is runned on travis CI.
 *  It is used to test the production server.
 *  It is also used to test the epyc server.
 */

'use strict';

message("environment", process.env.NODE_ENV || 'development');

//initialize the test environment
const epyc = require('../src/index');
const http = require('http');
const assert = require('assert');

//add some data to the server for testing
const obj = { Hello: "World" };
console.table(obj);

//add route 
epyc.get('/', (req, res) => res.json(obj));

//create server
const PORT = process.env.PORT || 3000;

const server = epyc.bootstrap(PORT, {
    listen: () => {
        message("server", `listening on port ${PORT}`)

        fetch(`http://localhost:${PORT}/`, (data) => {
            try {
                const e = assert.deepStrictEqual(JSON.parse(data), obj);
                message("server",`The server is running correctly and the data is correct.`);
            } catch (err) {
                message("error", err.message);
            } finally {
                message("server", "closed");
                server.close();
            }
        });
    }
});


function message(name, msg) {
    console.log(`[\x1b[35mEPYC_TEST\x1b[0m] \x1b[32m${name} \x1b[0m: ${msg}`); 
    //making a little bit more readable and colorful :)
}

//the client is used to fetch data from the local server
function fetch(url, callback) {
    http.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            callback(data);
        });

    }).on("error", (err) => {
        message("error", err.message);
        message("server", "closed");
        server.close();
    });
}