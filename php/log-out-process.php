<?php

session_start();

unset($_SESSION["userId"]);
unset($_SESSION["isLoggedIn"]);
unset($_SESSION["login"]);
unset($_SESSION["avatarFilename"]);

session_destroy();
