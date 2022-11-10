<?php

namespace App\utils;

class Helpers
{

    /**
     * unsets a property from an array
     *
     * @param array $array
     * @param array $keys
     * @return void
     */
    public static function removefield($array, $keys)
    {
        if (!is_array($keys)) throw new \Exception("keys must be an array");
        foreach ($keys as $key) {
            unset($array[$key]);
        }
        return $array;
    }
}
