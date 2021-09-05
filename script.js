//selecting require element
const selectBox = document.querySelector(".select-box");
const bntX = document.querySelector(".select-box .option .playerX");
const bntO = document.querySelector(".select-box .option .playerO");
const Playboard = document.querySelector(".play-board");
const ResultBox = document.querySelector(".result");
const Move = document.querySelector(".play-board .mov");
const allbox = document.querySelectorAll("section span");
const wonText = document.querySelector(".won-text");
const Replaybnt = document.querySelector(".result button");


in minimax branch;

window.onload = () => {// once the window loaded
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].setAttribute("onclick", "clickbox(this)");
    }
    bntX.onclick = () => {
        selectBox.classList.add("hide");
        Playboard.classList.add("show");
    }
    bntO.onclick = () => {
        selectBox.classList.add("hide");
        Playboard.classList.add("show");
        Move.setAttribute("class", "mov active PlayerO");
    }


}

let playerXIcon = "fas fa-times",
    playerOIcon = "far fa-circle",
    playerSign = "X",
    rungame = true;

function clickbox(element) { // when player click any box
  if(rungame)
  {
    if (Move.classList.contains("PlayerO")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        Move.classList.remove("active");
        element.setAttribute("id",playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        Move.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    element.style.pointerEvents = "none";
    Playboard.style.pointerEvents="none";
    selectWinner();
    let randomTimeDelay=(Math.random()*500+500).toFixed();
    setTimeout(function(){
        game(rungame);
    },randomTimeDelay);
  }
}


//main function
function game(rungame) {   // computer move
    if(rungame){
    let array = [];
    for (let i = 0; i < allbox.length; i++) {
        const ele = allbox[i];
        if (ele.childElementCount == 0) {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
        if (Move.classList.contains("PlayerO")) {
            playerSign="X";
            allbox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
            allbox[randomBox].setAttribute("id",playerSign);
            Move.classList.add("active");
        } else {
            playerSign="O";
            allbox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
            allbox[randomBox].setAttribute("id",playerSign);
            Move.classList.remove("active");

        }
        selectWinner();
    }
    allbox[randomBox].style.pointerEvents="none";
    Playboard.style.pointerEvents="auto";
    playerSign="X";
}

}

function getIdVal(classname){
    return document.querySelector(".box-" + classname).id;
}

function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner()
{
    if(checkIdSign(1,2,3,playerSign)||checkIdSign(4,5,6,playerSign)||checkIdSign(7,8,9,playerSign)||checkIdSign(1,4,7,playerSign)||checkIdSign(2,5,8,playerSign)||checkIdSign(3,6,9,playerSign)||checkIdSign(1,5,9,playerSign)||checkIdSign(3,5,7,playerSign)){
        rungame=false;
        // game(rungame);
        setTimeout(()=>{
            ResultBox.classList.add("show");
            Playboard.classList.remove("show");
        }, 1000);
        wonText.innerHTML = "Player "+ playerSign +" won the game!";
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            rungame = false;
            // game(rungame);
            setTimeout(()=>{
                ResultBox.classList.add("show");
                Playboard.classList.remove("show");
            }, 700);
            wonText.innerHTML = "Match has been drawn!";
        }
    }
}


Replaybnt.addEventListener('click',()=>{
    window.location.reload();
})