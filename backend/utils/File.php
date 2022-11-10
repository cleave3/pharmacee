<?php

namespace App\utils;

class File
{

    /**
     * Read from file
     *
     * @param string $file - file to be read from
     * @return string
     */
    public static function read($file)
    {
        try {
            if (empty($file)) throw new \Exception("File is required");
            if (!file_exists($file)) throw new \Exception("File does not exist");
            return readfile($file);
        } catch (\Exception $error) {
            return $error->getMessage();
        }
    }

    /**
     * Write to file
     *
     * @param string $filename - path to file e.g ./src/doc/file.txt
     * @param string $content - content to insert to file
     * @param string $flag - operation mode (wipe | preserve)
     * 
     * wipe - Erases the contents of the file or creates a new file if it doesn't exist. File pointer starts at the beginning of the file
     * 
     * preserve - The existing data in file is preserved. File pointer starts at the end of the file. Creates a new file if the file doesn't exist
     * @return void
     */
    public static function write($filename, $content, $flag = "wipe")
    {
        switch ($flag) {
            case 'preserve':
                $mode = "a+";
                break;
            case 'wipe':
                $mode = "w+";
                break;
            default:
                $mode = "w";
                break;
        }
        $file = fopen($filename, $mode);
        fwrite($file, $content);
        fclose($file);
    }

    /**
     * Upload file
     *
     * @param array $arguments - 
     * 
     * [
     * 
     * file => $_FILES['test'], 
     * 
     * path => "upload/", 
     * 
     * allowedformats => [pdf,jpg...], 
     * 
     * maxsize => 20000
     * 
     * ]
     * 
     * 
     * @return boolean
     */
    public static function upload(array $arguments)
    {

        if (!is_array($arguments)) throw new \Exception("argument must be an array");
        if (!isset($arguments["file"])) throw new \Exception("file to upload is required");
        if (!isset($arguments["path"])) throw new \Exception("upload destination is required");
        $file = $arguments["file"];
        $target_dir = $arguments["path"];
        $allowedformats = $arguments["allowedformats"] ?? "*";
        $maxsize = $arguments["maxsize"] ?? 2;

        $target_file = $target_dir . basename($file["name"]);
        $filetype = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $newfilename = "file" . date("Ymdhis") . '.' . $filetype;
        $filesize = floatval($file["size"]) / pow(1024, 2);
        $file_to_upload = $target_dir . $newfilename;

        if ($allowedformats != "*") {
            $filestype = implode(",", $allowedformats);
            if (!in_array($filetype, $allowedformats)) throw new \Exception("File type not supported only $filestype are allowed");
        }

        if ($filesize > $maxsize) throw new \Exception("File size exceeds maximum allowed file size of $maxsize MB");

        if (!is_dir($target_dir)) throw new \Exception("Specified storage location does not exist");

        $upload = move_uploaded_file($file["tmp_name"], $file_to_upload);

        if (!$upload) throw new \Exception("File upload failed");

        return $newfilename;
    }

    /**
     * Deletes a file
     *
     * @param string $file - path to file
     * @return boolean
     */
    public static function delete($file)
    {
        try {
            if (!file_exists($file)) throw new \Exception("File not found");
            $del = unlink($file);
            return $del ? true : false;
        } catch (\Exception $error) {
            return $error->getMessage();
        }
    }
}
