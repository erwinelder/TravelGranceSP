<?php

include_once "login-search.php";

define("passedLogin", json_decode(file_get_contents("php://input"), true));

if (!is_string(passedLogin)) {
    $_SESSION["errorMassage"] = "Searched login is not of type string";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

$loginSearchingResult = loginExistsInJson(passedLogin);

echo json_encode($loginSearchingResult);
