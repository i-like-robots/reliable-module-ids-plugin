const path = require('path')
const Subject = require('../../')

module.exports = {
  entry: {
    scripts: './test/fixtures/entry-point.js'
  },
  output: {
    path: path.resolve('./test/temp')
  },
  optimization: {
    moduleIds: false
  },
  plugins: [new Subject()]
}
