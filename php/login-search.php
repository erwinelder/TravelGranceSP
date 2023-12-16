<?php

/** Check if login exists in the JSON file.
 * @param string $login
 * @return bool */
function loginExistsInJson($login) {

    // get data from JSON file and decode it
    $usersJsonData = file_get_contents("../data/users.json");
    $usersList = json_decode($usersJsonData);

    // check if fetched JSON data already contain the login
    foreach ($usersList as $user) {
        // return TRUE if login already exists
        if ($user->login == $login) {
            return true;
        }
    }

    // login was not founded in the JSON, so return false
    return false;
}
