<?php

include_once "User.php";
include_once "login-search.php";

session_start();

// declare constants for input data
define("currentLogin", $_SESSION["login"]);
define("passedPassword", $_POST["password"]);
define("passedLogin", strlen($_POST["login"]) != 0 ? $_POST["login"] : currentLogin);
define("passedNewPassword", $_POST["newPassword"]);

// predefine variables to proceed saving avatar image
$avatarsDir = "../data/avatars/";
$currentAvatarFullFilename = $_SESSION["avatarFilename"];
$currentAvatarFileExtension = pathinfo($avatarsDir . $currentAvatarFullFilename, PATHINFO_EXTENSION);
$newAvatarFileExtension = "";
$newAvatarFullFilename = "";
$newAvatarIsUploaded = true;

// check if an avatar image was uploaded
if ($_FILES["avatar"]["error"] == UPLOAD_ERR_NO_FILE) {
    $newAvatarIsUploaded = false;
    if (strlen($currentAvatarFullFilename) != 0)
        $newAvatarFullFilename = passedLogin . "." . $currentAvatarFileExtension;
} else {
    $avatarOriginalFilename =  basename($_FILES["avatar"]["name"]);
    $newAvatarFileExtension = pathinfo($avatarOriginalFilename, PATHINFO_EXTENSION);
    $newAvatarFullFilename = passedLogin . "." . $newAvatarFileExtension;
}

// validate input data

// validate input login
if (strlen(passedLogin) < 4 || strlen(passedLogin) > 20) {
    $_SESSION["errorMassage"] = "Login must be in range 4-20 chars";
    header("Location: /~volodyeh/pages/error-page.php");
}
if (currentLogin !== passedLogin && loginExistsInJson(passedLogin)) {
    $_SESSION["errorMassage"] = "Login already exists";
    header("Location: /~volodyeh/pages/error-page.php");
}

// validate password
if (strlen(passedPassword) < 8 || strlen(passedPassword) > 40) {
    $_SESSION["errorMassage"] = "Password must be in range 8-40 chars";
    header("Location: /~volodyeh/pages/error-page.php");
}

// validate new password
if (strlen(passedNewPassword) != 0 && (strlen(passedNewPassword) < 8 || strlen(passedNewPassword) > 40)) {
    $_SESSION["errorMassage"] = "New password must be in range 8-40 chars";
    header("Location: /~volodyeh/pages/error-page.php");
}


// hash the password
$hashedPassword = password_hash(passedNewPassword, PASSWORD_DEFAULT);

// if an avatar was uploaded, remove old avatar and move the new one to the avatars directory
if ($newAvatarIsUploaded) {
    // remove old avatar
    if (file_exists($avatarsDir . $currentAvatarFullFilename) && $currentAvatarFullFilename != "") {
        unlink($avatarsDir . $currentAvatarFullFilename);
    }
    // move the new avatar to the avatars directory
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $newAvatarFullFilename);
// if no new avatar was uploaded, change current avatar filename, so it matches user new login
} else if (file_exists($avatarsDir . $currentAvatarFullFilename)) {
    rename($avatarsDir . $currentAvatarFullFilename, $avatarsDir . $newAvatarFullFilename);
}


// get data from the JSON file and decode it
$usersJsonData = file_get_contents("../data/users.json");
$usersList = json_decode($usersJsonData);

// save new user's data to the JSON file

// change user data in the list from the JSON file
foreach ($usersList as $user) {
    if ($user->login === currentLogin) {

        $user->login = passedLogin;
        $_SESSION["login"] = passedLogin;

        if (strlen(passedNewPassword) != 0)
            $user->password = $hashedPassword;

        $user->avatarFilename = $newAvatarFullFilename;
        $_SESSION["avatarFilename"] = $newAvatarFullFilename;
    }
}

// write data with a new user data to the JSON file
file_put_contents("../data/users.json", json_encode($usersList));

// redirect back to the main page (public records page)
header("Location: /~volodyeh/pages/home.php");
