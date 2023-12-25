<?php

session_start();

include_once "UserDataCheck.php";

$inputData = json_decode(file_get_contents("php://input"), true);
$passedLogin = $inputData["login"];
define("passedPassword", $inputData["password"]);


// validate login
if (strlen($passedLogin) < 4 || strlen($passedLogin) > 20) {
    $_SESSION["errorMassage"] = "Login must be in range 4-20 chars";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
if (preg_match("/[^a-zA-Z0-9]+$/", $passedLogin)) {
    $_SESSION["errorMassage"] = "Login must contain only letters or numbers";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

// validate password
if (strlen(passedPassword) < 8 || strlen(passedPassword) > 40) {
    $_SESSION["errorMassage"] = "Password must be at least 8 characters long";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}


$usersJsonData = file_get_contents("../data/users.json");
$usersList = json_decode($usersJsonData);

$result = new UserDataCheck(false, false);
$avatarFilename = "";
$userId = 0;
foreach ($usersList as $user) {
    if (mb_strtolower($user->login) === mb_strtolower($passedLogin)) {
        $passedLogin = $user->login;
        $result->loginExists = true;

        if (password_verify(passedPassword, $user->password)) {
            $result->passwordMatches = true;
            $avatarFilename = $user->avatarFilename;
            $userId = $user->id;
        }

        break;
    }
}

if ($result->loginExists && $result->passwordMatches) {
    $_SESSION["userId"] = $userId;
    $_SESSION["isLoggedIn"] = "true";
    $_SESSION["login"] = $passedLogin;
    $_SESSION["avatarFilename"] = $avatarFilename;
}

echo json_encode($result);
