<?php

// declare constants for input data
$login = json_decode(file_get_contents("php://input"), true);

// call function to find if the passed login is already exists in the JSON file and save the return result
$loginSearchingResult = findLoginInJSON($login);

// return result of searching back to the caller
header("Content-Type: application/json");
echo json_encode($loginSearchingResult);


/** Find out if the passed login already exists in the JSON file.
 * @param string $searchedLogin
 * @return bool */
function findLoginInJSON($searchedLogin) {

    // get data from JSON file and decode it
    $usersJsonData = file_get_contents("../data/users.json");
    $usersList = json_decode($usersJsonData);

    // define variable to store searching result
    $result = false;
    // check if fetched JSON data already contain the login
    foreach ($usersList as $user) {
        // return TRUE if login already exists
        if ($user->login == $searchedLogin) {
            $result = true;
            break;
        }
    }

    // return result (TRUE if login was founded in the JSON file, and FALSE if not)
    return $result;
}
