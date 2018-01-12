/**
 * Wrap controller with debug
 * @function withDebug
 */
'use strict'

const Debug = require('debug')
const {cleanup} = require('asobj')
const {inspect} = require('util')
const {unlessProduction} = require('the-check')

/** @lends withDebug */
function withDebug (Class,
                    debugKey = `app:${Class.name}`,
                    contextFilter = (self) => self.client,
                    opitons = {}) {
  const debug = Debug(debugKey)
  const proto = Object.getPrototypeOf(new Class())
  const instanceMethods = Object.getOwnPropertyNames(proto)
    .filter((name) => !['constructor', 'toString', 'toJSON'].includes(name))
    .filter((name) => !/^_/.test(name))
    .filter((name) => {
      const {get, set} = Object.getOwnPropertyDescriptor(proto, name)
      return !get && !set
    })

  class WithDebug extends Class {}

  unlessProduction(() => {
    for (const name of instanceMethods) {
      const original = Class.prototype[name]
      WithDebug.prototype[name] = Object.assign(
        async function debugProxy (...args) {
          const startAt = new Date()
          let result
          let exception
          try {
            result = await original.apply(this, args)
          } catch (e) {
            debug('exception', e)
            exception = e
            throw e
          } finally {
            const took = new Date() - startAt
            const context = contextFilter(this)
            const info = {args, took, context, result, exception}
            debug(`\`${Class.name}.${name}()\``, inspect(cleanup(info), {
              breakLength: Infinity,
              maxArrayLength: 3,
              depth: 3
            }))
          }
          return result
        },
        {original}
      )
    }
  })

  WithDebug.prototype._debug = debug
  return WithDebug
}

module.exports = withDebug
