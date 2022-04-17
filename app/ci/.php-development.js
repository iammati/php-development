export const config = {
    date: false,

    phpstan: {
        binary: '/var/www/html/app/bin/phpstan',
        configFilePath: '/var/www/html/app/ci/phpstan.neon',
    },

    phpCsFixer: {
        binary: '/var/www/html/app/bin/php-cs-fixer',
        configFilePath: '/var/www/html/app/ci/.php-cs-fixer.php',
    },
}
