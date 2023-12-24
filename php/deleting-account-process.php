<?php

session_start();

include_once "delete-user-records.php";

define("userId", $_SESSION["userId"]);

deleteUserRecords(userId);

$usersList = json_decode(file_get_contents("../data/users.json"));
$result = false;

for ($i = 0; $i < count($usersList); $i++) {
    if ($usersList[$i]->id == userId) {
        array_splice($usersList, $i, 1);
        $result = true;
        break;
    }
}

file_put_contents("../data/users.json", json_encode($usersList));

unset($_SESSION["userId"]);
unset($_SESSION["isLoggedIn"]);
unset($_SESSION["login"]);
unset($_SESSION["avatarFilename"]);

session_destroy();

echo json_encode($result);
