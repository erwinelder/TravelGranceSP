<?php

include_once "login-search.php";

session_start();

$passedLogin = json_decode(file_get_contents("php://input"), true);

if (!is_string($passedLogin)) {
    $_SESSION["errorMassage"] = "Searched login is not of type string";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

$loginCanBeChanged = true;
if ($_SESSION["login"] !== $passedLogin) {
    $loginCanBeChanged = !loginExistsInJson($passedLogin);
}

echo json_encode($loginCanBeChanged);
