import chalk from 'chalk'
import { spawn } from 'child_process'
import { log } from './log.js'

const DEBUG = 0

export default function command (cmd, params = []) {
    if (DEBUG) {
        log(chalk.cyanBright(`| ${cmd} ${params.join(' ')}`), {
            date: false
        })
    }

    return spawn(cmd, params)
}
