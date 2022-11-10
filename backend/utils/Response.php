<?php

namespace App\utils;

class Response
{

    public static $res = [];

    /**
     * send returns the response array
     *
     * @param array $data
     * @return Array
     */
    public static function send($data = [])
    {
        foreach ($data as $resp => $key) {
            self::$res[$resp] = $key;
        }
        return self::$res;
    }

    /**
     * json returns response array as json
     *
     * @param array $data
     * @return JSON object
     */
    public static function json($data = [])
    {
        foreach ($data as $resp => $key) {
            self::$res[$resp] = $key;
        }
        return json_encode(self::$res);
    }
}
