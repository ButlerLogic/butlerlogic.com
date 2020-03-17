import path from 'path'
import { fileURLToPath } from 'url'
global.__dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const nothing = ''
export { nothing as default }