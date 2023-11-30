<?php

// declare constants for input data
$searchedLogin = json_decode(file_get_contents("php://input"), true);

// get data from JSON file and decode it
$usersJsonData = file_get_contents("../data/users.json");
$usersList = json_decode($usersJsonData);

// define variable to store searching result
$result = false;
// check if fetched JSON data already contain the login
foreach ($usersList as $user) {
    // return TRUE if login already exists
    if ($user->login == $searchedLogin) {
        $result = true;
        break;
    }
}

// if login was not founded in the JSON data, return FALSE
header("Content-Type: application/json");
echo json_encode($result);
