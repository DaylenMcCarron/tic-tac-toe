let xArray = ["default"];
let yArray = ["default"];
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

document.getElementById("playButton").addEventListener("click", startGame);
document.getElementById("quitButton").addEventListener("click", beforeGame);

let circleTurn

let test

restartButton.addEventListener('click', startGame)

beforeGame()

function beforeGame() {
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
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
  clicked = "t";
  const cell = e.target
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

function clickedFalse() {
  clicked = "f";

  
  console.log("executed ClickedFalse");
}

function storeArray(cell, currentClass) {
  if (currentClass == X_CLASS) {
    xArray.push(cell.innerHTML);
  } else {
    yArray.push(cell.innerHTML);
  }
  console.log(xArray)
  console.log(yArray)
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



export {xArray, yArray, clicked, clickedFalse, circleTurn};