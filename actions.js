const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const resetBtn = document.querySelector("#reset")
const startCells = [
    "", "", "", "", "", "", "", "", "",
]


let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add('square')
        cellElement.id = `square-${index}`
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    
    })
}

createBoard()




function addGo(e) {
    // console.log(e.target)
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.appendChild(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s turn."
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
       /*horizontal*/ [0, 1, 2], [3, 4, 5], [6, 7, 8],
       /*vertical*/ [0, 3, 6], [1, 4, 7], [2, 5, 8], 
       /*diagonal*/ [0, 4, 8], [2, 4, 6]
    ]

    console.log(allSquares[0])

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))
           
            if (circleWins) {
                infoDisplay.textContent = "Circle Wins!"
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                return
            }
        })
        winningCombos.forEach(array => {
            const crossWins = array.every(cell => 
                allSquares[cell].firstChild?.classList.contains('cross'))
               
                if (crossWins) {
                    infoDisplay.textContent = "Cross Wins!"
                    allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                    return
                }
            })
}

//reset button
resetBtn.addEventListener("click", () => {
    clearBoard();

    //resets game-related variables
    go = "circle";
    infoDisplay.textContent = "Circle goes first";

    //adds event listeners back in since removed
    addSquareListeners();
})

function clearBoard() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => {
        square.innerHTML = ""; 
    })
}

function addSquareListeners() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => {
        square.addEventListener("click", addGo)
    })
}


/*
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle')
        );
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?classList.contains('cross')
        );
   

    if (circleWins) {
        infoDisplay.textContent = "Circle Wins!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    } else if (crossWins) {
        infoDisplay.textContent = "Cross Wins!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    }
});
} 

*/

//     const render = () => {
//         let boardHTML = "";
//         gameboard.forEach((square, index) => {
//             boardHTML += `<div class="square" id="square-${index}">${square}</div>`
//         })
//         document.getElementById("gameboard").innerHTML = boardHTML;
//         const squares = document.querySelectorAll(".square");
//         console.log(squares);
//     }


//     return{
//         render,
//     }
// })();

// const createPlayer = (name, mark) => {
//     return{
//         name, 
//         mark
//     }
// }


// const Game = (() => {
//     let players = [];
//     let currentPlayerIndex;
//     let gameOver;

//     const start = () =>{
//         players = [
//             createPlayer(document.querySelector("#player1").value, "X"),
//             createPlayer(document.querySelector("#player2").value, "O")
//         ]

//         currentPlayerIndex = 0;
//         gameOver = false;
//         Gameboard.render();
//     }

//     return{
//         start,
//     }

// })();

// const startButton = document.getElementById('start-button');
// startButton.addEventListener("click", () => {
//     //Game.start()
// })