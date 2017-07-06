'use strict'

const snapshot = require('snap-shot')

/* global describe, it */
describe('isPublicCommit', () => {
  const {isPublicCommit} = require('.')

  it('determines public value', () => {
    snapshot(
      isPublicCommit,
      {message: 'feat(foo): add feature foo'},
      {message: 'fix(log): update log config'},
      {message: 'chore(ci): something with ci'},
      {message: 'whatever message'}
    )
  })
})
