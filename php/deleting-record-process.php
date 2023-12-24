<?php

session_start();

$passedRecordId = json_decode(file_get_contents("php://input"), true);
define("userId", intval($_SESSION["userId"]));

if (!is_int($passedRecordId)) {
    $_SESSION["errorMassage"] = "Error: record id is not of type int";
    header("Location: /~volodyeh/pages/error-page.php");
}

$recordsList = json_decode(file_get_contents("/~volodyeh/data/records.json"));
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

file_put_contents("/~volodyeh/data/records.json", json_encode($recordsList));

echo json_encode($result);
