<?php

/**
 * Represents a record object that encapsulates the information about a specific record, including
 * its ID, owner ID, date, amount, and city.
 *
 * @property int $id - Record ID.
 * @property int $ownerId - ID of the owner.
 * @property int $date - Record date.
 * @property float $amount - Record amount.
 * @property string $city - City.
 */
class Record {
    public $id;
    public $ownerId;
    public $date;
    public $amount;
    public $city;

    /**
     * Initializes a record object with the specified parameters.
     *
     * @param int $id - Record ID.
     * @param int $ownerId - ID of the owner.
     * @param int $date - Record date.
     * @param float $amount - Record amount.
     * @param string $city - City.
     */
    public function __construct($id, $ownerId, $date, $amount, $city) {
        $this->id = $id;
        $this->ownerId = $ownerId;
        $this->date = $date;
        $this->amount = $amount;
        $this->city = $city;
    }
}
