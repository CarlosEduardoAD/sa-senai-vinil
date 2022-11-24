<?php

class createFeedback
{

    private $conn;
    private $db_table = 'user_wishes';
    public $userEmail;
    public $discName;
    public $price;
    public $artist;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_feedback()
    {
        try {
            $sql = "INSERT IGNORE " . $this->db_table . "(user_email, disc_name, price, artist) VALUES ('" . $this->userEmail . "','" . $this->discName . "', '" . $this->price . "', '" . $this->artist . "')";
            $query = $this->conn->prepare($sql);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
