<?php

session_start();

if (!isset($_SESSION["userId"])) {
    $_SESSION["errorMassage"] = "User id was not found in the session storage";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
define("userId", $_SESSION["userId"]);

$recordsList = json_decode(file_get_contents("../data/records.json"));

$userRecordsList = [];

foreach ($recordsList as $record) {
    if ($record->ownerId == userId) {
        $userRecordsList[] = $record;
    }
}
uasort($userRecordsList, function ($a, $b) {
    return $b->date - $a->date;
});
$userRecordsList = array_values($userRecordsList);

echo json_encode($userRecordsList);
