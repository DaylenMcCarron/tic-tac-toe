let xArray = [];
let yArray = [];
let opponentInput;
let connected = false;
let move;
let isX = true;
let clicked = false;
let opponentPlayed = false;
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
const cellElements = document.getElementsByName('cell')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const boardc = document.querySelector(".boardWrapper")
const quitB = document.querySelector(".quit-btn")
const SingPbtn = document.getElementById('sing-plyr-opt');
const TwoPbtn = document.getElementById('two-plyr-opt');
const MultiPbtn = document.getElementById('multi-plyr-opt');
const SingP = document.getElementById('display-players');
const TwoP = document.getElementById('two-player');
const MultiP = document.getElementById('multi-player');
const p1 = document.getElementById('Player1');
const p2 = document.getElementById('Player2');
const players = document.getElementById('Players');
const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');

const playerOptions = [SingP, TwoP, MultiP];

beforeGame()
hideAllPlayerOptions();
wrapperShadow(true);

SingPbtn.addEventListener('change', function() {
  if(this.checked){
    hideAllPlayerOptions();
    SingP.classList.remove('hidden');
  } 
});

TwoPbtn.addEventListener('change', function() {
  if(this.checked){
    hideAllPlayerOptions();
    TwoP.classList.remove('hidden');
  } 
});

MultiPbtn.addEventListener('change', function() {
  if(this.checked){
    hideAllPlayerOptions();
    MultiP.classList.remove('hidden');
  } 
});

document.getElementById("playButton").addEventListener("click", function(){
  if(TwoPbtn.checked){
    boardc.classList.toggle("moveRight");
    twoPlayer()
    players.classList.remove('hidden');
    if (p1.value === '') {
      player1.innerHTML = 'Player 1';
    } else {
      player1.innerHTML = p1.value;
    }
    if (p2.value === '') {
      player2.innerHTML = 'Player 2';
    } else {
      player2.innerHTML = p2.value;
    }
    wrapperShadow(false)
  }

  else if(SingPbtn.checked){
    boardc.classList.toggle("moveRight");
    onePlayer()
    players.classList.remove('hidden');
    player1.innerHTML = 'Player 1';
    player2.innerHTML = 'Computer';
    wrapperShadow(false)
  }

  else if (MultiPbtn.checked) {
    if (connected) {
    boardc.classList.toggle("moveRight");
    players.classList.remove('hidden');
    multiPlayer();
    wrapperShadow(false)
    } else {
      console.log("Please Join a room")
    }
  }
});
document.getElementById("quitButton").addEventListener("click", beforeGame);

quitB.addEventListener('click', () => {
  boardc.classList.remove("moveRight");
  SingPbtn.checked = false;
  TwoPbtn.checked = false;
  MultiPbtn.checked = false;
  hideAllPlayerOptions();
  players.classList.add('hidden');
});

let circleTurn
let p1value = ''
let p2value = ''

restartButton.addEventListener('click', twoPlayer)

function hideAllPlayerOptions() {
  playerOptions.forEach(option => {
    option.classList.add('hidden');
  });
}

function showAllPlayerOptions() {
  playerOptions.forEach(option => {
    option.classList.remove('hidden');
  });
}

function beforeGame() {
  document.getElementById("mode").style.display = "block";
  showAllPlayerOptions();
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
  document.getElementById("playButton").style.display = "";
  document.getElementById("lso").style.display = "";
}


function twoPlayer() {
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
  document.getElementById("playButton").style.display = "none";
  document.getElementById("mode").style.display = "none";
  hideAllPlayerOptions();
}

function multiPlayer() {

  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
  document.getElementById("playButton").style.display = "none";
  document.getElementById("mode").style.display = "none";
  hideAllPlayerOptions();
}

//One Player
function onePlayer() {
  circleTurn = false;

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
  document.getElementById("playButton").style.display = "none";
  document.getElementById("mode").style.display = "none";
  hideAllPlayerOptions();
}


function handleClick(e) {
  if (isX) {
    if (circleTurn && connected) {
      console.log("Wait for opponent");
      return;
    }
  } else {
    if (!circleTurn && connected) {
      console.log("Wait for opponent");
      return;
    }
  }
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  storeArrayOnClick(cell, currentClass)
  placeMark(cell, currentClass)
  
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } 
    else {
      swapTurns();
      setBoardHoverClass();
      wrapperShadow(false);
      if(SingPbtn.checked){
      setTimeout(computerMove,1000);
      }
      else if (MultiPbtn.checked) {
        checkOpponentPlayed();
      }
    
  }
  clicked = true;
}


document.getElementById("playButton").addEventListener('click', checkOpponentPlayed)

function opponentPlayedTrue(serverMove) {
  move = serverMove;
  opponentPlayed = true;
}

function checkOpponentPlayed() {
  if (connected === false) {console.log("Not Connected");return}
  if(opponentPlayed === false) {
    console.log("is checking")
    window.setTimeout(checkOpponentPlayed, 1000);
  } else {
    /* do something*/
    opponentMove();
    console.log("Opp move should run")
    opponentPlayed = false;
  }
}

function opponentMove() {
  opponentInput = move;
  if (opponentInput == NaN) {
    return
  }
  console.log(opponentInput + "OPPINENENT INPUT")
  if (!opponentInput) {
    endGame(false);
  }

  const emptyCells = cellElements
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

  if (emptyCells.length > 0) {
    const fillEmptyCell = emptyCells[(opponentInput - 1)];
    console.log(fillEmptyCell)
    console.log(opponentInput)
    placeMark(fillEmptyCell, currentClass);
    fillEmptyCell.removeEventListener('click', handleClick);

    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
      wrapperShadow(false);
    }
  }
}

function computerMove() {
  console.log("comp move")
  const emptyCells = [...cellElements].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS));
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomEmptyCell = emptyCells[randomIndex];
    placeMark(randomEmptyCell, currentClass);
    randomEmptyCell.removeEventListener('click', handleClick);

    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
      wrapperShadow(false);
    }
  }
}


function storeArrayOnClick(cell, currentClass) {
  if (currentClass == X_CLASS && isX) {
    xArray.push(cell.innerHTML);
  } else if (currentClass == CIRCLE_CLASS && !isX) {
    yArray.push(cell.innerHTML);
  }
  console.log(xArray + "    "+ yArray + "BRUHTER")
}

function endGame(draw) {
  setTimeout(() => {
    wrapperShadow(true);
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
    xArray = [];
    yArray = [];
  }
    , 1000)
  opponentPlayed == false;
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

function wrapperShadow(defaultShadow) {
  let wrapper = document.getElementById('boardWrapper');
  if(defaultShadow) {
    wrapper.classList.remove('wrapperShadow_x')
    wrapper.classList.remove('wrapperShadow_y')
    wrapper.classList.add('wrapperShadow_default')
  } else if (circleTurn) {
    wrapper.classList.remove('wrapperShadow_x')
    wrapper.classList.remove('wrapperShadow_default')
    wrapper.classList.add('wrapperShadow_y')
  } else {
    wrapper.classList.remove('wrapperShadow_y')
    wrapper.classList.remove('wrapperShadow_default')
    wrapper.classList.add('wrapperShadow_x')
  }
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


function setIsX (bool) {
  connected = true;
  isX = bool;
}

function clickedFalse() {
  clicked = false;
}


export { circleTurn, clicked, xArray, yArray, setIsX, isX, clickedFalse, opponentPlayedTrue };
