import Config from './config.js'

const Home = new JET.Interface({
  selector: '.butlerlogic.home',
  namespace: 'home',

  references: {
    userStat: 'section.stats .users.example .highlight',
    downloadsStat: 'section.stats .downloads.example .highlight',
    starsStat: 'section.stats .stars.example .highlight',
    productsGrid: 'section.tech .products.grid'
  },

  on: {
    initialized () {
      NGN.NET.json('../assets/data/product_statistics.json', (err, stats) => {
        if (err) {
          return console.error(err)
        }

        this.emit('stats.render', stats.summary)
        this.emit('products.render', stats)
      })
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
        this.renderHTML(this.refs.productsGrid, Config.map(item => {
          let numbers = item.hasOwnProperty('products')
            ? this.getGroupStats(...arguments, item.products)
            : Home.getStats(...arguments, item)

          return ['a', {
            class: 'product',
            href: NGN.coalesce(item.url, '#'),
            target: '_blank'
          }, [
            ['header', [
              ['div', { class: 'title' }, [item.name]],
              ['div', { class: 'stats' }, [
                numbers.stars > 0 && ['div', { class: 'stars stat' }, [
                  ['author-icon', { src: 'assets/icons/star.svg' }],
                  ['div', { class: 'label' }, [numbers.stars.toLocaleString()]]
                ]],

                numbers.downloads > 0 && ['div', { class: 'downloads stat' }, [
                  ['author-icon', { src: 'assets/icons/download.svg' }],
                  ['div', { class: 'label' }, [numbers.downloads.toLocaleString()]]
                ]],
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
