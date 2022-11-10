<?php

namespace App\router;

class Router
{
    public function resolve_route()
    {
        $request = $_SERVER["REQUEST_URI"];
        $route_parameters = preg_split('/(\?|\/)/', $request);

        if (in_array("api", $route_parameters)) {

            $classprefix = $route_parameters[2];
            $class_method = count($route_parameters) > 3 ?
                (empty($route_parameters[3]) ? "index"
                    : $route_parameters[3]) : "index";
            $param = count($route_parameters) == 5 ? $route_parameters[4] : null;

            $this->runapi(
                $request,
                "App\controllers\\" . ucwords($classprefix) . "Controller",
                $class_method,
                $param
            );
        } else {
            $this->runweb($request);
        }
    }

    public function runapi($request, $class, $method, $param)
    {
        if ($request == "/") {
            echo json_encode(["status" => true, "code" => 200, "message" => "App is live"]);
        } else {
            if (method_exists($class, $method)) {
                $instance = new $class();
                echo $instance->$method($param);
            } else {
                echo json_encode(["status" => false, "code" =>  404, "message" => "Route not found"]);
            }
        }
    }

    public function runweb($path)
    {
        $file_to_load = $path;

        if (preg_match_all('/(?)/',  $path)) $file_to_load = explode("?", $path)[0];

        if ($file_to_load == "/") $file_to_load = "index";

        $file = __DIR__ . "/../views/" . $file_to_load . ".php";

        if (!file_exists($file)) {
            $file = __DIR__ . "/../views/" . $file_to_load . "index.php";
        }

        if (!file_exists($file)) {
            $file = __DIR__ . "/../views/" . $file_to_load . "/index.php";
        }

        if (!file_exists($file)) $file = __DIR__ . "/../views/404.php";

        require $file;
    }

    public function run()
    {
        $this->resolve_route();
    }
}
