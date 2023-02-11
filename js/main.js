//BLUEPRINT CLASS FOR HISTORY OBJECT

class blueprint {
  constructor() {
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
  }
}

// CHECKING LOCAL STORAGE FOR PREVIOUS RECORD

// HELPER FUNCTIONS

const checkPreviousHistory = () => {
  let history = callHistory();
  if (!history) {
    history = new blueprint();
    updateHistory(history);
  }

  return history;
};

const callHistory = () => {
  let history = localStorage.getItem(`player`);
  history = JSON.parse(history);

  return history;
};

const updateHistory = (history) => {
  history = JSON.stringify(history);
  localStorage.setItem(`player`, history);
};

const displayHistory = (history) => {
  const wins = document.querySelector(`.win-value`);
  const draws = document.querySelector(`.draw-value`);
  const losses = document.querySelector(`.loss-value`);

  wins.innerHTML = history.wins;
  draws.innerHTML = history.draws;
  losses.innerHTML = history.losses;
};

// MAIN FUNCTION

const gettingHistory = () => {
  let history = checkPreviousHistory();

  displayHistory(history);
};

gettingHistory();

// GAME FLOW

// HELPER FUNTIONS

const computerChoice = () => {
  let rpsArray = [`rock`, `paper`, `scissors`];
  let choice = Math.floor(Math.random() * 3);
  let computer = rpsArray[choice];

  return computer;
};

const displayComputerChoice = (computer) => {
  const computerChoice = document.querySelector(`.computer-choice`);

  computerChoice.id = `${computer}`;

  if (computer == `rock`) {
    computerChoice.innerHTML = `<i class="fa-solid fa-hand-back-fist"></i>`;
  } else if (computer == `paper`) {
    computerChoice.innerHTML = `<i class="fa-solid fa-hand"></i>`;
  } else {
    computerChoice.innerHTML = `<i class="fa-solid fa-hand-scissors"></i>`;
  }

  setTimeout(() => {
    computerChoice.innerHTML = ``;
  }, 2000);
};

const decideWinner = () => {
  const computer = document.querySelector(`.computer-choice`);
  const player = document.querySelector(`.player-choice`);

  let playerChoice = player.id;
  let computerChoice = computer.id;

  if (playerChoice == computerChoice) {
    let result = `tie`;
    return result;
  } else if (playerChoice == `rock` && computerChoice == `scissors`) {
    let result = `player`;
    return result;
  } else if (playerChoice == `paper` && computerChoice == `rock`) {
    let result = `player`;
    return result;
  } else if (playerChoice == `scissors` && computerChoice == `paper`) {
    let result = `player`;
    return result;
  } else {
    let result = `computer`;
    return result;
  }
};

const displayWinner = (result) => {
  const results = document.querySelector(`.result`);
  results.classList.add(`show`);

  if (result == `tie`) {
    results.innerHTML = `It's a tie!`;
    results.classList.add(`tie`);
  } else if (result == `player`) {
    results.innerHTML = `You Win!`;
    results.classList.add(`player-win`);
  } else {
    results.innerHTML = `Computer Wins`;
    results.classList.add(`computer-win`);
  }

  setTimeout(() => {
    results.className = `cont result`;
  }, 4200);
};

const updateLocalStorage = (result) => {
  let history = checkPreviousHistory();

  if (result == `tie`) {
    history.draws = history.draws + 1;
  } else if (result == `player`) {
    history.wins = history.wins + 1;
  } else {
    history.losses = history.losses + 1;
  }

  updateHistory(history);
};

const updateRecords = () => {
  let history = checkPreviousHistory();

  displayHistory(history);
};

// MAIN FUNCTIONS

const initGame = () => {
  const choices = document.querySelectorAll(`.choice`);

  choices.forEach((e) => {
    e.onclick = () => {
      const player = document.querySelector(`.player-choice`);
      player.innerHTML = e.innerHTML.trim();
      player.id = `${e.id}`;
      setTimeout(() => {
        player.innerHTML = ``;
      }, 2000);

      let computer = computerChoice();
      displayComputerChoice(computer);

      let result = decideWinner();

      displayWinner(result);

      updateLocalStorage(result);

      updateRecords();
    };
  });
};

initGame();

// RESET RECORDS

const resetRecord = () => {
  const resetBtn = document.querySelector(`.reset`);

  resetBtn.onclick = () => {
    localStorage.removeItem(`player`);

    let history = checkPreviousHistory();

    displayHistory(history);
  };
};

resetRecord();
