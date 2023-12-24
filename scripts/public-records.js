/**
 * Represents the detailed record data.
 *
 * @class DetailedRecord
 *
 * @param {number} id - ID of the record.
 * @param {number} date - Date of the record.
 * @param {string} ownerLogin - The login of the record owner.
 * @param {string} avatarFilename - The avatar filename of the record owner.
 * @param {number} amount - Record amount.
 * @param {string} city - City.
 */
class DetailedRecord {
    id;
    date;
    ownerLogin;
    avatarFilename;
    amount;
    city;

    constructor(id, date, ownerLogin, avatarFilename, amount, city) {
        this.id = id;
        this.date = date;
        this.ownerLogin = ownerLogin;
        this.avatarFilename = avatarFilename;
        this.amount = amount;
        this.city = city;
    }
}

window.addEventListener("load", setUpPublicRecordsPageOnLoad);

async function setUpPublicRecordsPageOnLoad() {
    // make record window
    addClickListenerToMainMakeRecordSaveButton();

    // history widget
    await reuploadRecordsToPublicHistory();
    addClickListenersToChangeRecordsPageButtons();
}


function addClickListenerToMainMakeRecordSaveButton() {
    id("make-record-save-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        let result = await attemptToSaveRecord();
        if (result)
            await reuploadRecordsToPublicHistory();
    }
}


/**
 * Reupload records to the public history widget. Then add click listeners to all the records.
 */
async function reuploadRecordsToPublicHistory() {
    id("public-history").innerHTML = null;
    await uploadRecordsToPublicHistory();
}

/**
 * Upload records to the public history widget.
 */
async function uploadRecordsToPublicHistory() {
    let container = id("public-history");
    let recordsList = await getRecordsFromJson();

    for (let i = 0; i < recordsList.length; i++) {
        container.insertAdjacentHTML(
            "beforeend",
            constructDetailedRecordEl(recordsList[i])
        );
    }
}

/**
 * Add click listeners to the previous and next records page buttons.
 */
function addClickListenersToChangeRecordsPageButtons() {
    let buttons = id("history-nav-buttons").getElementsByTagName("input");

    buttons[0].onclick = async () => {
        if (Number(id("records-current-page").innerText) === 0) {
            return;
        }

        let newPageNumber = await changeRecordsPage(false);
        id("records-current-page").innerText = newPageNumber.toString();
        await reuploadRecordsToPublicHistory();
    }

    buttons[1].onclick = async () => {
        let newPageNumber = await changeRecordsPage(true);
        id("records-current-page").innerText = newPageNumber.toString();
        await reuploadRecordsToPublicHistory();
    }
}

/**
 * Change current records page to the next or previous
 *
 * @param {boolean} changeToNext - TRUE if change current page to the next and FALSE otherwise.
 *
 * @return {Promise<number>} - New records page number.
 */
async function changeRecordsPage(changeToNext) {
    return fetch("/~volodyeh/php/change-records-page.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(changeToNext ? 1 : -1)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Changing records page failed");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during changing records page: ${error}`);
            return -1;
        })
}
