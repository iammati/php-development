import fs from 'fs'
import chalk from 'chalk'
import command from '../utils/command.js'
import { log } from '../utils/log.js'

const prefix = '» php-cs-fixer »'

export default function phpcsfixer (path, init = false, config, callback) {
    if (!fs.existsSync(config.phpCsFixer.configFilePath)) {
        log(chalk.yellow(`${prefix} Skipping since configured config-file could not be found or is not readable:`), config)
        log(chalk.yellow(`${prefix} ${config.phpCsFixer.configFilePath}`), config)

        return callback(true)
    }

    log(chalk.yellow(`${prefix} Executing on path ${path}`), config)

    const cmd = command(`${config.phpCsFixer.binary}`, [
        'fix',
        `--config=${config.phpCsFixer.configFilePath}`,
        '--using-cache=no',
        '--verbose',
        path,
    ])

    // cmd.stderr.on('data', error => log(chalk.redBright(`${prefix} Error: ${error}`), config))
    cmd.on('error', error => console.log(error))
    cmd.on('close', code => (code !== 0 && code !== 1) && console.log(`child process exited with code ${code}`))

    cmd.stdout.on('data', data => {
        data = Buffer.from(data).toString().trim()

        let state = false

        if (data.includes('Fixed all files in')) {
            data = data.split('\n')

            log(chalk.yellowBright(`» php-cs-fixer » ${data[data.length - 1]}`), config)
            state = true
        } else {
            log(chalk.redBright(data), config)
        }

        callback(state)
    })
}
