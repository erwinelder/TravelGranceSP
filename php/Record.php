<?php

class Record {
    public $id;
    public $ownerId;
    public $date;
    public $amount;
    public $city;

    /** @param int $id
     * @param int $ownerId
     * @param int $date
     * @param float $amount
     * @param string $city */
    public function __construct($id, $ownerId, $date, $amount, $city) {
        $this->id = $id;
        $this->ownerId = $ownerId;
        $this->date = $date;
        $this->amount = $amount;
        $this->city = $city;
    }
}