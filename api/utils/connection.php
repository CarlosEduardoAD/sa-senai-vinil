<?php
class connection
{
    private $host = 'localhost';
    private $databaseName = 'feedbacks';
    private $username = 'root';
    private $password = 'carloseduardo08';
    public $conn;

    public function __construct()
    {
        $this->conn = null;
    }

    public function get_connection()
    {
        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ";dbname=" . $this->databaseName, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            return $this -> conn;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
