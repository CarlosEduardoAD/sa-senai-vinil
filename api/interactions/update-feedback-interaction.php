<?php

class createFeedback
{

    private $conn;
    private $db_table = 'user_feedbacks';
    public $userEmail;
    public $type;
    public $feedbackText;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_feedback()
    {
        try {
            $sql = "UPDATE" . $this->db_table . 'SET feedback_text = '. $this -> feedbackText .'WHERE user_email = '. $this -> userEmail .'';
            $query = $this->conn->prepare($sql);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
