<?php

session_start();

include_once "User.php";
include_once "login-search.php";

// declare constants for input data
define("passedLogin", $_POST["login"]);
define("passedPassword", $_POST["password"]);

// predefine variables to proceed saving avatar image
$avatarsDir = "../data/avatars/";
$avatarFileExtension = "";
$avatarFilename = "";
$avatarIsUploaded = true;

// check if an avatar image was uploaded
if ($_FILES["avatar"]["error"] == UPLOAD_ERR_NO_FILE) {
    $avatarIsUploaded = false;
} else {
    $avatarOriginalFilename =  basename($_FILES["avatar"]["name"]);
    $avatarFileExtension = pathinfo($avatarOriginalFilename, PATHINFO_EXTENSION);
}

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
if (loginExistsInJson(passedLogin)) {
    die("Login already exists");
}
// validate input password
if (strlen(passedPassword) < 8) {
    die("Password must be at least 8 characters long");
}
if (strlen(passedPassword) > 40) {
    die("Password can be max 40 characters long");
}

// hash the password
$hashedPassword = password_hash(passedPassword, PASSWORD_DEFAULT);

// if an avatar was uploaded, move it to the avatars directory
if ($avatarIsUploaded) {
    $avatarFilename = passedLogin . "." . $avatarFileExtension;
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $avatarFilename);
}

// save new user's data to the JSON file

// get data from the JSON file and decode it
$usersJsonData = file_get_contents("../data/users.json");
$usersList = json_decode($usersJsonData);
// define id for the new user
$newUserId = count($usersList) + 1;
// append new user's data to the already existing ones
$usersList[] = new User($newUserId, passedLogin, $hashedPassword, $avatarFilename);
// write data with a new user to the JSON file
file_put_contents("../data/users.json", json_encode($usersList));

// after successful sing up, mark down in the PHP session that this user is logged in
$_SESSION["userId"] = $newUserId;
$_SESSION["isLoggedIn"] = "true";
$_SESSION["login"] = passedLogin;
$_SESSION["avatarFilename"] = $avatarFilename;

// redirect back to the main page (public records page)
header("Location: ../index.php");
