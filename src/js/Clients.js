const Clients = new JET.Interface({
  selector: 'section.hero .clients',
  namespace: 'clients',

  on: {
    initialized () {
      window.addEventListener('DOMContentLoaded', () => {
        let carousel = new Flickity(this.self.element, {
          cellAlign: 'left',
          contain: true,
          wrapAround: true,
          autoPlay: true,
          prevNextButtons: false,
          pageDots: false,
          lazyLoad: true
        })

        this.self.classList.remove('loading')
      })
    }
  }
})

export { Clients as default }
