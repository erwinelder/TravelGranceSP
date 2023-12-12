/** Reset data in inputs in the log-in window. */
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
/** Set up click behaviour on the submit button in the log-in form. */
function setUpLogInSubmitButtonClickListener() {
    id("log-in-submit-button").onclick = async (submitEvent) => {
        // prevent the form to be sent so async/await validation can be checked properly
        // and the form definitely will not be sent if validation is not passed
        submitEvent.preventDefault();

        // construct new user with the entered login and password
        let user = new User(
            id("log-in-login-input").value,
            id("log-in-password-input").value
        )

        // validate inputs data in the sign-up window and exit function if validation was failed
        if (await checkLogInFormValidation(
            user.login,
            id("log-in-login-input"),
            id("log-in-login-err-msg"),
            user.password,
            id("log-in-password-input"),
            id("log-in-password-err-msg")
        )) {
            alert("User was successfully logged in. TRUE was saved in the session storage");
            sessionStorage.setItem("isLoggedIn", "true");
        }
    }
}


/** Reset data in inputs in the sign-up window. */
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
    id("sign-up-password-confirmation-input").value = null;
    if (id("sign-up-password-confirmation-input").classList.contains("validation-checking"))
        id("sign-up-password-confirmation-input").classList.remove("validation-checking");
    // hide "passwords do not match" error massage
    if (id("sign-up-password-err-msg").classList.contains("visible"))
        id("sign-up-password-err-msg").classList.remove("visible");
}

/** Set up click behaviour on the submit button in the sign-up form. */
function setUpSignUpSubmitButtonClickListener() {
    id("sign-up-submit-button").onclick = async (submitEvent) => {
        // prevent the form to be sent so async/await validation can be checked properly
        // and the form definitely will not be sent if validation is not passed
        submitEvent.preventDefault();

        // validate inputs data in the sign-up window
        if (await checkSignUpFormValidation(
            id("sign-up-login-input").value,
            id("sign-up-password-input").value,
            id("sign-up-password-confirmation-input").value,
            id("sign-up-login-input"),
            id("sign-up-login-err-msg"),
            id("sign-up-password-err-msg"),
            id("sign-up-password-confirmation-err-msg")
        ))
            // if validation was passed, send form manually
            submitEvent.target.form.submit();
    }
}

/** Check data validation in the inputs in the sign-up window.
 * @param {string} login
 * @param {string} password
 * @param {string} passwordConfirmation
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLInputElement} loginErrMsgField login input element
 * @param {HTMLInputElement} passwordErrMsgField password input element
 * @param {HTMLInputElement} passwordConfirmErrMsgField password confirmation input element */
async function checkSignUpFormValidation(
    login, password, passwordConfirmation, loginField,
    loginErrMsgField, passwordErrMsgField, passwordConfirmErrMsgField
) {

    // validate login and save the result
    let loginValidationResult =
        await checkSignUpLoginValidation(login, loginField, loginErrMsgField);
    // validate password and save the result
    let passwordValidationResult =
        checkSignUpPasswordValidation(password, passwordConfirmation, passwordErrMsgField, passwordConfirmErrMsgField);

    // if a result of some validation was false, return FALSE
    return (loginValidationResult && passwordValidationResult);
}

/** Check login validation in inputs in the sign-up window.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLInputElement} loginErrMsgField login input DOM element */
async function checkSignUpLoginValidation(login, loginField, loginErrMsgField) {
    let loginLengthErrMsg = "*At least 4 characters long";
    let loginExistenceErrMsg = "*Login already exist";

    // if login length is invalid, show the corresponding message and return FALSE
    if (login.length < 4) {
        loginErrMsgField.innerText = loginLengthErrMsg;
        loginErrMsgField.classList.add("visible");
        return false;
        // if the opposite, hide this message
    } else if (loginErrMsgField.innerText === loginLengthErrMsg)
        loginErrMsgField.classList.remove("visible");

    // if there is an account with this login, show the corresponding message and return FALSE
    let loginCheckingResult = await checkIfLoginAlreadyExists(login);
    if(loginCheckingResult) {
        loginErrMsgField.innerText = loginExistenceErrMsg;
        loginErrMsgField.classList.add("visible");
        loginField.setCustomValidity("Login already exists");
        return false;
        // if not, hide this message
    } else if (loginErrMsgField.innerText === loginExistenceErrMsg) {
        loginErrMsgField.classList.remove("visible");
        loginField.setCustomValidity("");
    }

    return true;
}

/** Check if the login already exists.
 * @param {string} searchedLogin
 * @return {Promise<boolean>}
 */
async function checkIfLoginAlreadyExists(searchedLogin) {
    return fetch("../php/login-checking.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchedLogin)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Login checking failed.");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during checking login: ${error}`);
            return false;
        });
}

/** Check password validation in inputs in the sign-up window.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} password
 * @param {string} passwordConfirmation
 * @param {HTMLElement} passwordErrMsgField password input element
 * @param {HTMLElement} passwordConfirmErrMsgField password confirmation input element */
function checkSignUpPasswordValidation(
    password, passwordConfirmation,
    passwordErrMsgField, passwordConfirmErrMsgField
) {

    // if password length is invalid, show corresponding message and return FALSE
    if (password.length < 8) {
        passwordErrMsgField.innerText = "*At least 8 characters long";
        passwordErrMsgField.classList.add("visible");
        return false;
        // if the opposite, hide this message
    } else if (passwordErrMsgField.classList.contains("visible"))
        passwordErrMsgField.classList.remove("visible");

    // if password and confirmation password are different, show corresponding message and return FALSE
    if (password !== passwordConfirmation) {
        passwordConfirmErrMsgField.innerText = "*Passwords do not match";
        passwordConfirmErrMsgField.classList.add("visible");
        return false;
        // if the opposite, hide this message
    } else if (passwordConfirmErrMsgField.classList.contains("visible"))
        passwordConfirmErrMsgField.classList.remove("visible");

    return true;
}


/* ---------------------------- LOGIN ---------------------------- */


/** Check data validation in the inputs in the log-in window.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLInputElement} loginErrMsgField login input element
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLInputElement} passwordErrMsgField password input element */
async function checkLogInFormValidation(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField
) {
    // validate login and save the result
    let loginValidationResult =
        checkLoginValidation(login, loginField, loginErrMsgField);
    // validate password and save the result
    let passwordValidationResult =
        checkPasswordValidation(password, passwordErrMsgField);

    // if a result of some validation was false, return FALSE
    if (!(loginValidationResult && passwordValidationResult))
        return (loginValidationResult && passwordValidationResult);

    // check if log-in data exist in the JSON file
    return await checkIfLogInDataExist(
        login, loginField, loginErrMsgField,
        password, passwordField, passwordErrMsgField
    );
}

/** Check login validation. If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLInputElement} loginErrMsgField login input DOM element */
function checkLoginValidation(login, loginField, loginErrMsgField) {
    let loginLengthErrMsg = "*At least 4 characters long";

    // if login length is invalid, show the corresponding message and return FALSE
    if (login.length < 4) {
        loginErrMsgField.innerText = loginLengthErrMsg;
        loginErrMsgField.classList.add("visible");
        return false;
        // if the opposite, hide this message
    } else if (loginErrMsgField.innerText === loginLengthErrMsg)
        loginErrMsgField.classList.remove("visible");

    return true;
}

/** Check password validation. If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} password
 * @param {HTMLElement} passwordErrMsgField password input element */
function checkPasswordValidation(password, passwordErrMsgField) {

    // if password length is invalid, show corresponding message and return FALSE
    if (password.length < 8) {
        passwordErrMsgField.innerText = "*At least 8 characters long";
        passwordErrMsgField.classList.add("visible");
        return false;
        // if the opposite, hide this message
    } else if (passwordErrMsgField.classList.contains("visible"))
        passwordErrMsgField.classList.remove("visible");

    return true;
}

/** Check the log-in data.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLInputElement} loginErrMsgField login input element
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLInputElement} passwordErrMsgField password input element
 * @return {Promise<Boolean>} */
async function checkIfLogInDataExist(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField
) {
    let loginErrMsg = "Login does not exist";
    let passwordErrMsg = "Password does not match";

    // check if log-in data exist in the JSON file, returns object of 2 boolean values (for login and password)
    let userDataCheckObject = await checkIfLogInDataExistInTheJSON(login, password);

    // if the login was found in the JSON file and the password matches, return TRUE
    if (userDataCheckObject.loginExists && userDataCheckObject.passwordMatches) {
        makeFieldInvalid();
        loginField.setCustomValidity("");
        passwordField.setCustomValidity("");
        return userDataCheckObject.loginExists && userDataCheckObject.passwordMatches
    }

    // if the login was found in the JSON file but the password does not match
    if (userDataCheckObject.loginExists && !userDataCheckObject.passwordMatches) {
        passwordErrMsgField.innerText = "*" + passwordErrMsg;
        passwordErrMsgField.classList.add("visible");
        loginField.setCustomValidity("");
        passwordField.setCustomValidity(passwordErrMsg);
    }

    // if the login was not found in the JSON file
    if (!userDataCheckObject.loginExists) {
        loginErrMsgField.innerText = "*" + loginErrMsg;
        loginErrMsgField.classList.add("visible");
        loginField.setCustomValidity(loginErrMsg);
        passwordField.setCustomValidity("");
    }

    // if the login was not found of the password does not match, return FALSE
    return false;
}

/** Check if the login already exists.
 * @param {string} login
 * @param {string} password
 * @return {Promise<UserDataCheck>} */
async function checkIfLogInDataExistInTheJSON(login, password) {
    return fetch("../php/log-in-process.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Log-in checking failed.");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during checking log-in data: ${error}`);
            return new UserDataCheck(false, false);
        });
}


/* ---------------------------------------------- */


/** Add the field an invalid attribute */
function makeFieldInvalid(field, message) {

}


// function sendDataToPhp(string) {
//     let request = new XMLHttpRequest();
//     request.open("POST", "http://zwa.toad.cz/~volodyeh/sign-up-process.php");
//     request.send(string);
// }