<?php
//require "php/login-checking.php";
//require __DIR__ . '/php/login-checking.php';
//include findLoginInJSON("");

// if page was loaded by POST method (login form was submitted and this page was reloaded)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // store value of login from the form
    $login = $_POST["login"];
    // check if the login exists in the JSON file
    $loginExists = findLoginInJSON($login, "/data/users.json");
//
    var_dump($loginExists);
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelGlance</title>
    <link rel="stylesheet" href="styles/index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap" rel="stylesheet">
    <script src="scripts/main.js"></script>
    <script src="scripts/sign-up-log-in.js"></script>
    <script src="scripts/make-record.js"></script>
    <script src="scripts/animation.js"></script>
</head>
<body>

    <div class="top-bar-cont">
        <div class="top-bar glass-morphism navigation" id="top-bar">

            <nav id="navbar">
                <input type="button" class="primary-button" id="make-record-button" value="Make record">
                <span class="vertical-divider"></span>
                <p class="secondary-button current">Main</p>
                <a class="secondary-button" href="pages/public-records.html">Public records</a>
                <span class="vertical-divider"></span>
                <input class="primary-button" type="button" id="log-in-button" value="Log in">
<!--                <a class="hide" id="log-out-button" href="">Log out</a>-->
            </nav>

            <form class="log-in-window top-bar-window" id="log-in-window" method="post">

                <input type="button" class="secondary-button" id="log-in-window-close-button" value="Close">

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="log-in-login-input">Login</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <input type="text" id="log-in-login-input" name="login" minlength="4" maxlength="20" required>
                    <p class="field-title-err-msg" id="log-in-login-err-msg">*Login already exists</p>
                </div>

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="log-in-password-input">Password</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <input type="password" id="log-in-password-input" name="password" minlength="8" maxlength="40" required>
                    <p class="field-title-err-msg" id="log-in-password-err-msg">*At least 8 characters long</p>
                </div>

                <div class="button-block">
                    <hr class="big-hr">
                    <div class="button-block-content">
                        <input type="submit" class="primary-button" id="log-in-submit-button" value="Log in">
                        <p>or</p>
                        <input type="button" class="secondary-button" id="change-to-sign-up-button" value="Sign up">
                    </div>
                </div>

            </form>

            <form class="sign-up-window top-bar-window" id="sign-up-window" action="php/sign-up-process.php" method="post">

                <input type="button" class="secondary-button" id="sign-up-window-close-button" value="Close">

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="sign-up-login-input">Login</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <input type="text" id="sign-up-login-input" name="login" minlength="4" maxlength="20" required>
                    <p class="field-title-err-msg" id="sign-up-login-err-msg">*Login already exists</p>
                </div>

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="sign-up-password-input">Password</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <input type="password" id="sign-up-password-input" name="password" minlength="8" maxlength="40" required>
                    <p class="field-title-err-msg" id="sign-up-password-err-msg">*At least 8 characters long</p>
                </div>

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="sign-up-password-confirmation-input">Repeat password</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <input type="password" id="sign-up-password-confirmation-input" minlength="8" maxlength="40" required>
                    <p class="field-title-err-msg" id="sign-up-password-confirmation-err-msg">*Passwords do not match</p>
                </div>

                <div class="button-block">
                    <hr class="big-hr">
                    <div class="button-block-content">
                        <input type="submit" class="primary-button" id="sign-up-submit-button" value="Sign up">
                        <p>or</p>
                        <input type="button" class="secondary-button" id="change-to-log-in-button" value="Log in">
                    </div>
                </div>

            </form>

            <form class="make-record-window top-bar-window" id="make-record-window" action="" >

                <input type="button" class="secondary-button" id="make-record-window-close-button" value="Close">

                <div class="field-cont">
                    <label class="field-title" for="make-record-date">Date</label>
                    <input type="datetime-local" class="field-date" id="make-record-date">
                </div>

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="make-record-amount">Amount</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <input type="number" placeholder="0" class="input-ban-specsym" id="make-record-amount" required>
                </div>

                <div class="field-cont">
                    <div class="field-title-cont">
                        <label class="field-title" for="make-record-city">City</label>
                        <p class="field-title-note">*required</p>
                    </div>
                    <select name="make-record-city" class="select-input" id="make-record-city">
                        <option value="Prague">Prague</option>
                        <option value="Bratislava">Bratislava</option>
                        <option value="Vienna">Vienna</option>
                        <option value="Budapest">Budapest</option>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Rome">Rome</option>
                        <option value="Warsaw">Warsaw</option>
                    </select>
                </div>

                <div class="button-block">
                    <hr class="big-hr">
                    <div class="button-block-inline" id="make-record-button-block">
                        <input type="submit" value="Save" class="primary-button" id="make-record-save-button">
                        <input type="submit" value="Remove" class="primary-button" id="make-record-remove-record">
                    </div>
                </div>

            </form>

        </div>
    </div>


    <div class="content">

        <!-- greetings -->
        <div class="greetings widget glass-morphism" id="greetings">
            <h2 class="greetings-title" id="greetings-title">Good afternoon!</h2>
            <p class="greetings-massage">You have no trip records in this month</p>
        </div>

        <!-- records block -->
        <div class="history-cont widget glass-morphism" id="history-cont">
            <div class="history" id="history">
                <div class="record">
                    <p class="date">16.5</p>
                    <p class="city">Praha</p>
                    <p class="amount">4 516 CZK</p>
                </div>
            </div>
<!--            <div class="history-reloading-background" id="history-reloading-background"></div>-->
            <div class="history-empty-placeholder" id="history-empty-placeholder"></div>
        </div>

    </div>

    <div class="floating-window-cont make-record-window-cont" id="make-record-window-cont">

        <span class="close-area"></span>

    </div> <!-- make-record-cont -->

<!--    <input type="button" class="action-button floating-action-button" id="make-record-button" value="Udělat záznam">-->

</body>
</html>