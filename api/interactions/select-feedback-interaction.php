<?php

class selectFeedback
{

    private $conn;
    public $userEmail;
    public $discName;
    public $price;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function select_feedback()
    {
        try {
            $sql = "SELECT disc_name, price, artist from user_wishes where user_email = ?";
            $query = $this->conn->prepare($sql);
            $query->execute([$this -> userEmail]);
            $results = $query->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
