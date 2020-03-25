const { graphql } = require('@octokit/graphql')

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`
  }
})

module.exports.getRepoData =
async function getRepoData (owner, repo) {
  try {
    const resp = await graphqlWithAuth({
      query: `query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          forks {
            totalCount
          }
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
        }
      }`,
      owner: owner,
      repo: repo
    })
    return [
      resp.repository.forks.totalCount,
      resp.repository.stargazers.totalCount,
      resp.repository.watchers.totalCount
    ]
  } catch (err) {
    if (err.errors && err.errors[0].type === 'NOT_FOUND') {
      console.log(`Could not find GitHub repository at https://www.github.com/${owner}/${repo}`)
    } else {
      console.log(err)
      throw err
    }
  }
}
