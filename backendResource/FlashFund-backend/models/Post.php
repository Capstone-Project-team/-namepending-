<?php
    class Post{
        private $conn;
        private $table = 'request';

        public $request_ID;
        public $date_Start;
        public $date_End;
        public $author_Id;
        public $approval_bool = 0;
        public $approval_AdminId;
        public $funding_Goal;
        public $funding_Raised;
        public $inprogress_bool;
        public $Donorlist;

        public function __construct($db){
            $this->conn = $db;
            
        }

        public function read(){
            $query = 'SELECT 
                    request_ID,
                    date_Start,
                    date_End,
                    author_Id,
                    approval_AdminId,
                    funding_Goal,
                    funding_Raised,
                    approval_bool,
                    inprogress_bool,
                    Donorlist
                FROM 
                '. $this-> table;


            $stmt = $this -> conn -> prepare($query);
            $stmt -> execute();
            return $stmt;
        }

        public function readApproved(){
            $query = 'SELECT 
                    request_ID,
                    date_Start,
                    date_End,
                    author_Id,
                    approval_AdminId,
                    funding_Goal,
                    funding_Raised,
                    inprogress_bool,
                    Donorlist
                FROM 
                '. $this-> table.
                ' WHERE approval_bool > 0';

            $stmt = $this -> conn -> prepare($query);
            $stmt -> execute();
            return $stmt;
        }

        public function read_userPost(){
            $query = 'SELECT 
                    request_ID,
                    author_Id,
                    date_Start,
                    date_End,
                    approval_AdminId,
                    funding_Goal,
                    funding_Raised,
                    approval_bool,
                    inprogress_bool,
                    Donorlist
                FROM 
                '. $this-> table.
                ' WHERE author_Id = ?';
                
            $stmt = $this -> conn -> prepare($query);
            $stmt -> bindParam(1, $this-> author_Id);
            $stmt -> execute();
            return $stmt;
        }

        public function read_Pending(){
            $query = 'SELECT 
                request_ID,
                date_Start,
                date_End,
                author_Id,
                funding_Goal
            FROM 
            '. $this-> table.
            ' WHERE approval_bool = 0';


            $stmt = $this -> conn -> prepare($query);
            $stmt -> execute();
            return $stmt;
        }

        public function createPost(){
            $query = 'INSERT INTO ' 
                . $this -> table .
            ' (date_start, author_id, funding_Goal)
            VALUES (:date_Start,:author_Id,:funding_Goal)
            ';
            
            $stmt = $this -> conn -> prepare($query);

            $this-> date_Start = htmlspecialchars(strip_tags($this -> date_Start));
            $this-> author_Id = htmlspecialchars(strip_tags($this -> author_Id));
            $this-> funding_Goal = htmlspecialchars(strip_tags($this -> funding_Goal));

            $stmt -> bindParam(':date_Start', $this -> date_Start);
            $stmt -> bindParam(':author_Id', $this -> author_Id);
            $stmt -> bindParam(':funding_Goal', $this -> funding_Goal);

            if($stmt -> execute()){
                return true;
            }
            
            else {
                printf ("Error: %s.\n", $stmt -> error);
                return false;
            }
        }

        public function approve_Post(){
            $query = 'Update ' . $this -> table.
            ' SET approval_bool = 1
            WHERE request_ID = ?
            ';
            $stmt = $this -> conn -> prepare($query);
            $stmt -> bindParam(1, $this-> request_ID);
            $stmt -> execute();
            return $stmt;
        }

        public function delete_Post(){
            $query = 'DELETE FROM ' . $this ->table.
            ' WHERE request_ID = ? ';
            $stmt = $this -> conn -> prepare($query);
            $stmt -> bindParam(1, $this-> request_ID);
            $stmt -> execute();
            return $stmt;

        }
    }