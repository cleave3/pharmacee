<?php
error_reporting(1);

use App\router\Router;

require __DIR__ . '/vendor/autoload.php';

$router = new Router();
$router->run();
