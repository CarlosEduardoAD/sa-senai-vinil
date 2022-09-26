<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once('./utils/connection.php');
include_once ('./interactions/create-feedback-interaction.php');

$database = new connection();
$db = $database -> get_connection();
$feedback = new createFeedback($db);
$data = json_decode(file_get_contents("php://input"));
$feedback -> userEmail = $data -> email;
$feedback -> type = $data -> type;
$feedback -> feedbackText = $data -> feedback;
if ($feedback->create_feedback()){
    echo "pc gamer";
}else{
    echo "no more pc gamer";
};
?>
