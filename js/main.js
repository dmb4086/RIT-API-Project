

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
         title = json.UgMinors.title;
         description = json.UgMinors.description;
         totalMinors = json.UgMinors;


    });

    // count will be used to alternatively display the two sections that we have
    count = 0;


    for (minor in totalMinors) {
        var output = "";

        if (count % 2 == 0) {

            // defining section 1
            output = '      <div class="row justify-content-center no-gutters mb-5 mb-lg-0">\n' +
                '        <div class="col-lg-6">\n' +
                '          <img class="img-fluid" src="img/demo-image-01.jpg" alt="">\n' +
                '        </div>\n' +
                '        <div class="col-lg-6">\n' +
                '          <div class="bg-black text-center h-100 project">\n' +
                '            <div class="d-flex h-100">\n' +
                '              <div class="project-text w-100 my-auto text-center text-lg-left">\n' +
                '                <h4 class="text-white">Misty</h4>\n' +
                '                <p class="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>\n' +
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
                '                <h4 class="text-white">' + title + ' </h4>' +
                '                <p class="mb-0 text-white-50">' + description + '</p>\n' +
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


    }


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









getMinors();
buildOverview();
