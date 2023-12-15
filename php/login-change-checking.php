<?php

session_start();

// declare constants for input data
$passedLogin = json_decode(file_get_contents("php://input"), true);
$loginCanBeChanged = true;

if ($_SESSION["login"] !== $passedLogin) {
    // find out if the passed login is already exists in the JSON file and save the return result

    // get data from JSON file and decode it
    $usersJsonData = file_get_contents("../data/users.json");
    $usersList = json_decode($usersJsonData);

    // check if fetched JSON data already contain the login
    foreach ($usersList as $user) {
        // return TRUE if login already exists
        if ($user->login == $passedLogin) {
            $loginCanBeChanged = false;
            break;
        }
    }
}

// return FALSE back to the caller if the passed login is the same as that one which is in the PHP session
header("Content-Type: application/json");
echo json_encode($loginCanBeChanged);
