/**
 * Represents the record data.
 *
 * @class Record
 *
 * @param {number} id - ID of the record.
 * @param {number} date - Date of the record.
 * @param {number} amount - Record amount.
 * @param {string} city - City.
 */
class Record {
    id;
    date;
    amount;
    city;

    constructor(id, date, amount, city) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.city = city;
    }
}


window.addEventListener("load", setUpHomePageOnLoad);


/**
 * Make different operations with elements after they are loaded on the page.
 */
async function setUpHomePageOnLoad() {
    // greeting widget
    uploadGreetingsTitle();
    // records history widget
    await reuploadRecordsToHistory();

    // edit account window
    setUpEditAccountButtonClickListener();
    setUpCloseEditAccountWindowButtonClickListener();
    addInputListenerToLoginInputField(id("edit-account-login-input"), id("edit-account-login-err-msg"));
    addInputListenerToPasswordInputField(id("edit-account-password-input"), id("edit-account-password-err-msg"));
    addInputListenerToPasswordInputField(id("edit-account-new-password-input"), id("edit-account-new-password-err-msg"));
    addInputListenerToPasswordConfirmInputField(
        id("edit-account-new-password-input"),
        id("edit-account-new-password-confirmation-input"),
        id("edit-account-new-password-confirmation-err-msg")
    );
    addClickListenerToEditAccountSubmitButton();
    addClickListenerToDeleteAccountButton();

    // make record
    addClickListenerToHomeMakeRecordSaveButton();
}


/**
 * Upload greetings title by current time.
 */
function uploadGreetingsTitle() {
    let greetingsTitleEl = id("greetings-title");
    let time = (new Date()).getHours();

    if (6 <= time && time <= 12) greetingsTitleEl.innerText = "Good morning";
    else if (13 <= time && time <= 17) greetingsTitleEl.innerText = "Good afternoon";
    else if (18 <= time && time <= 22) greetingsTitleEl.innerText = "Good evening";
    else if (23 <= time || time <= 5) greetingsTitleEl.innerText = "Good night";
}

/**
 * Add click listener to the make record save button on the home screen.
 * It will attempt to save the record and in case of success
 * it will call the reuploadRecordsToHistory() function to reupload records to the history widget.
 */
function addClickListenerToHomeMakeRecordSaveButton() {
    id("make-record-save-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        let result = await attemptToSaveRecord();
        if (result)
            await reuploadRecordsToHistory();
    }
}

/**
 * Delete content of the history widget and upload user's records to it.
 * After that it will add click listeners to each record to show/hide the delete record button.
 */
async function reuploadRecordsToHistory() {
    id("history").innerHTML = null;
    let uploadingFinished = await uploadRecordsToHistory();
    if (uploadingFinished)
        addClickListenersToRecords();
}

/**
 * Upload user's records sorted by its date to the history widget.
 */
async function uploadRecordsToHistory() {
    let historyCont = id("history"),
        userRecordsList = await getUserRecordsFromJson();

    for (let i = 0; i < userRecordsList.length; i++) {
        historyCont.insertAdjacentHTML(
            "beforeend",
            constructRecordEl(userRecordsList[i])
        );
    }

    return true;
}

/**
 * Add click listeners to all records in the history widget to show/hide the delete record button.
 */
function addClickListenersToRecords() {
    let recordList = id("history").getElementsByClassName("record");
    for (let i = 0; i < recordList.length; i++)
        recordList[i].onclick = function () {
            showHideRecordDeleteButton(this);
        }
}

/**
 * If the record has the "active" class, it will remove it, so the delete record button will be hidden by CSS.
 * Otherwise, it will add the "active" class, so the delete record button will be shown.;
 */
function showHideRecordDeleteButton(recordEl) {
    if (!recordEl.classList.contains("active")) {
        recordEl.classList.add("active");
        addClickListenerToDeleteRecordButton(recordEl);
    } else {
        recordEl.classList.remove("active");
    }
}

/**
 * Add click listener to the delete record button of the passed record html element, so it will
 */
function addClickListenerToDeleteRecordButton(recordEl) {
    recordEl.nextElementSibling.onclick = async function() {
        let recordId = Number(recordEl.getAttribute("id"));

        let result = await deleteRecordFromJson(recordId);
        if (!result) return;

        await reuploadRecordsToHistory();
    }
}

function addClickListenerToDeleteAccountButton() {
    id("delete-account-button").onclick = async () => {
        let result = await deleteAccount();
        if (result)
            location.href = "../index.php";
    }
}
