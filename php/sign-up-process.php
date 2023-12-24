<?php

session_start();

include_once "User.php";
include_once "login-search.php";

define("passedLogin", $_POST["login"]);
define("passedPassword", $_POST["password"]);

$avatarsDir = "/~volodyeh/data/avatars/";
$avatarFileExtension = "";
$avatarFilename = "";
$avatarIsUploaded = true;

if ($_FILES["avatar"]["error"] == UPLOAD_ERR_NO_FILE) {
    $avatarIsUploaded = false;
} else {
    $avatarOriginalFilename = basename($_FILES["avatar"]["name"]);
    $avatarFileExtension = pathinfo($avatarOriginalFilename, PATHINFO_EXTENSION);
}


// validate login
if (strlen(passedLogin) < 4 || strlen(passedLogin) > 20) {
    $_SESSION["errorMassage"] = "Login must be in range 4-20 chars";
    header("Location: /~volodyeh/pages/error-page.php");
}
if (loginExistsInJson(passedLogin)) {
    $_SESSION["errorMassage"] = "Login already exists";
    header("Location: /~volodyeh/pages/error-page.php");
}

// validate password
if (strlen(passedPassword) < 8 || strlen(passedPassword) > 40) {
    $_SESSION["errorMassage"] = "Password must be at least 8 characters long";
    header("Location: /~volodyeh/pages/error-page.php");
}


$hashedPassword = password_hash(passedPassword, PASSWORD_DEFAULT);

if ($avatarIsUploaded) {
    $avatarFilename = passedLogin . "." . $avatarFileExtension;
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $avatarFilename);
}


$usersList = json_decode(file_get_contents("../data/users.json"));
$newUserId = 1;
if (count($usersList) != 0) {
    $newUserId = $usersList[count($usersList) - 1]->id + 1;
}
$usersList[] = new User($newUserId, passedLogin, $hashedPassword, $avatarFilename);
file_put_contents("../data/users.json", json_encode($usersList));

$_SESSION["userId"] = $newUserId;
$_SESSION["isLoggedIn"] = "true";
$_SESSION["login"] = passedLogin;
$_SESSION["avatarFilename"] = $avatarFilename;

header("Location: /~volodyeh/index.php");
