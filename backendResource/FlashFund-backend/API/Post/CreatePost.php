<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    header('Access-Control-Allow-Methods: POST');
    //header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,
    //Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    $database = new Database();
    $db = $database -> connect();

    $post = new Post($db);

    $data = json_decode(file_get_contents("php://input"));

    $post -> date_Start = date("Y-m-d" ,$data -> date_Start);
    $post -> author_Id = $data -> author_Id;
    $post -> funding_Goal = $data -> funding_Goal;

    if($post -> CreatePost()){
        echo json_encode(
            array('message' => 'Post Created')
        );
    }
    else {
        echo json_encode(
            array('message' => 'Post Not Created')
        );
    }