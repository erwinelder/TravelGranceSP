<?php

include_once "login-search.php";

// declare constants for input data
$passedLogin = json_decode(file_get_contents("php://input"), true);

// check if the login already exists in the JSON file and save the result
$loginSearchingResult = loginExistsInJson($passedLogin);

// return the result back to a caller
echo json_encode($loginSearchingResult);
