<?php

/**
 * Delete user's records from the records.json file by user's id.
 *
 * @param int $userId - ID of the user whose records to delete.
 */
function deleteUserRecords($userId) {
    $recordsList = json_decode(file_get_contents("../data/records.json"));
    for ($i = 0; $i < count($recordsList); $i++) {
        if ($recordsList[$i]->ownerId == $userId) {
            array_splice($recordsList, $i, 1);
            $i--;
        }
    }
    file_put_contents("../data/records.json", json_encode($recordsList));
}
