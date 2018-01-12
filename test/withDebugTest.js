/**
 * Test for withDebug.
 * Runs with mocha.
 */
'use strict'

const withDebug = require('../lib/withDebug')
const {ok, equal} = require('assert')

describe('with-debug', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const Foo = withDebug(
      class FooImpl {
        doSomething () {
          return {
            obj: {a: {b: {c: {d: 1}}}},
            arr: new Array(2000).fill(null).map((_, i) => ({i}))
          }
        }

        get hoge () {
          console.log('dynamic getter')
        }
      }
    )
    const foo = new Foo()
    foo._debug.enabled = true
    ok(foo.doSomething('foo', 'bar', 'baz'))
    equal(foo.doSomething.name, 'debugProxy')
    equal(foo.doSomething.original.name, 'doSomething')
  })
})

/* global describe, before, after, it */
