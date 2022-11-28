<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once('./utils/connection.php');
include_once('./interactions/create-feedback-interaction.php');
include_once('./interactions/select-feedback-interaction.php');
include_once('./interactions/delete-feedback-interaction.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new connection();
    $db = $database->get_connection();
    $feedback = new createFeedback($db);
    $data = json_decode(file_get_contents("php://input"));
    $feedback->userEmail = $data->email;
    $feedback->discName = $data->discName;
    $feedback->price = $data->price;
    $feedback->artist = $data->artist;
    if ($feedback->create_feedback()) {
        echo "Seu feedback foi enviado com sucesso !";
    } else {
        echo "Erro ao enviar feedback";
    };
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new connection();
    $db = $database->get_connection();
    $feedback = new selectFeedback($db);
    $data = json_decode(file_get_contents("php://input"));
    $feedback->userEmail = $_GET['email'];
    $feedback->discName = $data->discName;
    $feedback->price = $data->price;
    $feedback->artist = $data->artist;
    $result = $feedback->select_feedback();
    echo json_encode($result);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $database = new connection();
    $db = $database->get_connection();
    $feedback = new deleteFeedback($db);
    $data = json_decode(file_get_contents("php://input"));
    echo $_GET['id'];
    $feedback->id = $_GET['id'];
    $feedback->email = $_GET['email'];
    $feedback->delete_feedback();
    echo 'Ganhamo família';
}

