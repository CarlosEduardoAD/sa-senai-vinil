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
            $sql = 'SELECT disc_name, price from user_wishes where user_email = :email';
            $query = $this->conn->prepare($sql);
            $query->bindValue(':email', $this -> userEmail, PDO::PARAM_STR);
            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($results);
            print($json);
            return $json;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
