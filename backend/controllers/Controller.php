<?php

namespace App\controllers;

use App\config\DotEnv;
use App\config\PDOConnection;
use Exception;


(new DotEnv(__DIR__ . '/../.env'))->load();

abstract class Controller
{
    protected $conn;
    public $body;
    public $query;
    public $file;
    public function __construct()
    {
        $this->body = $_POST;
        $this->query = $_GET;
        $this->file = $_FILES;
        $this->conn = (new PDOConnection())->__construct();
    }

    /**
     * DB error logger
     *
     * @param string $error
     * @return void
     */
    public function errorhandler($error = '')
    {
        $debug = debug_backtrace()[1];
        $line = $debug['line'];
        $file = $debug['file'];
        error_log("[" . date("D d-m-Y h:i:s A T") . "] Error: " . $error . " at $file on line $line \n", 3, "error.log");
    }

    /**
     * bind params
     * Return the correct PDO Binder depending value type
     *
     * @param mixed $value
     * @param string $var_type
     * @return string
     */
    public function bind($value, $var_type = null)
    {
        if (is_null($var_type)) {
            switch (true) {
                case is_bool($value):
                    $var_type = \PDO::PARAM_BOOL;
                    break;
                case is_int($value):
                    $var_type = \PDO::PARAM_INT;
                    break;
                case is_null($value):
                    $var_type = \PDO::PARAM_NULL;
                    break;
                default:
                    $var_type = \PDO::PARAM_STR;
            }
        }
        return $var_type;
    }

    /**
     * start transaction
     *
     * @return void
     */
    public function startTransaction()
    {
        $this->conn->beginTransaction();
    }

    /**
     * commit transaction
     *
     * @return void
     */
    public function commitTransaction()
    {
        $this->conn->commit();
    }

    /**
     * rollback transactions in case of a failure
     *
     * @return void
     */
    public function rollbackTransaction()
    {
        $this->conn->rollBack();
    }

    /**
     * inserts a record to database table
     *
     * @param array $argument -
     * 
     * [
     * 
     * tablename => test, 
     * 
     * fields => "name,age,..", 
     * 
     * values => ":name,:age,..", 
     * 
     * bindparams => [":name" => "john", ...]
     * 
     * ]
     * 
     * 
     * @return array
     */
    public function create(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        if (!isset($argument["fields"])) throw new Exception("key fields not found");
        if (!isset($argument["values"])) throw new Exception("key values not found");

        $table = $argument["tablename"];
        $fields = $argument["fields"];
        $values = $argument["values"];
        $bindparam = $argument["bindparam"] ?? null;

        $query = "INSERT INTO $table ($fields) VALUES ($values)";
        $result = $this->conn->prepare($query);

        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }
        return $result->execute();
    }

    /**
     * retrieves a single record from database table
     *
     * @param array $argument
     * 
     * [
     * 
     * tablename => test, 
     * 
     * fields => "name,age,..", 
     * 
     * condition => "name = :name", 
     * 
     * bindparams => [":name" => "john", ...]
     * 
     * ]
     * 
     * 
     * @return array
     */
    public function findOne(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        $tablename = $argument["tablename"];
        $condition = $argument["condition"] ?? 1;
        $fields = $argument["fields"] ?? "*";
        $bindparam = $argument["bindparam"] ?? null;
        $joins = $argument["joins"] ?? "";

        $query = "SELECT $fields FROM $tablename $joins WHERE $condition";
        $result = $this->conn->prepare($query);

        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }
        $result->execute();
        return $result->fetch();
    }


    /**
     * retrieves multiple records from database table
     *
     * @param array $argument
     * 
     * [
     * 
     * tablename => test, 
     * 
     * fields => "name,age,..", 
     * 
     * condition => "name = :name", 
     * 
     * bindparams => [":name" => "john", ...]
     * 
     * ]
     * 
     * @return array
     */
    public function findAll(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        $tablename = $argument["tablename"];
        $condition = $argument["condition"] ?? 1;
        $fields = $argument["fields"] ?? "*";
        $bindparam = $argument["bindparam"] ?? null;
        $joins = $argument["joins"] ?? "";

        $query = "SELECT $fields FROM $tablename $joins WHERE $condition";

        $result = $this->conn->prepare($query);

        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }
        $result->execute();
        return $result->fetchAll();
    }

    /**
     * updates database table records
     *
     * @param array $argument
     * 
     * [
     * 
     * tablename => test, 
     * 
     * fields => "name = :name,..", 
     * 
     * condition => "id = :id", 
     *  
     * bindparams => [":name" => "john", ":id" =>  1,...]
     * 
     * ]
     * 
     * 
     * @return array
     */
    public function update(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        $tablename = $argument["tablename"];
        $fields = $argument["fields"];
        $condition = $argument["condition"] ?? 1;
        $bindparam = $argument["bindparam"] ?? null;

        $query = "UPDATE $tablename SET $fields WHERE $condition";
        $result = $this->conn->prepare($query);

        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }
        return $result->execute();
    }


    /**
     * deletes database table records
     *
     * @param array $argument
     * 
     * 
     * [
     * 
     * tablename => test, 
     *  
     * condition => "id = :id", 
     *  
     * bindparams => [":name" => "john", ":id" =>  1,...]
     * 
     * ]
     * 
     * @return boolean
     */
    public function destroy(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        $tablename = $argument["tablename"];
        $condition = $argument["condition"] ?? 1;
        $bindparam = $argument["bindparam"] ?? null;

        $query = "DELETE FROM $tablename WHERE $condition";
        $result = $this->conn->prepare($query);
        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }

        return $result->execute();
    }

    /**
     * retrieves paginated records from database table
     *
     * @param array $argument
     * 
     * 
     * [
     * 
     * tablename => test, 
     * 
     * fields => "name,age,.." - optional defaults to *, 
     * 
     * condition => "name = :name", 
     * 
     * bindparams => [":name" => "john", ...]
     * 
     * pageno => 1
     * 
     * limit => 20 optional defaults to 20
     * 
     * ]
     * 
     * @return array
     */
    public function paginate(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        $tablename = $argument["tablename"];
        $condition = $argument["condition"] ?? 1;
        $fields = $argument["fields"] ?? "*";
        $joins = $argument["joins"] ?? "";
        $bindparam = $argument["bindparam"] ?? null;
        $pageno = $argument["pageno"] ?? 1;
        $pageno = floatval($pageno) < 1 ? 1 : floatval($pageno);
        $limit = $argument["limit"] ?? 20;

        $count = $this->getCount([
            "tablename" => $tablename,
            "condition" => $condition,
            "fields" => $fields,
            "bindparam" => $bindparam,
            "joins" => $joins
        ]);

        $total = $count;
        $totalpages = ceil($total / $limit);
        $offset = ($pageno - 1) * $limit;

        $query = "SELECT $fields FROM $tablename $joins WHERE $condition LIMIT $limit OFFSET $offset";
        $result = $this->conn->prepare($query);

        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }

        $result->execute();
        $data = $result->fetchAll();
        return [
            "totalrecords" => $total,
            "rows" => count($data),
            "offset" => $offset,
            "limit" => $limit,
            "totalpages" => $totalpages,
            "currentpage" => $pageno,
            "data" => $data
        ];
    }

    /**
     * retrieves number of records found in database table
     *
     * @param array $argument
     * 
     * [
     * 
     * tablename => test, 
     * 
     * fields => "name,age,..", 
     * 
     * condition => "name = :name", 
     * 
     * bindparams => [":name" => "john", ...]
     * 
     * ]
     * 
     * @return integer
     */
    public function getCount(array $argument)
    {
        if (!is_array($argument)) throw new Exception("argument must be an array");
        if (!isset($argument["tablename"])) throw new Exception("key tablename not found");
        $tablename = $argument["tablename"];
        $joins = $argument["joins"] ?? "";
        $condition = $argument["condition"] ?? 1;
        $fields = $argument["fields"] ?? "*";
        $bindparam = $argument["bindparam"] ?? null;

        $query = "SELECT $fields FROM $tablename $joins WHERE $condition";
        $result = $this->conn->prepare($query);
        if ($bindparam != null) {
            foreach ($bindparam as $key => $value) {
                $result->bindValue($key, $value, $this->bind($value));
            }
        }
        $result->execute();
        return $result->rowCount();
    }


    /**
     * returns the insert id of table primary key
     *
     * @return mixed
     */
    public function lastId()
    {
        return $this->conn->lastInsertId();
    }

    /**
     * Executes custom queries
     *
     * @param string $query
     * @return array
     */
    public function exec_query(string $query)
    {
        if (empty($query)) throw new Exception("invalid query");
        $result = $this->conn->prepare($query);
        $data = $result->execute();
        $queryarray =  explode(" ", $query);
        $type = $queryarray[0];

        if (preg_match('/select/i', $type)) {
            $data = $result->fetchAll();
        }

        return $data;
    }
}
