<?php

/**
 * Represents a user object that encapsulates relevant user data including their id, login, password and avatar filename.
 *
 * @property int $id - User's ID.
 * @property string $login - User's login.
 * @property string $password - User's password. Is not hashed.
 * @property string $avatarFilename - User avatar filename with its extension.
 */
class User {
    public $id;
    public $login;
    public $password;
    public $avatarFilename;

    /**
     * Initializes a user object with the specified parameters.
     *
     * @param int $id - User's ID.
     * @param string $login - User's login.
     * @param string $password - User's password. Is not hashed.
     * @param string $avatarFilename - User avatar filename with its extension.
     */
    public function __construct($id, $login, $password, $avatarFilename) {
        $this->id = $id;
        $this->login = $login;
        $this->password = $password;
        $this->avatarFilename = $avatarFilename;
    }
}