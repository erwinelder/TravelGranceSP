<?php

include_once "login-search.php";

$passedLogin = json_decode(file_get_contents("php://input"), true);

if (!is_string(passedLogin)) {
    $_SESSION["errorMassage"] = "Searched login is not of type string";
    header("Location: ../pages/error-page.php");
}

$loginSearchingResult = loginExistsInJson($passedLogin);

echo json_encode($loginSearchingResult);
