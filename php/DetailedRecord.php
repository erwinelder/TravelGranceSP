<?php

/**
 * Represents a detailed record object that encapsulates information about a specific record,
 * including its ID, date, owner's login information, owner avatar filename, amount and city.
 *
 * @property int $id - Record ID.
 * @property int $date - Record date.
 * @property string $ownerLogin - The login of the record owner.
 * @property string $avatarFilename - The record owner's avatar filename.
 * @property float $amount - Record amount.
 * @property string $city - City.
 */
class DetailedRecord {
    public $id;
    public $date;
    public $ownerLogin;
    public $avatarFilename;
    public $amount;
    public $city;

    /**
     * Initializes a detailed record object with the specified parameters.
     *
     * @param int $id - Record ID.
     * @param int $date - Record date.
     * @param string $ownerLogin - The login of the record owner.
     * @param string $avatarFilename - The record owner's avatar filename.
     * @param float $amount - Record amount.
     * @param string $city - City.
     */
    public function __construct($id, $date, $ownerLogin, $avatarFilename, $amount, $city) {
        $this->id = $id;
        $this->date = $date;
        $this->ownerLogin = $ownerLogin;
        $this->avatarFilename = $avatarFilename;
        $this->amount = $amount;
        $this->city = $city;
    }
}
