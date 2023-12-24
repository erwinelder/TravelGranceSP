<?php

/**
 * Get user from the usersList list by ID.
 *
 * @param list<UserLoginAvatar> $usersList - List of users.
 * @param number $id - ID of the user to look for.
 *
 * @return UserLoginAvatar - User of type UserLoginAvatar.
 */
function getUserById($usersList, $id) {
    foreach ($usersList as $user) {
        if ($user->id == $id) {
            return new UserLoginAvatar(
                $user->id,
                $user->login,
                $user->avatarFilename
            );
        }
    }

    return new UserLoginAvatar(0, "login", "");
}
