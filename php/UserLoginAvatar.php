<?php


/**
 * Represents a user's login information and the filename of their associated avatar.
 *
 * @property int $id - User's ID.
 * @property string $login - User's login.
 * @property string $avatarFilename - User avatar filename with its extension.
 */
class UserLoginAvatar {
    public $id;
    public $login;
    public $avatarFilename;

    /**
     * Initializes a user's login information and the filename of their associated avatar.
     *
     * @param int $id - User's ID.
     * @param string $login - User's login.
     * @param string $avatarFilename - User avatar filename with its extension.
     */
    public function __construct($id, $login, $avatarFilename) {
        $this->id = $id;
        $this->login = $login;
        $this->avatarFilename = $avatarFilename;
    }
}
