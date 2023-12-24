<?php

include_once "UserLoginAvatar.php";

/**
 * Get a list of elements of type UserLoginAvatar.
 *
 * @return list<UserLoginAvatar> - List of elements of type UserLoginAvatar.
 */
function getUsersLoginAvatarList() {
    $finalList = [];
    $usersList = json_decode(file_get_contents("../data/users.json"));

    foreach ($usersList as $user) {
        $finalList[] = new UserLoginAvatar(
            $user->id,
            $user->login,
            $user->avatarFilename
        );
    }

    return $finalList;
}
