<?php

session_start();

include_once "UserDataCheck.php";

$inputData = json_decode(file_get_contents("php://input"), true);
define("passedLogin", $inputData["login"]);
define("passedPassword", $inputData["password"]);


// validate input login
if (strlen(passedLogin) < 4 || strlen(passedLogin) > 20) {
    $_SESSION["errorMassage"] = "Login must be in range 4-20 chars";
    header("Location: ../pages/error-page.php");
}

// validate input password
if (strlen(passedPassword) < 8 || strlen(passedPassword) > 40) {
    $_SESSION["errorMassage"] = "Password must be at least 8 characters long";
    header("Location: ../pages/error-page.php");
}


$usersJsonData = file_get_contents("../data/users.json");
$usersList = json_decode($usersJsonData);

$result = new UserDataCheck(false, false);
$avatarFilename = "";
$userId = 0;
foreach ($usersList as $user) {
    if ($user->login == passedLogin) {
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
    $_SESSION["login"] = passedLogin;
    $_SESSION["avatarFilename"] = $avatarFilename;
}

echo json_encode($result);
