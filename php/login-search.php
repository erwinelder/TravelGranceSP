<?php

/**
 * Check if login exists in the JSON file.
 *
 * @param string $login - Login to find.
 *
 * @return bool - TRUE if the login already exists in the users.json file and FALSE otherwise.
 */
function loginExistsInJson($login) {
    $usersList = json_decode(file_get_contents("../data/users.json"));

    foreach ($usersList as $user) {
        if (mb_strtolower($user->login) === mb_strtolower($login)) {
            return true;
        }
    }

    return false;
}
