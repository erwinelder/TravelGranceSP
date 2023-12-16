<?php

include_once "login-search.php";

session_start();

// declare variable for input data
$passedLogin = json_decode(file_get_contents("php://input"), true);
// predefine a variable for the result
$loginCanBeChanged = true;

// if the new login is not the same as the current one, check if the new login is available in the JSON file
if ($_SESSION["login"] !== $passedLogin) {
    // check if such a login already exists in the JSON file
    $loginCanBeChanged = !loginExistsInJson($passedLogin);
}

// return the result back to a caller
echo json_encode($loginCanBeChanged);
