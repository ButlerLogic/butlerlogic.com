import Hero from './Hero.js'
import Header from './Header.js'

const Site = new JET.Interface({
  selector: 'body',
  namespace: 'site',

  references: {
    scrollToLinks: '[data-scrollto]'
  },

  children: [
    Hero,
    Header
  ],

  on: {
    scrollto (id) {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      })
    },

    initialized () {
      let scrolltoID = 'BUTLER_LOGIC_SCROLLTO_ID'
      let storedID = sessionStorage.getItem(scrolltoID)

      this.refs.scrollToLinks.forEach(link => {
        link.on('click', evt => {
          evt.preventDefault()

          let href = link.element.getAttribute('href')
          let { scrollto } = link.dataset

          if (href && href !== '#') {
            sessionStorage.setItem(scrolltoID, scrollto)
            return window.location.href = href
          }

          this.emit('scrollto', scrollto)
        })
      })

      if (storedID) {
        sessionStorage.removeItem(scrolltoID)
        return setTimeout(() => this.emit('scrollto', storedID), 236)
      }
    },

    hero: {
      'exiting-viewport' () {
        this.emit('header.dock')
      },

      'entered-viewport' () {
        this.emit('header.undock')
      }
    }
  }
})

JET.ready(() => Site.initialize())
