<p align="center">
<img alt="epyc" src="https://raw.githubusercontent.com/erwinkulasic/epyc/master/assets/epyc-header.png#gh-light-mode-only" width="600px"/>
<img alt="epyc" src="https://raw.githubusercontent.com/erwinkulasic/epyc/master/assets/epyc-header-light.png#gh-light-mode-only" width="600px"/>
</p>

<br>

<p align="center">
<img alt="NPM" src="https://img.shields.io/npm/dm/epyc?color=9E39EB&logo=npm&style=flat-square">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/erwinkulasic/epyc?color=9E39EB&logo=github&style=flat-square">
<img alt="NPM" src="https://img.shields.io/npm/l/epyc?color=9E39EB&style=flat-square">
</p>

# EPYC
The goal with this project is to create a simple and robust web server solution for api's, websites and much more. The plan is to keep the package size as small as possible and allow easy usability. 

Why you should use this project? it's new, small, constantly being improved with updates and has typescript declarations.

please create an issue if you have suggestions for improvement or found an bug.

# Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/) to install epyc.

```bash
npm i epyc
```

```bash
yarn add epyc
```

## Usage

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
