#!/usr/bin/env node
const dependent = process.argv[2]
const depNum = process.argv[3] ? process.argv[3] : 10
const filterOption = process.argv[4] ? process.argv[4] : 'weeklyDownloads'

async function writeDependents (dependent, filterOption, depNum) {
  let arrayOfDependents = await require('../lib/getDependents')(dependent, filterOption)
  arrayOfDependents = arrayOfDependents.slice(0, depNum)
  for (let dep of arrayOfDependents) {
    console.log(dep)
  }
}

console.log(`Getting first ${depNum} dependents of ${dependent} sorted by ${filterOption}`)
writeDependents(dependent, filterOption, depNum)
