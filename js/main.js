const curFacultyCount = 0;
const curStaffCount = 0;

const removeChildren = (div) => {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


function buildOverview() {
    const titleDiv = document.getElementById("overview-title");
    const containerDiv = document.getElementById("overview-description");



    myXhr('get', {
        path: '/about/'
    }).done(function (json) {
        const title = document.createTextNode(json.title);
        const description = document.createTextNode(json.description);

        removeChildren("overview-title");
        removeChildren("overview-description");

        titleDiv.appendChild(title);
        containerDiv.appendChild(description);


    });

}


function buildStaffFaculty() {
    const titleDiv = document.getElementById("faculty-staff-header");
    const titleSubDiv = document.getElementById("faculty-staff-sub-header");
    const containerDiv = document.getElementById("faculty-staff-container");

    myXhr('get', {
        path: '/people/'
    }).done(function (json) {
        const titleText = document.createTextNode(json.title);
        titleDiv.appendChild(titleText);
        const titleSubDivText = document.createTextNode(json.subTitle);
        titleSubDiv.appendChild(titleSubDivText);
        const faculty = json.faculty;
        const staff = json.staff;

        const facultyCount = faculty.length;
        const staffCount = staff.length;

        console.log(faculty[0]);


        const makeCard = (name, title, office, imgSrc) => {
            const div = document.createElement("div");
            div.setAttribute("class", "card");

            const img = document.createElement("img");
            img.setAttribute("class", "cardImg");
            img.setAttribute("src", imgSrc);

            const h1 = document.createElement("h1");
            h1.setAttribute("class", "cardHeader");
            h1.appendChild(document.createTextNode(name));

            const p = document.createElement("p");
            p.setAttribute("class", "cardP");
            p.appendChild(document.createTextNode(title));

            const secondP = document.createElement("p");
            secondP.setAttribute("class", "cardP");
            secondP.appendChild(document.createTextNode(office));


            div.appendChild(img);
            div.appendChild(h1);
            div.appendChild(p);
            div.appendChild(secondP);

            containerDiv.appendChild(div);

        }

        for (let i = 0; i < faculty.length; i++) {
            makeCard(faculty[i].name, faculty[i].title, faculty[i].office, faculty[i].imagePath);
        }

        for (let i = 0; i < staff.length; i++) {
            makeCard(staff[i].name, staff[i].title, staff[i].office, staff[i].imagePath);
        }



    });

}
/*
Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a ... ending.
 */
function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    let output = '<span id="dots">...</span><span id="more">';
    console.log(output);
    var rest = str.slice(num);
    console.log(rest);
    return str.slice(0, num) + output + "...";
}

function readMore() {
    $('.read-more-content').addClass('hide')
    $('.read-more-show, .read-more-hide').removeClass('hide')

// Set up the toggle effect:
    $('.read-more-show').on('click', function(e) {
        $(this).next('.read-more-content').removeClass('hide');
        $(this).addClass('hide');
        e.preventDefault();
    });

// Changes contributed by @diego-rzg
    $('.read-more-hide').on('click', function(e) {
        var p = $(this).parent('.read-more-content');
        p.addClass('hide');
        p.prev('.read-more-show').removeClass('hide'); // Hide only the preceding "Read More"
        e.preventDefault();
    });
}






// var flag = true;
// function loadMore(){
//
//     if (flag){
//
//     getMinors(1);
//     flag = false;
//     // document.getElementById('loadmoretext').innerHTML = "";
//     // document.getElementById('loadmoretext').innerHTML = "Load Less";
//         console.log(flag);
//
//     }
//     if (!flag){
//         getMinors(2);
//         flag = true;
//         // document.getElementById('loadmoretext').innerHTML = "";
//         // document.getElementById('loadmoretext').innerHTML = "Load More";
//         console.log(flag);
//         // console.log(loadfactor);
//
//     }
//
// }



/*
this function is responsible fro populating the Minors section in index.html,
It will get the JSON object from RIT API and then build the strings using count (if count is even use section 1 or use section 2)

 */
function getMinors(loadfactor) {

    var title = "";
    var description = "";
    var totalMinors = [];

    // const titleDiv =  document.getElementById("overview-title");
    // const containerDiv =  document.getElementById("overview-description");


    myXhr('get', {
        path: '/minors/'
    }).done(function (json) {
        totalMinors = json.UgMinors;

        console.log(totalMinors);

        console.log(totalMinors[1].description.length);
        console.log(truncateString(totalMinors[1].description, 500));

        // count will be used to alternatively display the two sections that we have
        count = 0;
        i = 0;

        // console.log(totalMinors[0].title);

        const minorID =  document.getElementById('minor-wrapper');


        while (i <= totalMinors.length / loadfactor) {
            // console.log(totalMinors[i].title);

            // console.log(minor);
            var output = "";

            const div1 = document.createElement("div");

            if (count % 2 == 0) {

                // defining section 1


                div1.setAttribute("class", "row justify-content-center no-gutters mb-5 mb-lg-0");

                const div2 = document.createElement("div");
                div2.setAttribute("class", "col-lg-6");
                div1.appendChild(div2);

                const img = document.createElement("img");
                img.setAttribute("class", "img-fluid");
                img.setAttribute("src", "img/minorimage.jpeg");
                div2.appendChild(img);

                const div3 = document.createElement("div");
                div3.setAttribute("class", "col-lg-6");
                div1.appendChild(div3);

                const div4 = document.createElement("div");
                div4.setAttribute("class", "bg-black text-center h-100 project");
                div3.appendChild(div4);

                const div5 = document.createElement("div");
                div5.setAttribute("class", "d-flex h-100");
                div4.appendChild(div5);

                const div6 = document.createElement("div");
                div6.setAttribute("class", "project-text w-100 my-auto text-center text-lg-left");
                div5.appendChild(div6);

                const h4 = document.createElement("h4");
                h4.setAttribute("class", "text-white");
                h4.appendChild(document.createTextNode(totalMinors[i].title));
                div6.appendChild(h4);

                const p = document.createElement("p");
                p.setAttribute("class", "mb-0 text-white-50");
                p.appendChild(document.createTextNode(totalMinors[i].description.slice(0,300)));
                div6.appendChild(p);

                const a = document.createElement("a");
                a.setAttribute("class", "read-more-show hide");
                a.setAttribute("href", "###");
                a.setAttribute("onclick", "readMore()");
                a.appendChild(document.createTextNode("Read More"));
                div6.appendChild(a);

                const span = document.createElement("span");
                span.setAttribute("class", "read-more-content mb-0 text-white-50");
                span.appendChild(document.createTextNode('-'+totalMinors[i].description.slice(300)));
                div6.appendChild(span);

                const a2 = document.createElement("a");
                a2.setAttribute("class", "read-more-hide hide");
                a2.setAttribute("href", "#");
                a2.setAttribute("onclick", "readMore()");
                a2.appendChild(document.createTextNode("Read Less"));
                span.appendChild(a2);

                const hr = document.createElement("span");
                hr.setAttribute("class", "d-none d-lg-block mb-0 ml-0");
                hr.appendChild(document.createTextNode('-'+totalMinors[i].description.slice(300)));
                span.appendChild(hr);





                // output = '      <div class="row justify-content-center no-gutters mb-5 mb-lg-0">\n' +
                //     '        <div class="col-lg-6">\n' +
                //     '          <img class="img-fluid" src="img/minorimage.jpeg" alt="">\n' +
                //     '        </div>\n' +
                //     '        <div class="col-lg-6">\n' +
                //     '          <div class="bg-black text-center h-100 project">\n' +
                //     '            <div class="d-flex h-100">\n' +
                //     '              <div class="project-text w-100 my-auto text-center text-lg-left">\n' +
                //     '                <h4 class="text-white">' + totalMinors[i].title + '</h4>\n' +
                //     '                <p class="mb-0 text-white-50">' +totalMinors[i].description.slice(0,300) + '</p> ' +
                //     '<a class="read-more-show hide" href="###" onclick="readMore()"> Read More</a> <span class="read-more-content mb-0 text-white-50 ">\n'
                //     +'-'+totalMinors[i].description.slice(300) + '<a class="read-more-hide hide" href="#"> Read Less</a>'+
                //     '                <hr class="d-none d-lg-block mb-0 ml-0">\n' +
                //     '              </div>\n' +
                //     '            </div>\n' +
                //     '          </div>\n' +
                //     '        </div>\n' +
                //     '      </div>';


            } else {

                div1.setAttribute("class", "row justify-content-center no-gutters");

                const div2 = document.createElement("div");
                div2.setAttribute("class", "col-lg-6");
                div1.appendChild(div2);

                const img = document.createElement("img");
                img.setAttribute("class", "img-fluid");
                img.setAttribute("src", "img/demo-image-02.jpg");
                div2.appendChild(img);

                const div3 = document.createElement("div");
                div3.setAttribute("class", "col-lg-6 order-lg-first");
                div1.appendChild(div3);

                const div4 = document.createElement("div");
                div4.setAttribute("class", "bg-black text-center h-100 project");
                div3.appendChild(div4);

                const div5 = document.createElement("div");
                div5.setAttribute("class", "d-flex h-100");
                div4.appendChild(div5);

                const div6 = document.createElement("div");
                div6.setAttribute("class", "project-text w-100 my-auto text-center text-lg-left");
                div5.appendChild(div6);

                const h4 = document.createElement("h4");
                h4.setAttribute("class", "text-white");
                h4.appendChild(document.createTextNode(totalMinors[i].title));
                div6.appendChild(h4);

                const p = document.createElement("p");
                p.setAttribute("class", "mb-0 text-white-50");
                p.appendChild(document.createTextNode(totalMinors[i].description.slice(0,300)));
                div6.appendChild(p);

                const a = document.createElement("a");
                a.setAttribute("class", "read-more-show hide");
                a.setAttribute("href", "###");
                a.setAttribute("onclick", "readMore()");
                a.appendChild(document.createTextNode("Read More"));
                div6.appendChild(a);

                const span = document.createElement("span");
                span.setAttribute("class", "read-more-content mb-0 text-white-50");
                span.appendChild(document.createTextNode('-'+totalMinors[i].description.slice(300)));
                div6.appendChild(span);

                const a2 = document.createElement("a");
                a2.setAttribute("class", "read-more-hide hide");
                a2.setAttribute("href", "#");
                a2.setAttribute("onclick", "readMore()");
                a2.appendChild(document.createTextNode("Read Less"));
                span.appendChild(a2);

                const hr = document.createElement("span");
                hr.setAttribute("class", "d-none d-lg-block mb-0 ml-0");
                hr.appendChild(document.createTextNode('-'+totalMinors[i].description.slice(300)));
                span.appendChild(hr);

                // output = '<!-- Project Two Row -->\n' +
                //     '      <div class="row justify-content-center no-gutters">\n' +
                //     '        <div class="col-lg-6">\n' +
                //     '          <img class="img-fluid" src="img/demo-image-02.jpg" alt="">\n' +
                //     '        </div>\n' +
                //     '        <div class="col-lg-6 order-lg-first">\n' +
                //     '          <div class="bg-black text-center h-100 project">\n' +
                //     '            <div class="d-flex h-100">\n' +
                //     '              <div class="project-text w-100 my-auto text-center text-lg-right">\n' +
                //     '                <h4 class="text-white">' + totalMinors[i].title + ' </h4>' +
                //     '                <p class="mb-0 text-white-50">' +totalMinors[i].description.slice(0,300)+'</p> <a class="read-more-show hide" href="###" onclick="readMore()"> Read More</a> <span class="read-more-content mb-0 text-white-50 ">\n'
                //     +'-'+totalMinors[i].description.slice(300)+'<a class="read-more-hide hide" href="#"> Read Less</a>'+
                //     '                <hr class="d-none d-lg-block mb-0 mr-0">\n' +
                //     '              </div>\n' +
                //     '            </div>\n' +
                //     '          </div>\n' +
                //     '        </div>\n' +
                //     '      </div>';

            }
            minorID.appendChild(div1);

            // console.log(count); testing purposes
            count++;

            // document.getElementById('minor-wrapper').innerHTML += output;


            i++;
        }




        readMore();
    });


}






function myXhr(t, d) {
    return $.ajax({
        type: t,
        url: 'http://serenity.ist.rit.edu/~plgics/proxy.php',
        dataType: 'json',
        data: d,
        cache: false,
        async: true,

    }).fail(function () {
        //handle failure
    });
}


/*
The following code is for animation within index.html
 */

// Code for RIT h1 in the title
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
}

function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
    setTimeout(function () {
        cw[i].className = 'letter out';
    }, i * 80);
}

function animateLetterIn(nw, i) {
    setTimeout(function () {
        nw[i].className = 'letter in';
    }, 340 + (i * 80));
}

function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
// ------ End of Animation code --------








readMore();
getMinors(2);
readMore();
buildOverview();
buildStaffFaculty();
