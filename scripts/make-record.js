/** Reset all data in the make record window inputs. */
function resetMakeRecordWindow() {
    id("make-record-date").value = null;
    id("make-record-amount").value = null;
    id("make-record-amount").classList.remove("validation-checking");
}

function setUpMakeRecordSubmitButtonClickListener() {
    id("make-record-save-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        // get values from the inputs (date, amount and city)
        let dateString = id("make-record-date").value + "",
            amount = parseFloat( Number( id("make-record-amount").value ).toFixed(2) ),
            city = id("make-record-city").value;

        // if date input was empty, apply current date
        if (dateString.length === 0)
            dateString = getDateStringFormat(new Date());

        // convert date from string to number
        let date = getDateString(dateString);

        if (!validateInputNumber(id("make-record-amount"), id("make-record-amount-err-msg")))
            return;

        // save the new record to the JSON file and save a result of this operation
        let result = await saveNewRecordToJson(date, amount, city);

        // if the result was FALSE, show corresponding message
        if (!result)
            console.log("An error occurred during saving a record");
        // if the opposite, change top-bar view to show the navigation buttons
        else {
            changeTopBarViewToAnother("navigation");
        }
    }
}

/** Get date as string by format "yyyy-MM-ddThh:mm:ss"
 * @param {Date} date
 * @return {string} */
function getDateStringFormat(date) {
    return date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate() + 'T' +
        date.getHours() + ':' +
        date.getMinutes() + ':00';
}

/** Get date as number by format "yyyyMMddhhmm" (year + month + day + hours + minutes).
 * @param inputDate
 * @return {number} */
function getDateString(inputDate) {
    let storageDate = "";

    storageDate =
        inputDate.charAt(0) + inputDate.charAt(1) + inputDate.charAt(2) + inputDate.charAt(3) +
        inputDate.charAt(5) + inputDate.charAt(6) +
        inputDate.charAt(8) + inputDate.charAt(9) +
        inputDate.charAt(11) + inputDate.charAt(12) +
        inputDate.charAt(14) + inputDate.charAt(15);

    return parseInt(storageDate);
}

/** Save new record to the JSON file. Returns TRUE if a record was saved successfully, else returns FALSE.
 * @param {number} date
 * @param {number} amount
 * @param {string} city
 * @return {Promise<boolean>} */
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

function prepareMakeRecordWindow() {
    // hide fields for edit record window
    id('make-record-window').classList.add('make-record-status');
    // add attribute 'new' and 'record number' attribute to make record window
    id('make-record-window').setAttribute('status', 'new');
    // id('make-record-window').setAttribute('recordnum', toString(Number(localStorage.getItem('RCount')) + 1));
    // upload current date
    id('make-record-date').value = getDateFormat(new Date());
    // automatic adjust length of input record amount while typing
    adaptInputLengthExplicitly(id('make-record-amount'));
    setTypingListenerForInput(id('make-record-amount'));

    // upload category to change category button
    // uploadCategoryToMakeRecordCategoryField(
    //     '-', id('make-record-category'),
    //     id('make-record-category').firstElementChild,
    //     id('make-record-category').lastElementChild
    // );
}
