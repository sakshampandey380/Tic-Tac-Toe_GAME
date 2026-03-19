let boxes = document.querySelectorAll(".box");
let msg = document.getElementById("msg");
let msgContainer = document.querySelector(".msg-container");
let resetBtn = document.getElementById("reset-btn");
let newBtn = document.getElementById("new-btn");
let toggle = document.getElementById("mode-toggle");
let themeBtn = document.getElementById("theme-btn");

let scoreO=0, scoreX=0;
let mode="single";
let board=["","","","","","","","",""];
let currentPlayer="O";

/* SOUND */
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");

/* START GAME */
function startGame(m){
    mode=m;
    document.getElementById("mode").style.display="none";

    document.querySelector(".game").classList.add("start");
}

/* TOGGLE */
toggle.addEventListener("change",()=>{
    mode = toggle.checked ? "duo":"single";
    resetGame();
});

/* THEME */
themeBtn.onclick=()=>{
    document.body.classList.toggle("dark");
};

/* CLICK */
boxes.forEach((box,i)=>{
    box.addEventListener("click",()=>{
        if(board[i]!="") return;

        clickSound.play();
        move(i,currentPlayer);

        if(mode==="single" && currentPlayer==="X"){
            setTimeout(aiMove,400);
        }
    });
});

/* MOVE */
function move(i,player){
    board[i]=player;
    boxes[i].innerText=player;

    if(check(player)){
        win(player);
        return;
    }

    if(board.every(x=>x!="")){
        win("Draw");
        return;
    }

    currentPlayer = player==="O"?"X":"O";
}

/* AI */
function aiMove(){
    let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
    let r = empty[Math.floor(Math.random()*empty.length)];
    move(r,"X");
}

/* CHECK */
const patterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function check(p){
    return patterns.some(pt=>pt.every(i=>board[i]===p));
}

/* CONFETTI */
function confettiBlast(){
    confetti({particleCount:120,spread:80});
}

/* WIN */
function win(w){
    winSound.play();
    confettiBlast();

    if(w==="O"){
        scoreO++;
        document.getElementById("scoreO").innerText=scoreO;
    }
    else if(w==="X"){
        scoreX++;
        document.getElementById("scoreX").innerText=scoreX;
    }

    msg.innerText = w==="Draw"?"Draw!":`${w} Wins 🎉`;
    msgContainer.classList.remove("hide");

    setTimeout(()=>{
        msgContainer.classList.add("hide");
        resetGame();
    },2000);
}

/* RESET */
function resetGame(){
    board=["","","","","","","","",""];
    boxes.forEach(b=>b.innerText="");
    currentPlayer="O";
}

resetBtn.onclick=resetGame;
newBtn.onclick=resetGame;

const text = "Made with ❤️ by Saksham";
let index = 0;
const speed = 60;

function typeFooter(){
    if(index < text.length){
        document.getElementById("footer-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeFooter, speed);
    }
}

typeFooter();