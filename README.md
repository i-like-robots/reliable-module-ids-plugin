# Reliable Module IDs Plugin

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/reliable-module-ids-plugin/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/reliable-module-ids-plugin.svg?branch=master)](https://travis-ci.org/i-like-robots/reliable-module-ids-plugin) [![npm version](https://img.shields.io/npm/v/reliable-module-ids-plugin.svg?style=flat)](https://www.npmjs.com/package/reliable-module-ids-plugin) [![Greenkeeper badge](https://badges.greenkeeper.io/i-like-robots/reliable-module-ids-plugin.svg)](https://greenkeeper.io/)

This [Webpack] plugin provides more reliable module IDs for improved long-term caching and code reuse between project installations and builds. It is intended to bridge the gap between Webpack 4 and the [deterministic IDs] feature coming in Webpack 5.

[Webpack]: https://webpack.js.org/
[deterministic IDs]: https://github.com/webpack/changelog-v5#deterministic-chunk-and-module-ids


## Installation

This is a [Node.js] module available through the [npm] registry. Node 8 and Webpack 4.38 or higher are required.

Installation is done using the [npm install] command:

```sh
$ npm install --save-dev reliable-module-ids-plugin
```

Once installed the plugin can be added to your [Webpack plugins configuration][plugins]:

```js
const ReliableModuleIdsPlugin = require('reliable-module-ids-plugin')

module.exports = {
  //...
  plugins: [
    new ReliableModuleIdsPlugin({
      // options
    })
  ]
}
```

If you have already configured [`optimization.moduleIds`][optimization] you should set this to `false` so Webpack will defer to the provided algorithm.

[Node.js]: https://nodejs.org/
[npm]: http://npmjs.com/
[npm install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally
[plugins]: https://webpack.js.org/configuration/plugins/
[optimization]: https://webpack.js.org/configuration/optimization/#optimizationmoduleids


## Options

### `hashFunction`

The hashing algorithm to use, defaults to `'md5'`. All functions from Node.JS' [`crypto.createHash`][createHash] are supported.

### `hashDigest`

The encoding to use when generating the hash, defaults to `'hex'`. All encodings from Node.JS' [`hash.digest`][digest] are supported.

### `hashDigestLength`

The prefix length of the hash digest to use, defaults to `8`. Note that some generated IDs might be longer than specified here, to avoid module ID collisions.

[createHash]: https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
[digest]: https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding


##  Prior Art

This plugin is based upon Webpack's built-in [`HashedModuleIdsPlugin`][hashed-plugin] by Tobias Koppers and uses the `node_modules` path normalization as demonstrated in the [`SimpleNamedModulesPlugin`][simple-plugin] by Tomer Brisker.

[hashed-plugin]: https://webpack.js.org/plugins/hashed-module-ids-plugin/
[simple-plugin]: https://github.com/tbrisker/simple-named-modules-plugin-webpack


## Development

This project uses [Prettier] for automatic code formatting and is tested with [Jasmine].

[Prettier]: https://prettier.io/
[Jasmine]: http://jasmine.github.io/


## License

This package is [MIT] licensed.

[MIT]: https://opensource.org/licenses/MIT
