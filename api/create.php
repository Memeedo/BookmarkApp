<?php

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(array  ('message'=> 'Error: The method is not allowed '));
    return;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once '../db/DataBase.php';
include_once '../models/bookmark.php';

$database = new DataBase();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents('php://input'),true);

if(!$data || !isset($data['title']) || !isset($data['link'])){
    http_response_code(422);
    echo json_encode(array('message'=> 'Error: the required paramter in the JSON body is missing '));
    return;
}

$bookmark->setTitle($data['title']);
$bookmark->setLink($data['link']);
if($bookmark -> create()){
    echo json_encode(array('message'=> ' The creation of the bookmark item is successfully done'));
}else{
    echo json_encode(array('message'=> 'The bookmark item was not successfully  created '));
}