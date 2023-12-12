/** Transform top-bar to show necessary window.
 * @param {string} newView top-bar view that is needed to be shown */
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
    }
    else if (newView === "signing-up") {
        id("top-bar").classList.remove("navigation");
        if (id("top-bar").classList.contains("logging-in")) {
            id("top-bar").classList.remove("logging-in");
            setTimeout(() => {
                resetLogInWindowInputData();
            }, 350);
        }
        id("top-bar").classList.add("signing-up");
    }
    else if (newView === "making-record") {
        id("make-record-window").classList.add("new");
        id("top-bar").classList.remove("navigation");
        id("top-bar").classList.add("making-record");
    }
    else {

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


/** Set up click behaviour on the log-in button in the top-bar. */
function setUpLogInWindowButtonClickListener() {
    id("log-in-button").onclick = () => {
        // show log-in window in the top-bar rather than navigation buttons
        changeTopBarViewToAnother("logging-in");
    }
}
/** Set up click behaviour on the log-in button in the sign-in window. */
function setUpChangeToLogInWindowButtonClickListener() {
    id("change-to-log-in-button").onclick = () => {
        // show log-in window in the top-bar rather than sign-up
        changeTopBarViewToAnother("logging-in");
    }
}
/** Set up click behaviour on the close button in the log-in window. */
function setUpCloseLogInWindowButtonClickListener() {
    id("log-in-window-close-button").onclick = () => {
        // show navigation buttons in the top-bar rather than log-in window
        changeTopBarViewToAnother("navigation");
    }
}

/** Set up click behaviour on the sign-in button in the log-in window. */
function setUpChangeToSignUpWindowButtonClickListener() {
    id("change-to-sign-up-button").onclick = () => {
        // show sign-up window in the top-bar rather than log-in window
        changeTopBarViewToAnother("signing-up");
    }
}
/** Set up click behaviour on close button in the sign-up window. */
function setUpCloseSignUpWindowButtonClickListener() {
    id("sign-up-window-close-button").onclick = () => {
        // show navigation buttons in the top-bar rather than sign-up window
        changeTopBarViewToAnother("navigation");
    }
}

/** Set up click behaviour on open make record window button. */
function setUpMakeRecordButtonClickListener() {
    id("make-record-button").onclick = () => {
        changeTopBarViewToAnother("making-record");
    }
}
/** Set up click behaviour on close button in the make record window. */
function setUpCloseMakeRecordWindowButtonClickListener() {
    id("make-record-window-close-button").onclick = () => {
        changeTopBarViewToAnother("navigation");
    }
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
