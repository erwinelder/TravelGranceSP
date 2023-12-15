/* ---------------------------- SIGN-UP ---------------------------- */


/** Reset data in inputs in the sign-up window. */
function resetSignUpWindowInputData() {
    // reset login
    id("sign-up-login-input").value = null;
    if (id("sign-up-login-input").classList.contains("validation-checking"))
        id("sign-up-login-input").classList.remove("validation-checking");
    // hide login error message
    if (id("sign-up-login-err-msg").classList.contains("visible"))
        id("sign-up-login-err-msg").classList.remove("visible");
    // reset password
    id("sign-up-password-input").value = null;
    if (id("sign-up-password-input").classList.contains("validation-checking"))
        id("sign-up-password-input").classList.remove("validation-checking");
    // hide password error message
    if (id("sign-up-password-err-msg").classList.contains("visible"))
        id("sign-up-password-err-msg").classList.remove("visible");
    // reset password confirmation
    id("sign-up-password-confirmation-input").value = null;
    if (id("sign-up-password-confirmation-input").classList.contains("validation-checking"))
        id("sign-up-password-confirmation-input").classList.remove("validation-checking");
    // hide password confirmation error message
    if (id("sign-up-password-confirmation-err-msg").classList.contains("visible"))
        id("sign-up-password-confirmation-err-msg").classList.remove("visible");
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
            id("sign-up-login-input"),
            id("sign-up-login-err-msg"),
            id("sign-up-password-input").value,
            id("sign-up-password-input"),
            id("sign-up-password-err-msg"),
            id("sign-up-password-confirmation-input").value,
            id("sign-up-password-confirmation-input"),
            id("sign-up-password-confirmation-err-msg")
        ))
            // if validation was passed, send form manually
            submitEvent.target.form.submit();
    }
}

/** Check data validation in the inputs in the sign-up window.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLElement} loginErrMsgField login error message field element
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLElement} passwordErrMsgField password error message field element
 * @param {string} passwordConfirm
 * @param {HTMLInputElement} passwordConfirmField password confirmation input element
 * @param {HTMLElement} passwordConfirmErrMsgField password confirmation error message field element
 * @return {Promise<boolean>} */
async function checkSignUpFormValidation(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField,
    passwordConfirm, passwordConfirmField, passwordConfirmErrMsgField
) {

    // validate login and save the result (boolean)
    let loginValidationResult =
        await checkSignUpLoginValidation(login, loginField, loginErrMsgField);
    // validate password and save the result (boolean)
    let passwordValidationResult =
        checkSignUpPasswordValidation(
            password, passwordField, passwordErrMsgField,
            passwordConfirm, passwordConfirmField, passwordConfirmErrMsgField
        );

    // if the result of any validation was false, return FALSE
    return (loginValidationResult && passwordValidationResult);
}

/** Check login validation in inputs in the sign-up window.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLElement} loginErrMsgField login error message field element */
async function checkSignUpLoginValidation(login, loginField, loginErrMsgField) {

    // if login length is invalid, show the corresponding message and return FALSE
    if (!validateLoginLength(login, loginField, loginErrMsgField))
        return false;

    // if there is an account with this login, show the corresponding message and return FALSE
    let loginCheckingResult = await checkIfLoginAlreadyExists(login);
    if(loginCheckingResult) {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Login already exists");
        return false;
    // if not, hide this message and mark the login field and valid
    } else if (loginErrMsgField.classList.contains("visible"))
        setFieldValidationStatus(true, loginField, loginErrMsgField);

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
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLElement} passwordErrMsgField password error message field element
 * @param {string} passwordConfirm
 * @param {HTMLInputElement} passwordConfirmField password confirmation input element
 * @param {HTMLElement} passwordConfirmErrMsgField password confirmation error message field element */
function checkSignUpPasswordValidation(
    password, passwordField, passwordErrMsgField,
    passwordConfirm, passwordConfirmField, passwordConfirmErrMsgField
) {

    // if password length is invalid, show corresponding message and return FALSE
    if (!validatePasswordLength(password, passwordField, passwordErrMsgField))
        return false;

    // if passwords match, returns TRUE, else returns FALSE
    return validatePasswordsMatching(password, passwordConfirm, passwordConfirmField, passwordConfirmErrMsgField)
}


/* ---------------------------- LOG-IN ---------------------------- */


/** Reset data in inputs in the log-in window. */
function resetLogInWindowInputData() {
    // login
    id("log-in-login-input").value = null;
    if (id("log-in-login-input").classList.contains("validation-checking"))
        id("log-in-login-input").classList.remove("validation-checking");
    id('log-in-login-err-msg').classList.remove("visible");
    // password
    id("log-in-password-input").value = null;
    if (id("log-in-password-input").classList.contains("validation-checking"))
        id("log-in-password-input").classList.remove("validation-checking");
    id('log-in-password-err-msg').classList.remove("visible");
}

/** Set up click behaviour on the submit button in the log-in form. */
function setUpLogInSubmitButtonClickListener() {
    id("log-in-submit-button").onclick = async (submitEvent) => {
        let login = id("log-in-login-input").value,
            loginField = id("log-in-login-input"),
            loginErrMsgField = id("log-in-login-err-msg"),
            password = id("log-in-password-input").value,
            passwordField = id("log-in-password-input"),
            passwordErrMsgField = id("log-in-password-err-msg");

        // prevent the form to be sent so async/await validation can be checked properly
        // and the form definitely will not be sent if validation is not passed
        submitEvent.preventDefault();

        // validate inputs data and exit function if the validation failed
        if (!checkLogInFormValidation(
            login, loginField, loginErrMsgField, password, passwordField, passwordErrMsgField
        ))
            return;

        // check if log-in data exist in the JSON file (if exists, returns TRUE, else returns FALSE)
        if (await attemptLogIn(
            login, loginField, loginErrMsgField, password, passwordField, passwordErrMsgField
        ))
            location.reload();
    }
}

/** Check inputs data validation in the log-in window.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLElement} loginErrMsgField login error message field element
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLElement} passwordErrMsgField password error message field element
 * @return {boolean} */
async function checkLogInFormValidation(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField
) {

    // validate login length and save the result (boolean)
    let loginValidationResult =
        validateLoginLength(login, loginField, loginErrMsgField);
    // validate password length and save the result (boolean)
    let passwordValidationResult =
        validatePasswordLength(password, passwordField, passwordErrMsgField);

    // if any result of some validation was false, returns FALSE
    return loginValidationResult && passwordValidationResult;
}

/** Check the log-in data.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLElement} loginErrMsgField login error message field element
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLElement} passwordErrMsgField password error message field element
 * @return {Promise<Boolean>} */
async function attemptLogIn(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField
) {
    // check if log-in data exist in the JSON file, returns object of 2 boolean values (for login and password)
    let userDataCheckObject = await checkIfLogInDataExist(login, password);

    // if the login was found in the JSON file and the password matches,
    // mark login and password inputs as valid and return TRUE
    if (userDataCheckObject.loginExists && userDataCheckObject.passwordMatches) {
        setFieldValidationStatus(true, loginField, loginErrMsgField);
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);
        return true;
    }

    // if the login was found in the JSON file but the password does not match,
    // mark login input as valid and password input as invalid
    if (userDataCheckObject.loginExists && !userDataCheckObject.passwordMatches) {
        setFieldValidationStatus(true, loginField, loginErrMsgField);
        setFieldValidationStatus(false, passwordField, passwordErrMsgField, "Password does not match");
    }

    // if the login was not found in the JSON file,
    // mark login input as invalid and password input as valid
    if (!userDataCheckObject.loginExists) {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Login does not exist");
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);
    }

    // if the login was not found or the password does not match, return FALSE
    return false;
}

/** Check if the login already exists.
 * @param {string} login
 * @param {string} password
 * @return {Promise<UserDataCheck>} */
async function checkIfLogInDataExist(login, password) {
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


/* ---------------------------- LOG-OUT ---------------------------- */


/** Set up click behaviour on the log-out button in the navigation top bar. */
function setUpLogOutButtonClickListener() {
    id("log-out-button").onclick = () => {
        // make fetch request to the PHP script to delete all relative session variables and to destroy a PHP session
        fetch("../php/log-out-process.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error during logout");
            })
            .catch(error => {
                console.log("Error during logout: ", error);
            });

        // redirect to the index.php page
        location.href = "../index.php";
    }
}


/* ---------------------------- EDIT ACCOUNT DATA ---------------------------- */


/** Reset data in inputs in the edit account window. */
function resetEditAccountWindowInputData() {
    // reset login
    id("edit-account-login-input").value = null;
    if (id("edit-account-login-input").classList.contains("validation-checking"))
        id("edit-account-login-input").classList.remove("validation-checking");
    // hide login error message
    if (id("edit-account-login-err-msg").classList.contains("visible"))
        id("edit-account-login-err-msg").classList.remove("visible");
    // reset password
    id("edit-account-password-input").value = null;
    if (id("edit-account-password-input").classList.contains("validation-checking"))
        id("edit-account-password-input").classList.remove("validation-checking");
    // reset password
    id("edit-account-new-password-input").value = null;
    if (id("edit-account-new-password-input").classList.contains("validation-checking"))
        id("edit-account-new-password-input").classList.remove("validation-checking");
    // hide password error message
    if (id("edit-account-new-password-err-msg").classList.contains("visible"))
        id("edit-account-new-password-err-msg").classList.remove("visible");
    // reset password confirmation
    id("edit-account-new-password-confirmation-input").value = null;
    if (id("edit-account-new-password-confirmation-input").classList.contains("validation-checking"))
        id("edit-account-new-password-confirmation-input").classList.remove("validation-checking");
    // hide password confirmation error message
    if (id("edit-account-new-password-confirmation-err-msg").classList.contains("visible"))
        id("edit-account-new-password-confirmation-err-msg").classList.remove("visible");
}

/** Set up click behaviour on the submit button in the edit account data window. */
function setUpEditAccountSubmitButtonClickListener() {
    id("edit-account-submit-button").onclick = async (submitEvent) => {
        // prevent the form to be sent so async/await validation can be checked properly
        // and the form definitely will not be sent if validation does not pass
        submitEvent.preventDefault();

        // validate inputs data in the sign-up window
        if (await checkEditAccountFormValidation(
            id("edit-account-login-input").value,
            id("edit-account-login-input"),
            id("edit-account-login-err-msg"),
            id("edit-account-password-input").value,
            id("edit-account-password-input"),
            id("edit-account-password-err-msg"),
            id("edit-account-new-password-input").value,
            id("edit-account-new-password-input"),
            id("edit-account-new-password-err-msg"),
            id("edit-account-new-password-confirmation-input").value,
            id("edit-account-new-password-confirmation-input"),
            id("edit-account-new-password-confirmation-err-msg")
        ))
            // if validation was passed, send form manually
            submitEvent.target.form.submit();
    }
}

/** Check data validation in the inputs in the edit account window.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLElement} loginErrMsgField login error message field element
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLElement} passwordErrMsgField password error message field element
 * @param {string} newPassword
 * @param {HTMLInputElement} newPasswordField new password input element
 * @param {HTMLElement} newPasswordErrMsgField new password error message field element
 * @param {string} newPasswordConfirm
 * @param {HTMLInputElement} newPasswordConfirmField new password confirmation input element
 * @param {HTMLElement} newPasswordConfirmErrMsgField new password confirmation error message field element
 * @return {Promise<boolean>} */
async function checkEditAccountFormValidation(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField,
    newPassword, newPasswordField, newPasswordErrMsgField,
    newPasswordConfirm, newPasswordConfirmField, newPasswordConfirmErrMsgField
) {

    // validate login and save the result (boolean)
    let loginValidationResult =
        await checkEditAccountLoginValidation(login, loginField, loginErrMsgField);
    // validate password and save the result (boolean)
    let passwordValidationResult =
        checkEditAccountPasswordValidation(
            password, passwordField, passwordErrMsgField,
            newPassword, newPasswordField, newPasswordErrMsgField,
            newPasswordConfirm, newPasswordConfirmField, newPasswordConfirmErrMsgField
        );

    // if the result of any validation was false, return FALSE
    return (loginValidationResult && passwordValidationResult);
}

/** Check login validation in inputs in the sign-up window.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLElement} loginErrMsgField login error message field element */
async function checkEditAccountLoginValidation(login, loginField, loginErrMsgField) {

    // if login length is invalid, show the corresponding message and return FALSE
    if (!validateLoginLength(login, loginField, loginErrMsgField))
        return false;

    // if there is an account with this login, show the corresponding message and return FALSE
    let loginCanBeChanged = await checkIfLoginCanBeChanged(login);
    if(!loginCanBeChanged) {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Login already exists");
        return false;
        // if not, hide this message and mark the login field and valid
    } else if (loginErrMsgField.classList.contains("visible"))
        setFieldValidationStatus(true, loginField, loginErrMsgField);

    return true;
}

/** Check if the login can be changed. If passed login is the same as that one in the PHP session or
 * if passed login is available, returns TRUE, else returns FALSE.
 * @param {string} login
 * @return {Promise<boolean>}
 */
async function checkIfLoginCanBeChanged(login) {
    return fetch("../php/login-change-checking.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Login change possibility checking failed.");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during checking login change possibility (${login}): ${error}`);
            return false;
        });
}

/** Check password validation in inputs in the edit account window.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLElement} passwordErrMsgField password error message field element
 * @param {string} newPassword
 * @param {HTMLInputElement} newPasswordField new password input element
 * @param {HTMLElement} newPasswordErrMsgField new password error message field element
 * @param {string} newPasswordConfirm
 * @param {HTMLInputElement} newPasswordConfirmField new password confirmation input element
 * @param {HTMLElement} newPasswordConfirmErrMsgField new password confirmation error message field element */
function checkEditAccountPasswordValidation(
    password, passwordField, passwordErrMsgField,
    newPassword, newPasswordField, newPasswordErrMsgField,
    newPasswordConfirm, newPasswordConfirmField, newPasswordConfirmErrMsgField
) {

    // if password length is invalid, show corresponding message and return FALSE
    if (!validatePasswordLength(password, passwordField, passwordErrMsgField))
        return false;

    // if password is not filled out, it means user does not want to change it, so it returns TRUE
    if (newPassword.length === 0 && newPasswordConfirm.length === 0)
        return true;

    // if new password length is invalid, show corresponding message and return FALSE
    if (!validatePasswordLength(newPassword, newPasswordField, newPasswordErrMsgField))
        return false;

    // if new passwords match, returns TRUE, else returns FALSE
    return validatePasswordsMatching(newPassword, newPasswordConfirm, newPasswordConfirmField, newPasswordConfirmErrMsgField)
}


/* ---------------------------- OTHER ---------------------------- */


/** Check if the login has valid length. Returns TRUE, if the length is valid, and FALSE, if not.
 * @param {string} login
 * @param {HTMLInputElement} loginField login input element
 * @param {HTMLInputElement} loginErrMsgField login error message field element */
function validateLoginLength(login, loginField, loginErrMsgField) {

    // if login length is invalid, show the corresponding message and return FALSE
    if (login.length < 4) {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "At least 4 characters long");
        return false;
    } else if (login.length > 20) {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Max 20 characters long");
        return false;
    // if the opposite, hide this message and mark login field as valid
    } else if (loginErrMsgField.classList.contains("visible"))
        setFieldValidationStatus(true, loginField, loginErrMsgField);

    return true;
}

/** Check if the password has valid length. Returns TRUE, if the length is valid, and FALSE, if not.
 * @param {string} password
 * @param {HTMLInputElement} passwordField password input element
 * @param {HTMLInputElement} passwordErrMsgField password error message field element */
function validatePasswordLength(password, passwordField, passwordErrMsgField) {

    // if password length is invalid, show the corresponding message and return FALSE
    if (password.length < 8) {
        setFieldValidationStatus(false, passwordField, passwordErrMsgField, "At least 8 characters long");
        return false;
    } else if (password.length > 40) {
        setFieldValidationStatus(false, passwordField, passwordErrMsgField, "Max 40 characters long");
        return false;
    // if the opposite, hide this message and mark login field as valid
    } else if (passwordErrMsgField.classList.contains("visible"))
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);

    return true;
}

/** Check if the passwords match. Returns TRUE, if the passwords match, and FALSE, if not.
 * @param {string} password
 * @param {string} passwordConfirm
 * @param {HTMLInputElement} passwordConfirmField password confirmation input element
 * @param {HTMLElement} passwordConfirmErrMsgField password confirmation error message field element */
function validatePasswordsMatching(
    password, passwordConfirm, passwordConfirmField, passwordConfirmErrMsgField,
) {

    // if password and confirmation password are different, show the corresponding message and return FALSE
    if (password !== passwordConfirm) {
        setFieldValidationStatus(false, passwordConfirmField, passwordConfirmErrMsgField, "Passwords do not match");
        return false;
        // if the opposite, hide this message
    } else if (passwordConfirmErrMsgField.classList.contains("visible"))
        setFieldValidationStatus(true, passwordConfirmField, passwordConfirmErrMsgField);

    return true;
}

/** Add the field an invalid attribute
 * @param {boolean} isValid mark the field as valid
 * @param {HTMLInputElement} field field DOM element to set validity to
 * @param {HTMLElement} errMsgField HTML element to put the error message in
 * @param {string} message message to display in the error message field (is empty by default) */
function setFieldValidationStatus(isValid, field, errMsgField, message = "") {
    if (isValid) {
        errMsgField.classList.remove("visible");
        field.setCustomValidity(message);
    } else {
        if (message.length > 0) {
            errMsgField.innerText = "*" + message;
            errMsgField.classList.add("visible");
        }
        field.setCustomValidity(message);
    }
}


/** Add input event listener to the passed login field to check its length validity.
 * @param {HTMLInputElement} field input field element
 * @param {HTMLElement} fieldErrMsgField input error message field element */
function addInputListenersToLoginInputField(field, fieldErrMsgField) {
    field.addEventListener("input", () => {
        if (field.value.length > 0)
            validateLoginLength(field.value, field, fieldErrMsgField);
        else setFieldValidationStatus(true, field, fieldErrMsgField);
    });
}

/** Add input event listener to the passed password field to check its length validity.
 * @param {HTMLInputElement} field input field element
 * @param {HTMLElement} fieldErrMsgField input error message field element */
function addInputListenersToPasswordInputField(field, fieldErrMsgField) {
    field.addEventListener("input", () => {
        if (field.value.length > 0)
            validatePasswordLength(field.value, field, fieldErrMsgField);
        else setFieldValidationStatus(true, field, fieldErrMsgField);
    });
}

/** Add input event listener to the passed password confirmation field to check if passwords match.
 * @param {HTMLInputElement} passField password input element
 * @param {HTMLInputElement} passConfirmField password confirmation input element
 * @param {HTMLElement} passConfirmFieldErrMsgField password confirmation error message field element */
function addInputListenersToPasswordConfirmInputField(passField, passConfirmField, passConfirmFieldErrMsgField) {
    passConfirmField.addEventListener("input", () => {
        if (passConfirmField.value.length > 0)
            validatePasswordsMatching(
                passField.value, passConfirmField.value, passConfirmField, passConfirmFieldErrMsgField
            );
        else setFieldValidationStatus(true, passConfirmField, passConfirmFieldErrMsgField);
    });
}
