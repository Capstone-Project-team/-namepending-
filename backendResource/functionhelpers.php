//functions

<?php
    // when a student makes a new request for funding. 
    // DOTO: unique varchar IDs
    function new_request($author_ID, $funding_Goal)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }

        $datetime = date("Y-m-d H:i:s");
        $sql = $conn->prepare("INSERT INTO `request` (`request_ID`, `date_Start`, `date_End`, 
        `Author_ID`, `approval_bool`, `approval_AdminID`, `funding_Goal`, `funding_Raised`, `inprogress_bool`, `Donorlist`)
        VALUES (NULL, ?, NULL, ?, '0', NULL, ?, '0', '0', NULL)");
        $sql->bind_param("si", $datetime, $author_ID, $funding_Goal);
        
        // TODO: generate unique varchar IDs, 8 characters long 

        if (!$sql->execute()) 
        {
           trigger_error('Invalid query: ' . $conn->error);
        }
        $conn->close();
    }

    // Catch-all function for checking if the ID is unique to that table. 
    function ID_uniqueCheck($checkID,$checktable)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }
        
        $sql = $conn->prepare("select $checkID from $checktable)");
        $sql->bind_param("s", $user);
        if (!$sql->execute()) {
            trigger_error('Invalid query: ' . $conn->error);
        }
        $retval = $sql->get_result();
        $conn->close();
        
        if ($retval == false)
        {
            return false; 
        }
        if ($retval == true)
        {
            return true ; 
        }
    }

    // Call to tally the amount of donations for a request and update the request accordingly
    // Might be turned into a db trigger instead. I'll have to see. 
    function donation_total_update($request)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }

        $sql = $conn->prepare("UPDATE requests SET funding_Raised = 
        (SELECT SUM(*) FROM donorlist WHERE request_ID = $request) WHERE request_ID = $request" );

        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $conn->close();

    }

    // Checks if the new account email is already taken. If not, makes a new account. 
    // TODO: checks for student/donor accounts
    function login_newAccount_verify($email, $password)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }

        $sql = $conn->prepare("SELECT COUNT(*) FROM user WHERE Username = ?");
        $sql->bind_param("s", $email);
    
        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $retval = $sql->get_result();
        $duplicateUser = mysqli_fetch_assoc($retval);

        if($duplicateUser['COUNT(*)'] > 0)
        {
            // error message
        }
        else
        {
            $sql = $conn->prepare("INSERT INTO `users` (`ID`, `AccountType`, `Username`, 
            `Password`)
            VALUES (NULL, ?, NULL, ?)");
            $sql->bind_param("si", $email, $password);

            if (!$sql->execute()) 
            {
                die('Could not create user: ' . mysqli_error($conn));
            }
    }

    // Once a donation is made, call this function to update the db accordingly. 
    function donation_made($donationAmount, $donor, $request_ID)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }
        $datetime = date("Y-m-d H:i:s");
        $sql = $conn->prepare("INSERT INTO donorlist (`Donorlist_ID`, `Request_ID`, `Donor_ID`, `Donation`, `Donation_Date`)
        VALUES (NULL, ?, ?, ?")
        $sql->bind_param($request_ID, $donor, $donationAmount, $datetime);
        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $conn->close();
    }

    // For an admin to approve a request
    function adminFunc_approve($request_ID, $Author_ID)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }

        $sql = $conn->prepare("UPDATE requests SET approval_bool = 1 WHERE request_ID = $request;
        UPDATE requests SET approval_AdminID = $Author_ID WHERE request_ID = $request;");

        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $conn->close();
    }

    function adminFunc_approve($request_ID, $Author_ID)
    {
        global $servername, $dbname;
        $conn = new mysqli($servername, $dbname);
        {
            die('Could not connect: ' . mysqli_error($conn));
        }

        $sql = $conn->prepare("UPDATE requests SET approval_bool = 1 WHERE request_ID = $request;
        UPDATE requests SET approval_AdminID = $Author_ID WHERE request_ID = $request;");
        
        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $conn->close();
    }
?>