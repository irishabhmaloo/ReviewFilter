//SEARCH WORD FITER ------------------------------------------------------

let searchBtn = document.getElementById('search-button');
//console.log(searchBtn);

searchBtn.addEventListener("click" , function(e){
    //console.log("clicked");
    let searchWord = document.getElementById('form-in');
    let val = searchWord.value.toUpperCase();
    let dbArray = document.getElementsByClassName('cont');
    //console.log(dbArray)

    Array.from(dbArray).forEach(function(element){
        //console.log(element);
        let textMain = element.getElementsByClassName("comments")[0].innerHTML.toString().toUpperCase();
        console.log(textMain);
        if(textMain.includes(val)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
});

//COMMUNITY GUIDLINES --------------------------
let checkBtn = document.getElementById("check-rev");
checkBtn.addEventListener("click" , function(e){
    let checkTxt = document.getElementById("wrt-area");
    checkTxtVal = checkTxt.value.toUpperCase();
    //console.log(checkTxt);

    let notAllow = ["Dog", "3rd Class", "dustbin"];
    for(let i=0 ; i<notAllow.length ; i++){
        if(checkTxtVal.includes(notAllow[i].toUpperCase())){
            alert("Your review do not follows the community guidlines standard!")
            checkTxt.value = null;
            break;
        }
    }
});


