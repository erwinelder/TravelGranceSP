<?php

include_once "User.php";
include_once "login-search.php";

session_start();

// declare constants for input data
define("currentLogin", $_SESSION["login"]);
define("passedPassword", $_POST["password"]);
define("passedLogin", $_POST["login"]);
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
if (strlen(passedLogin) < 4) {
    http_response_code(400);
    echo "Login must be at least 4 characters long";
//    die("Login must be at least 4 characters long");
} else if (strlen(passedLogin) > 20) {
    die("Login can be max 20 characters long");
}
if (currentLogin !== passedLogin && loginExistsInJson(passedLogin)) {
    die("Login already exists");
}
// validate password
if (strlen(passedPassword) < 8) {
    die("Password must be at least 8 characters long");
} else if (strlen(passedPassword) > 40) {
    die("Password can be max 40 characters long");
}
// validate new password
if (strlen(passedNewPassword) != 0 && strlen(passedNewPassword) < 8) {
    die("New password must be at least 8 characters long");
} else if (strlen(passedNewPassword) > 40) {
    die("New password can be max 40 characters long");
}


// hash the password
$hashedPassword = password_hash(passedNewPassword, PASSWORD_DEFAULT);

// if an avatar was uploaded, remove old avatar and move the new one to the avatars directory
if ($newAvatarIsUploaded) {
    // remove old avatar
    unlink($avatarsDir . $currentAvatarFullFilename);
    // move the new avatar to the avatars directory
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $newAvatarFullFilename);
// if no new avatar was uploaded, change current avatar filename, so it matches user new login
} else if (file_exists($avatarsDir . $currentAvatarFullFilename))
    rename($avatarsDir . $currentAvatarFullFilename, $avatarsDir . $newAvatarFullFilename);


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

        $user->avatarName = $newAvatarFullFilename;
        $_SESSION["avatarFilename"] = $newAvatarFullFilename;
    }
}

// write data with a new user data to the JSON file
file_put_contents("../data/users.json", json_encode($usersList));

// redirect back to the main page (public records page)
header("Location: ../pages/home.php");
