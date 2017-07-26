'use strict'

const debug = require('debug')('new-public-commits')
const ggit = require('ggit')
const simple = require('simple-commit-message')
const la = require('lazy-ass')
const is = require('check-more-types')
const pluralize = require('pluralize')

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
  debug('filtering %s', pluralize('commit', commits.length, true))
  const publicCommits = commits.filter(isPublicCommit)
  debug('%d public %s', commits.length, pluralize('commit', commits.length))
  return publicCommits
}

function newPublicCommits (sha) {
  const gitGet = sha ? ggit.commits.after(sha) : ggit.commits.afterLastTag()
  return gitGet.then(leavePublic)
}

module.exports = {
  newPublicCommits,
  isPublicCommit,
  leavePublic
}
