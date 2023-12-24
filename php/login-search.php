<?php

/** Check if login exists in the JSON file.
 * @param string $login
 * @return bool */
function loginExistsInJson($login) {
    $usersList = json_decode(file_get_contents("../data/users.json"));

    foreach ($usersList as $user) {
        if ($user->login == $login) {
            return true;
        }
    }

    return false;
}
