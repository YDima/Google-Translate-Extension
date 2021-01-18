document.addEventListener('DOMContentLoaded', function() {
    const translateBtn = document.getElementById("translateText");

    translateBtn.addEventListener('click', function() {
        translateExpression();
    });

    const addToBase = document.getElementById("addToBase");

    addToBase.addEventListener('click', function() {
        translateExpressionAndAdd();
    });
});

function translateExpression() {
    var translateInput = document.getElementById("input").value;
    var translateResult = document.getElementById("result");
    const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyBej7avmilxkqcE-JBtGpp4FwlQghhAixw&target=pl&q=${translateInput}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const translatedText = data.data.translations[0].translatedText;
            console.log(translatedText);
            translateResult.innerHTML = `${translatedText}`;
        })
        .catch(function(error) {
            // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //     chrome.tabs.sendMessage(tabs[0].id, {"message": "error"});
            // });
            console.log(error);
        });
}

function addToBase(translatedExpression, expression, user) {
    var data = JSON.stringify([
        {
            "local": `${translatedExpression}`,
            "foreign": `${expression}`,
            "learn": 0
        }
    ]);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", `https://arc-project-302014.ew.r.appspot.com/api/word/${user}`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

}

function translateExpressionAndAdd() {
    var translateInput = document.getElementById("input").value;
    var user = document.getElementById("user").value;
    const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyBej7avmilxkqcE-JBtGpp4FwlQghhAixw&target=pl&q=${translateInput}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const translatedText = data.data.translations[0].translatedText;
            addToBase(translatedText, translateInput, user);
        })
        .catch(function(error) {
            console.log(error);
        });
}
