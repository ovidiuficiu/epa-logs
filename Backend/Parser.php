<?php

class Parser
{
    const REQUEST_METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];

    /**
     * Parse data to required format
     *
     * @param array $file
     *
     * @return array
     */
    public function parseData(array $file) : array {
        $data = [];
        printf('Number of entries found: %s.' . PHP_EOL, count($file));

        foreach ($file as $line) {
            $host = $this->extractHost($line);
            $dateTime = $this->extractTime($line);
            $request = $this->extractRequest($line);
            list($responseCode, $documentSize) =  $this->extractResponse($line);

            $data[] = [
                'host' => $host,
                'datetime' => $dateTime,
                'request' => $request,
                'response_code' => $responseCode,
                'document_size' => $documentSize
            ];
        }

        return $data;
    }

    /**
     * Extract time from log entry
     *
     * @param string $line
     *
     * @return array
     */
    private function extractTime(string $line) : array {
        $dateTimeRegex = '/.*?\[(\d+):(\d+):(\d+):(\d+)\].*$/';
        preg_match($dateTimeRegex, $line, $matches);
        return [
            'day' => $matches[1],
            'hour' => $matches[2],
            'minute' => $matches[3],
            'second' => $matches[4]
        ];
    }

    /**
     * Exrtract request info from log entry
     *
     * @param string $line
     *
     * @return array
     */
    private function extractRequest(string $line) : array {
        $startRequestPosition = strpos($line, '"');
        $endRequestPosition = strrpos($line, '"') ;
        $requestData = substr($line, $startRequestPosition + 1 , $endRequestPosition - $startRequestPosition - 1);
        $request['method'] = trim(strtok($requestData, " "));
        if (!in_array($request['method'], self::REQUEST_METHODS)) {
            $request['method'] = 'INVALID';
            $request['url'] = $requestData;
        } else {
            $request['url'] = str_replace($request['method'], '', $requestData);
        }

        $request['protocol'] = 'MISSING';
        $request['protocol_version'] = 'MISSING';

        //Check if protocol information is present
        if ($startPosition = strpos($requestData, 'HTTP')) {
            $protocolInformation = substr($requestData, $startPosition);
            list($request['protocol'], $request['protocol_version']) =  explode('/', $protocolInformation);
            $request['url'] = str_replace($request['protocol'] . '/' . $request['protocol_version'], '', $request['url']);
        }

        return $request;
    }

    /**
     * Extrat host form log entry
     *
     * @param string $line
     *
     * @return string
     */
    private function extractHost(string $line) : string {
        return trim(strtok($line, " "));
    }


    /**
     * Extrac response data from log entry
     *
     * @param string $line
     *
     * @return array
     */
    private function extractResponse(string $line) : array {
        return array_slice(explode(' ', $line), -2, 2);
    }

}