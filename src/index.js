import fs from 'fs'
import chalk from 'chalk'
import PHPDevelopment from './php-development.js'
import { prefixLog } from './utils/log.js'
import { resolve } from 'path'

const argv = process.argv
const flags = {
    config: `${process.cwd()}/.php-development.js`,
    watch: false,
    path: '',
}

argv.reduce(
    (acc, currentArg) => {
        if (currentArg.startsWith('--')) {
            currentArg = currentArg.replace('--', '')
            const [param, value] = currentArg.split('=')

            if (flags[param] === undefined) {
                prefixLog(chalk.redBright(`The provided parameter: "--${param}" does not exist`))
                process.exit(1)
            }

            if (value === undefined && typeof flags[param] === 'boolean') {
                flags[param] = !flags[param]
            } else {
                flags[param] = value
            }
        }
    },
)

flags.config = resolve(flags.config)

if (flags.path.length === 0) {
    prefixLog(chalk.redBright('Usage: ' + ((`php-development --path=./src`))))
    process.exit(1)
}

try {
    if (!fs.existsSync(flags.path)) {
        prefixLog(chalk.redBright(`The provided path (${flags.path}) does not exist!`))
        process.exit(1)
    }
} catch (ENOENT) {
    throw ENOENT
}

console.clear()

const development = new PHPDevelopment()
development.config.flags = flags

try {
    if (fs.existsSync(`${flags.config}`)) {
        import(`${flags.config}`).then(mod => {
            development.config = mod.config
            development.config.flags = flags
            development.start(flags.path)
        })
    } else {
        development.config = development.defaultConfig(flags)
        development.start(flags.path)
    }
} catch (ENOENT) {
    throw ENOENT
    development.config = development.defaultConfig(flags)
    development.start(flags.path)
}
