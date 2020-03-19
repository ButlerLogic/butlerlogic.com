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
      // window.scrollY returns 0 in some cases without the setTimeout
      setTimeout(() => {
        if (window.scrollY > 0) {
          this.transition('DOCK')
        }
      }, 500)
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
