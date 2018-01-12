/**
 * Mixins for the-controller
 * @module the-controller-mixins
 */
'use strict'

const compose = require('./compose')
const withAuthorized = require('./withAuthorized')
const withClient = require('./withClient')
const withDebug = require('./withDebug')
const withListen = require('./withListen')
const withSeal = require('./withSeal')

module.exports = {
  compose,
  withAuthorized,
  withClient,
  withDebug,
  withListen,
  withSeal,
}
