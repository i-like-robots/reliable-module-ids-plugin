const webpack = require('webpack')
const config = require('./fixtures/webpack.config')

describe('Webpack integration test', () => {
  let result

  beforeAll((done) => {
    webpack(config, (errors, stats) => {
      result = { errors, stats }
      done()
    })
  })

  it('builds without errors', () => {
    expect(result.errors).toBe(null)
    expect(result.stats.hasErrors()).toBe(false)
  })

  it('can build the expected files', () => {
    const files = result.stats.toJson().assets.map((a) => a.name)

    expect(files).toContain('scripts.js')
  })

  it('hashes module IDs', () => {
    const ids = result.stats.compilation.modules.map((m) => m.id)

    expect(ids).toContain('8fdc1f') // fixtures/module-a.js
    expect(ids).toContain('9a26be') // fixtures/module-b.js
    expect(ids).toContain('b063c2') // fixtures/entry-point.js
  })
})
