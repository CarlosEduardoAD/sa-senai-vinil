<?php

class deleteFeedback
{

    private $conn;
    public $userEmail;
    public $discName;
    public $price;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function delete_feedback()
    {
        try {
            $sql = 'DELETE FROM user_wishes WHERE user_email = :email ORDER BY id DESC LIMIT 1';
            $query = $this->conn->prepare($sql);
            $query->bindValue(':email', $this -> userEmail, PDO::PARAM_STR);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
