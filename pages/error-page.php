<?php
session_start();

if (!isset($_SESSION["errorMassage"]))
    header("Location: /~volodyeh/index.php");

define("errorMessage", $_SESSION["errorMassage"]);
unset($_SESSION["errorMassage"]);

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelGlance | Error</title>
    <link rel="stylesheet" href="/~volodyeh/styles/index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap" rel="stylesheet">
</head>
<body>
    <h1><?php echo errorMessage ?></php></h1>
    <a class="secondary-button" href="/~volodyeh/index.php">Go to main page</a>
</body>
</html>