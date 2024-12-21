let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let cnt = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const showWinner = (winner) => {
    msg.innerText = `Hurray, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showDraw = () => {
    msg.innerText = `It's a draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let winnerFound = false;

    for(pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText; 
        let pos3 = boxes[pattern[2]].innerText;  

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
                winnerFound = true;
                break;
            }
        }
    };

    if (!winnerFound && cnt == 9) {
        showDraw();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(box.innerText === ""){
            if(turnO){
                box.innerText = "O";
                box.style.color = "magenta";
            } else{
                box.innerText = "X";
                box.style.color = "mulberry";
            }
            box.disabled = true;
            cnt++;
            turnO = !turnO;
            checkWinner();
        }
    })
});


const resetGame = () => {
    turnO = true;
    cnt = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)