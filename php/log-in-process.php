<?php

session_start();

include_once "UserDataCheck.php";

// declare constants for input data
$inputData = json_decode(file_get_contents("php://input"), true);
define("passedLogin", $inputData["login"]);
define("passedPassword", $inputData["password"]);


// validate input data

// validate input login
if (strlen(passedLogin) < 4) {
    die("Login must be at least 4 characters long");
} else if (strlen(passedLogin) > 20) {
    die("Login can be max 20 characters long");
}
// validate input password
if (strlen(passedPassword) < 8) {
    die("Password must be at least 8 characters long");
} else if (strlen(passedPassword) > 40) {
    die("Password can be max 40 characters long");
}


// save new user's data to the JSON file

// get data from the JSON file and decode it
$usersJsonData = file_get_contents("../data/users.json");
$usersList = json_decode($usersJsonData);

// define variable to store the result
$result = new UserDataCheck(false, false);
// define variable to store an avatar filename got from the JSON file
$avatarFilename = "";
$userId = 0;
// check if fetched JSON data already contain the login
foreach ($usersList as $user) {
    // return TRUE if login already exists
    // if login exists in the JSON file, then check if the passwords match
    if ($user->login == passedLogin) {
        $result->loginExists = true;
        // if the passwords match, save TRUE to the $result variable and break the cycle
        if (password_verify(passedPassword, $user->password)) {
            $result->passwordMatches = true;
            $avatarFilename = $user->avatarFilename;
            $userId = $user->id;
        }
        break;
    }
}

// after successful log in save "true" to the "isLoggedIn" value in the php session storage
if ($result->loginExists && $result->passwordMatches) {
    $_SESSION["userId"] = $userId;
    $_SESSION["isLoggedIn"] = "true";
    $_SESSION["login"] = passedLogin;
    $_SESSION["avatarFilename"] = $avatarFilename;
}

// return results of checking data in the JSON file as object (for login and password)
echo json_encode($result);
