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

class AccessUser extends User {
    #_role;

    constructor(login, password, role) {
        super(login, password);
        this.#_role = role
    }

    get role() {
        return this.#_role
    }
}

class SignUpForm {
    login;
    password;

    constructor(login, password) {
        this.login = login;
        this.password = password;
    }
}


/** After page was loaded, call function to operate with elements (set up clicks on buttons, etc.) */
window.addEventListener("load", setUpPageOnLoad);


/** make different operations with elements after they were loaded on the page */
function setUpPageOnLoad() {
    // top-bar elements

    // set up click on buttons connected with the log-in window
    setUpLogInWindowButtonClickListener();
    setUpCloseLogInWindowButtonClickListener();
    setUpLogInSubmitButtonClickListener();
    setUpChangeToSignUpWindowButtonClickListener();
    // set up click on buttons connected with the sign-up window
    setUpCloseSignUpWindowButtonClickListener();
    setUpSignUpSubmitButtonClickListener();
    setUpChangeToLogInWindowButtonClickListener();
    // set up click on buttons connected with the make record window
    setUpMakeRecordButtonClickListener();
    setUpCloseMakeRecordWindowButtonClickListener();

    // greeting widget
    uploadGreetingsTitle();
    // other
    preventDefaultOnAllActiveLinks();
    setUpInputTypingValidationChecking();
}


/** Set up click behaviour on the log-in button in the top-bar */
function setUpLogInWindowButtonClickListener() {
    id("log-in-button").onclick = () => {
        // show log-in window in the top-bar rather than navigation buttons
        changeTopBarViewToAnother("logging-in");
    }
}
/** Set up click behaviour on the log-in button in the sign-in window */
function setUpChangeToLogInWindowButtonClickListener() {
    id("change-to-log-in-button").onclick = () => {
        // show log-in window in the top-bar rather than sign-up
        changeTopBarViewToAnother("logging-in");
    }
}
/** Set up click behaviour on the close button in the log-in window */
function setUpCloseLogInWindowButtonClickListener() {
    id("log-in-window-close-button").onclick = () => {
        // show navigation buttons in the top-bar rather than log-in window
        changeTopBarViewToAnother("navigation");
    }
}
/** Reset data in inputs in the log-in window */
function resetLogInWindowInputData() {
    // login
    id("log-in-login-input").value = null;
    if (id("log-in-login-input").classList.contains("validation-checking"))
        id("log-in-login-input").classList.remove("validation-checking");
    // password
    id("log-in-password-input").value = null;
    if (id("log-in-password-input").classList.contains("validation-checking"))
        id("log-in-password-input").classList.remove("validation-checking");
}
/**  */
function setUpLogInSubmitButtonClickListener() {
    id("log-in-submit-button").onclick = (e) => {
        // changeTopBarViewToAnother("navigation");
    }
}


/** Set up click behaviour on the sign-in button in the log-in window */
function setUpChangeToSignUpWindowButtonClickListener() {
    id("change-to-sign-up-button").onclick = () => {
        // show sign-up window in the top-bar rather than log-in window
        changeTopBarViewToAnother("signing-up");
    }
}
/** Set up click behaviour on close button in the sign-up window */
function setUpCloseSignUpWindowButtonClickListener() {
    id("sign-up-window-close-button").onclick = () => {
        // show navigation buttons in the top-bar rather than sign-up window
        changeTopBarViewToAnother("navigation");
    }
}
/** Reset data in inputs in the sign-up window */
function resetSignUpWindowInputData() {
    // reset login
    id("sign-up-login-input").value = null;
    if (id("sign-up-login-input").classList.contains("validation-checking"))
        id("sign-up-login-input").classList.remove("validation-checking");
    // reset password
    id("sign-up-password-input").value = null;
    if (id("sign-up-password-input").classList.contains("validation-checking"))
        id("sign-up-password-input").classList.remove("validation-checking");
    // reset repeat password
    id("sign-up-repeat-password-input").value = null;
    if (id("sign-up-repeat-password-input").classList.contains("validation-checking"))
        id("sign-up-repeat-password-input").classList.remove("validation-checking");
    // hide "passwords do not match" error massage
    if (id("sign-up-password-err-msg").classList.contains("visible"))
        id("sign-up-password-err-msg").classList.remove("visible");
}

/** Set up click behaviour on the submit button in the sign-up form */
function setUpSignUpSubmitButtonClickListener() {
    id("sign-up-submit-button").onclick = (submitEvent) => {

        // validate inputs in the sign-up window,
        // check if the login already exists in the JSON file
        if (!checkSignUpFormValidation(
            id("sign-up-login-input").value,
            id("sign-up-password-input").value,
            id("sign-up-password-confirmation-input").value,
            id("sign-up-login-err-msg"),
            id("sign-up-password-err-msg"),
            id("sign-up-password-confirmation-err-msg")
        )) {
            submitEvent.preventDefault();
            return;
        }

        // show navigation buttons in the top-bar rather than sign-up window
        changeTopBarViewToAnother("navigation");
    }
}

/** check data validation in inputs in the sign-up window
 * @param {string} login
 * @param {string} password
 * @param {string} passwordConfirmation
 * @param {HTMLElement} loginErrMsgField login input element
 * @param {HTMLElement} passwordErrMsgField password input element
 * @param {HTMLElement} passwordConfirmErrMsgField password confirmation input element */
function checkSignUpFormValidation(
    login, password, passwordConfirmation,
    loginErrMsgField, passwordErrMsgField, passwordConfirmErrMsgField
) {

    if (!checkForSignUpLoginValidation(login, loginErrMsgField))
        return false;

    if (!checkForSignUpPasswordValidation(password, passwordConfirmation, passwordErrMsgField, passwordConfirmErrMsgField))
        return false;

    // if all validation checking above were passed, return TRUE
    return true;
}

/** check login validation in inputs in the sign-up window
 * @param {string} login
 * @param {HTMLElement} loginErrMsgField login input element */
function checkForSignUpLoginValidation(login, loginErrMsgField) {

    // if login length is invalid, show corresponding message and return FALSE
    if (login.length < 4) {
        loginErrMsgField.innerText = "*At least 4 characters long";
        loginErrMsgField.classList.add("visible");
        return false;
        // if the opposite, hide this message
    } else if (loginErrMsgField.classList.contains("visible")) {
        loginErrMsgField.classList.remove("visible");
    }

    // if there is an account with this login, show corresponding message and return FALSE
    checkIfLoginAlreadyExists(login)
    if(checkIfLoginAlreadyExists(login)) {
        loginErrMsgField.innerText = "*Login already exist";
        loginErrMsgField.classList.add("visible");
        return false;
        // if not, hide this message
    } else if (loginErrMsgField.classList.contains("visible")) {
        loginErrMsgField.classList.remove("visible");
    }

    return true;
}

/** check if login already exists
 * @param {string} login
 * @return {boolean}
 */
async function checkIfLoginAlreadyExists(login) {
    try {
        let response = await fetch("../data/users.json");

        if (!response.ok) return false;

        let data = await response.json();
        return findLoginInData(login, data);

    } catch (error) {
        return false;
    }
}

/** check if passed data contains passed login
 * @param {string} login
 * @param {string} data
 * @return {boolean} */
function findLoginInData(login, data) {
    return false
}

/** check password validation in inputs in the sign-up window
 * @param {string} password
 * @param {string} passwordConfirmation
 * @param {HTMLElement} passwordErrMsgField password input element
 * @param {HTMLElement} passwordConfirmErrMsgField password confirmation input element */
function checkForSignUpPasswordValidation(
    password, passwordConfirmation,
    passwordErrMsgField, passwordConfirmErrMsgField
) {

    // if password length is invalid, show corresponding message and return FALSE
    if (password.length < 8) {
        passwordErrMsgField.innerText = "*At least 8 characters long";
        passwordErrMsgField.classList.add("visible");
        return false
        // if the opposite, hide this message
    } else if (passwordErrMsgField.classList.contains("visible")) {
        passwordErrMsgField.classList.remove("visible");
    }

    // if password and confirmation password are different, show corresponding message and return FALSE
    if (password !== passwordConfirmation) {
        passwordConfirmErrMsgField.innerText = "*Passwords do not match";
        passwordConfirmErrMsgField.classList.add("visible");
        return false
        // if the opposite, hide this message
    } else if (passwordConfirmErrMsgField.classList.contains("visible")) {
        passwordConfirmErrMsgField.classList.remove("visible");
    }

    return true
}

// function sendDataToPhp(signUpForm) {
//     let request = new XMLHttpRequest();
//     request.open("POST", "zwa.toad.cz/~volodyeh/TravelGlance/sign-up-process.php");
//     request.send(signUpForm);
// }

// open make record window button
function setUpMakeRecordButtonClickListener() {
    id("make-record-button").onclick = () => {
        changeTopBarViewToAnother("making-record");
    }
}

// close make record window button
function setUpCloseMakeRecordWindowButtonClickListener() {
    id("make-record-window-close-button").onclick = () => {
        changeTopBarViewToAnother("navigation");
    }
}
function resetMakeRecordWindow() {
    id("make-record-date").value = null;
    id("make-record-amount").value = null;

    if (id("make-record-window").classList.contains("new")) {
        id("make-record-window").classList.remove("new");
    }
}

function changeTopBarViewToAnother(newView) {
    id("top-bar").classList.add("clicked");

    if (newView === "logging-in") {
        id("top-bar").classList.remove("navigation");
        if (id("top-bar").classList.contains("signing-up")) {
            id("top-bar").classList.remove("signing-up");
            setTimeout(() => {
                resetSignUpWindowInputData();
            }, 350);
        }
        id("top-bar").classList.add("logging-in");
    } else if (newView === "signing-up") {
        id("top-bar").classList.remove("navigation");
        if (id("top-bar").classList.contains("logging-in")) {
            id("top-bar").classList.remove("logging-in");
            setTimeout(() => {
                resetLogInWindowInputData();
            }, 350);
        }
        id("top-bar").classList.add("signing-up");
    } else if (newView === "making-record") {
        id("make-record-window").classList.add("new");
        id("top-bar").classList.remove("navigation");
        id("top-bar").classList.add("making-record");
    } else {

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
function setUpInputTypingValidationChecking() {
    let forms= document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++)
        setUpListenersForInputsInForm(forms[i]);
}


function uploadGreetingsTitle() {
    let greetingsTitleEl = id("greetings-title");
    let time = (new Date()).getHours();

    if (6 <= time && time <= 12) greetingsTitleEl.innerText = "Good morning!";
    else if (13 <= time && time <= 17) greetingsTitleEl.innerText = "Good afternoon!";
    else if (18 <= time && time <= 22) greetingsTitleEl.innerText = "Good evening!";
    else if (23 <= time || time <= 5) greetingsTitleEl.innerText = "Good night!";
}


function preventDefaultOnAllActiveLinks() {
    let links = document.querySelector(".secondary-button.current");
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = (e) => {
            e.preventDefault();
        }
    }
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

function resetMakeRecordWindowData () {

    // remove class to hide fields for transfer window and edit record window
    if (id('make-record-window').classList.contains('make-record-status'))
        id('make-record-window').classList.remove('make-record-status');
    else id('make-record-window').classList.remove('edit-record-status');

    // reset amount
    id('make-record-amount').value = null;
    setTypingListenerForInput(id('make-record-amount'));
    // reset category
    id('make-record-category-cont').classList.remove('make-record-category-cont-hide');
}

function calculateScaleX (clickEl, windowEl_cont) {
    return ( clickEl.offsetWidth / ( windowEl_cont.lastElementChild.offsetWidth ) );
}

function openFloatingWindow (clickEl, windowEl_cont, windowEl, scaleX) {
    let transition = `opacity .4s, transform .4s .03s`;

    windowEl_cont.classList.add('floating-window-cont-visible');

    clickEl.style.transition = transition;
    let windowEl_full_height = windowEl.clientHeight;
    let scaleY = scaleX / ((windowEl_full_height * scaleX) / clickEl.offsetHeight);

    let clickEl_position_X = (
        windowEl.getBoundingClientRect().left + (windowEl.offsetWidth / 2) - clickEl.getBoundingClientRect().left - (clickEl.offsetWidth / 2)
    ) * Math.max(scaleX, scaleY);
    let clickEl_position_Y = ( windowEl.getBoundingClientRect().top + (windowEl.offsetHeight / 2) - clickEl.getBoundingClientRect().top - (clickEl.offsetHeight / 2) ) * Math.max(scaleX, scaleY);

    windowEl.style.transform = `translate(0px, 0px) scale(${scaleX}, ${scaleY})`;

    let top_position = {
        x: clickEl.getBoundingClientRect().left - windowEl.getBoundingClientRect().left,
        y: clickEl.getBoundingClientRect().bottom - windowEl.getBoundingClientRect().bottom
    };

    windowEl.style.transform = `translate(${top_position.x}px, ${top_position.y}px) scale(${scaleX}, ${scaleY})`;

    setTimeout(() => {
        windowEl.style.transition = transition;
        windowEl_cont.classList.add('floating-window-cont-darker');

        clickEl.style.opacity = '0';
        clickEl.style.transform = `scale(${Math.min(1 * 1 / scaleX, 1 * 1 / scaleY)}) translate(${clickEl_position_X}px, ${clickEl_position_Y}px)`;
    }, 1);

    return top_position;
}

function closeFloatingWindow (clickEl, windowEl_cont, windowEl) {

    clickEl.style.transition = `opacity .5s, transform .4s`;
    clickEl.style.opacity = '1';
    clickEl.style.transform = 'scale(1) translateY(0px)';

    windowEl.style.transition = `opacity .35s .15s, transform .4s`;
    windowEl_cont.classList.remove('floating-window-cont-darker');

    setTimeout(() => {
        windowEl_cont.classList.remove('floating-window-cont-visible');
        windowEl.style.transform = 'translateY(0px) scale(1)';
        windowEl.style.transition = 'all 0s';

        clickEl.style.transition = null;
        clickEl.style.transform = null;
        clickEl.style.opacity = null;
    }, 390);
}


function getDateFormat (input_date) {

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
}

function disableScrolling () {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function() {
        window.scrollTo(x, y);
    };
}
function enableScrolling () {
    window.onscroll = function(){};
}