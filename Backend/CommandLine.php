<?php

class CommandLine
{
    /**
     * Get file location from user
     *
     * @return string
     */
    public function getUserInputFileLocation() : string {
        return readline("Enter file location: (../epa-http.txt) ");
    }

}