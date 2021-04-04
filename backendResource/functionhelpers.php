
<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
include "globals.php"; 

/*
    // when a student makes a new request for funding. 
    // DOTO: unique varchar IDs
    function new_request(admin_ID, $funding_Goal)
    {
        global $servername, $username, $password, $dbname;
       $conn = new mysqli($servername, $username, $password, $dbname);
       if (!$conn)
        {
           die('Could not connect: ' . mysqli_error($conn));
        }

        $datetime = date("Y-m-d H:i:s");
        echo "beep";

        // test ID
        $newID = admin_ID;

        $sql = $conn->prepare("INSERT INTO `request` (`request_ID`, `date_Start`, `date_End`, 
        admin_ID`, `approval_bool`, `approval_AdminID`, `funding_Goal`, `funding_Raised`, `inprogress_bool`, `Donorlist`)
        VALUES (?, ?, ?, ?, '0', NULL, ?, '0', '0', NULL)");
        $sql->bind_param("ssssi", $newID, $datetime, $datetime, admin_ID, $funding_Goal);
        
        // TODO: generate unique varchar IDs, 8 characters long 

        if (!$sql->execute()) 
        {
           trigger_error('Invalid query: ' . $conn->error);
        }
        $conn->close();
    }*/
    
/*
    // check if the ID in request is unique
    function ID_uniqueCheck_request($checkID)
    {
        global $servername, $username, $password, $dbname;
       $conn = new mysqli($servername, $username, $password, $dbname);
       if (!$conn)
        {
           die('Could not connect: ' . mysqli_error($conn));
        }
        
        $sql = $conn->prepare("SELECT `request_ID` from `request` WHERE `request_ID` = ?");
        $sql->bind_param("s", $user);
        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }
        $retval = $sql->get_result();
        echo $retval;
        $conn->close();
        
        if ($retval == false)
        {
            return false; 
        }
        if ($retval == true)
        {
            return true ; 
        }
    }*/
/*
    // Call to tally the amount of donations for a request and update the request accordingly
    // Might be turned into a db trigger instead. I'll have to see. 
    function donation_total_update($request)
    {
        global $servername, $username, $password, $dbname;
       $conn = new mysqli($servername, $username, $password, $dbname);
       if (!$conn)
        {
           die('Could not connect: ' . mysqli_error($conn));
        }
/*
        $sql = $conn->prepare("UPDATE requests SET funding_Raised = 
        (SUM(Donation) FROM donorlist WHERE request_ID = ?)  WHERE request_ID = ? ");
        $sql->bind_param("ss", $request, $request);*/
/*
        $sql = $conn->prepare("select DonationTotal(?)");
        $sql->bind_param("s", $request);
        
        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }
        $retval = $sql->get_result(); 
        //$myresult = $retval -> fetch_array[0] ?? '';
        //echo $myresult; 
        $sql = $conn->prepare("UPDATE requests SET funding_Raised = ? WHERE request_ID = ? ");
        $sql->bind_param("ds", $retval, $request);

        $conn->close();

    }*/
/*
    // Checks if the new account email is already taken. If not, makes a new account. 
    // TODO: checks for student/donor accounts. Currenly hard set to accountype 2: student. 
    function login_newAccount_verify($email, $userpass)
    {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
        if (!$conn)
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
            echo "email already taken";
        }
        else
        {
            $type = "2";
            $ID = "00000005";

            $sql = $conn->prepare("INSERT INTO user ".
            "(ID, AccountType, Username, Password) "."VALUES ".
            "(?, ?, ? ,? )");
            $sql->bind_param("ssss", $ID, $type, $email, $userpass);

            if (!$sql->execute()) 
            {
                die('Could not create user: ' . mysqli_error($conn));
            }
        }
    }*/
/*
    // Once a donation is made, call this function to update the db accordingly. 
    function donation_made($donationAmount, $donor, $request_ID)
    {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
        if (!$conn)
         {
            die('Could not connect: ' . mysqli_error($conn));
         }

        $datetime = date("Y-m-d H:i:s");
        
        $sql = $conn->prepare("INSERT INTO donorlist ".
            "(Donorlist_ID, Request_ID, Donor_ID, Donation, Donation_Date) "."VALUES ".
            "(?, ?, ? ,?, ?)");
            $sql->bind_param("sssds", $donor, $request_ID, $donor, $donationAmount, $datetime);

        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $conn->close();
    }*/

  // For an admin to approve a request
    function adminFunc_approve($request_ID, $admin_ID)
    {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
        if (!$conn)
        {
            die('Could not connect: ' . mysqli_error($conn));
        }

        $sql = $conn->prepare("UPDATE request SET approval_bool = 1 WHERE request_ID = ?");
        $sql->bind_param("s", $request_ID);

        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $sql = $conn->prepare("UPDATE request SET approval_AdminID = ? WHERE request_ID = ?;");
        $sql->bind_param("ss", $request_ID, $request_ID);
        if (!$sql->execute()) 
        {
            trigger_error('Invalid query: ' . $conn->error);
        }

        $conn->close();
    }
?>