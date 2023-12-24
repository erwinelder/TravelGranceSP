/** Transform top-bar to show necessary window.
 * @param {string} newView top-bar view that is needed to be shown */
function changeTopBarViewToAnother(newView) {
    id("top-bar").classList.add("clicked");

    if (newView === "log-in") {
        id("top-bar").classList.remove("navigation");
        if (id("top-bar").classList.contains("signing-up")) {
            id("top-bar").classList.remove("signing-up");
            setTimeout(() => {
                resetSignUpWindowInputData();
            }, 350);
        }
        id("top-bar").classList.add("logging-in");
    }
    else if (newView === "sign-up") {
        id("top-bar").classList.remove("navigation");
        if (id("top-bar").classList.contains("logging-in")) {
            id("top-bar").classList.remove("logging-in");
            setTimeout(() => {
                resetLogInWindowInputData();
            }, 350);
        }
        id("top-bar").classList.add("signing-up");
    }
    else if (newView === "edit-account") {
        id("top-bar").classList.remove("navigation");
        id("top-bar").classList.add("editing-account");
    }
    else if (newView === "make-record") {
        id("make-record-window").classList.add("new");
        id("top-bar").classList.remove("navigation");
        id("top-bar").classList.add("making-record");
    }
    else {

        if (id("top-bar").classList.contains("logging-in")) {
            id("top-bar").classList.remove("logging-in");
            setTimeout(() => {
                resetLogInWindowInputData();
            }, 350);
        } else if (id("top-bar").classList.contains("signing-up")) {
            id("top-bar").classList.remove("signing-up");
            setTimeout(() => {
                resetSignUpWindowInputData();
            }, 350);
        } else if (id("top-bar").classList.contains("editing-account")) {
            id("top-bar").classList.remove("editing-account");
            setTimeout(() => {
                resetEditAccountWindowInputData();
            }, 350);
        } else if (id("top-bar").classList.contains("making-record")) {
            id("top-bar").classList.remove("making-record");
            setTimeout(() => {
                resetMakeRecordWindow();
            }, 350);
        }

        id("top-bar").classList.add("navigation");
    }

    setTimeout(() => {
        id("top-bar").classList.remove("clicked");
    }, 250);
}


/** Set up click behaviour on the log-in button in the top-bar. */
function setUpLogInWindowButtonClickListener() {
    id("log-in-button").onclick = () => {
        // show log-in window in the top-bar rather than navigation buttons
        changeTopBarViewToAnother("log-in");
    }
}
/** Set up click behaviour on the log-in button in the sign-in window. */
function setUpChangeToLogInWindowButtonClickListener() {
    id("change-to-log-in-button").onclick = () => {
        // show log-in window in the top-bar rather than sign-up
        changeTopBarViewToAnother("log-in");
    }
}
/** Set up click behaviour on the close button in the log-in window. */
function setUpCloseLogInWindowButtonClickListener() {
    id("log-in-window-close-button").onclick = () => {
        // show navigation buttons in the top-bar rather than log-in window
        changeTopBarViewToAnother("navigation");
    }
}

/** Set up click behaviour on the sign-in button in the log-in window. */
function setUpChangeToSignUpWindowButtonClickListener() {
    id("change-to-sign-up-button").onclick = () => {
        // show sign-up window in the top-bar rather than log-in window
        changeTopBarViewToAnother("sign-up");
    }
}
/** Set up click behaviour on the close button in the sign-up window. */
function setUpCloseSignUpWindowButtonClickListener() {
    id("sign-up-window-close-button").onclick = () => {
        // show navigation buttons in the top-bar rather than sign-up window
        changeTopBarViewToAnother("navigation");
    }
}

/** Set up click behaviour on the edit account button. */
function setUpEditAccountButtonClickListener() {
    id("edit-account-button").onclick = () => {
        // show edit account window in the top-bar rather than navigation buttons
        changeTopBarViewToAnother("edit-account");
        id("edit-account-login-input").value = id("edit-account-login-input").placeholder;
    }
}
/** Set up click behaviour on the close button in the edit account window. */
function setUpCloseEditAccountWindowButtonClickListener() {
    id("edit-account-window-close-button").onclick = () => {
        // show edit account window in the top-bar rather than navigation buttons
        changeTopBarViewToAnother("navigation");
    }
}

/** Set up click behaviour on open make record window button. */
function setUpMakeRecordButtonClickListener() {
    id("make-record-button").onclick = () => {
        changeTopBarViewToAnother("make-record");
    }
}
/** Set up click behaviour on the close button in the make record window. */
function setUpCloseMakeRecordWindowButtonClickListener() {
    id("make-record-window-close-button").onclick = () => {
        changeTopBarViewToAnother("navigation");
    }
}
