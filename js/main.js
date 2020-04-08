
function buildOverview() {
    let url = "http://www.ist.rit.edu/api/about/";

    var response = getText(url);
    console.log(response);





}

function getText(url) {
    var request = new XMLHttpRequest();

    request.open("GET", url);

    request.setRequestHeader("Content-type", "application/json");

    request.onreadystatechange = function() { // Define event listener
        // If the request is compete and was successful
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            console.log(type);
            if (type.match("application/json")) // Make sure response is json
                callback(request.response);

            if (type.indexOf("xml") !== -1 && request.responseXML)
                callback(request.responseXML); // Document response
            else if (type === "application/json")
                callback(JSON.parse(request.responseText)); // JSON response
            else
                callback(request.responseText); // String response
        }
    };
    request.send(null);
}
buildOverview();