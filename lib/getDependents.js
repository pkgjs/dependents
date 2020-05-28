const fetchDependants = require('npm-dependants')
const fetch = require('node-fetch')
const github = require('./github')

async function * getDependants (dep, total) {
  let i = 0
  for await (const depName of fetchDependants(dep)) {
    if (i < total) {
      ++i
      yield depName
    } else {
      break
    }
  }
}

async function fetchDownloads (dep) {
  // TODO change to use 100 deps (non scoped) per req
  const resp = await fetch(`https://api.npmjs.org/downloads/point/last-week/${dep}`)
  return resp.json()
}

async function fetchRegistryInfo (dep) {
  const resp = await fetch(`https://registry.npmjs.org/${dep}`)
  return resp.json()
}

async function getDependentsInfo (args) {
  const urlRegex = /github.com\/([^/])+\/[^/]+/g
  const objArr = []
  const depArr = []

  for await (const dep of getDependants(args.package, args.total)) {
    depArr.push(dep)
  }

  for await (const eachDep of depArr) {
    let org, repo, repoOrgArr, githubArr, gitUrl
    const resp = await fetchRegistryInfo(eachDep)
    if (resp.repository && resp.repository.url) {
      gitUrl = (resp.repository.url).match(urlRegex)
      if (gitUrl) {
        gitUrl = gitUrl[0].replace(/(\.git)/g, '')
        repoOrgArr = (gitUrl.split('github.com'))[1].split('/')
        org = repoOrgArr[1]
        repo = repoOrgArr[2]
        githubArr = await github.getRepoData(org, repo).catch((err) => {
          if (!args.json) { console.log(err) }
        })
      }
    }

    const downloadEndpoint = await fetchDownloads(eachDep)
    const weeklyDownloads = downloadEndpoint.downloads

    objArr.push({
      [eachDep]: {
        downloads: weeklyDownloads,
        forks: githubArr ? githubArr[0] : 0,
        stars: githubArr ? githubArr[1] : 0,
        watchers: githubArr ? githubArr[2] : 0,
        url: gitUrl || 'undefined'
      }
    })
  }
  return objArr
}

async function sortDependents (deps, sort) {
  deps.sort(function (a, b) {
    for (const key in a) {
      a = a[key]
    }
    for (const key in b) {
      b = b[key]
    }
    return b[sort] - a[sort]
  })
  return deps
}

module.exports = async function (args) {
  const deps = await getDependentsInfo(args)
  const sorted = await sortDependents(deps, args.sort)
  return sorted
}
