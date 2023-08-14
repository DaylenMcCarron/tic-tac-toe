let xArray = [];
let yArray = [];
let oppArray = [];
let myTurn;
let oppEnteredValue = false;
let isLocalMultiplayer = false;
let isX = true;
let clicked = "f";
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const btnMoveRight = document.querySelector(".play-btn")
const boardc = document.querySelector(".board")

document.getElementById("playButton").addEventListener("click", startGame);
document.getElementById("quitButton").addEventListener("click", beforeGame);

btnMoveRight.addEventListener('click', () => {
  boardc.classList.toggle("moveRight");
});

let circleTurn

restartButton.addEventListener('click', startGame)

beforeGame()

function beforeGame() {
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
  })
  const cell9 = document.getElementById("9")
  const cell8 = document.getElementById("8")
  const cell5 = document.getElementById("5")
  const cell3 = document.getElementById("3")
  const cell2 = document.getElementById("2")
  const cell1 = document.getElementById("1")
  cell9.classList.add(CIRCLE_CLASS)
  cell8.classList.add(X_CLASS)
  cell5.classList.add(CIRCLE_CLASS)
  cell3.classList.add(X_CLASS)
  cell2.classList.add(CIRCLE_CLASS)
  cell1.classList.add(X_CLASS)
  winningMessageElement.classList.remove('show')
}

function startGame() {
  xArray = [];
  yArray = [];
  if (isX == true) {
    myTurn = true
  }
  setInterval(update, 2000); // Change the interval duration to 2000 ms

  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  myTurn = !myTurn;
  clicked = "t";
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  storeArrayOnClick(cell, currentClass)
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
    aiBot();
  }
}

function clickedFalse() {
  clicked = "f";
}

function storeArrayOnClick(cell, currentClass) {
  if (currentClass == X_CLASS) {
    xArray.push(cell.innerHTML);
  } else {
    yArray.push(cell.innerHTML);
  }
}

function storeArray(cell, currentClass) {
  if (isLocalMultiplayer) {
  if (currentClass == X_CLASS) {
    xArray.push(cell.innerHTML);
  } else {
    yArray.push(cell.innerHTML);
  }
}
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
  }
  winningMessageElement.classList.add('show')
  xArray = [];
  yArray = [];
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
    } else {
      board.classList.add(X_CLASS)
    }  
  }

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function opponentPlay() {

  if (isX && (!arraysMatch(oppArray,yArray))) {
    myTurn = !myTurn;
    console.log("running")
      oppArray = yArray.slice();
      const lastElement = (oppArray[oppArray.length - 1]);
      const oppCell = document.getElementById(lastElement)
      handleInput(oppCell);
    
  } else if (isX && (!arraysMatch(oppArray,xArray))) {
     (oppArray != xArray) 
      oppArray = xArray;
      const lastElement = oppArray[oppArray.length - 1];
      const oppCell = document.getElementById(lastElement)
      handleInput(oppCell);
    
  }
}

function handleInput(cell) {
  clicked = "t";
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  storeArray(cell, currentClass)
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}


function update() {
  if ((!isLocalMultiplayer) && (!myTurn) && oppEnteredValue) {
    oppEnteredValue = false;
    opponentPlay();
  }
}


//push  to oppPlayer
const pushButton = document.getElementById("testButton")
pushButton.addEventListener("click", () => {
  aiBot();
})

function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

let inputArr = [];
function aiBot() {
  if (myTurn) {
    return; // If it's still the human's turn, don't execute AI moves
  }

  const availableCells = Array.from(cellElements).filter(cell => {
    return !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS);
  });

  if (availableCells.length === 0) {
    return; // No available cells to play
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const aiCell = availableCells[randomIndex];
  
  setTimeout(() => {
    handleInput(aiCell);
  }, 1000); // Add a small delay to make AI moves more visible

  oppEnteredValue = true;
}




export {xArray, yArray, clicked, clickedFalse, circleTurn};