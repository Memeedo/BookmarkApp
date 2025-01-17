<?php

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(array  ('message'=> 'Error: The Method is not allowed '));
    return;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once '../db/DataBase.php';
include_once '../models/bookmark.php';

$database = new DataBase();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

if(!isset($_GET['id'])){
    http_response_code(422);
    echo json_encode(array('message'=> 'Error: the required id paramter is missing '));
    return;
}

$bookmark->setID($_GET['id']);
if($bookmark->readOne()){
    $result = array('id' => $bookmark->getId(), 'title' => $bookmark->getTitle(), 'link'=> $bookmark->getLink() ,'dateAdded' => $bookmark->getDateAdded());
    echo json_encode($result);
}else{
    http_response_code(404);
    echo json_encode(array('message'=> 'Error: the required bookmark does not exsist'));
}