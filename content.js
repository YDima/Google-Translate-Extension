let find = "";
let replace = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "translate") {
        const expression = window.getSelection().toString();
        if (expression.length > 0) {
            chrome.runtime.sendMessage({"expression": expression});
        }
    } else if (request.message === "replace") {
        find = request.find;
        replace = request.replace;
        replaceText(document.body);
    } else if (request.message === "error") {
        console.log("Sorry some error happened :(");
    }
});

function replaceText(element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText);
    } else {
        const re = new RegExp(find, "gi");
        element.textContent = element.textContent.replace(re, replace);
    }
}