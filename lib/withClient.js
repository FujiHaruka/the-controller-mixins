/**
 * Wrap controller with client
 * @function withClient
 */
'use strict'

const {format: formatUrl} = require('url')
const qs = require('qs')

/** @lends withClient */
function withClient (Class) {
  class WithClient extends Class {
    clientUrlFor (pathname, query = {}) {
      const {protocol, host} = this.client
      return formatUrl({
        protocol,
        host,
        pathname,
        search: qs.stringify(query)
      })
    }
  }

  return WithClient
}

module.exports = withClient