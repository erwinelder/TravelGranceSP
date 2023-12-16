/** After page was loaded, call function to operate with elements (set up clicks on buttons, etc.). */
window.addEventListener("load", setUpPageOnLoad);


/** Make different operations with elements after they were loaded on the page. */
function setUpPageOnLoad() {
    // greeting widget
    uploadGreetingsTitle();
    // edit account window
    setUpEditAccountButtonClickListener();
    setUpCloseEditAccountWindowButtonClickListener();
    addInputListenersToLoginInputField(id("edit-account-login-input"), id("edit-account-login-err-msg"));
    addInputListenersToPasswordInputField(id("edit-account-password-input"), id("edit-account-password-err-msg"));
    addInputListenersToPasswordConfirmInputField(
        id("edit-account-new-password-input"), id("edit-account-new-password-confirmation-input"), id("edit-account-new-password-confirmation-err-msg")
    );
    setUpEditAccountSubmitButtonClickListener();
}


/** Upload greetings title by current time. */
function uploadGreetingsTitle() {
    let greetingsTitleEl = id("greetings-title");
    let time = (new Date()).getHours();

    if (6 <= time && time <= 12) greetingsTitleEl.innerText = "Good morning";
    else if (13 <= time && time <= 17) greetingsTitleEl.innerText = "Good afternoon";
    else if (18 <= time && time <= 22) greetingsTitleEl.innerText = "Good evening";
    else if (23 <= time || time <= 5) greetingsTitleEl.innerText = "Good night";
}