const fetchDependants = require('npm-dependants')
const fetch = require('node-fetch')
const github = require('./github')
const { Dependant } = require('./dependant')

async function * getDependants (dep) {
  for await (const depName of fetchDependants(dep)) {
    yield depName
  }
}

async function fetchDownloads (dep) {
  const resp = await fetch(`https://api.npmjs.org/downloads/point/last-week/${dep}`) // can do 100 deps (non-scoped) in a single req
  return resp.json()
}

async function fetchRegistryInfo (dep) {
  const resp = await fetch(`https://registry.npmjs.org/${dep}`) // chnged mind dont hit registry, lets try and find another way
  return resp.json()
}

// async function addDownloadInfo

// async function addGithubInfo

async function grabDependentsInfo (pkg) {
  const urlRegex = /github.com\/([^/])+\/[^/]+/g
  const objArr = []
  const depArr = []
  for await (let dep of getDependants(pkg)) {
    depArr.push(dep)
  }
  console.log(`There are a total of ${depArr.length} dependents`)

  for await (const eachDep of depArr) {
    let resp = await fetchRegistryInfo(eachDep)
    if (resp.repository && resp.repository.url) {
      let org, repo, repoOrgArr, githubArr, forks, stars, watchers
      let gitUrl = (resp.repository.url).match(urlRegex)
      const downloadEndpoint = await fetchDownloads(eachDep)
      const weeklyDownloads = downloadEndpoint.downloads
      if (gitUrl) {
        gitUrl = gitUrl[0].replace(/(\.git)/g, '')
        repoOrgArr = (gitUrl.split('github.com'))[1].split('/')
        org = repoOrgArr[1]
        repo = repoOrgArr[2]
        githubArr = await github.getRepoData(org, repo).catch(err => { console.log(err) })
        forks = githubArr ? githubArr[0] : 'undefined'
        stars = githubArr ? githubArr[1] : 'undefined'
        watchers = githubArr ? githubArr[2] : 'undefined'
      }
      objArr.push(new Dependant(eachDep, weeklyDownloads, forks, stars, watchers))
    }
  }
  return objArr
}

async function filterDependents (deps, filter) {
  deps.sort(function (a, b) {
    return b[filter] - a[filter]
  })
  return deps
}

module.exports = async (pkg, filter) => {
  const deps = await grabDependentsInfo(pkg)
  return filterDependents(deps, filter)
}
