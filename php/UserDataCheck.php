<?php

class UserDataCheck
{
    public $loginExists;
    public $passwordMatches;

    /**
     * @param $loginExists
     * @param $passwordMatches
     */
    public function __construct($loginExists, $passwordMatches)
    {
        $this->loginExists = $loginExists;
        $this->passwordMatches = $passwordMatches;
    }
}