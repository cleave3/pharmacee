<?php

namespace App\utils;

class Sanitize
{

    /**
     * removes , from currency
     *
     * @param string $currency
     * @return float
     */
    public static function integer($currency)
    {
        return floatval(preg_replace('/(,)/', "", $currency));
    }

    /**
     * filters dirty string characters
     *
     * @param string $str
     * @return string
     */
    public static function string($str)
    {
        $string = filter_var($str, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $string = stripslashes($string);
        $string = strip_tags($string);
        return trim(preg_replace('/(\'|")/', "", $string));
    }

    /**
     * Remove all illegal characters from a url
     *
     * @param string $url
     * @return string
     */
    public static function url($url)
    {
        return filter_var($url, FILTER_SANITIZE_STRING);
    }

    /**
     * Returns encoded html string
     *
     * @param string $html
     * @return string
     */
    public static function html($html)
    {
        return stripslashes(htmlentities($html, ENT_QUOTES));
    }
}
