let infoEl = document.querySelector("p");
let highScoreEl = document.getElementById("highScore");

let boxes = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
let highScore = 0;

let gameSeq = [];
let userSeq = [];

function resetGame(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function  gameRandomFlash(randomColorEl){
    randomColorEl.classList.add("game-flash");
    setTimeout(function(){
        randomColorEl.classList.remove("game-flash");
    },250);
}

function levelUp(){

    userSeq = [];
    level++;

    infoEl.textContent = `Level ${level}`;

    let randomNum = Math.floor(Math.random()*4);
    console.log(randomNum)
    let randomColor = boxes[randomNum];

    gameSeq.push(randomColor);

    let randomColorEl = document.querySelector(`.${randomColor}`);

    gameRandomFlash(randomColorEl);

    if(level > highScore){
        highScore = level;
    }
}

function startGame(){
    if(started === false){
        started = true;
        levelUp();
        highScoreEl.textContent = "";
    }
}

function userFlash(pressedEl){
    pressedEl.classList.add("user-flash");
    setTimeout(function(){
        pressedEl.classList.remove("user-flash");
    },250);
}

function checkSequence(latestIndex){
    if(gameSeq[latestIndex] === userSeq[latestIndex]){
        if(gameSeq.length === userSeq.length){
            setTimeout(function(){
                levelUp();
            },700)
        }
    }
    else{
        infoEl.textContent = `Game over! your score is ${level-1}. Press any key to restart`;

        highScoreEl.textContent = `High score: ${highScore-1}`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
           document.querySelector("body").style.backgroundColor = "white";
        },250);   

        resetGame();
    }
}

function boxPressed(){
    let pressedEl = this;

    userFlash(pressedEl);

    let pressedElColor = pressedEl.getAttribute("id");
    userSeq.push(pressedElColor);

    let latestIndex = userSeq.length-1;
    
    if(level > 0){
        checkSequence(latestIndex);
    }

}

document.addEventListener("keypress",startGame);

let allBoxEl = document.querySelectorAll(".box");
for(let eachBox of allBoxEl){
    eachBox.addEventListener("click",boxPressed);
}


