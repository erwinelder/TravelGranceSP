/**
 * Reset inputs data in the make record form.
 */
function resetMakeRecordWindow() {
    id("make-record-date").value = null;
    id("make-record-amount").value = null;
    id("make-record-amount").classList.remove("validation-checking");
}

/**
 * Attempt to save the new record.
 *
 * @return {Promise<boolean>} - TRUE if new record was successfully added and FALSE otherwise.
 */
async function attemptToSaveRecord() {

    let dateString = id("make-record-date").value + "",
        amount = parseFloat( Number( id("make-record-amount").value ).toFixed(2) ),
        city = id("make-record-city").value;
    if (dateString.length === 0)
        dateString = getDateStringFormat(new Date());
    let date = convertDateStringToTimestamp(dateString);

    if (!validateInputNumber(id("make-record-amount"), id("make-record-amount-err-msg")))
        return false;

    let result = await saveNewRecordToJson(date, amount, city);

    if (result)
        changeTopBarViewToAnother("navigation");
    else
        console.log("An error occurred during saving the record");

    return result;
}

/**
 * Save new record to the records.json file.
 *
 * @param {number} date - Date of the record.
 * @param {number} amount - Record amount.
 * @param {string} city - City.
 *
 * @return {Promise<boolean>} - TRUE if the record was successfully saved and FALSE otherwise.
 */
async function saveNewRecordToJson(date, amount, city) {
    return fetch("../php/making-record-process.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: date,
            amount: amount,
            city: city
        })
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Log-in checking failed.");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during checking log-in data: ${error}`);
            return false;
        });
}


/**
 * Get user's records from the records.json file.
 *
 * @return {Promise<Record[]>}
 */
async function getUserRecordsFromJson() {
    return fetch("../php/get-user-records.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Fetching records from the JSON file was failed");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during fetching user's records from the JSON file: ${error}`);
            return [];
        })
}

/**
 * Get part of records from the records.json file by current recordsCurrentPage PHP session variable.
 *
 * @return {Promise<DetailedRecord[]>}
 */
async function getRecordsFromJson() {
    return fetch("../php/get-records.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Fetching records from the JSON file was failed");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during fetching records from the JSON file: ${error}`);
            return [];
        })
}

/**
 * Delete record from the records.json file by id.
 *
 * @param {number} recordId - ID of the record to be deleted.
 *
 * @return {Promise<boolean>} - TRUE if the deleting was successful and FALSE otherwise.
 */
async function deleteRecordFromJson(recordId) {
    return fetch("../php/deleting-record-process.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recordId)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Deleting a record failed")
            return response.json();
        })
        .catch(error => {
            console.log(`Error during deleting a record: ${error}`);
            return false;
        });
}


/**
 * Get date as a string by format "yyyy-MM-ddThh:mm:ss".
 *
 * @param {Date} date - Date to be converted.
 *
 * @return {string} - Formatted date as string.
 */
function getDateStringFormat(date) {
    let month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return date.getFullYear() + '-' + month + '-' + day + 'T' +
        hours + ':' + minutes + ':00';
}

/**
 * Get date as a number by format "yyyyMMddhhmm" (year + month + day + hours + minutes).
 *
 * @param {string} inputDate - Date to be converted into a number.
 *
 * @return {number} - Formatted date as a number.
 */
function convertDateStringToTimestamp(inputDate) {
    let storageDate =
        inputDate.charAt(0) + inputDate.charAt(1) + inputDate.charAt(2) + inputDate.charAt(3) +
        inputDate.charAt(5) + inputDate.charAt(6) +
        inputDate.charAt(8) + inputDate.charAt(9) +
        inputDate.charAt(11) + inputDate.charAt(12) +
        inputDate.charAt(14) + inputDate.charAt(15);

    return parseInt(storageDate);
}

/**
 * Convert timestamp to the record format (dd.MM.yyyy).
 *
 * @param {number} timestamp - Timestamp to be converted.
 *
 * @return {string} - Date string by format (dd.MM.yyyy).
 */
function convertTimestampToRecordFormat(timestamp) {
    let timestampString = timestamp.toString();

    return timestampString.charAt(6) + timestampString.charAt(7) + "." +
        timestampString.charAt(4) + timestampString.charAt(5) + "." +
        timestampString.charAt(0) + timestampString.charAt(1) + timestampString.charAt(2) + timestampString.charAt(3);
}

/**
 * Construct the record HTML element with the following data.
 *
 * @param {Record} record - Record class element that's holding the record data.
 *
 * @return {string} - Constructed HTML element as string with passed record data.
 */
function constructRecordEl(record) {
    return `
        <div class="record-cont">
            <div class="record" id="${record.id}">
                <p class="date">${convertTimestampToRecordFormat(record.date)}</p>
                <p class="city">${record.city}</p>
                <p class="amount">${record.amount} CZK</p>
            </div>
            <input type="button" class="delete-record-button" value="X">
        </div>
    `;
}

/**
 * Construct the detailed record HTML element with the following data.
 *
 * @param {DetailedRecord} record - DetailedRecord class element that's holding the record data.
 *
 * @return {string} - Constructed HTML element as string with passed record data.
 */
function constructDetailedRecordEl(record) {
    return `
        <div class="record-cont">
            <div class="record" id="${record.id}">
                <p class="date">${convertTimestampToRecordFormat(record.date)}</p>
                <p class="city">${record.city}</p>
                <p class="amount">${record.amount} CZK</p>
                <hr class="small-hr">
                <div class="user-credentials">
                    <img src="data/avatars/${
                        record.avatarFilename !== "" ? record.avatarFilename : "default.jpg"
                    }" alt="${record.ownerLogin} avatar" class="avatar">
                    <p class="login">${record.ownerLogin}</p>
                </div>
            </div>
        </div>
    `;
}
