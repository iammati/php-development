import chalk from 'chalk'
import chokidar from 'chokidar'
import phpcsfixer from './components/php-cs-fixer.js'
import phpstan from './components/phpstan.js'
import { log } from './utils/log.js'

export default class PHPDevelopment {
    prefix = 'php-development »'
    config = {}
    counter = {}
    __TEMP_PATHS = []

    start (path) {
        log(chalk.cyanBright(`${this.prefix} Performing an initialization while watching`), this.config)
        log(chalk.cyanBright(`${this.prefix} ${path} directory for changes...`), this.config)

        this.execWorkflow(path)

        if (this.config.flags.dryRun) {
            return false
        }

        const watcher = chokidar.watch(path, {
            ignoreInitial: true,
        })

        watcher
            .on('add', path => {
                console.clear()
                log(chalk.cyanBright(`${this.prefix} New file located at ${path} detected...`), this.config)

                this.execWorkflow(path)
            })

            .on('change', path => {
                if (this.__TEMP_PATHS[path] === true) {
                    return null
                }

                let counter = this.counter[path] === undefined ? 1 : this.counter[path] + 1
                this.counter[path] = counter

                console.clear()
                log(chalk.cyanBright(`${this.prefix} Detected change in ${path} (${chalk.whiteBright(`${counter}x`)})...`), this.config)

                this.execWorkflow(path)
            })

            .on('addDir', path => {
                console.clear()
                log(chalk.cyanBright(`${this.prefix} New directory located at ${path} detected...`), this.config)

                this.execWorkflow(path)
            })

            .on('unlink', path => log(`${this.prefix} File deleted ${path}`), this.config)
            .on('unlinkDir', path => log(`${this.prefix} Directory deleted ${path}`), this.config)
    }

    execWorkflow (path, init = false) {
        this.__TEMP_PATHS[path] = true

        const startTime = new Date().getTime()
        console.log('')

        phpstan(path, init, this.config, state => {
            if (!state) {
                return null
            }

            console.log('')
            phpcsfixer(path, init, this.config, () => {
                console.log('')

                let time = new Date().getTime() - startTime

                if (time >= 1000) {
                    time = ((time % (1000 * 60)) / 1000);
                } else {
                    time += 'm'
                }

                log(chalk.cyanBright(`php-development » Done after ${time}s`), this.config)
                this.__TEMP_PATHS[path] = false
            })
        })
    }

    defaultConfig (flags) {
        return {
            flags: flags,
            date: false,

            phpstan: {
                binary: '/var/www/html/vendor/bin/phpstan',
                configFilePath: '/var/www/html/phpstan.neon',
            },

            phpCsFixer: {
                binary: '/var/www/html/vendor/bin/php-cs-fixer',
                configFilePath: '/var/www/html/.php-cs-fixer.php',
            },
        }
    }
}
