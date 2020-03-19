import Config from './config.js'
import Clients from './Clients.js'

const Home = new JET.Interface({
  selector: '.butlerlogic.home',
  namespace: 'home',

  references: {
    userStat: 'section.stats .users.example .highlight',
    downloadsStat: 'section.stats .downloads.example .highlight',
    starsStat: 'section.stats .stars.example .highlight',
    productsGrid: 'section.tech .products.grid',
    events: 'section.research .bleeding-edge .events'
  },

  children: [
    Clients
  ],

  on: {
    initialized () {
      NGN.NET.json('../assets/data/product_statistics.json', (err, stats) => {
        if (err) {
          return console.error(err)
        }

        this.emit('stats.render', stats.summary)
        this.emit('products.render', stats)
      })

      NGN.NET.json('../assets/data/meetup.json', (err, meetup) => {
        if (err) {
          console.error()
        }

        this.emit('events.render', meetup)
      })
    },

    events: {
      render (event) {
        let title = `${event.status === 'past' ? 'Recent' : 'Upcoming'} Meetups`

        this.renderHTML(this.refs.events, [
          ['h3', [title]],

          ['a', {
            class: 'event',
            href: event.url,
            target: '_blank'
          }, [
            ['author-icon', { src: 'assets/icons/calendar.svg' }],

            ['div', { class: 'details' }, [
              ['div', { class: 'name' }, [event.name]],
              ['div', { class: 'date' }, [event.date.display]]
            ]]
          ]]
        ])
      }
    },

    stats: {
      render (stats) {
        this.renderHTML(this.refs.userStat, [stats.apps.toLocaleString()])
        this.renderHTML(this.refs.downloadsStat, [stats.libraries.toLocaleString()])
        this.renderHTML(this.refs.starsStat, [stats.stars.toLocaleString()])
      }
    },

    products: {
      render ({ apps, libraries, summary }) {
        this.renderHTML(this.refs.productsGrid, Config.map((item, index) => {
          let numbers = item.hasOwnProperty('products')
            ? this.getGroupStats(...arguments, item.products)
            : Home.getStats(...arguments, item)

          return ['a', {
            class: [{
              last: index === Config.length - 1
            },'product'],
            href: NGN.coalesce(item.url, '#'),
            target: '_blank'
          }, [
            ['header', [
              ['div', { class: 'title' }, [item.name]],

              numbers.stars < 250
                ? ['div', { class: 'placeholder' }, ['New']]
                : ['div', { class: 'stats' }, [
                  ['div', { class: 'stars stat' }, [
                    ['author-icon', { src: 'assets/icons/star.svg' }],
                    ['div', { class: 'label' }, [numbers.stars.toLocaleString()]]
                  ]],

                  ['div', { class: 'downloads stat' }, [
                    ['author-icon', { src: 'assets/icons/download.svg' }],
                    ['div', { class: 'label' }, [numbers.downloads.toLocaleString()]]
                  ]]
                ]]
            ]],

            ['p', { class: 'description' }, [item.description]]
          ]]
        }))
      }
    }
  }
})

Home.getStats = function ({ apps, libraries }, product) {
  let numbers = {
    downloads: 0,
    stars: 0
  }

  if (product.hasOwnProperty('library')) {
    numbers.downloads += libraries[product.library]
  }

  if (product.hasOwnProperty('app')) {
    let app = apps[product.app]

    if (app) {
      numbers.downloads += app.downloads
      numbers.stars += app.stars
    }
  }

  return numbers
}

Home.getGroupStats = function (data, products) {
  return products.reduce((acc, product) => {
    let stats = Home.getStats(data, product)
    acc.downloads += stats.downloads
    acc.stars += stats.stars
    return acc
  }, {
    downloads: 0,
    stars: 0
  })
}

JET.ready(() => Home.initialize())
