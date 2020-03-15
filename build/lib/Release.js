import path from 'path'
import fs from 'fs'
import dns from 'dns'
import { EventEmitter } from 'events'

const DEFAULT_DOMAIN = 'mydomain.com'

export default class Release extends EventEmitter {
  constructor () {
    super()

    const localpath = path.join(process.cwd(), '.github/workflows/release.yml')

    Object.defineProperties(this, {
      filepath: {
        enumerable: false,
        value: localpath
      },
      domain_cname: {
        enumerable: false,
        writable: true,
        value: false
      },
      domain_resolved: {
        enumerable: false,
        writable: true,
        value: false
      },
      domain_soa: {
        enumerable: false,
        writable: true,
        value: []
      },
      webdomain: {
        enumerable: false,
        writable: true,
        value: DEFAULT_DOMAIN
      },
      release: {
        enumerable: false,
        writable: true,
        value: fs.readFileSync(localpath).toString()
      }
    })
  }

  get domain () {
    return this.webdomain
  }

  set domain (domain) {
    domain = domain.trim().length === 0 ? DEFAULT_DOMAIN : domain.trim()

    if (this.webdomain !== domain) {
      const originaldomain = this.webdomain
      
      this.webdomain = domain
      this.release = this.release.replace(/\{\{\s+?DOMAIN\s+?\}\}/gi, this.webdomain)
        
      if (domain !== originaldomain) {
        this.release = this.release.replace(originaldomain, this.webdomain)
      }

      if (domain !== DEFAULT_DOMAIN) {
        dns.resolveSoa(domain, (err, soa) => {
          if (err) {
            this.domain_resolved = false
            this.emit('dns_checked')
          } else {
            this.domain_ns = soa.hostmaster
            
            dns.lookup(answer, 'CNAME', (cnameerr, records) => {
              if (!cnameerr) {
                this.domain_cname = true
              }

              this.emit('dns_checked')
            })
          }
        })
      } else {
        this.emit('dns_checked')
      }
    }
  }

  get hasCNAME () {
    return this.domain_cname
  }

  get dnsResolved () {
    return this.domain_resolved
  }

  get dnsRegistry () {
    return this.domain_ns
  }

  get warnings () {
    let data = []

    if (!this.domain_resolved) {
      data.push(`Could not resolve "${this.domain}"`)
    } else if (!this.domain_cname) {
      data.push(`"${this.domain}" is registered, but a CNAME record could not be found at ${this.dnsRegistry} (registrar).`)
    }

    return data
  }

  warn () {
    let warn = this.warnings
    if (warn.length > 0) {
      console.log('\n---------')
      warn.forEach(warning => console.log(` ** ${warning} **`))
      console.log('\n---------')
    }
  }

  write () {
    fs.writeFileSync(this.filepath, this.release))
    this.emit('write')
  }
}
