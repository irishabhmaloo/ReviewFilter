//display previous reviews at start
let actualDB = localStorage.getItem("dbase");

if (actualDB == null) {
    var actualDBnew = [];
}
else {
    var actualDBnew = JSON.parse(actualDB);
}
displayReviews(actualDBnew)

//user tuple
class userData {
    constructor(name, img, date, rank, review) {
        this.name = name;
        this.img = img;
        this.date = date;
        this.rank = rank;
        this.review = review;
    }
};

//months
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];





//SEARCH WORD FITER ------------------------------------------------------
let searchBtn = document.getElementById('search-button');
let searchArea = document.getElementById('form-in');

searchArea.addEventListener("click", function () {
    let actualDB = localStorage.getItem("dbase");

    if (actualDB == null) {
        var actualDBnew = [];
    }
    else {
        var actualDBnew = JSON.parse(actualDB);
    }
    displayReviews(actualDBnew)
    searchArea.value = "";
})

searchBtn.addEventListener("click", function (e) {
    //console.log("clicked");

    let counter = 0;
    let searchWord = document.getElementById('form-in');
    let val = searchWord.value.toUpperCase();
    let dbArray = document.getElementsByClassName('cont');
    //console.log(dbArray)

    Array.from(dbArray).forEach(function (element) {
        //console.log(element);
        let textMain = element.getElementsByClassName("comments")[0].innerHTML.toString().toUpperCase();
        //console.log(textMain);
        if (textMain.includes(val)) {
            element.style.display = "block";
            ++counter;
        }
        else {
            element.style.display = "none";
        }
    })

    if (counter == 0) {
        let disArea = document.querySelector(".rev-content");
        disArea.innerHTML = `<br> <h3>No match found!</h3><br><br>`;
    }
});




//SORT REVIEWS : OLDEST FIRST --------------------------------------
let oldBtn = document.getElementById("sort-date-old");
oldBtn.addEventListener("click", function (e) {
    let actualDB = localStorage.getItem("dbase");

    if (actualDB == null) {
        var actualDBnew = [];
    }
    else {
        var actualDBnew = JSON.parse(actualDB);
    }

    actualDBnew.sort(function (a, b) { return a.rank - b.rank });
    displayReviews(actualDBnew);
});




//SORT REVIEWS : NEWEST FIRST --------------------------------------
let newBtn = document.getElementById("sort-date-new");
newBtn.addEventListener("click", function (e) {
    let actualDB = localStorage.getItem("dbase");

    if (actualDB == null) {
        var actualDBnew = [];
    }
    else {
        var actualDBnew = JSON.parse(actualDB);
    }

    actualDBnew.sort(function (a, b) { return b.rank - a.rank });
    displayReviews(actualDBnew);
});



//COMMUNITY GUIDLINES AND ADD REVIEW --------------------------
const notAllow = ["Dog", "3rd Class", "dustbin"];

let checkBtn = document.getElementById("check-rev");
checkBtn.addEventListener("click", function (e) {
    let checkTxt = document.getElementById("wrt-area");
    let checkTxtVal = checkTxt.value.toUpperCase();
    //console.log(checkTxt);

    for (let i = 0; i < notAllow.length; i++) {
        if (checkTxtVal.includes(notAllow[i].toUpperCase())) {
            alert("Your review do not follows the community guidlines standard!")
            checkTxt.value = null;
            return;
        }
    }

    var newUser = new userData();

    //current date setter
    var time = new Date();
    newUser.date = String(time.getDate() + " " + months[time.getMonth()] + " " + time.getFullYear());
    newUser.rank = time.getTime();
    newUser.name = "Rishabh Maloo";
    newUser.img = "/img/img1.jpg";
    newUser.review = checkTxt.value;
    //console.log(newUser);

    let actualDB = localStorage.getItem("dbase");
    //console.log(actualDB);

    if (actualDB == null) {
        var actualDBnew = [];
    }
    else {
        var actualDBnew = JSON.parse(actualDB);
    }

    //adding the new entry to database
    actualDBnew.push(newUser);
    localStorage.setItem("dbase", JSON.stringify(actualDBnew));
    checkTxt.value = "";

    //display updated reviews
    displayReviews(actualDBnew);
});




//DISPLAY REVIEWS ------------------------------------------------------
function displayReviews(actualDBnew) {
    //Final User display
    let reviewHTML = "";
    actualDBnew.forEach(function (element, index) {
        reviewHTML += `
            <div class="cont" id="cont-id">
                <div class="cont-top">
                    <div class="profile">
                        <div class="prf-img">
                            <img src="${element.img}" alt="">
                        </div>
                        <div class="prf-name">
                            <strong>${element.name}</strong>
                            <p id="prf-date">${element.date}</p>
                        </div>
                    </div>
                    <div class="rating">

                        <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label>
                        <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label>
                        <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label>
                        <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label>
                        <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label>

                    </div>
                </div>

                <div class="comments">
                    <p id="cmt-text">${element.review}</p>
                </div>
            </div>`;
    });

    let disArea = document.querySelector(".rev-content");
    if (actualDBnew.length != 0) {
        disArea.innerHTML = reviewHTML;
    }
    else {
        disArea.innerHTML = `<br> <h3>No reviews yet!</h3><br><br>`;
    }
}




//----NO USE // IGNORE------//
// var actualDBnew = [];
// var rev1 = new userData("Joseph Wittek" , "/img/img2.jpg" , "19 Sept 2020" , 1600473600000, "The battery life is average, needs improvement");
// var rev2 = new userData("Noopur Modi" , "/img/img3.jpg" , "21 Oct 2021" , 1634774400000, "Battery drains too fast, but camera is the best part i must say");
// var rev3 = new userData("Taylor Swift" , "/img/img4.jpg" , "13 Dec 2019" , 1576195200000, "Shiny toys with a price, I'm not buying .... again, but im waiting for iphone 13 !!!!!!!!!!");
// actualDBnew.push(rev1);
// actualDBnew.push(rev2);
// actualDBnew.push(rev3);
// localStorage.setItem("dbase", JSON.stringify(actualDBnew));
