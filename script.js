//selecting require element
const selectBox = document.querySelector(".select-box");
const bntX = document.querySelector(".select-box .option .playerX");
const bntO = document.querySelector(".select-box .option .playerO");
const Playboard = document.querySelector(".play-board");
const ResultBox = document.querySelector(".result");
const Move = document.querySelector(".play-board .mov");
const allbox = document.querySelectorAll("section span");
const wonText = document.querySelector(".won-text");
const replayBnt = document.querySelector(".result button");
const reloadBnt = document.querySelectorAll(".result button")[1];

/// in minimax branch
let boardbox = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
window.onload = () => {// once the window loaded
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].setAttribute("onclick", "clickbox(this)");
    }
    let randomMove = Math.floor(Math.random() * 2);
    bntX.onclick = () => {
        selectBox.classList.add("hide");
        Playboard.classList.add("show");
        if (randomMove == 0) {
            game(true);
        }
    }
    bntO.onclick = () => {
        selectBox.classList.add("hide");
        Playboard.classList.add("show");
        Move.setAttribute("class", "mov active PlayerO");
        if (randomMove == 1) {
            game(true);
        }
    }



}


let playerXIcon = "fas fa-times",
    playerOIcon = "far fa-circle",
    playerSign = "X",
    rungame = true;

function clickbox(element) { // when player click any box
    if (rungame) {
        if (Move.classList.contains("PlayerO")) {
            playerSign = "O";
            element.innerHTML = `<i class="${playerOIcon}"></i>`;
            let curX = Math.floor(element.classList[1] / 3);
            let curY = element.classList[1] % 3;
            boardbox[curX][curY] = "O";
            Move.classList.remove("active");
        } else {
            element.innerHTML = `<i class="${playerXIcon}"></i>`;
            let curX = Math.floor(element.classList[1] / 3);
            let curY = element.classList[1] % 3;
            boardbox[curX][curY] = "X";
            Move.classList.add("active");
        }
        element.style.pointerEvents = "none";
        Playboard.style.pointerEvents = "none";
        selectWinner();
        let randomTimeDelay = (Math.random() * 500 + 300).toFixed();
        setTimeout(function () {
            game(rungame);
        }, randomTimeDelay);
    }
}


//main function
function game(rungame) {   // computer move
    if (rungame) {
        let array = [];
        for (let i = 0; i < allbox.length; i++) {
            const ele = allbox[i];
            if (ele.childElementCount == 0) {
                array.push(i);
            }
        }
        let level = document.getElementById('level').checked;
        let curPosition;
        if (level) {
            curPosition = bestmove();
        } else {
            curPosition = array[Math.floor(Math.random() * array.length)];
        }
        let element = allbox[curPosition];;
        if (array.length > 0) {
            if (Move.classList.contains("PlayerO")) {
                playerSign = "X";
                element.innerHTML = `<i class="${playerXIcon}"></i>`;
                let curX = Math.floor(element.classList[1] / 3);
                let curY = element.classList[1] % 3;
                boardbox[curX][curY] = "X";
                Move.classList.add("active");
            } else {
                playerSign = "O";
                element.innerHTML = `<i class="${playerOIcon}"></i>`;
                let curX = Math.floor(element.classList[1] / 3);
                let curY = element.classList[1] % 3;
                boardbox[curX][curY] = "O";
                Move.classList.remove("active");

            }
            selectWinner();
        }
        element.style.pointerEvents = "none";
        Playboard.style.pointerEvents = "auto";
        playerSign = "X";
    }

}

function getIdVal(classname) {
    let curX = Math.floor((classname) / 3);
    let curY = Math.floor((classname) % 3);
    return boardbox[curX][curY];
}

function checkWinner(Sign) {
    for (let i = 0; i < 3; i++) {
        if (boardbox[i][0] == Sign && boardbox[i][1] == Sign && boardbox[i][2] == Sign) return true;
        if (boardbox[0][i] == Sign && boardbox[1][i] == Sign && boardbox[2][i] == Sign) return true;
    }
    if (boardbox[0][0] == Sign && boardbox[1][1] == Sign && boardbox[2][2] == Sign) return true;
    if (boardbox[0][2] == Sign && boardbox[1][1] == Sign && boardbox[2][0] == Sign) return true;
    return false;
}

function checkDraw() {
    for (let i = 0; i < 3; i++) {
        if (boardbox[0][i] == "" || boardbox[1][i] == "" || boardbox[2][i] == "") return false;
    }
    return true;
}

function selectWinner() {
    if (checkWinner(playerSign)) {
        rungame = false;
        // game(rungame);
        setTimeout(() => {
            ResultBox.classList.add("show");
            Playboard.classList.remove("show");
        }, 500);
        wonText.innerHTML = "Player <span> " + playerSign + " </span> won the game!";
    } else {
        if (checkDraw()) {
            rungame = false;
            // game(rungame);
            setTimeout(() => {
                ResultBox.classList.add("show");
                Playboard.classList.remove("show");
            }, 500);
            wonText.innerHTML = "Match has been drawn!";
        }
    }
}

/////////////minimax algorithm section


let Ai = "O";
let Player = "X";

function bestmove() {
    Ai = "O";
    Player = "X";
    if (Move.classList.contains("PlayerO")) {
        Ai = "X";
        Player = "O";
    }
    let maxScore = -10000;
    let bestPosition;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardbox[i][j] == "") {
                boardbox[i][j] = Ai;
                let curScore = minSearch();
                if (curScore > maxScore) {
                    maxScore = curScore;
                    bestPosition = 3 * i + j;
                }
                boardbox[i][j] = "";
            }
        }
    }
    return bestPosition;
}


function minSearch() {
    if (checkWinner(Ai)) return 10;
    if (checkWinner(Player)) return -10;
    if (checkDraw()) return 0;
    let minScore = 10000;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardbox[i][j] == "") {
                boardbox[i][j] = Player;
                let curScore = maxSearch();
                minScore = Math.min(minScore, curScore);
                boardbox[i][j] = "";
            }
        }
    }
    return minScore;
}

function maxSearch() {
    if (checkWinner(Ai)) return 10;
    if (checkWinner(Player)) return -10;
    if (checkDraw()) return 0;
    let maxScore = -10000;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardbox[i][j] == "") {
                boardbox[i][j] = Ai;
                let curScore = minSearch();
                maxScore = Math.max(curScore, maxScore);
                boardbox[i][j] = "";
            }
        }
    }
    return maxScore;

}


replayBnt.addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boardbox[i][j] = "";
        }
    }
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].style.pointerEvents = "auto";
        allbox[i].innerHTML = "";
    }
    rungame = true;
    Playboard.style.pointerEvents = "auto";
    ResultBox.classList.remove("show");
    Playboard.classList.add("show");
})


reloadBnt.addEventListener('click', () => {
    window.location.reload();
})