<p align="center">
<a href="https://github.com/erwinkulasic/epyc/">
    <img alt="epyc" src="https://raw.githubusercontent.com/erwinkulasic/epyc/master/.github/assets/epyc-logo.png" width="600px"/>
</a>
</p>
<p align="center">
<img alt="TRAVIS" src="https://img.shields.io/travis/erwinkulasic/epyc?color=df8&logo=travis&style=flat-square">
<img alt="NPM" src="https://img.shields.io/npm/dm/epyc?color=171717&logo=npm&style=flat-square">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/erwinkulasic/epyc?color=171717&logo=github&style=flat-square">
<img alt="NPM" src="https://img.shields.io/npm/l/epyc?color=171717&style=flat-square">
</p>

<br/>


### **Installation**

Use [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/) to install epyc.

```bash
npm i epyc
```

<br/>

### **Usage**

```javascript
const app = require("epyc");

app.get('/', (request, response) => response.send('Hello World'));

app.bootstrap(8080);
```
<br />

### More Examples

[   hello.js    ](https://github.com/erwinkulasic/epyc/blob/master/examples/hello.js)
[   cors.js     ](https://github.com/erwinkulasic/epyc/blob/master/examples/cors.js)
[   socket.js   ](https://github.com/erwinkulasic/epyc/blob/master/examples/socket.js)

<br/>

### **Contributing**
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<br/>

### **License**
[MIT](https://github.com/erwinkulasic/epyc/blob/master/LICENSE)
