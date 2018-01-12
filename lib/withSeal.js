/**
 * Wrap controller with seal
 * @function withSeal
 */
'use strict'

const {TheInvalidParameterError} = require('the-error')

/** @lends withSeal */
function withSeal (Class) {
  class WithSeal extends Class {

    async _sealFor (envelop) {
      const s = this
      const {seal} = s.app
      return seal.seal(envelop)
    }

    async _assertSeal (sealString, envelop) {
      const s = this
      const {seal} = s.app
      const ok = seal.verify(sealString, envelop)
      if (!ok) {
        throw new TheInvalidParameterError(`Invalid parameter`, envelop)
      }
    }
  }

  return WithSeal
}

module.exports = withSeal