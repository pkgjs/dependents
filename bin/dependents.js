#!/usr/bin/env node
require('dotenv').config()
const assert = require('assert')

const dependent = process.argv[2]
const depNum = process.argv[3] ? process.argv[3] : 10
const filterOption = process.argv[4] ? process.argv[4] : 'weeklyDownloads'

assert(process.env.GITHUB_TOKEN, `
This tool requires you to have a GitHub personal token called GITHUB_TOKEN
For more information about GitHub tokens
https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
`)

async function writeDependents (dependent, filterOption, depNum) {
  let arrayOfDependents = await require('../lib/getDependents')(dependent, filterOption)
  arrayOfDependents = arrayOfDependents.slice(0, depNum)
  for (let dep of arrayOfDependents) {
    console.log(JSON.stringify(dep))
  }
}

console.log(`Getting first ${depNum} dependents of ${dependent} sorted by ${filterOption}`)
writeDependents(dependent, filterOption, depNum)
