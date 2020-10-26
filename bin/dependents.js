#!/usr/bin/env node
require('dotenv').config()
const assert = require('assert')

const args = require('yargs')
  .option('package', {
    alias: 'pkg',
    type: 'string',
    describe: 'Package used to find dependents',
    demand: true
  })
  .option('number', {
    alias: 'n',
    type: 'number',
    default: 10,
    describe: 'Total number of dependents to find'
  })
  .option('sort', {
    alias: 's',
    choices: ['downloads', 'forks', 'stars', 'watchers'],
    default: 'downloads',
    describe: 'Option to sort dependents by'
  })
  .option('json', {
    describe: 'Limit output to JSON only'
  })
  .option('total', {
    alias: 't',
    describe: 'Total number of packages fetched from the npm website',
    default: 200
  })
  .argv

assert(process.env.GITHUB_TOKEN, `
This tool requires you to have a GitHub personal token called GITHUB_TOKEN
For more information about GitHub tokens
https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
`)

async function writeDependents (args) {
  let arrayOfDependents = await require('../lib/getDependents')(args)
  arrayOfDependents = arrayOfDependents.slice(0, args.number)
  if (args.json) {
    console.log(JSON.stringify(arrayOfDependents, null, 2))
  } else {
    for (const dep of arrayOfDependents) {
      console.log(JSON.stringify(dep))
    }
  }
}

if (!args.json) {
  console.log(`Getting first ${args.number} dependents of ${args.package} sorted by ${args.sort}`)
}
writeDependents(args)
