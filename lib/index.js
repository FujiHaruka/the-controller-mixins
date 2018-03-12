/**
 * Mixins for the-controller
 * @module the-controller-mixins
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const compose = _d(require('./compose'))
const helpers = _d(require('./helpers'))
const withAuthorized = _d(require('./withAuthorized'))
const withClient = _d(require('./withClient'))
const withDebug = _d(require('./withDebug'))
const withListen = _d(require('./withListen'))
const withPreference = _d(require('./withPreference'))
const withSeal = _d(require('./withSeal'))

module.exports = {
  compose,
  helpers,
  withAuthorized,
  withClient,
  withDebug,
  withListen,
  withPreference,
  withSeal,
}
