// This module is based upon Webpack's own hashed module IDs plugin by Tobias Koppers:
// <https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js>
//
// And the solution to differing base paths suggested by Tomer Brisker:
// <https://itnext.io/it-works-on-my-machine-b712fd532670>
const createHash = require('webpack/lib/util/createHash')

const PluginName = 'ReliableModuleIdsPlugin'

class ReliableModuleIdsPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        hashFunction: 'md5',
        hashDigest: 'hex',
        hashDigestLength: 8
      },
      options
    )
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      const usedIds = new Set()

      compilation.hooks.beforeModuleIds.tap(PluginName, (modules) => {
        modules.forEach((module) => {
          if (module.id === null && module.libIdent) {
            // This returns the relative path from the project root to the original module/s.
            // By default Webpack uses this as the module's ID in development mode.
            let id = module.libIdent({
              context: compiler.options.context
            })

            // Because npm install is not idempotent paths to packages can change between installs.
            // To mitigate this we'll take the deepest node modules path rather than the full path.
            if (id.includes('node_modules')) {
              id = id.slice(id.lastIndexOf('node_modules'))
            }

            const hash = createHash(this.options.hashFunction)

            hash.update(id)

            const hashId = hash.digest(this.options.hashDigest)

            // Because we're shortening IDs there is a (low) risk we might create duplicate IDs.
            // To avoid this we'll use Webpack's strategy of incrementing the length on collisions.
            let hashLength = this.options.hashDigestLength

            while (usedIds.has(hashId.substr(0, hashLength))) {
              hashLength++
            }

            module.id = hashId.substr(0, hashLength)
          }
        })
      })
    })
  }
}

module.exports = ReliableModuleIdsPlugin
