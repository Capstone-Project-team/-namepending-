<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    $database = new Database();
    $db = $database -> connect();

    $post = new Post($db);

    $result = $post -> read_Pending();

    $num = $result -> rowCount();

    if ($num > 0){
        $posts_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $post_item = array(
                'request_Id' => $request_ID,
                'date_Start' => $date_Start,
                'date_End' => $date_End,
                'author_Id' => $author_Id,
                'funding_Goal' => $funding_Goal,
            );

            array_push($posts_arr, $post_item);
        }
        echo json_encode($posts_arr);
    }
        else 
            echo json_encode(
                array('message' => 'No posts found')
            );
