const id = function(id) {
    return document.getElementById(id);
}

/**
 * Represents the data structure for results of a login attempt.
 *
 * @class UserDataCheck
 *
 * @param {boolean} loginExists - Indicates whether the login exists.
 * @param {boolean} passwordMatches - Indicates whether the password matches the corresponding login's one.
 */
class UserDataCheck {
    loginExists;
    passwordMatches;

    constructor(loginExists, passwordMatches) {
        this.loginExists = loginExists;
        this.passwordMatches = passwordMatches;
    }
}


window.addEventListener("load", setUpPageOnLoad);


/**
 * Make different operations with elements after they are loaded on the page.
 */
async function setUpPageOnLoad() {

    // log-in window
    setUpLogInWindowButtonClickListener();
    setUpCloseLogInWindowButtonClickListener();
    addClickListenerToLogInSubmitButton();
    setUpChangeToSignUpWindowButtonClickListener();
    addInputListenerToLoginInputField(id("log-in-login-input"), id("log-in-login-err-msg"));
    addInputListenerToPasswordInputField(id("log-in-password-input"), id("log-in-password-err-msg"));
    // sign-up window
    setUpCloseSignUpWindowButtonClickListener();
    addClickListenerToSignUpSubmitButton();
    setUpChangeToLogInWindowButtonClickListener();
    addInputListenerToLoginInputField(id("sign-up-login-input"), id("sign-up-login-err-msg"));
    addInputListenerToPasswordInputField(id("sign-up-password-input"), id("sign-up-password-err-msg"));
    addInputListenerToPasswordConfirmInputField(
        id("sign-up-password-input"), id("sign-up-password-confirmation-input"), id("sign-up-password-confirmation-err-msg")
    );
    // navigation top-bar
    setUpLogOutButtonClickListener();
    // make record window
    setUpMakeRecordButtonClickListener();
    setUpCloseMakeRecordWindowButtonClickListener();
    addInputListenersToNumberInputField(id("make-record-amount"), id("make-record-amount-err-msg"));

    // other
    preventDefaultOnAllActiveLinks();
    setUpInputTypingValidationChecking();
}


function preventDefaultOnAllActiveLinks() {
    let links = document.querySelector(".secondary-button.current");
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = (e) => {
            e.preventDefault();
        }
    }
}
