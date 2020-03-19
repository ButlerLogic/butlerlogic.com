const Header = new JET.Interface({
  selector: 'main > header',
  namespace: 'header',

  states: {
    idle: {
      transitions: {
        DOCK: 'docked'
      },

      on () {
        this.self.classList.remove('docked')
      }
    },

    docked: {
      transitions: {
        UNDOCK: 'idle'
      },

      on () {
        this.self.classList.add('docked')
      }
    }
  },

  on: {
    initialized () {
      let listener = evt => {
        if (window.scrollY > 0) {
          this.transition('DOCK')
        }

        window.removeEventListener('scroll', listener)
      }

      window.addEventListener('scroll', listener)
    },

    dock () {
      if (this.state === 'idle') {
        this.transition('DOCK')
      }
    },

    undock () {
      if (this.state === 'docked') {
        this.transition('UNDOCK')
      }
    }
  }
})

export { Header as default }
