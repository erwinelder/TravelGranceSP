/** Clear all inputs in the make record form. */
function resetMakeRecordWindow() {
    id("make-record-date").value = null;
    id("make-record-amount").value = null;

    if (id("make-record-window").classList.contains("new")) {
        id("make-record-window").classList.remove("new");
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