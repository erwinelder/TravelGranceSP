<?php

class User {
    public $id;
    public $login;
    public $password;
    public $avatarFilename;

    /** @param int $id
     * @param string $login
     * @param string $password
     * @param string $avatarFilename */
    public function __construct($id, $login, $password, $avatarFilename) {
        $this->id = $id;
        $this->login = $login;
        $this->password = $password;
        $this->avatarFilename = $avatarFilename;
    }
}