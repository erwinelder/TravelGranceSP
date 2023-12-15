<?php

class UserDataCheck
{
    public $loginExists;
    public $passwordMatches;

    /** @param bool $loginExists
     * @param bool $passwordMatches */
    public function __construct($loginExists, $passwordMatches)
    {
        $this->loginExists = $loginExists;
        $this->passwordMatches = $passwordMatches;
    }
}