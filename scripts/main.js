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

class UserDataCheck {
    loginExists;
    passwordMatches;

    constructor(loginExists, passwordMatches) {
        this.loginExists = loginExists;
        this.passwordMatches = passwordMatches;
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


/** After page was loaded, call function to operate with elements (set up clicks on buttons, etc.). */
window.addEventListener("load", setUpPageOnLoad);


/** make different operations with elements after they were loaded on the page. */
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