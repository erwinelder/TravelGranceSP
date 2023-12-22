const id = function(id) {
    return document.getElementById(id);
}

class User {
    login;
    password;

    constructor(login, password) {
        this.login = login;
        this.password = password;
    }
}

/**
 * Represents the record data.
 *
 * @class Record
 *
 * @param {number} id - ID of the record.
 * @param {number} date - Date of the record.
 * @param {amount} amount - Record amount.
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
function setUpPageOnLoad() {

    // set up click behaviour on buttons connected with the log-in window
    setUpLogInWindowButtonClickListener();
    setUpCloseLogInWindowButtonClickListener();
    addClickListenerToLogInSubmitButton();
    setUpChangeToSignUpWindowButtonClickListener();
    addInputListenerToLoginInputField(id("log-in-login-input"), id("log-in-login-err-msg"));
    addInputListenerToPasswordInputField(id("log-in-password-input"), id("log-in-password-err-msg"));
    // set up click behaviour on buttons connected with the sign-up window
    setUpCloseSignUpWindowButtonClickListener();
    addClickListenerToSignUpSubmitButton();
    setUpChangeToLogInWindowButtonClickListener();
    addInputListenerToLoginInputField(id("sign-up-login-input"), id("sign-up-login-err-msg"));
    addInputListenerToPasswordInputField(id("sign-up-password-input"), id("sign-up-password-err-msg"));
    addInputListenerToPasswordConfirmInputField(
        id("sign-up-password-input"), id("sign-up-password-confirmation-input"), id("sign-up-password-confirmation-err-msg")
    );
    // set up click behaviour on the log-out button in the navigation top bar
    setUpLogOutButtonClickListener();
    // set up click on buttons connected with the make record window
    addClickListenerToMainMakeRecordButton();
    setUpMakeRecordButtonClickListener();
    setUpCloseMakeRecordWindowButtonClickListener();
    // setUpMakeRecordSubmitButtonClickListener();
    addInputListenersToNumberInputField(id("make-record-amount"), id("make-record-amount-err-msg"));

    // other
    preventDefaultOnAllActiveLinks();
    setUpInputTypingValidationChecking();
}


/** Attach listeners to all inputs of type TEXT, PASSWORD, NUMBER and EMAIL in all forms on the page,
 * so it will have a CSS styles (for valid data and invalid) only if an input is not empty. */
function setUpInputTypingValidationChecking() {
    let forms= document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++)
        setUpListenersForInputsInForm(forms[i]);
}
/** Attach typing listeners to all inputs of type TEXT, PASSWORD, NUMBER and EMAIL in the form passed as a parameter,
 * so it will have a CSS styles (for valid data and invalid) only if an input is not empty.
 * @param {HTMLElement} form */
function setUpListenersForInputsInForm(form) {
    let inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "text" ||
            inputs[i].type === "password" ||
            inputs[i].type === "number" ||
            inputs[i].type === "email") {

            inputs[i].addEventListener("input", function() {
                if (this.value.length > 0)
                    this.classList.add("validation-checking");
                else this.classList.remove("validation-checking");
            });

        }
    }
}


function preventDefaultOnAllActiveLinks() {
    let links = document.querySelector(".secondary-button.current");
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = (e) => {
            e.preventDefault();
        }
    }
}


function addClickListenerToMainMakeRecordButton() {
    id("make-record-save-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        let result = await attemptToSaveRecord();
    }
}

/*function getDateFormat (input_date) {

    let date = input_date;

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (Number(month) < 10) month = '0' + month;
    let day = date.getDate();
    if (Number(day) < 10) day = '0' + day;
    let hours = date.getHours();
    if (Number(hours) < 10) hours = '0' + hours;
    let minutes = date.getMinutes();
    if (Number(minutes) < 10) minutes = '0' + minutes;
    let seconds = date.getSeconds();
    if (Number(seconds) < 10) seconds = '0' + seconds;

    return (`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
}

function setTypingListenerForInput (input) {
    input.addEventListener('input', adaptInputLength);
    adaptInputLength.call(input);
}

function adaptInputLength () {
    let less_length = 3.5,
        bigger_length = 1.1;

    if (this.value.length === 0 && this.placeholder.length < 4)
        this.style.width = less_length + 'ch';
    else if (this.value.length === 0 && this.placeholder.length >= 4)
        this.style.width = this.placeholder.length * bigger_length + 'ch';
    else if (this.value.length < 4)
        this.style.width = less_length + 'ch';
    else if (this.value.length >= 4)
        this.style.width = this.value.length * bigger_length + 'ch';
}

// change width of input by its characters count
function adaptInputLengthExplicitly (el) {
    let less_length = 3.5,
        bigger_length = 1.1;

    if (el.value.length === 0 && el.placeholder.length < 4)
        el.style.width = less_length + 'ch';
    else if (el.value.length === 0 && el.placeholder.length >= 4)
        el.style.width = el.placeholder.length * bigger_length + 'ch';
    else if (el.value.length < 4)
        el.style.width = less_length + 'ch';
    else if (el.value.length >= 4)
        el.style.width = el.value.length * bigger_length + 'ch';
}*/
