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
            $sql = "DELETE FROM" . $this->db_table . 'WHERE user_email = '. $this -> userEmail .' AND disc_name = '. $this -> discName .'';
            $query = $this->conn->prepare($sql);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
