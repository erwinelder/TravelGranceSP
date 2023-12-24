<?php

/**
 * Represents an object that encapsulates the results of checking a user's login credentials.
 *
 * @property bool $loginExists - Indicates whether the provided login exists in the system.
 * @property bool $passwordMatches - Indicates whether the provided password matches the one associated with the login.
 */
class UserDataCheck {
    public $loginExists;
    public $passwordMatches;

    /**
     * Constructs a `UserDataCheck` object with the specified login existence and password matching results.
     *
     * @param bool $loginExists - Indicates whether the provided login exists in the system.
     * @param bool $passwordMatches - Indicates whether the provided password matches the one associated with the login.
     */
    public function __construct($loginExists, $passwordMatches)
    {
        $this->loginExists = $loginExists;
        $this->passwordMatches = $passwordMatches;
    }
}