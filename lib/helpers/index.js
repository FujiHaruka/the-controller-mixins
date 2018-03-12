/**
 * controller-mixin helpers
 * @module helpers
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const getAllPropertyDescriptors = _d(require('./getAllPropertyDescriptors'))
const instanceMethodNamesFor = _d(require('./instanceMethodNamesFor'))

module.exports = {
  getAllPropertyDescriptors,
  instanceMethodNamesFor,
}
