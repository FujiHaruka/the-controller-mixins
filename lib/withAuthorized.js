/**
 * Wrap controller with seal
 * @function withAuthorized
 */
'use strict'

const {TheUnauthorizedError} = require('the-error')

/** @lends withAuthorized */
function withAuthorized (Class) {
  class WithAuthorized extends Class {
    async _getAuthorized () {
      const s = this
      return s.session.authorized || false
    }

    async _assertAuthorized () {
      const s = this
      const authorized = await s._getAuthorized()
      if (!authorized) {
        throw new TheUnauthorizedError('Needs to be authorized')
      }
    }

    async _setAuthorized (authorized) {
      const s = this
      s.session.authorized = authorized
    }

    async _delAuthorized () {
      const s = this
      s.session.authorized = false
    }
  }

  return WithAuthorized
}

module.exports = withAuthorized