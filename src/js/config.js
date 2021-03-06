export default [
  {
    app: 'coreybutler_nvm_windows',
    name: 'NVM for Windows',
    description: 'Easily install/use multiple versions of Node.js',
    url: 'https://github.com/coreybutler/nvm-windows'
  },

  {
    name: 'Node Daemons',
    description: 'One API to run JS natively on any OS',
    url: 'https://github.com/coreybutler/node-windows',

    products: [
      {
        app: 'coreybutler_node_mac',
        library: 'node-mac',
        name: 'node-mac',
        url: 'https://github.com/coreybutler/node-mac'
      },

      {
        app: 'coreybutler_node_linux',
        library: 'node-linux',
        name: 'node-linux',
        url: 'https://github.com/coreybutler/node-linux'
      },

      {
        app: 'coreybutler_node_windows',
        library: 'node-windows',
        name: 'node-windows',
        url: 'https://github.com/coreybutler/node-windows'
      }
    ]
  },

  {
    app: 'coreybutler_fenix',
    name: 'Fenix Web Server',
    description: `The developer's web server for desktops`,
    url: 'https://fenixwebserver.com'
  },

  {
    library: 'ngn',
    name: 'NGN JS Library',
    description: 'A cross-runtime JS library for building anything',
    url: 'https://github.com/ngnjs'
  },

  {
    library: '@chassis/core',
    name: 'Chassis CSS Framework',
    description: 'A CSS pre-processor and framework for modern UI',
    url: 'https://github.com/ngn-chassis'
  },

  {
    name: 'Jet UI Framework',
    description: 'A UI framework for NGN',
    url: 'https://github.com/jet-ngn'
  },

  {
    name: 'Web Components',
    description: 'Custom HTML Tags for rapid UI',
    url: 'https://github.com/author-elements',

    products: [
      {
        library: '@author.io/element-select',
        name: 'author-select'
      },

      {
        library: '@author.io/element-drop-target',
        name: 'author-drop-target'
      },

      {
        library: '@author.io/element-menu',
        name: 'author-menu'
      },

      {
        library: '@author.io/element-pane',
        name: 'author-pane'
      },

      {
        library: '@author.io/element-selected-options',
        name: 'author-selected-options'
      },

      {
        library: '@author.io/element-control',
        name: 'author-control'
      },

      {
        library: '@author.io/element-icon',
        name: 'author-icon'
      },

      {
        library: '@author.io/element-color-picker',
        name: 'author-color-picker'
      },

      {
        library: '@author.io/element-drawer',
        name: 'author-drawer'
      },

      {
        library: '@author.io/element-optgroup',
        name: 'author-optgroup'
      },

      {
        library: '@author.io/element-optgroup-label',
        name: 'author-optgroup-label'
      },

      {
        library: '@author.io/element-cell',
        name: 'author-cell'
      },

      {
        library: '@author.io/element-slider-handle',
        name: 'author-slider-handle'
      },

      {
        library: '@author.io/element-draggable',
        name: 'author-draggable'
      },

      {
        library: '@author.io/element-cell-group',
        name: 'author-cell-group'
      },

      {
        library: '@author.io/element-options',
        name: 'author-options'
      },

      {
        library: '@author.io/element-option',
        name: 'author-option'
      },

      {
        library: '@author.io/element-datalist',
        name: 'author-datalist'
      },

      {
        library: '@author.io/element-tooltip',
        name: 'author-tooltip'
      },

      {
        library: '@author.io/element-base',
        name: 'author-base'
      },

      {
        library: '@author.io/element-popup',
        name: 'author-popup'
      },

      {
        library: '@author.io/element-slider',
        name: 'author-slider'
      },

      {
        library: '@author.io/element-cycle',
        name: 'author-cycle'
      },

      {
        library: '@author.io/element-pane-handle',
        name: 'author-cycle'
      }
    ]
  },

  {
    library: '@butlerlogic/common-api',
    name: 'Common API',
    description: 'Rapid API prototyping framework',
    url: 'https://github.com/butlerlogic/common-api'
  },

  {
    library: '@butlerlogic/iam',
    app: 'coreybutler_iam',
    name: 'IAM Security',
    description: 'Cross-runtime Permissions Management SDK',
    url: 'https://github.com/coreybutler/iam'
  },

  {
    name: 'Github Actions',
    description: 'Software Automation (AutoTagger, Multipublish, Rollback)',
    url: 'https://github.com/marketplace/actions/autotagger',

    products: [
      {
        name: 'AutoTagger'
      },

      {
        name: 'Multipublish'
      },

      {
        name: 'Rollback'
      }
    ]
  },

  {
    name: 'Metadoc',
    description: 'Personalized Tech Documentation',
    url: 'https://metadoc.io'
  },

  {
    library: 'productionline',
    name: 'ProductionLine',
    description: 'A customizable JS build tool',
    url: 'https://github.com/coreybutler/productionline'
  },

  {
    name: 'Shell',
    description: 'A lightweight CLI framework',
    url: 'https://github.com/author/shell'
  },

  {
    name: 'Porthog',
    description: 'Identify unavailable ports',
    url: 'https://github.com/coreybutler/porthog'
  },

  {
    library: 'localenvironment',
    app: 'coreybutler_go_localenvironment',
    name: 'Localenvironment',
    description: 'Environment variable management for Node.js and Go',
    url: 'https://github.com/coreybutler/localenvironment'
  },

  {
    library: 'shortbus',
    app: 'coreybutler_shortbus',
    name: 'Shortbus',
    description: 'Mini Event Bus',
    url: 'https://github.com/coreybutler/shortbus'
  }//,

  // {
  //   library: 'musthave',
  //   app: 'coreybutler_musthave',
  //   name: 'Musthave',
  //   description: 'Object/Data Validation',
  //   url: 'https://github.com/coreybutler/shortbus'
  // },
]
