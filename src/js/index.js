const Site = new JET.Interface({
  selector: 'body',
  namespace: 'site'
})

JET.ready(() => Site.initialize())
