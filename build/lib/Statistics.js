import axios from 'axios'
import TaskRunner from 'shortbus'
import { EventEmitter } from 'events'

const github = axios.create({
  baseURL: 'https://api.github.com/repos/',
  timeout: 2000,
  headers: {
    'User-Agent': 'stats-build-tool'
    // 'x-github-otp': ''
  }
  // auth: {
  //   username: 'github_username',
  //   password: 'github_password'
  // }
})

const npm = axios.create({
  baseURL: 'https://api.npmjs.org/downloads/point/last-month/',
  timeout: 2000,
  headers: { 'User-Agent': 'stats-build-tool' }
})

export default class Statistics extends EventEmitter {
  constructor () {
    super()

    this.src = {apps: [], libs: []}

    this.stats = {
      apps: {},
      libraries: {},
      summary: {
        apps: 0,
        libraries: 0,
        stars: 0
      }
    }
  }

  set apps (repos) {
    this.src.apps = repos
  }

  set libraries (libs) {
    this.src.libs = libs
  }

  data (cb) {
    let tasks = new TaskRunner()
    let apps = {}
    let libraries = {}
    let summary = {
      apps: 0,
      libraries: 0,
      stars: 0
    }

    this.src.apps.forEach(repo => {
      tasks.add(async next => {
        const id = repo.replace(/[^A-Za-z0-9]/gi, '_')
        const repository = await github.get(repo).catch(e => this.abort(e))

        apps[id] = {
          stars: repository.data.stargazers_count,
          downloads: 0,
          repo
        }
        summary.stars += repository.data.stargazers_count

        github.get(`${repo}/releases`)
          .then(release => {
            release.data.forEach(r => {
              r.assets.forEach(asset => {
                apps[id].downloads += asset.download_count
                summary.apps += asset.download_count
              })
            })

            next()
          })
          .catch(e => this.abort(e))
      })
    })

    this.src.libs.forEach(lib => {
      tasks.add(next => {
        npm.get(lib)
          .then(library => {
            summary.libraries += library.data.downloads
            libraries[lib] = library.data.downloads
            next()
          })
          .catch(e => this.abort(e))
      })
    })

    tasks.on('complete', () => cb({ apps, libraries, summary, date: new Date().getTime() }))

    tasks.run()
  }

  abort (e) {
    if (e.response && e.response.data && e.response.data.message) {
      return this.emit('error', new Error(e.response.data.message))
    }

    this.emit('error', e)
  }
}
