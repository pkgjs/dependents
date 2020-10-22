require('dotenv').config()
const assert = require('assert')
const { suite, test } = require('mocha')
const getDependents = require('../lib/getDependents')
const pkg = require('../package.json')
const config = require('./fixtures/config')

assert(process.env.GITHUB_TOKEN, `
Tests require you to have a GitHub personal token called GITHUB_TOKEN
For more information about GitHub tokens
https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
`)

let deps

suite(pkg.name, async function () {
  this.timeout(0)
  test('Dependents object created', async function () {
    deps = await getDependents(config.args)
    for (const i in deps) {
      for (const key in deps[i]) {
        const subObj = deps[i][key]
        assert.strictEqual(Object.prototype.hasOwnProperty.call(subObj, 'downloads'), true)
        assert.strictEqual(Object.prototype.hasOwnProperty.call(subObj, 'forks'), true)
        assert.strictEqual(Object.prototype.hasOwnProperty.call(subObj, 'stars'), true)
        assert.strictEqual(Object.prototype.hasOwnProperty.call(subObj, 'watchers'), true)
        assert.strictEqual(Object.prototype.hasOwnProperty.call(subObj, 'url'), true)
      }
    }
  })
  test('GitHub attributes zero when URL is undefined', async function () {
    for (const i in deps) {
      for (const key in deps[i]) {
        const subObj = deps[i][key]
        if (subObj.url === 'undefined') {
          assert.strictEqual(subObj.forks, 0)
          assert.strictEqual(subObj.stars, 0)
          assert.strictEqual(subObj.watchers, 0)
        }
      }
    }
  })
  test('Dependents sorted correctly', async function () {
    let key, previousKey
    for (const i in deps) {
      for (const k in deps[i]) {
        previousKey = key
        key = k
      }
      if (i !== '0') {
        const j = String(parseInt(i) - 1)
        const previous = deps[j][previousKey][config.args.sort]
        const current = deps[i][key][config.args.sort]
        assert.strictEqual(previous >= current, true)
      }
    }
  })
})
