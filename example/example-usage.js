'use strict'

const {TheCtrl} = require('the-controller-base')
const {withAuthorized} = require('the-controller-mixins')

async function tryExample () {
  class MyCtrl extends withAuthorized(TheCtrl) {
    /* ... */
  }
}

tryExample().catch((err) => console.error(err))
