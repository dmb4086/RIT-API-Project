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










buildOverview();
buildStaffFaculty();
