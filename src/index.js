import fs from 'fs'
import chalk from 'chalk'
import PHPDevelopment from './php-development.js'
import { prefixLog } from './utils/log.js'

let cwd = process.cwd()

const argv = process.argv
const flags = {
    dryRun: false,
    path: '',
}

argv.forEach(key => {
    if (!key.startsWith('--')) {
        return false
    }

    key = key.replace('--', '')

    if (key === 'dry-run') {
        flags.dryRun = true
    }

    if (key.includes('=')) {
        for (const flag of ['path', 'cwd']) {
            flags[flag] = key.split('=')[1]
        }
    }
})

if (flags.path.length === 0) {
    prefixLog(chalk.redBright('Please provide a path'))
    prefixLog(chalk.redBright('E.g. ' + chalk.bgRedBright(' ' + chalk.whiteBright(`php-development ./src`) + ' ')))
    process.exit(1)
}

try {
    if (!fs.lstatSync(flags.path).isDirectory()) {
        prefixLog(chalk.redBright('The provided path is not a directory!'))
        process.exit(1)
    }
} catch (ENOENT) {
    prefixLog(chalk.redBright('The provided path does not exist!'))
    throw ENOENT
}

console.clear()

const development = new PHPDevelopment()
development.config.flags = flags

try {
    if (fs.existsSync('.php-development.js')) {
        import(`${cwd}/.php-development.js`).then(mod => {
            development.config = mod.config
            development.config.flags = flags
            development.start(flags.path)
        })
    } else {
        development.config = development.defaultConfig(flags)
        development.start(flags.path)
    }
} catch (ENOENT) {
    development.config = development.defaultConfig(flags)
    development.start(flags.path)
}
