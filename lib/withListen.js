/**
 * Wrap controller
 * @function withListen
 */
'use strict'

const asleep = require('asleep')

/** @lends withListen */
function withListen (Class, options = {}) {
  const {
    idleCount = 60,
    idleInterval = 1000 * 60,
  } = options

  class WithListen extends Class {
    async _clearListening () {
      const listenTargets = {...((this.session || {}).listenTargets || {})}
      for (const as of Object.keys(listenTargets || {})) {
        listenTargets[as] = false
        this.session.listenTargets = listenTargets
      }
    }

    async _listenResource (handlers, as = 'listening') {
      const listenTargets = {...((this.session || {}).listenTargets || {})}
      listenTargets[as] = true
      for (const [Resource, event, listener] of handlers) {
        Resource.addListener(event, listener)
      }

      for (let i = 0; i < idleCount; i++) {
        await asleep(idleInterval)
        await this.reloadSession()
        const listenTargets = {...((this.session || {}).listenTargets || {})}
        if (!listenTargets[as]) {
          this._debug('Listener gone')
          break
        }
      }

      for (const [Resource, event, listener] of handlers) {
        Resource.removeListener(event, listener)
      }

      listenTargets[as] = false
      this.session.listenTargets = listenTargets
    }
  }

  return WithListen
}

module.exports = withListen
