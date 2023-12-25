<?php

session_start();

if (!isset($_SESSION["recordsCurrentPage"])) {
    $_SESSION["errorMassage"] = "Needed records list page is not defined";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}
if (!is_int($_SESSION["recordsCurrentPage"])) {
    $_SESSION["errorMassage"] = "Records list page variable is not a number";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

include_once "get-user-login-avatar.php";
include_once "get-user-from-list.php";
include_once "DetailedRecord.php";

define("recordsCurrentPage", $_SESSION["recordsCurrentPage"]);

$recordsList = json_decode(file_get_contents("../data/records.json"));
uasort($recordsList, function ($a, $b) {
    return $b->date - $a->date;
});
$recordsList = array_values($recordsList);

$finalRecordsList = [];
$usersList = getUsersLoginAvatarList();

for ($i = recordsCurrentPage * 10; $i < recordsCurrentPage * 10 + 10; $i++) {
    if ($i >= count($recordsList)) {
        $_SESSION["canPageNext"] = false;
        break;
    }

    $record = $recordsList[$i];
    $recordOwner = getUserById($usersList, $record->ownerId);

    $finalRecordsList[] = new DetailedRecord(
        $record->id,
        $record->date,
        htmlspecialchars($recordOwner->login),
        $recordOwner->avatarFilename,
        $record->amount,
        $record->city
    );
}

echo json_encode($finalRecordsList);
