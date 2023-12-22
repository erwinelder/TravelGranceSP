<?php

include_once "verify-login-password.php";
session_start();

// declare variables for input password
$passedPassword = json_decode(file_get_contents("php://input"), true);

// verify password in the JSON file
$passwordVerificationResult = verifyLoginPasswordInJson($_SESSION["login"], $passedPassword);

// return password verifying result
echo json_encode($passwordVerificationResult);
