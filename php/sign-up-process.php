<?php

include_once "User.php";

// declare constants for input data
define("passedLogin", $_POST["login"]);
define("passedPassword", $_POST["password"]);


// validate input data

// validate input login
if (strlen(passedLogin) < 4) {
    http_response_code(400);
    echo "Login must be at least 4 characters long";
//    die("Login must be at least 4 characters long");
}
if (strlen(passedLogin) > 20) {
    die("Login can be max 20 characters long");
}
// validate input password
if (strlen(passedPassword) < 8) {
    die("Password must be at least 8 characters long");
}
if (strlen(passedPassword) > 20) {
    die("Password can be max 40 characters long");
}

// hash the password
$hashedPassword = password_hash(passedPassword, PASSWORD_DEFAULT);

// save new user's data to the JSON file

// get data from the JSON file and decode it
$usersJsonData = file_get_contents("../data/users.json");
$usersJsonDecodedData = json_decode($usersJsonData);
// append new user's data to the already existing ones
$usersJsonDecodedData[] = new User(passedLogin, $hashedPassword);
// write data with a new user to the JSON file
file_put_contents("../data/users.json", json_encode($usersJsonDecodedData));

// redirect back to the main page
header("Location: ../index.php");
