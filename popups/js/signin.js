function login_success() {
    chrome.storage.local.set({logged_in: true});
    chrome.browserAction.setPopup({popup: "popup.html"});
}

function login_failure() {
    chrome.storage.local.set({logged_in: false});
    chrome.browserAction.setPopup({popup: "SignIn.html"});
}

chrome.storage.local.get("logged_in", function(data) {
    if(data.logged_in)
        chrome.browserAction.setPopup({popup: "popup.html"});
});