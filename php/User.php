<?php

class User {
    public $login;
    public $password;
    public $avatarName;

    /** @param $login
     * @param $password
     * @param $avatarName */
    public function __construct($login, $password, $avatarName) {
        $this->login = $login;
        $this->password = $password;
        $this->avatarName = $avatarName;
    }
}