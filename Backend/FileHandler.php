<?php

class FileHandler
{
    /**
     * Read file from given location
     *
     * @param string $location
     *
     * @return array
     */
    public function readFile(string $location) : array {
        return file($location);
    }

    /**
     * Write array to json file
     *
     * @param array $array
     * @param string $fileLocation
     *
     * @return void
     */
    public function writeJsonFile($data, $fileLocation) {
        $fp = fopen($fileLocation, 'w');
        fwrite($fp, json_encode($data));
        print("Creating json file: {$fileLocation}." . PHP_EOL);
        fclose($fp);
    }

}