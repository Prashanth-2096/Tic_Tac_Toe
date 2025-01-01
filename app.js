let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let startBtn = document.querySelector("#startgame");
let Entry = document.querySelector(".Entry");
let gameContainer = document.querySelector(".game-container")
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1 = document.querySelector("#player1");
let player2 = document.getElementById("player2");
let invalidname1 = document.querySelector(".invalidname1");
let invalidname2 = document.querySelector(".invalidname2");
let drawmsg = document.querySelector(".draw-msg");
let replay = document.querySelector(".replay");
let name1 = document.querySelector(".name1");
let name2 = document.querySelector(".name2")
let count =0;
let turnO = true; //playerX, playerY


const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO = true;
    MakeSound("reset")
    enableBoxes();
    msgContainer.classList.add("hide");
    Entry.classList.remove("hide");
    gameContainer.classList.add("hide");
    drawmsg.classList.add("hide");
    invalidname1.classList.add("hide");
    invalidname2.classList.add("hide")
    count=0
    player1.value="";
    player2.value="";
}

boxes.forEach((box) =>{
box.addEventListener("click",() =>{
    MakeSound("click")
    count=count+1;
    if (turnO){
        box.innerText="O";
        turnO=false;
    }else{ //playerX
        box.innerText="X"
        turnO=true;
    }
    box.disabled=true;
    
    checkWinner();
    });
});

const disableBoxes=()=>{
    for(let box of boxes) {
        box.disabled = true;

    }
}

const enableBoxes=()=>{
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations ${winner} You won :)`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const Drawmatch = () => {
    MakeSound("draw")
    gameContainer.classList.add("hide")
    drawmsg.classList.remove("hide")
    disableBoxes();
};

const checkWinner = () =>{
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val !="" && pos2Val != "" && pos3Val){
            if (pos1Val===pos2Val && pos2Val===pos3Val){
                if (pos1Val =="o"){
                    showWinner(player1.value)
                }else{
                    showWinner(player2.value)
                }
                
                MakeSound("winning");
                return true
            }
        }
        if (count===9){
            Drawmatch();
        }
    }
    
};

function MakeSound(key){
    switch (key){
        case "draw":
            var draw = new Audio('./assets/tie_sound.mp3')
            draw.play();
            break;
        case "click":
            var click = new Audio('./assets/click.mp3')
            click.play();
            break;
        case "winning":
            var winning = new Audio('./assets/winning.mp3')
            winning.play();
            break;
        case "reset":
            var reset = new Audio('./assets/reset.mp3')
            reset.play();
            break;
        default: console.log("cool")
    }
}

const startGame = () =>{
    if (player1.value=="" || player2.value==""){
        invalidname2.classList.remove("hide")
        invalidname1.classList.add("hide")
    }
    else if (player1.value==player2.value){
        invalidname1.classList.remove("hide")
        invalidname2.classList.add("hide")
    }else{
        Entry.classList.add("hide");
        name1.innerText=`Player 1: ${player1.value}`
        name2.innerText=`Player 2: ${player2.value}`
        gameContainer.classList.remove("hide");
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click",startGame)  //start the game
replay.addEventListener("click",resetGame)