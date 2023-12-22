<?php

session_start();

include_once "Record.php";

// declare variables for input data
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
// get user id from session storage
define("userId", intval($_SESSION["userId"]));

// validate input date (should be a timestamp by type number)
if (!is_int(passedDate)) {
    die("Error: date is not a timestamp by type int");
} else if (passedDate < 190001010000) {
    die("Error: invalid date");
}
// validate input amount
if (!is_float($passedAmount) && !is_int($passedAmount)) {
    die("Error: amount is not of type float int or int");
} else if ($passedAmount < 0) {
    die("Error: amount is negative");
}
// validate input city
if (!is_string(passedCity)) {
    die("Error: city is not of type string");
} else if (!in_array(passedCity, $allowedCities)) {
    die("Error: invalid city");
}

// if passed amount is integer, convert passed amount to float by format 0.00
$passedAmount = number_format($passedAmount, 2, ".", "");

// get records from the JSON file and decode it
$usersJsonData = file_get_contents("../data/records.json");
$recordsList = json_decode($usersJsonData);
// define id for the new record
$newRecordId = 0;
if (count($recordsList) == 0) $newRecordId = 1;
else $newRecordId = $recordsList[count($recordsList) - 1]->id + 1;
// append new record in the records list
$recordsList[] = new Record($newRecordId, userId, passedDate, $passedAmount, passedCity);
// write data with a new record to the JSON file
file_put_contents("../data/records.json", json_encode($recordsList));

echo json_encode(true);
