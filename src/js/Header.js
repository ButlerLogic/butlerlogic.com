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
      setTimeout(() => {
        if (window.scrollY > 0) {
          this.transition('DOCK')
        }
      }, 0)
    },

    dock () {
      this.transition('DOCK')
    },

    undock () {
      this.transition('UNDOCK')
    }
  }
})

export { Header as default }
