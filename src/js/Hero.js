const Hero = new JET.Interface({
  selector: 'section.hero',
  namespace: 'hero',

  on: {
    initialized () {
      this.enableScrollMonitor()
    }
  }
})

export { Hero as default }
