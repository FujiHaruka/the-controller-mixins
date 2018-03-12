/**
 * Wrap controller with debug
 * @function withDebug
 */
'use strict'

const Debug = require('debug')
const {cleanup} = require('asobj')
const {inspect} = require('util')
const {unlessProduction} = require('the-check')
const {getAllPropertyDescriptors, instanceMethodNamesFor} = require('./helpers')

/** @lends withDebug */
function withDebug (Class,
                    options = {},) {

  class WithDebug extends Class {
    constructor (...args) {
      super(...args)
      unlessProduction(() => {
        const Constructor = this.constructor
        const controllerName = (this.name || Constructor.name)
        const {
          debugKey = `app:${controllerName}`,
          contextFilter = ({client}) => client,
        } = options
        const debug = Debug(debugKey)

        const descriptors = getAllPropertyDescriptors(this)
        const instanceMethodNames = instanceMethodNamesFor(this, descriptors)

        this._debug = debug
        for (const name of instanceMethodNames) {
          const original = this[name]
          this[name] = Object.assign(
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
                debug(`\`${controllerName}.${name}()\``, inspect(cleanup(info), {
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
    }
  }

  return WithDebug
}

module.exports = withDebug
