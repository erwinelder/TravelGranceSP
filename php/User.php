<?php

class User {
    public $login;
    public $password;

    /**
     * @param $login
     * @param $password
     */
    public function __construct($login, $password)
    {
        $this->login = $login;
        $this->password = $password;
    }
}