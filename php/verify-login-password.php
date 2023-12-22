<?php

/** Verify if login and password matches that one in the JSON file.
 * @param string $password
 * @return bool */
function verifyLoginPasswordInJson($login, $password) {
    $result = false;

    // get data from the JSON file and decode it
    $usersJsonData = file_get_contents("../data/users.json");
    $usersList = json_decode($usersJsonData);

    foreach ($usersList as $user) {
        if ($user->login === $login) {
            if (password_verify($password, $user->password))
                $result = true;
            break;
        }
    }

    return $result;
}
