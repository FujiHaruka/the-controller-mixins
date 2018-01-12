/**
 * Wrap controller
 * @function withListen
 */
'use strict'

const asleep = require('asleep')

/** @lends withListen */
function withListen (Class, options = {}) {
  const {
    idleInterval = 1000 * 60,
    idleCount = 60,
  } = options

  class WithListen extends Class {
    async _listenResource (handlers, as = 'listening') {
      const s = this
      const {session} = s
      session.listenTargets = session.listenTargets || {}
      session.listenTargets[as] = true
      for (const [Resource, event, listener] of handlers) {
        Resource.addListener(event, listener)
      }

      for (let i = 0; i < idleCount; i++) {
        await asleep(idleInterval)
        await s.reloadSession()
        const {listenTargets = {}} = s.session
        if (!listenTargets[as]) {
          s._debug('Listener gone')
          break
        }
      }

      for (const [Resource, event, listener] of handlers) {
        Resource.removeListener(event, listener)
      }

      session.listenTargets[as] = false
    }

    async _clearListening () {
      const s = this
      for (const as of Object.keys(s.session.listenTargets || {})) {
        s.session.listenTargets[as] = false
      }
    }
  }

  return WithListen
}

module.exports = withListen