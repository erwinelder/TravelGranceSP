<?php

/**
 * Verify if login and password matches that one in the JSON file.
 *
 * @param string $password - Password to verify.
 *
 * @return bool
 */
function verifyLoginPasswordInJson($login, $password) {
    $result = false;

    $usersList = json_decode(file_get_contents("../data/users.json"));

    foreach ($usersList as $user) {
        if ($user->login === $login) {
            if (password_verify($password, $user->password)) {
                $result = true;
            }
            break;
        }
    }

    return $result;
}
