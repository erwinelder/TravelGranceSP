<?php

include_once "User.php";
include_once "login-search.php";

session_start();

define("currentLogin", $_SESSION["login"]);
define("passedPassword", $_POST["password"]);
define("passedLogin", strlen($_POST["login"]) != 0 ? $_POST["login"] : currentLogin);
define("passedNewPassword", $_POST["newPassword"]);

$avatarsDir = "../data/avatars/";
$avatarFilename = "";


// validate login
if (strlen(passedLogin) < 4 || strlen(passedLogin) > 20) {
    $_SESSION["errorMassage"] = "Login must contain in range 4-20 chars";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
if (preg_match("/[^a-zA-Z0-9]+$/", passedLogin)) {
    $_SESSION["errorMassage"] = "Login must have only letters or numbers";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
if (currentLogin !== passedLogin && loginExistsInJson(passedLogin)) {
    $_SESSION["errorMassage"] = "Login already exists";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

// validate password
if (strlen(passedPassword) < 8 || strlen(passedPassword) > 40) {
    $_SESSION["errorMassage"] = "Password must be in range 8-40 chars";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

// validate new password
if (strlen(passedNewPassword) != 0 && (strlen(passedNewPassword) < 8 || strlen(passedNewPassword) > 40)) {
    $_SESSION["errorMassage"] = "New password must be in range 8-40 chars";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}


if ($_FILES["avatar"]["error"] != UPLOAD_ERR_NO_FILE) {
    // remove the old avatar
    if (file_exists($avatarsDir . $_SESSION["avatarFilename"])) {
        unlink($avatarsDir . $_SESSION["avatarFilename"]);
    }
    // add the new avatar
    $avatarFileExtension = pathinfo(basename($_FILES["avatar"]["name"]), PATHINFO_EXTENSION);

    // validate avatar file extension
    if (!(in_array($avatarFileExtension, ["jpg", "jpeg", "png"]))) {
        $_SESSION["errorMassage"] = "Avatar must be only jpeg, jpg or png";
        header("Location: /~volodyeh/pages/error-page.php");
        exit;
    }

    $avatarFilename = $_SESSION["userId"] . "." . $avatarFileExtension;
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarsDir . $avatarFilename);
}

$usersList = json_decode(file_get_contents("../data/users.json"));

foreach ($usersList as $user) {
    if ($user->login === currentLogin) {

        $user->login = passedLogin;
        $_SESSION["login"] = passedLogin;

        if (strlen(passedNewPassword) != 0)
            $user->password = password_hash(passedNewPassword, PASSWORD_DEFAULT);

        if (strlen($avatarFilename) != 0) {
            $user->avatarFilename = $avatarFilename;
            $_SESSION["avatarFilename"] = $avatarFilename;
        }
    }
}

file_put_contents("../data/users.json", json_encode($usersList));

header("Location: /~volodyeh/pages/home.php");
