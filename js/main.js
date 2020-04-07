
function buildOverview() {
    let url = "www.ist.rit.edu/api/about";
    let data = "";
    let success = ""

    $.getJSON(url, function(data) {

        var text = `Date: ${data.date}<br>
                    Time: ${data.time}<br>
                    Unix time: ${data.milliseconds_since_epoch}`


        console.log(text);
        console.log("test");
    });

}