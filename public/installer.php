<?php

process($argv);

function process($argv)
{
    $installPath = getInstallDirectory($argv);
    install($installPath);
}

function getInstallDirectory($argv)
{
    if (!array_key_exists(1, $argv) || strpos($argv[1], '--install-dir') === false) {
        return getDefaultInstallationDirectory();
    }

    $installPath = explode('=', $argv[1]);
    if (count($installPath) !== 2) {
        directoryError('Invalid --include-dir format.');
    }

    if (!is_dir($installPath[1])) {
        directoryError('Supplied path is not a directory, ' . $installPath[1]);
    }

    return $installPath[1];
}

function getDefaultInstallationDirectory()
{
    if (!function_exists('posix_geteuid') || !function_exists('posix_getpwuid')) {
        directoryError('Cannot determine default install path.');
    }

    $userdata = posix_getpwuid(posix_geteuid());

    if (!array_key_exists('dir', $userdata)) {
        directoryError('Cannot determine default install path.');
    }

    $directory = $userdata['dir'] . $propaneLocation;

    if (!is_dir($directory)) {
        directoryError('Cannot determine default install path.');
    }

    return $directory;
}

function directoryError($message)
{
    echo $message . PHP_EOL;
    echo 'Please use --include-dir=<dir> to specify the installation path.' . PHP_EOL;
    echo 'Default installation location is ~/Library/Application Support/Propane/unsupported' . PHP_EOL;
    exit;
}

function install($installDirectory)
{
    $fileName = 'caveatPatchor.js.tmp';
    $writePath = $installDirectory . $fileName;

    $url = 'https://raw.github.com/aarondraczynski/revolver/master/caveatPatchor.js';

    $ch = curl_init($url);
    $fp = fopen($writePath, "w");

    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    curl_exec($ch);
    curl_close($ch);
    fclose($fp);

    echo 'Installation Completed. ' . PHP_EOL;
    echo 'Restart Propane and checkout http://papermodelplane.net' . PHP_EOL;
}