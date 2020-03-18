import Config from './config.js'

const AppsGrid = new JET.Interface({
  selector: 'section.tech .products.grid',
  namespace: 'apps',

  on: {
    render (apps, libraries, stats) {
      this.renderHTML(Config.map(item => {
        let numbers = {
          downloads: 0,
          stars: 0
        }

        if (item.hasOwnProperty('library')) {
          // let downloadCount = libraries[item.library]
          console.log(libraries);
          // downloads +=
        }

        console.log(downloads)

        // if (item.hasOwnProperty('app')) {
        //   let app = apps[item.app]
        //
        //   if (app) {
        //     downloads += app.downloads
        //     stars += app.stars
        //   }
        // }
        // console.log(item);
        // console.log(downloads);
        // console.log(stars);
        return ['div', ['test']]
      }))

      // this.renderHTML(apps.map(app => ['div', { class: 'product' }, {
      //   click: evt => {
      //     evt.preventDefault()
      //     console.log(app)
      //   }
      // }, [
      //   ['header', [
      //     ['div', { class: 'title' }, [app.name]],
      //     ['div', { class: 'stats' }, [
      //       app.stars > 100 && ['div', { class: 'stars stat' }, [
      //         ['author-icon', { src: 'assets/icons/star.svg' }],
      //         ['div', { class: 'label' }, [app.stars.toLocaleString()]]
      //       ]],
      //
      //       app.downloads > 100 && ['div', { class: 'downloads stat' }, [
      //         ['author-icon', { src: 'assets/icons/download.svg' }],
      //         ['div', { class: 'label' }, [app.downloads.toLocaleString()]]
      //       ]],
      //     ]]
      //   ]],
      //
      //   ['p', { class: 'description' }, ['Description']]
      // ]]))
    }
  }
})

// AppsGrid.getAppStats = function (product) {
//
// }
//
// AppsGrid.getGroupStats = function (group) {
//   return group.products.reduce((acc, product) => {
//     if (product.hasOwnProperty('app')) {
//       let app = product
//     }
//   }, {
//     stars: 0,
//     downloads: 0
//   })
// }

export { AppsGrid as default }
