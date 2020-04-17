module.exports.Dependant = class Dependant {
  constructor (name, weeklyDownloads, forks, stars, watchers) {
    this.name = name
    this.weeklyDownloads = weeklyDownloads
    this.forks = forks
    this.stars = stars
    this.watchers = watchers
  }
}
