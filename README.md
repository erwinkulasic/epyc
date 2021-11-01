<img src="https://raw.githubusercontent.com/erwinkulasic/epyc/master/assets/epyc-header.png" width="600px"/>


## Installation

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