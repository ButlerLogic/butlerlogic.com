import all from '../lib/global.js'
import Statistics from '../lib/Statistics.js'
import path from 'path'
import fs from 'fs'

let output = path.join(__dirname, '../dist/assets/data')
if (!fs.existsSync(output)) {
  throw new Error(`"${output}" does not exist. Did the build process run successfully?`)
}

output = path.join(output, 'product_statistics.json')

const stats = new Statistics()

stats.on('error', e => {
  console.log(e.message)
  process.exit(1)
})

stats.apps = [
  'coreybutler/nvm-windows',
  'coreybutler/fenix',
  'coreybutler/go-localenvironment',
  'coreybutler/go-fsutil',
  'coreybutler/node-windows',
  'coreybutler/node-mac',
  'coreybutler/node-linux',
  'coreybutler/shortbus',
  'coreybutler/porthog',
  'coreybutler/musthave',
  'coreybutler/iam'
]

stats.libraries = [
  'node-windows',
  'node-mac',
  'node-linux',
  'ngn',
  // 'jet-ngn',
  '@chassis/core',
  '@author.io/element-slider',
  '@author.io/element-popup',
  '@author.io/element-drop-target',
  '@author.io/element-control',
  '@author.io/element-select',
  '@author.io/element-cycle',
  '@author.io/element-base',
  '@author.io/element-draggable',
  '@author.io/element-slider-handle',
  '@author.io/element-icon',
  '@author.io/element-color-picker',
  '@author.io/element-drawer',
  '@author.io/element-options',
  '@author.io/element-selected-options',
  '@author.io/element-datalist',
  '@author.io/element-cell-group',
  '@author.io/element-cell',
  // '@author.io/element-caption',
  '@author.io/element-menu',
  // '@author.io/element-boilerplate',
  '@author.io/element-pane-handle',
  '@author.io/element-pane',
  '@author.io/element-option',
  '@author.io/element-tooltip',
  '@author.io/element-optgroup',
  '@author.io/element-optgroup-label',
  // '@author.io/element-table',
  // '@author.io/element-list',
  // '@author.io/element-window',
  // '@author.io/element-modal',
  // '@author.io/element-video-player',
  // '@author.io/element-grid',
  // '@author.io/element-layout',
  'musthave',
  'porthog',
  'localenvironment',
  'shortbus',
  'metadoc',
  'productionline',

  '@butlerlogic/common-api',
  '@butlerlogic/iam'
]

stats.data(json => fs.writeFileSync(output, JSON.stringify(json, null, 2)))
