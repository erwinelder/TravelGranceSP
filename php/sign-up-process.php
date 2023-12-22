<?php

session_start();

include_once "User.php";
include_once "login-search.php";

define("passedLogin", $_POST["login"]);
define("passedPassword", $_POST["password"]);

$avatarsDir = "../data/avatars/";
$avatarFileExtension = "";
$avatarFilename = "";
$avatarIsUploaded = true;

if ($_FILES["avatar"]["error"] == UPLOAD_ERR_NO_FILE) {
    $avatarIsUploaded = false;
} else {
    $avatarOriginalFilename =  basename($_FILES["avatar"]["name"]);
    $avatarFileExtension = pathinfo($avatarOriginalFilename, PATHINFO_EXTENSION);
}


if (strlen(passedLogin) < 4) {
    http_response_code(400);
    echo "Login must be at least 4 characters long";
}
if (strlen(passedLogin) > 20) {
    die("Login can be max 20 characters long");
}
if (loginExistsInJson(passedLogin)) {
    die("Login already exists");
}
if (strlen(passedPassword) < 8) {
    die("Password must be at least 8 characters long");
}
if (strlen(passedPassword) > 40) {
    die("Password can be max 40 characters long");
}


$hashedPassword = password_hash(passedPassword, PASSWORD_DEFAULT);

if ($avatarIsUploaded) {
    $avatarFilename = passedLogin . "." . $avatarFileExtension;
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $avatarFilename);
}


$usersList = json_decode(file_get_contents("../data/users.json"));
$newUserId = $usersList[count($usersList) - 1]->id + 1;
$usersList[] = new User($newUserId, passedLogin, $hashedPassword, $avatarFilename);
file_put_contents("../data/users.json", json_encode($usersList));

$_SESSION["userId"] = $newUserId;
$_SESSION["isLoggedIn"] = "true";
$_SESSION["login"] = passedLogin;
$_SESSION["avatarFilename"] = $avatarFilename;

header("Location: ../index.php");
