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
      return this.session.authorized || false
    }

    async _assertAuthorized () {
      const authorized = await this._getAuthorized()
      if (!authorized) {
        this._throwUnauthorizedError()
      }
    }

    async _setAuthorized (authorized) {
      this.session = {
        ...this.session,
        authorized,
      }
    }

    async _delAuthorized () {
      this.session = {
        ...this.session,
        authorized: false,
      }
    }

    // noinspection JSMethodCanBeStatic
    _throwUnauthorizedError () {
      throw new TheUnauthorizedError('Needs to be authorized')
    }
  }

  return WithAuthorized
}

module.exports = withAuthorized