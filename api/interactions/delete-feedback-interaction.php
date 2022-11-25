<?php

class deleteFeedback
{

    private $conn;
    public $id;
    public $email;
    public $price;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function delete_feedback()
    {
        try {
            $sql = 'DELETE FROM user_wishes WHERE disc_name = :id AND user_email = :email';
            $query = $this->conn->prepare($sql);
            $query->bindValue(':id', $this -> id, PDO::PARAM_STR);
            $query->bindValue(':email', $this -> email, PDO::PARAM_STR);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
