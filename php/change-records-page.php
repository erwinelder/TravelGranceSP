<?php

session_start();

if (!isset($_SESSION["recordsCurrentPage"])) {
    $_SESSION["errorMassage"] = "Current records page is not defined";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

$currentPage = $_SESSION["recordsCurrentPage"];
$newPageNumberDifference = json_decode(file_get_contents("php://input"), true);

if (!is_int($newPageNumberDifference)) {
    $_SESSION["errorMassage"] = "newPageNumberDifference is not a number";
    header("Location: /~volodyeh/pages/error-page.php");
    exit;
}

if ($currentPage > 0 && $newPageNumberDifference == -1) {
    $_SESSION["canPageNext"] = true;
}

if (!($currentPage == 0 && $newPageNumberDifference == -1) && $_SESSION["canPageNext"]) {
    $_SESSION["recordsCurrentPage"] = $currentPage + $newPageNumberDifference;
}

echo json_encode($_SESSION["recordsCurrentPage"]);
