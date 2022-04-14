import chalk from 'chalk'

function getDate() {
    const date = new Date()

    return date.getUTCFullYear() + '/' +
        ('0' + (date.getUTCMonth() + 1)).slice(-2) + '/' +
        ('0' + date.getUTCDate()).slice(-2) + ' ' +
        ('0' + date.getUTCHours()).slice(-2) + ':' +
        ('0' + date.getUTCMinutes()).slice(-2) + ':' +
        ('0' + date.getUTCSeconds()).slice(-2) +
        chalk.grey('|') + ' '
}

export function log (msg, options = {}) {
    let dateString = ` ${getDate()}`

    if (options.date === false) {
        dateString = ''
    }

    return console.log(`${options.newlineAtBegin === true ? '\n' : ''}${dateString}${msg}`)
}

export function prefixLog (msg, options = {}) {
    let dateString = ''

    if (options.date === true) {
        dateString = getDate()
    }

    const prefix = `${chalk.yellowBright('php-development » ')}`;

    return console.log(`${options.newlineAtBegin === true ? '\n' : ''}${dateString}${prefix}${msg}`)
}
