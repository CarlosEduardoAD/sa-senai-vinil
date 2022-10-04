<?php

class createFeedback
{

    private $conn;
    private $db_table = 'user_wishes';
    public $userEmail;
    public $discName;
    public $price;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_feedback()
    {
        try {
            $sql = "UPDATE" . $this->db_table . 'SET discName = '. $this -> discName . 'SET price ='. $this -> price .'WHERE user_email = '. $this -> userEmail .'';
            $query = $this->conn->prepare($sql);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
