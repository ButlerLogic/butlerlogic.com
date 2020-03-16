#!/usr/bin/env node --experimental-modules
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { execSync as exec } from 'child_process'
import Release from '../lib/Release.js'
import all from '../lib/global.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Identify active user
let user = exec('git config user.name').toString().trim()
user = user.length === 0 ? process.env.USER : user

rl.question(`\nWho is the credited author of this site?\nCurrently ${user}. Press enter to skip.\n> `, answer => {
  if (answer.trim().length > 0) {
    user = answer.trim()
  }

  console.log(`Author set to ${user}`)

  // Identify package source
  let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')))

  // Basic package updates
  pkg.scripts.resetup = pkg.scripts.setup
  pkg.author = user
  delete pkg.scripts.setup

  try {
    const gitconfig = fs.readFileSync(path.join(__dirname, '../../.git/config')).toString()
    const cfg = gitconfig.trim().replace(/\t/g, '').split('\n').filter(i => i.trim().length > 0)
    const origin = 'https://' + /url\s+?=\s+?(.*@)?(.*)/i.exec(cfg.filter((el, i, a) => {
      return i > 0 && a.indexOf('[remote "origin"]') < i && /url\s+?=\s+?(.*)/i.test(el)
    }).pop())[2].replace(':', '/')

    pkg.repository = pkg.repository || {}
    pkg.repository.type = 'git'
    pkg.url = 'git+' + origin
    pkg.bugs = pkg.bugs || {}
    pkg.bugs.url = origin.replace('.git', '/issues')
    pkg.homepage = origin.replace('.git', '#readme')
  } catch (e) {
    console.log(e.message)
  }

  // Get release file code
  const release = new Release()

  release.on('write', () => {
    console.log('Updated Github Workflows')

    fs.writeFileSync(path.join(__dirname, '../../', 'package.json'), JSON.stringify(pkg, null, 2))
    console.log('Updated package.json')

    let readme = `# ${release.domain}\n\nBuilt with ButlerLogic.\n\nGenereated on ${new Date().toLocaleString()}`
    fs.writeFileSync(path.join(__dirname, '../../', 'README.md'), readme)
    console.log('Updated README.md')

    let license = `# License\n\nCopyright &copy; ${new Date().getFullYear()} ${user}.\nAll rights reserved.`
    fs.writeFileSync(path.join(__dirname, '../../', 'LICENSE'), license)
    console.log('Updated LICENSE')

    // Attempt to commit changes to the master branch & generate a personal branch
    try {
      console.log(exec(`git add .`).toString())
      console.log(exec(`git commit -m "Initial setup."`).toString())

      let currentbranch = exec('git rev-parse --abbrev-ref HEAD', { cwd: gitpath }).toString().trim().toLowerCase()

      if (currentbranch === 'master') {
        let branch = user.replace(/[^a-zA-Z0-9_]/gi, '').toLowerCase()
        let hasremote
        try {
          hasremote = exec(`git ls-remote --exit-code --heads origin ${branch}`, { cwd: gitpath }).toString().trim().length === 0
        } catch (e) {
          if (e.stderr.toString().trim().length > 0) {
            return console.log(e.stderr)
          }

          if (e.stdout.toString().trim().length > 0) {
            return console.log(e.stdout)
          }

          hasremote = false
        }

        if (!hasremote) {
          console.log(`Creating a personal "${branch}" branch.`)
          console.log(exec(`git checkout -b ${branch}`).toString())
          console.log(exec(`git push -u origin ${branch}`).toString())
        } else {
          console.log(exec(`git checkout ${branch}`).toString())
        }
      }

      release.warn()
    } catch (e) {
      release.warn()
      console.log('\n---\n\nSetup is complete, but changes could not be committed/pushed to a remote repository. This should be done by hand.')
    }
  })

  rl.question('\nWhich domain (ex: domain.com) should the CNAME record point to?\n> ', answer => {
    rl.close()

    release.on('dns_checked', () => release.write())
    release.domain = answer.trim()
  })
})
