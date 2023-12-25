<?php

session_start();

include_once "User.php";
include_once "login-search.php";

define("passedLogin", $_POST["login"]);
define("passedPassword", $_POST["password"]);

$avatarsDir = "../data/avatars/";
$avatarFilename = "";


// validate login
if (strlen(passedLogin) < 4 || strlen(passedLogin) > 20) {
    $_SESSION["errorMassage"] = "Login must be in range 4-20 chars";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
if (preg_match("/[^a-zA-Z0-9]+$/", passedLogin)) {
    $_SESSION["errorMassage"] = "Login must contain only letters or numbers";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
if (loginExistsInJson(passedLogin)) {
    $_SESSION["errorMassage"] = "Login already exists";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

// validate password
if (strlen(passedPassword) < 8 || strlen(passedPassword) > 40) {
    $_SESSION["errorMassage"] = "Password must be at least 8 characters long";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}


$usersList = json_decode(file_get_contents("../data/users.json"));

$newUserId = 1;
if (count($usersList) != 0) {
    $newUserId = $usersList[count($usersList) - 1]->id + 1;
}

if ($_FILES["avatar"]["error"] != UPLOAD_ERR_NO_FILE) {
    $avatarFileExtension = pathinfo(basename($_FILES["avatar"]["name"]), PATHINFO_EXTENSION);

    // validate avatar file extension
    if (!(in_array($avatarFileExtension, ["jpg", "jpeg", "png"]))) {
        $_SESSION["errorMassage"] = "Avatar must be only jpeg, jpg or png";
        header("Location: /~volodyeh/pages/error-page.php");
        exit;
    }

    $avatarFilename = $newUserId . "." . $avatarFileExtension;
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $avatarFilename);
}

$hashedPassword = password_hash(passedPassword, PASSWORD_DEFAULT);

$usersList[] = new User($newUserId, passedLogin, $hashedPassword, $avatarFilename);
file_put_contents("../data/users.json", json_encode($usersList));

$_SESSION["isLoggedIn"] = "true";
$_SESSION["userId"] = $newUserId;
$_SESSION["login"] = passedLogin;
$_SESSION["avatarFilename"] = $avatarFilename;

header("Location: /~volodyeh/index.php");
