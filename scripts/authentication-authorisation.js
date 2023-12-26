/* ---------------------------- SIGN-UP ---------------------------- */


/**
 * Reset inputs data in the sign-up window.
 */
function resetSignUpWindowInputData() {
    let loginInput = id("sign-up-login-input"),
        loginErrMsgField = id("sign-up-login-err-msg"),
        passwordInput = id("sign-up-password-input"),
        passwordErrMsgField = id("sign-up-password-err-msg"),
        passwordConfirmInput = id("sign-up-password-confirmation-input"),
        passwordConfirmErrMsgField = id("sign-up-password-confirmation-err-msg");

    // reset login
    loginInput.value = null;
    if (loginInput.classList.contains("validation-checking"))
        loginInput.classList.remove("validation-checking");
    // hide login error message
    if (loginErrMsgField.classList.contains("visible"))
        loginErrMsgField.classList.remove("visible");

    // reset password
    passwordInput.value = null;
    if (passwordInput.classList.contains("validation-checking"))
        passwordInput.classList.remove("validation-checking");
    // hide password error message
    if (passwordErrMsgField.classList.contains("visible"))
        passwordErrMsgField.classList.remove("visible");

    // reset password confirmation
    passwordConfirmInput.value = null;
    if (passwordConfirmInput.classList.contains("validation-checking"))
        passwordConfirmInput.classList.remove("validation-checking");
    // hide password confirmation error message
    if (passwordConfirmErrMsgField.classList.contains("visible"))
        passwordConfirmErrMsgField.classList.remove("visible");
}

/**
 * Add click listener to the sign-up submit button.
 * On click, it will validate sign-up form and sent it after the success.
 */
function addClickListenerToSignUpSubmitButton() {
    id("sign-up-submit-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        let loginField = id("sign-up-login-input"),
            loginErrMsgField = id("sign-up-login-err-msg"),
            passwordField = id("sign-up-password-input"),
            passwordErrMsgField = id("sign-up-password-err-msg"),
            passwordConfirmField = id("sign-up-password-confirmation-input"),
            passwordConfirmErrMsgField = id("sign-up-password-confirmation-err-msg"),
            fileField = id("sign-up-avatar-input"),
            fileErrMsgField = id("sign-up-avatar-err-msg");

        let loginValidationResult = await validateLogin(loginField, loginErrMsgField);
        let passwordValidationResult =
            validatePassword(
                passwordField, passwordErrMsgField,
                passwordConfirmField, passwordConfirmErrMsgField
            );
        let fileValidationResult = validateFile(fileField, fileErrMsgField);

        if (loginValidationResult && passwordValidationResult && fileValidationResult)
            submitEvent.target.form.submit();
    }
}

/**
 * Check if the login already exists.
 *
 * @param {string} login - Searched login string.
 *
 * @return {Promise<boolean>} - TRUE if the login already exists in the user.json file and FALSE otherwise.
 */
async function checkIfLoginExistsInJson(login) {
    return fetch("/~volodyeh/php/login-searching-process.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
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


/* ---------------------------- LOG-IN ---------------------------- */


/**
 * Reset inputs data in the log-in window.
 */
function resetLogInWindowInputData() {
    let loginInput = id("log-in-login-input"),
        loginErrMsgField = id('log-in-login-err-msg'),
        passwordInput = id("log-in-password-input"),
        passwordErrMsgField = id('log-in-password-err-msg');

    // login
    loginInput.value = null;
    if (loginInput.classList.contains("validation-checking"))
        loginInput.classList.remove("validation-checking");
    loginErrMsgField.classList.remove("visible");

    // password
    passwordInput.value = null;
    if (passwordInput.classList.contains("validation-checking"))
        passwordInput.classList.remove("validation-checking");
    passwordErrMsgField.classList.remove("visible");
}

/**
 * Add click listener to the log-in submit button.
 * On click, it will validate log-in form and attempt log-in. The page will be reloaded after the success.
 */
function addClickListenerToLogInSubmitButton() {
    id("log-in-submit-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        let login = id("log-in-login-input").value,
            loginField = id("log-in-login-input"),
            loginErrMsgField = id("log-in-login-err-msg"),
            password = id("log-in-password-input").value,
            passwordField = id("log-in-password-input"),
            passwordErrMsgField = id("log-in-password-err-msg");

        let loginValidationResult =
            validateLoginLength(loginField, loginErrMsgField) && validateLoginChars(loginField, loginErrMsgField);
        let passwordValidationResult =
            validatePasswordLength(passwordField, passwordErrMsgField);

        if (!(loginValidationResult && passwordValidationResult))
            return;

        let logInResult = await attemptLogIn(
            login, loginField, loginErrMsgField, password, passwordField, passwordErrMsgField
        );
        if (logInResult)
            location.reload();
    }
}

/**
 * Attempt log-in.
 *
 * @param {string} login - Login string.
 * @param {HTMLInputElement} loginField - Login input element.
 * @param {HTMLElement} loginErrMsgField - Login error message field element.
 * @param {string} password - Password string.
 * @param {HTMLInputElement} passwordField - Password input element.
 * @param {HTMLElement} passwordErrMsgField - Password error message field element.
 *
 * @return {Promise<boolean>} - TRUE if log-in was success and FALSE otherwise.
 */
async function attemptLogIn(
    login, loginField, loginErrMsgField,
    password, passwordField, passwordErrMsgField
) {
    let userDataCheckObject = await checkIfLogInDataExist(login, password);

    if (userDataCheckObject.loginExists && userDataCheckObject.passwordMatches) {
        setFieldValidationStatus(true, loginField, loginErrMsgField);
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);
        return true;
    }

    if (userDataCheckObject.loginExists && !userDataCheckObject.passwordMatches) {
        setFieldValidationStatus(true, loginField, loginErrMsgField);
        setFieldValidationStatus(false, passwordField, passwordErrMsgField, "Password does not match");
    }

    if (!userDataCheckObject.loginExists) {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Login does not exist");
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);
    }

    return false;
}

/**
 * Check if the login data exist in the users.json file.
 *
 * @param {string} login - Login string.
 * @param {string} password - Password string.
 *
 * @return {Promise<UserDataCheck>} - Object
 */
async function checkIfLogInDataExist(login, password) {
    return fetch("/~volodyeh/php/log-in-process.php", {
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


/**
 * Add click listener to the logout button.
 * It will make the fetch request to the PHP to delete all relative to the login session variables
 * and to destroy the PHP session.
 */
function setUpLogOutButtonClickListener() {
    id("log-out-button").onclick = async () => {
        await fetch("/~volodyeh/php/log-out-process.php", {
            method: "GET",
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

        location.href = "/~volodyeh/index.php";
    }
}


/* ---------------------------- EDIT ACCOUNT DATA ---------------------------- */


/**
 * Reset inputs data in the edit account window.
 */
function resetEditAccountWindowInputData() {
    let loginInput = id("edit-account-login-input"),
        loginErrMsgField = id("edit-account-login-err-msg"),
        passwordInput = id("edit-account-password-input"),
        passwordErrMsgField = id("edit-account-password-err-msg"),
        newPasswordInput = id("edit-account-new-password-input"),
        newPasswordErrMsgField = id("edit-account-new-password-err-msg"),
        newPasswordConfirmInput = id("edit-account-new-password-confirmation-input"),
        newPasswordConfirmErrMsg = id("edit-account-new-password-confirmation-err-msg");

    // reset login
    loginInput.value = null;
    if (loginInput.classList.contains("validation-checking"))
        loginInput.classList.remove("validation-checking");
    // hide login error message
    if (loginErrMsgField.classList.contains("visible"))
        loginErrMsgField.classList.remove("visible");

    // reset password
    passwordInput.value = null;
    if (passwordInput.classList.contains("validation-checking"))
        passwordInput.classList.remove("validation-checking");
    // hide new password error message
    if (passwordErrMsgField.classList.contains("visible"))
        newPasswordErrMsgField.classList.remove("visible");

    // reset new password
    newPasswordInput.value = null;
    if (newPasswordInput.classList.contains("validation-checking"))
        newPasswordInput.classList.remove("validation-checking");
    // hide new password error message
    if (newPasswordErrMsgField.classList.contains("visible"))
        newPasswordErrMsgField.classList.remove("visible");

    // reset new password confirmation
    newPasswordConfirmInput.value = null;
    if (newPasswordConfirmInput.classList.contains("validation-checking"))
        newPasswordConfirmInput.classList.remove("validation-checking");
    // hide new password confirmation error message
    if (newPasswordConfirmErrMsg.classList.contains("visible"))
        newPasswordConfirmErrMsg.classList.remove("visible");
}

/**
 * Add click listener to the submit button in the edit account form.
 */
function addClickListenerToEditAccountSubmitButton() {
    id("edit-account-submit-button").onclick = async (submitEvent) => {
        submitEvent.preventDefault();

        let loginInput = id("edit-account-login-input"),
            loginErrMsgField = id("edit-account-login-err-msg"),
            passwordInput = id("edit-account-password-input"),
            passwordErrMsgField = id("edit-account-password-err-msg"),
            newPasswordInput = id("edit-account-new-password-input"),
            newPasswordErrMsgField = id("edit-account-new-password-err-msg"),
            newPasswordConfirmationInput = id("edit-account-new-password-confirmation-input"),
            newPasswordConfirmationErrMsgField = id("edit-account-new-password-confirmation-err-msg"),
            fileField = id("edit-account-avatar-input"),
            fileErrMsgField = id("edit-account-avatar-err-msg");

        let loginValidationResult = await validateLoginInEditAccount(loginInput, loginErrMsgField);
        let passwordValidationResult =
            validatePasswordInEditAccount(
                passwordInput, passwordErrMsgField,
                newPasswordInput, newPasswordErrMsgField,
                newPasswordConfirmationInput, newPasswordConfirmationErrMsgField
            );
        let fileValidationResult = validateFile(fileField, fileErrMsgField);

        if (!(loginValidationResult && passwordValidationResult && fileValidationResult))
            return false;

        let passwordVerifyingResult = await verifyPassword(passwordInput, passwordErrMsgField);

        if (passwordVerifyingResult)
            submitEvent.target.form.submit();
    }
}

/**
 * Check login validation in the edit account window.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 *
 * @param {HTMLInputElement} loginField - Login input element.
 * @param {HTMLElement} loginErrMsgField - Login error message field element.
 *
 * @return {Promise<boolean>} - TRUE if the validation passed and FALSE otherwise.
 */
async function validateLoginInEditAccount(loginField, loginErrMsgField) {
    let login = loginField.value;

    if (login.length !== 0) {
        if (!validateLoginLength(loginField, loginErrMsgField)) {
            return false;
        }
        if (!validateLoginChars(loginField, loginErrMsgField)) {
            return false;
        }
    }

    let loginCanBeChanged = await checkIfLoginCanBeChanged(login);
    if (loginCanBeChanged)
        setFieldValidationStatus(true, loginField, loginErrMsgField);
    else
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Login already exists");

    return loginCanBeChanged;
}

/**
 * Check if login can be changed.
 *
 * @param {string} login - Login string.
 *
 * @return {Promise<boolean>} - If passed login is the same as that one in the PHP session or
 * if passed new login is available, returns TRUE, else returns FALSE.
 */
async function checkIfLoginCanBeChanged(login) {
    return fetch("/~volodyeh/php/login-change-checking-process.php", {
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

/**
 * Validate the current password and the new password in the edit account form.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 *
 * @param {HTMLInputElement} passwordField - Password input element.
 * @param {HTMLElement} passwordErrMsgField - Password error message field element.
 * @param {HTMLInputElement} newPasswordField - New password input element.
 * @param {HTMLElement} newPasswordErrMsgField - New password error message field element.
 * @param {HTMLInputElement} newPasswordConfirmField - New password confirmation input element.
 * @param {HTMLElement} newPasswordConfirmErrMsgField - New password confirmation error message field element.
 *
 * @return {boolean} - TRUE if the validation passed and FALSE otherwise.
 */
function validatePasswordInEditAccount(
    passwordField, passwordErrMsgField,
    newPasswordField, newPasswordErrMsgField,
    newPasswordConfirmField, newPasswordConfirmErrMsgField
) {
    let newPassword = newPasswordField.value,
        newPasswordConfirm = newPasswordConfirmField.value;

    if (!validatePasswordLength(passwordField, passwordErrMsgField))
        return false;

    if (newPassword.length === 0 && newPasswordConfirm.length === 0)
        return true;

    if (!validatePasswordLength(newPasswordField, newPasswordErrMsgField))
        return false;

    return CheckIfPasswordsMatch(newPassword, newPasswordConfirmField, newPasswordConfirmErrMsgField);
}

/**
 * Verify the password by with the actual password of the current logged-in user.
 *
 * @param {HTMLInputElement} passwordField login input element
 * @param {HTMLElement} passwordErrMsgField login error message field element
 *
 * @return {Promise<boolean>}
 */
async function verifyPassword(passwordField, passwordErrMsgField) {

    let verifyingResult = await verifyPasswordInJson(passwordField.value);
    if (verifyingResult)
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);
    else
        setFieldValidationStatus(false, passwordField, passwordErrMsgField, "Password does not match");

    return verifyingResult;
}

/**
 * Verify password by the actual current logged-in user's password in the users.json file.
 *
 * @param {string} password - Password string to verify.
 *
 * @return {Promise<boolean>} - TRUE if the password verifying is success and FALSE otherwise.
 */
async function verifyPasswordInJson(password) {
    return fetch("/~volodyeh/php/password-verifying-process.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(password)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Password verifying failed.");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during verifying the password: ${error}`);
            return false;
        });
}

/**
 * Delete user account from the users.json file.
 *
 * @return {Promise<boolean>} - TRUE if the deleting account was success and FALSE otherwise.
 */
async function deleteAccount() {
    return fetch("/~volodyeh/php/deleting-account-process.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Deleting account was failed");
            return response.json();
        })
        .catch(error => {
            console.log(`Error during deleting account: ${error}`);
            return false;
        });
}
