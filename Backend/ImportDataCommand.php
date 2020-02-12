<?php

require('Parser.php');
require('FileHandler.php');
require('CommandLine.php');

const PARSED_FILE_LOCATION = 'result.json';

$commandLineHelper = new CommandLine();
$userInput = $commandLineHelper->getUserInputFileLocation();

$fileLocation = $userInput ? $userInput : '../epa-http.txt';
$fileHandler = new FileHandler();
$file = $fileHandler->readFile($fileLocation);
if ($file) {
    echo "File found starting parsing the data..." . PHP_EOL;
} else {
    echo 'File could not be found.';
    return;
}

$parser = new Parser();
$data = $parser->parseData($file);
$fileHandler->writeJsonFile($data, PARSED_FILE_LOCATION);

echo 'File succesfully created.';