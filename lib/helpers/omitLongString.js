/**
 * @function omitLongString
 */
'use strict'

/** @lends omitLongString */
function omitLongString (arg, options = {maxLength: 100}) {
  const {maxLength} = options
  if (!arg) {
    return arg
  } else if (typeof arg === 'string') {
    return arg.length > maxLength ? arg.slice(0, maxLength) + '...' : arg
  } else if (Array.isArray(arg)) {
    const array = arg.map((item) => omitLongString(item, options))
    return array
  } else if (typeof arg === 'object') {
    const newObj = {}
    for (const [key, value] of Object.entries(arg)) {
      newObj[key] = omitLongString(value, options)
    }
    return newObj
  } else {
    return arg
  }
}

module.exports = omitLongString
