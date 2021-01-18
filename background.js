chrome.contextMenus.create({
    id: "translate",
    title: 'Translate with Translator',
    contexts:['selection']
});

chrome.contextMenus.create({
    id: "addToBase",
    title: 'Add expression to your word base',
    contexts:['selection']
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "translate":
            translate(info.selectionText);
            break;
        case "addToBase":
            translateAndAdd(info.selectionText)
            break;
    }
})

function translate(expression) {
    const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyBej7avmilxkqcE-JBtGpp4FwlQghhAixw&target=pl&q=${expression}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const translatedText = data.data.translations[0].translatedText;
            alert(translatedText);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function addToBase(translatedExpression, expression) {
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

    xhr.open("POST", "https://arc-project-302014.ew.r.appspot.com/api/word/qM2rn8sUvHhVHRtJugbaxuJe3UJ3");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

}

function translateAndAdd(expression) {
    const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyBej7avmilxkqcE-JBtGpp4FwlQghhAixw&target=pl&q=${expression}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const translatedText = data.data.translations[0].translatedText;
            alert(translatedText);
            addToBase(translatedText, expression);
        })
        .catch(function(error) {
            console.log(error);
        });
}