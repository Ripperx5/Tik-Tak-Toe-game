const boxs = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//Lets create the function to initialise the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

     boxs.forEach((box, index) => {
        box.innerText = "";
        boxs[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
     });

     newGameBtn.classList.remove("active");
     gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI uapdate
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

    //chack if winner is X;
            if(gameGrid[position[0]] === "X") 
            answer = "X";
            else {
                answer = "O";
            } 


    //disable pointer events
            boxs.forEach((box) => {
                box.style.pointerEvents = "none";
            })
        
            //now we know X/O is a winner
            boxs[position[0]].classList.add("win");
            boxs[position[1]].classList.add("win");
            boxs[position[2]].classList.add("win");
        }
   });
    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //Let's Check when ther is no winner

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });
    
    if(fillCount === 9){
        gameInfo.innerHTML = "Game Tied !"
        newGameBtn.classList.add("active");
    }
    
}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxs[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxs[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxs.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);






