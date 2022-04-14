import fs from 'fs'
import chalk from 'chalk'
import command from '../utils/command.js'
import { log } from '../utils/log.js'

const prefix = '» phpstan »'

export default function phpstan (path, init = false, config, callback) {
    if (!fs.existsSync(config.phpstan.configFilePath)) {
        log(chalk.yellow(`${prefix} Skipping since configured config-file could not be found or is not readable:`), config)
        log(chalk.yellow(`${prefix} ${config.phpstan.configFilePath}`), config)

        return callback()
    }

    log(chalk.yellow(`${prefix} Executing on path ${path}`), config)

    const cmd = command(`${config.phpstan.binary}`, [
        `--configuration=${config.phpstan.configFilePath}`,
        '--no-progress',
        'analyse',
        `/var/www/html/${path}`
    ])

    cmd.stderr.on('data', error => log(chalk.redBright(`${prefix} Error: ${error}`), config))
    cmd.on('error', error => console.log(`error2: ${error}`))
    cmd.on('close', code => (code !== 0 && code !== 1) && console.log(`child process exited with code ${code}`))

    cmd.stdout.on('data', data => {
        data = Buffer.from(data).toString().trim()

        if (data.length <= 1) {
            return false
        }

        let state = false

        if (data.includes('[ERROR]') || data.includes('  Line') || data.includes('------')) {
            !init && log(chalk.redBright(`\nAn error occurred for ${path}`), config)
            log(chalk.redBright(`${data}`), config)
        } else {
            log(chalk.yellowBright(`${prefix} ${data.trim()}`), config)
            state = true
        }

        callback(state)
    })
}
