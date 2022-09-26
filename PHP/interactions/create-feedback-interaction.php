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
            $sql = "INSERT INTO " . $this->db_table . "(user_email, type, feedback_text) VALUES ('" . $this->userEmail . "','" . $this->type . "', '" . $this->feedbackText . "')";
            $query = $this->conn->prepare($sql);
            $query->execute();
            return $query;
        } catch (PDOException $exception) {
            echo $exception;
        }
    }
}
