'use strict'

const ggit = require('ggit')
const simple = require('simple-commit-message')
const la = require('lazy-ass')
const is = require('check-more-types')

function isPublicCommit (commit) {
  la(commit, 'missing commit object', commit)
  la(is.object(commit), 'commit should be an object', commit)
  if (is.empty(commit.message)) {
    return false
  }
  const parsed = simple.parse(commit.message)
  if (!parsed) {
    return false
  }
  return simple.isPublic(parsed.type)
}

function leavePublic (commits) {
  return commits.filter(isPublicCommit)
}

function newPublicCommits () {
  return ggit.commits.afterLastTag()
    .then(leavePublic)
}

module.exports = {
  newPublicCommits,
  isPublicCommit,
  leavePublic
}
