<?php

session_start();

include_once "Record.php";

$inputData = json_decode(file_get_contents("php://input"), true);
define("passedDate", $inputData["date"]);
$passedAmount = $inputData["amount"];
define("passedCity", $inputData["city"]);
$allowedCities = array(
    "Prague",
    "Bratislava",
    "Vienna",
    "Budapest",
    "Amsterdam",
    "Rome",
    "Warsaw"
    );
define("userId", intval($_SESSION["userId"]));

// validate date
if (!is_int(passedDate)) {
    $_SESSION["errorMassage"] = "Error: date is not a timestamp by type int";
    header("Location: /~volodyeh/pages/error-page.php");
}
if (passedDate < 190001010000) {
    $_SESSION["errorMassage"] = "Error: invalid date";
    header("Location: /~volodyeh/pages/error-page.php");
}

// validate amount
if (!is_float($passedAmount) && !is_int($passedAmount)) {
    $_SESSION["errorMassage"] = "Error: amount is not of type float int or int";
    header("Location: /~volodyeh/pages/error-page.php");
}
if ($passedAmount < 0) {
    $_SESSION["errorMassage"] = "Error: amount is negative";
    header("Location: /~volodyeh/pages/error-page.php");
}

// validate city
if (!is_string(passedCity)) {
    $_SESSION["errorMassage"] = "Error: city is not of type string";
    header("Location: /~volodyeh/pages/error-page.php");
}
if (!in_array(passedCity, $allowedCities)) {
    $_SESSION["errorMassage"] = "Error: invalid city";
    header("Location: /~volodyeh/pages/error-page.php");
}

// if passed amount is integer, convert passed amount to float by format 0.00
$passedAmount = number_format($passedAmount, 2, ".", "");

$recordsList = json_decode(file_get_contents("../data/records.json"));

$newRecordId = 0;
if (count($recordsList) == 0) $newRecordId = 1;
else $newRecordId = $recordsList[count($recordsList) - 1]->id + 1;

$recordsList[] = new Record($newRecordId, userId, passedDate, $passedAmount, passedCity);
file_put_contents("../data/records.json", json_encode($recordsList));

echo json_encode(true);
