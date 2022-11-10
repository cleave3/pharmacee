<?php

namespace App\utils;

class Session
{

    public static function start()
    {
        session_start();
    }

    public static function set(array $var)
    {
        session_start();
        foreach ($var as $key => $value) {
            $_SESSION[$key] = $value;
        }
    }

    public static function get($key)
    {
        session_start();
        if (!isset($_SESSION[$key])) return false;
        return $_SESSION[$key];
    }

    public static function destroy()
    {
        session_start();
        session_destroy();
    }
}
