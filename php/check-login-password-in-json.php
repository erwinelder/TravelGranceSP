<?php

include_once "UserDataCheck.php";

/** Check if login and password exist in the JSON file and it matches.
 * @param string $searchedLogin
 * @param string $searchedPassword
 * @return UserDataCheck */
function checkLoginPasswordInJson($searchedLogin, $searchedPassword) {
    // get data from the JSON file and decode it
    $checkLoginPasswordInJsonUsersJsonData = file_get_contents("../data/users.json");
    $checkLoginPasswordInJsonUsersList = json_decode($checkLoginPasswordInJsonUsersJsonData);

    // define variable to store searching result
    $checkLoginPasswordInJsonUserDataCheck = new UserDataCheck(false, false);
    // check if fetched JSON data contain the login
    foreach ($checkLoginPasswordInJsonUsersList as $user) {
        // if login exists in the JSON file, then check if the passwords match
        if ($user->login == $searchedLogin) {
            $checkLoginPasswordInJsonUserDataCheck->loginExists = true;
            // if the passwords match, save TRUE to the $result variable and break the cycle
            if (password_verify($searchedPassword, $user->password)) {
                $checkLoginPasswordInJsonUserDataCheck->passwordMatches = true;
                session_start();
                $_SESSION["avatarFilename"] = $user->avatarFilename;
            }
            break;
        }
    }

    return $checkLoginPasswordInJsonUserDataCheck;
}