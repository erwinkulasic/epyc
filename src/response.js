const { prepareExport } = require('./utils');
const http = require('http');

const response = {
    send(value) {
        this.end(value)
    },
    status(code) {
        this.writeHead(code)
    },
    json(value) {
        this.setHeader('Content-Type', 'application/json')
        this.end(JSON.stringify(value))
    },
    html(value) {
        this.setHeader('Content-Type', 'text/html')
        this.end(value)
    },
    redirect(url) {
        this.writeHead(301, { Location: url })
        this.end()
    }
};

module.exports = prepareExport(http.ServerResponse, response || {});