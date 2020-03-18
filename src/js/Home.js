const Products = new NGN.DATA.Store({
  model: new NGN.DATA.Model({
    fields: {

    }
  })
})

const Home = new JET.Interface({
  selector: '.butlerlogic.home',
  namespace: 'home',

  on: {
    initialized () {
      NGN.NET.json('../assets/data/product_statistics.json', (err, stats) => {
        if (err) {
          return console.error(err)
        }

        console.log(stats)
      })
    }
  }
})

JET.ready(() => Home.initialize())
