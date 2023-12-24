/**
 * Validate the login in the sign-up form.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 *
 * @param {HTMLInputElement} loginField - Login input element.
 * @param {HTMLElement} loginErrMsgField - Login error message field element.
 *
 * @return {Promise<boolean>} - TRUE if the validation passed and FALSE otherwise.
 */
async function validateLogin(loginField, loginErrMsgField) {

    if (!validateLoginLength(loginField, loginErrMsgField))
        return false;

    if (!validateLoginChars(loginField, loginErrMsgField))
        return false;

    let loginExists = await checkIfLoginExistsInJson(loginField.value);
    if (loginExists)
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Login already exists");
    else
        setFieldValidationStatus(true, loginField, loginErrMsgField);

    return !loginExists;
}

/**
 * Validate the password in the sign-up form.
 * If any validation failed, it does not continue to the next validation and returns FALSE.
 *
 * @param {HTMLInputElement} passwordField - Password input element.
 * @param {HTMLElement} passwordErrMsgField - Password error message field element.
 * @param {HTMLInputElement} passwordConfirmField - Password confirmation input element.
 * @param {HTMLElement} passwordConfirmErrMsgField - Password confirmation error message field element.
 *
 * @return {boolean} - TRUE if the validation passed and FALSE otherwise.
 */
function validatePassword(
    passwordField, passwordErrMsgField,
    passwordConfirmField, passwordConfirmErrMsgField
) {

    if (!validatePasswordLength(passwordField, passwordErrMsgField))
        return false;

    return CheckIfPasswordsMatch(passwordField.value, passwordConfirmField, passwordConfirmErrMsgField)
}

/**
 * Validate a file.
 *
 * @param {HTMLInputElement} fileField - File input element.
 * @param {HTMLElement} fileErrMsgField - File error message field element.
 *
 * @return {boolean} - TRUE if the validation passed and FALSE otherwise.
 */
function validateFile(
    fileField, fileErrMsgField
) {
    if (fileField.value === "") {
        return true;
    }

    let allowedFiles = ["jpg", "jpeg", "png"],
        fileExtension = fileField.files[0].name.split('.').pop().toLowerCase();

    let validationResult = allowedFiles.includes(fileExtension);

    if (validationResult) {
        setFieldValidationStatus(true, fileField, fileErrMsgField);
    } else {
        setFieldValidationStatus(false, fileField, fileErrMsgField, "File is not supported");
    }

    return validationResult;
}

/**
 * Check if the login has a valid length.
 *
 * @param {HTMLInputElement} loginField - The login input element.
 * @param {HTMLInputElement} loginErrMsgField THe login error message field element.
 *
 * @return {boolean} - TRUE if the length is valid and FALSE otherwise.
 */
function validateLoginLength(loginField, loginErrMsgField) {
    let login = loginField.value,
        validationResult = !(login.length < 4 || login.length > 20);

    if (validationResult)
        setFieldValidationStatus(true, loginField, loginErrMsgField);
    else
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Must be in range 4-20 chars");

    return validationResult;
}

/**
 * Check if the login has a valid range of characters.
 *
 * @param {HTMLInputElement} loginField - The login input element.
 * @param {HTMLInputElement} loginErrMsgField THe login error message field element.
 *
 * @return {boolean} - TRUE if the characters are valid and FALSE otherwise.
 */
function validateLoginChars(loginField, loginErrMsgField) {
    let login = loginField.value,
        validationResult = false,
        allowedChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!login.match(allowedChars)) {
        setFieldValidationStatus(true, loginField, loginErrMsgField);
        validationResult = true;
    } else {
        setFieldValidationStatus(false, loginField, loginErrMsgField, "Must contain only letters and numbers");
    }

    return validationResult;
}

/**
 * Check if the password has a valid length.
 *
 * @param {HTMLInputElement} passwordField - Password input element.
 * @param {HTMLInputElement} passwordErrMsgField - Password error message field element.
 *
 * @return {boolean} - TRUE if the length is in range 8-40 chars and FALSE otherwise.
 */
function validatePasswordLength(passwordField, passwordErrMsgField) {
    let password = passwordField.value,
        validationResult = !(password.length < 8 || password.length > 40);

    if (validationResult) {
        setFieldValidationStatus(true, passwordField, passwordErrMsgField);
    } else {
        setFieldValidationStatus(false, passwordField, passwordErrMsgField, "Must be in range 8-40 chars");
    }

    return validationResult;
}

/**
 * Check if the password and the confirmation password match.
 *
 * @param {string} password - Password string to be compared with.
 * @param {HTMLInputElement} passwordConfirmField - Password confirmation input element.
 * @param {HTMLElement} passwordConfirmErrMsgField - Password confirmation error message field element.
 *
 * @return {boolean} - TRUE if the passwords match and FALSE otherwise.
 */
function CheckIfPasswordsMatch(
    password, passwordConfirmField, passwordConfirmErrMsgField
) {
    let passwordConfirm = passwordConfirmField.value,
        validationResult = password === passwordConfirm;

    if (validationResult)
        setFieldValidationStatus(true, passwordConfirmField, passwordConfirmErrMsgField);
    else
        setFieldValidationStatus(false, passwordConfirmField, passwordConfirmErrMsgField, "Passwords do not match");

    return validationResult;
}

/**
 * Check if the value number is valid.
 *
 * @param {HTMLInputElement} field - Input element.
 * @param {HTMLInputElement} errMsgField - Error message field element.
 *
 * @return {boolean} - TRUE if the inout value is a number and FALSE otherwise.
 */
function validateInputNumber(field, errMsgField) {

    if (field.value < 0) {
        setFieldValidationStatus(false, field, errMsgField, "Cannot be negative");
        field.classList.add("validation-checking");
        return false;
    } else if (!(field.checkValidity())) {
        setFieldValidationStatus(false, field, errMsgField, "Is not a number");
        field.classList.add("validation-checking");
        return false;
    } else {
        setFieldValidationStatus(true, field, errMsgField);
    }

    return true;
}

/**
 * Add to the field the invalid attribute.
 *
 * @param {boolean} isValid - TRUE if the field must be marked as valid and FALSE otherwise.
 * @param {HTMLInputElement} field - Field element to set validity to.
 * @param {HTMLElement} errMsgField - Error message field to put the error message at.
 * @param {string} message - Message to display in the error message field. By default, is empty.
 */
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


/* --------------------------- LISTENERS--------------------------- */


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


/**
 * Add input event listener to the login field to validate its length.
 *
 * @param {HTMLInputElement} field - Input field element.
 * @param {HTMLElement} fieldErrMsgField - Input error message field element
 */
function addInputListenerToLoginInputField(field, fieldErrMsgField) {
    field.addEventListener("input", () => {
        if (field.value.length > 0) {
            if (validateLoginLength(field, fieldErrMsgField)) {
                validateLoginChars(field, fieldErrMsgField);
            }
        } else {
            setFieldValidationStatus(true, field, fieldErrMsgField);
        }
    });
}

/**
 * Add input event listener to the password field to validate its length.
 *
 * @param {HTMLInputElement} field - Input field element.
 * @param {HTMLElement} fieldErrMsgField - Input error message field element.
 */
function addInputListenerToPasswordInputField(field, fieldErrMsgField) {
    field.addEventListener("input", () => {
        if (field.value.length > 0)
            validatePasswordLength(field, fieldErrMsgField);
        else
            setFieldValidationStatus(true, field, fieldErrMsgField);
    });
}

/**
 * Add input event listener to the password confirmation field to check if the passwords match.
 *
 * @param {HTMLInputElement} passField - Password input element.
 * @param {HTMLInputElement} passConfirmField - Password confirmation input element.
 * @param {HTMLElement} passConfirmFieldErrMsgField - Password confirmation error message field element.
 */
function addInputListenerToPasswordConfirmInputField(passField, passConfirmField, passConfirmFieldErrMsgField) {
    passConfirmField.addEventListener("input", () => {
        if (passConfirmField.value.length > 0)
            CheckIfPasswordsMatch(passField.value, passConfirmField, passConfirmFieldErrMsgField);
        else
            setFieldValidationStatus(true, passConfirmField, passConfirmFieldErrMsgField);
    });
}

/**
 * Add input event listener to the input of type number to validate its value.
 *
 * @param {HTMLInputElement} field - Input field element.
 * @param {HTMLElement} errMsgField - Input error message field element.
 */
function addInputListenersToNumberInputField(field, errMsgField) {
    field.addEventListener("input", () => {
        setFieldValidationStatus(true, field, errMsgField);

        if (field.value.length > 0)
            validateInputNumber(field, errMsgField);
        else
            setFieldValidationStatus(true, field, errMsgField);
    });
}