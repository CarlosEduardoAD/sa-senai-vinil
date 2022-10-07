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
            $sql = "INSERT INTO " . $this->db_table . "(user_email, disc_name, price) VALUES ('" . $this->userEmail . "','" . $this->discName . "', '" . $this->price . "')";
            $query = $this->conn->prepare($sql);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
