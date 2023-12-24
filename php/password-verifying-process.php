<?php

session_start();

include_once "verify-login-password.php";

$passedPassword = json_decode(file_get_contents("php://input"), true);

if (!is_string($passedPassword)) {
    $_SESSION["errorMassage"] = "Password is not of type string";
    header("Location: ../pages/error-page.php");
}

$passwordVerificationResult = verifyLoginPasswordInJson($_SESSION["login"], $passedPassword);

echo json_encode($passwordVerificationResult);
