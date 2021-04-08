<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    $database = new Database();
    $db = $database -> connect();

    $post = new Post($db);

    $post-> request_ID = isset($_GET['id']) ? $_GET['id'] : die();

    
    if( $post -> delete_Post()){
        echo json_encode(
            array('message' => 'Post Approved')
        );
    }
    else {
        echo json_encode(
            array('message' => 'Could not approve post')
        );
    }
