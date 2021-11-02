<span style="display:block;text-align:center">
<img alt="epyc" src="https://raw.githubusercontent.com/erwinkulasic/epyc/master/assets/epyc-header.png" width="600px"/>
</span>
<span style="display:block;text-align:center">
<img alt="NPM" src="https://img.shields.io/npm/dm/epyc?color=%23D48E28&logo=npm&style=flat-square">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/erwinkulasic/epyc?color=D48E28&logo=github&style=flat-square">
<img alt="NPM" src="https://img.shields.io/npm/l/epyc?color=D48E28&style=flat-square">
</span>

# Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/) to install cakebase.

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

epyc.bootstrap(8080);

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://github.com/erwinkulasic/epyc/blob/master/LICENSE)