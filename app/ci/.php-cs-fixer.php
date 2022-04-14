<?php

$config = new PhpCsFixer\Config();

$header = <<<EOF
This file is part of the package @iammati/php-development.
For the full copyright and license information, please read the
LICENSE file that was distributed with this source code.
EOF;

return $config->setRules([
    '@PSR1' => true,
    '@PSR2' => true,
    '@PSR12' => true,
    '@PhpCsFixer' => true,
    '@Symfony' => true,
    '@DoctrineAnnotation' => true,
    'array_syntax' => ['syntax' => 'short'],
    'header_comment' => [
        'header' => $header,
    ],
]);
