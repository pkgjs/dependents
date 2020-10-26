# dependents

Tool to gather all dependents of a package and sort by npm weekly downloads,
GitHub forks, stars or watchers

This repository is managed by the [Package Maintenance Working Group](https://github.com/nodejs/package-maintenance), see [Governance](https://github.com/nodejs/package-maintenance/blob/master/Governance.md).

### Install

To install this tool run:

```sh
$ npm i -g dependents
```

Or via npx:

```sh
$ npx dependents [options]
```

### Require it in your project

```js
const expressDependents = require('dependents')({ package: "express", total: 10, sort: 'downloads' })
```

### Examples

```sh
dependents --package express --number 5 --sort downloads --total 25

Getting first 5 dependents of express sorted by downloads
{"webpack-dev-server":{"downloads":7492143,"forks":1023,"stars":6264,"watchers":116,"url":"github.com/webpack/webpack-dev-server"}}
{"webpack-bundle-analyzer":{"downloads":3031281,"forks":290,"stars":9863,"watchers":97,"url":"github.com/webpack-contrib/webpack-bundle-analyzer"}}
{"apollo-server-express":{"downloads":1032911,"forks":1318,"stars":9604,"watchers":216,"url":"github.com/apollographql/apollo-server"}}
{"gatsby":{"downloads":444063,"forks":7870,"stars":44480,"watchers":977,"url":"github.com/gatsbyjs/gatsby"}}
{"firebase-functions":{"downloads":433052,"forks":100,"stars":707,"watchers":109,"url":"github.com/firebase/firebase-functions"}}
```

JSON output only

```sh
dependents --package express --number 5 --sort downloads --total 25 --json

[
  {
    'webpack-dev-server': {
      downloads: 7492143,
      forks: 1023,
      stars: 6264,
      watchers: 116,
      url: 'github.com/webpack/webpack-dev-server'
    }
  },
  {
    'webpack-bundle-analyzer': {
      downloads: 3031281,
      forks: 290,
      stars: 9863,
      watchers: 97,
      url: 'github.com/webpack-contrib/webpack-bundle-analyzer'
    }
  },
  {
    'apollo-server-express': {
      downloads: 1032911,
      forks: 1318,
      stars: 9604,
      watchers: 216,
      url: 'github.com/apollographql/apollo-server'
    }
  },
  {
    gatsby: {
      downloads: 444063,
      forks: 7870,
      stars: 44480,
      watchers: 977,
      url: 'github.com/gatsbyjs/gatsby'
    }
  },
  {
    'firebase-functions': {
      downloads: 433052,
      forks: 100,
      stars: 707,
      watchers: 109,
      url: 'github.com/firebase/firebase-functions'
    }
  }
]
```

Note that to use this tool you need a GitHub personal token set as an
environment variable named GITHUB_TOKEN. For more information about GitHub
tokens:
<https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line>
