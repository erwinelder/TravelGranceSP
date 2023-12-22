<?php

session_start();

if (!isset($_SESSION["userId"])) {
    die("User id was not found in the session storage");
}

define("userId", $_SESSION["userId"]);

$recordsList = json_decode(file_get_contents("../data/records.json"));
$userRecordsList = [];

foreach ($recordsList as $record) {
    if ($record->ownerId == userId) {
        $userRecordsList[] = $record;
    }
}

echo json_encode($userRecordsList);
