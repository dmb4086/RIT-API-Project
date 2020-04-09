const curFacultyCount = 0;
const curStaffCount = 0;

const removeChildren = (div) => {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


function buildOverview() {
    const titleDiv =  document.getElementById("overview-title");
    const containerDiv =  document.getElementById("overview-description");



    myXhr('get',{path:'/about/'}).done(function(json){
        const title = document.createTextNode(json.title);
        const description = document.createTextNode(json.description);

        removeChildren("overview-title");
        removeChildren("overview-description");

        titleDiv.appendChild(title);
        containerDiv.appendChild(description);


    });

}


function buildStaffFaculty() {
    const titleDiv =  document.getElementById("faculty-staff-header");
    const titleSubDiv =  document.getElementById("faculty-staff-sub-header");
    const containerDiv =  document.getElementById("faculty-staff-container");

    myXhr('get',{path:'/people/'}).done(function(json){
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
            makeCard(faculty[i].name,faculty[i].title, faculty[i].office, faculty[i].imagePath);
        }

        for (let i = 0; i < staff.length; i++) {
            makeCard(staff[i].name,staff[i].title, staff[i].office, staff[i].imagePath);
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
    return str.slice(0, num) + '...'
}
var flag = false;
// function loadMore(){
//
//     if (flag){
//
//     getMinors(1);
//     flag = false;
//     // document.getElementById('loadmoretext').innerHTML = "";
//     // document.getElementById('loadmoretext').innerHTML = "Load Less";
//         console.log(flag);
//         console.log(loadfactor);
//         console.log('if1');
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

// }



/*
this function is responsible fro populating the Minors section in index.html,
It will get the JSON object from RIT API and then build the strings using count (if count is even use section 1 or use section 2)

 */
function getMinors() {

    var title ="";
    var description = "";
    var totalMinors = [];

    // const titleDiv =  document.getElementById("overview-title");
    // const containerDiv =  document.getElementById("overview-description");


    myXhr('get', {path: '/minors/'}).done(function (json) {
         totalMinors = json.UgMinors;

        console.log(totalMinors);

        console.log(totalMinors[1].description.length);
        console.log(truncateString(totalMinors[1].description, 500));

        // count will be used to alternatively display the two sections that we have
    count = 0;
    i = 0 ;

        // console.log(totalMinors[0].title);


        while ( i <= totalMinors.length) {
            console.log(totalMinors[i].title);

            // console.log(minor);
            var output = "";



        if (count % 2 == 0) {

            // defining section 1
            output = '      <div class="row justify-content-center no-gutters mb-5 mb-lg-0">\n' +
                '        <div class="col-lg-6">\n' +
                '          <img class="img-fluid" src="img/minorimage.jpeg" alt="">\n' +
                '        </div>\n' +
                '        <div class="col-lg-6">\n' +
                '          <div class="bg-black text-center h-100 project">\n' +
                '            <div class="d-flex h-100">\n' +
                '              <div class="project-text w-100 my-auto text-center text-lg-left">\n' +
                '                <h4 class="text-white">'+totalMinors[i].title+'</h4>\n' +
                '                <p class="mb-0 text-white-50">'+truncateString(totalMinors[i].description, 300)+'</p>\n' +
                '                <hr class="d-none d-lg-block mb-0 ml-0">\n' +
                '              </div>\n' +
                '            </div>\n' +
                '          </div>\n' +
                '        </div>\n' +
                '      </div>';


        } else {

            output = '<!-- Project Two Row -->\n' +
                '      <div class="row justify-content-center no-gutters">\n' +
                '        <div class="col-lg-6">\n' +
                '          <img class="img-fluid" src="img/demo-image-02.jpg" alt="">\n' +
                '        </div>\n' +
                '        <div class="col-lg-6 order-lg-first">\n' +
                '          <div class="bg-black text-center h-100 project">\n' +
                '            <div class="d-flex h-100">\n' +
                '              <div class="project-text w-100 my-auto text-center text-lg-right">\n' +
                '                <h4 class="text-white">' + totalMinors[i].title + ' </h4>' +
                '                <p class="mb-0 text-white-50">' + truncateString(totalMinors[i].description, 300) + '</p>\n' +
                '                <hr class="d-none d-lg-block mb-0 mr-0">\n' +
                '              </div>\n' +
                '            </div>\n' +
                '          </div>\n' +
                '        </div>\n' +
                '      </div>';
        }
        // console.log(count); testing purposes
        count++;

        document.getElementById('minor-wrapper').innerHTML += output;

            i++;
    }




    });
//     $(function(){
//         $("div").slice(0, 4).show(); // select the first ten
//         $("#load").click(function(e){ // click event for load more
//             e.preventDefault();
//             $("div:hidden").slice(0, 4).show(); // select next 10 hidden divs and show them
//             if($("div:hidden").length == 0){ // check if any hidden divs still exist
//                 alert("No more divs"); // alert if there are none left
//             }
//         });
//     });
//
// }






function myXhr(t, d){
    return $.ajax({
        type:t,
        url:'http://serenity.ist.rit.edu/~plgics/proxy.php',
        dataType:'json',
        data:d,
        cache:false,
        async:true,

    }).fail(function(){
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
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
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









getMinors();
buildOverview();
buildStaffFaculty();
