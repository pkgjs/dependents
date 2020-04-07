# dependents

Tool to gather all dependents of a package and filter by npm weekly downloads,
github forks, stars and watchers

Example:

```sh
node bin/dependents i-should-pass 10 forks

Getting first 10 dependents of i-should-pass sorted by forks
There are a total of 1 dependents
{"name":"do-you-pass","weeklyDownloads":2,"forks":0,"stars":0,"watchers":0}
```

Note you need a GtiHub personal token called GITHUB_TOKEN to use this tool. For
more information about GitHub tokens:
<https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line>
