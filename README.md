<p align="center">
<img alt="epyc" src="https://raw.githubusercontent.com/erwinkulasic/epyc/master/assets/epyc.png" width="600px"/>
</p>

<br>

<p align="center">
<img alt="NPM" src="https://img.shields.io/npm/dm/epyc?color=%23D48E28&logo=npm&style=flat-square">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/erwinkulasic/epyc?color=D48E28&logo=github&style=flat-square">
<img alt="NPM" src="https://img.shields.io/npm/l/epyc?color=D48E28&style=flat-square">
</p>

# Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/) to install cakebase.

```bash
npm i epyc
```

```bash
yarn add epyc
```

## Usage

please create an issue if you have suggestions for improvement.

```javascript
const epyc = require("epyc");

epyc.get('/', (req, res) => res.send('Hello World'));

epyc.post('/api/:id', (req, res) => res.json({ data: req.params.id, query: req.query }));


epyc.bootstrap(8080);

```

<!--
## Plugins

You can create your own plugin, publish it or use it yourself. this is how you use a plugin.

```javascript

const your_plugin = (req, res) => {
    res.send("my plugin is running");
};

epyc.use(your_plugin);

```
-->

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://github.com/erwinkulasic/epyc/blob/master/LICENSE)
