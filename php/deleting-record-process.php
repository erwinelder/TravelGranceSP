<?php

session_start();

$passedRecordId = json_decode(file_get_contents("php://input"), true);
define("userId", intval($_SESSION["userId"]));

if (!is_int($passedRecordId)) {
    die("Error: record id is not of type int");
}

$recordsList = json_decode(file_get_contents("../data/records.json"));
$result = false;

for ($i = 0; $i < count($recordsList); $i++) {
    if ($recordsList[$i]->id == $passedRecordId) {
        if ($recordsList[$i]->ownerId == userId) {
            array_splice($recordsList, $i, 1);
            $result = true;
        }
        break;
    }
}

file_put_contents("../data/records.json", json_encode($recordsList));

echo json_encode($result);
