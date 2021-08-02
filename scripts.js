// global variables

const listTag = document.querySelector("ul");
const stopwatchHTML = document.querySelector(".stopwatch");
let numberOfCards;
let nTurns;
let stopwatchID;
let sec;
rankingRecord = [];
let parrotCards = [
  `<img src="assets/bobrossparrot.gif" alt="" />`,
  `<img src="assets/explodyparrot.gif" alt="" />`,
  `<img src="assets/fiestaparrot.gif" alt="" />`,
  `<img src="assets/metalparrot.gif" alt="" />`,
  `<img src="assets/revertitparrot.gif" alt="" />`,
  `<img src="assets/tripletsparrot.gif" alt="" />`,
  `<img src="assets/unicornparrot.gif" alt="" />`,
];

// verifies if number of card input is valid
startGame();

function startGame() {
  sec = 0;
  nTurns = 0;
  numberOfCards = Number(
    prompt(
      "Com quantas cartas deseja jogar? Escolha um número par entre 4 e 14"
    )
  );
  if (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    startGame();
  } else {
    deckSorted = parrotCards.sort(comparador);
    buildDeck(deckSorted);
  }
}

// begin stopwatch
function beginWatch() {
  sec++;
  stopwatchHTML.innerHTML = `<p>${sec}</p>`;
}

// build deck of the turn
function buildDeck(deckSorted) {
  let fullDeck = [];
  for (let i = 0; i < numberOfCards / 2; i++) {
    fullDeck.push(deckSorted[i]);
    fullDeck.push(deckSorted[i]);
  }

  fullDeck = fullDeck.sort(comparador);
  buildGame(fullDeck);
}

// insert built deck into the html
function buildGame(deck) {
  listTag.innerHTML = "";
  for (let i = 0; i < deck.length; i++) {
    listTag.innerHTML += `<li>
            <div class="card">
              <div class="backface" onclick="flipCard(this)">
                <img src="assets/front.png" alt="" />
              </div>
              <div class="frontface">
                ${deck[i]}
              </div>
            </div>
          </li>`;
  }
  stopwatchID = setInterval(beginWatch, 1000);
}

// flip card and count the turns
function flipCard(backcard) {
  let flippedCards = document.querySelectorAll(".active");
  if (flippedCards.length < 3) {
    nTurns++;
    card = backcard.parentNode;
    card.classList.add("active");
    isTwoFlipped();
  }
}

// verifies if two cards are flipped and if card pair was found
function isTwoFlipped() {
  let flippedCards = document.querySelectorAll(".active");
  if (flippedCards.length === 2) {
    let parrotOne = flippedCards[0].querySelector(".frontface > img");
    let parrotTwo = flippedCards[1].querySelector(".frontface > img");

    if (parrotOne.getAttribute("src") === parrotTwo.getAttribute("src")) {
      flippedCards[0].classList.add("pair-found");
      flippedCards[1].classList.add("pair-found");
      unflipCards(flippedCards);
      win();
    } else {
      setTimeout(unflipCards, 1000, flippedCards);
    }
  }
}

function unflipCards(flippedCards) {
  for (let i = 0; i < flippedCards.length; i++) {
    flippedCards[i].classList.remove("active");
  }
}

// verifies if all pairs have been found
function win() {
  let cardsFound = document.querySelectorAll(".pair-found");
  if (Number(cardsFound.length) === numberOfCards) {
    setTimeout(function () {
      alert(
        `Parabéns, você encontrou todas as cartas em ${sec} segundos! Número de Jogadas: ${nTurns}`
      ),
        clearInterval(stopwatchID);
      insertScore();
      setTimeout(playAgain, 1000);
    }, 500);
  }
}

// prompts the player if they want to play another game
function playAgain() {
  let anotherGame = prompt(
    "Gostaria de jogar novamente? Digite: 'sim' ou 'nao' "
  );

  if (anotherGame === "sim") {
    startGame();
  } else if (anotherGame === "nao") {
    alert("Okay! Obrigado por visitar Parrot Card Game.");
  } else {
    playAgain();
  }
}

// insert score into the ranking list
function insertScore() {
  const rankingList = document.querySelector(".ranking-list > ul");
  createPlayer();
  rankingRecord = orderList(rankingRecord);
  rankingList.innerHTML = "";
  for (let i = 0; rankingRecord.length > i; i++) {
    rankingList.innerHTML += `<li>
    <span class="player-name">${rankingRecord[i].playerName}</span>
    <span class="n-of-cards">${rankingRecord[i].nCards}</span>
    <span class="time">${rankingRecord[i].time}</span>
    <span class="score">${rankingRecord[i].score}</span>
  </li>`;
  }
}

// create a new player or update record of a previous one, in case a new record was achieved
function createPlayer() {
  const playerName = prompt("Qual seu nome?");
  let player = {
    playerName,
    nCards: numberOfCards,
    score: Math.round(calculateScore()),
    time: sec,
  };

  previousTurn = isPlayerInRecord(playerName);
  if (previousTurn !== false) {
    if (player.score > previousTurn.score) {
      alert(
        `Parabéns! Você bateu seu antigo recorde por ${
          player.score - previousTurn.score
        } pontos`
      );
      previousTurn.nCards = player.nCards;
      previousTurn.score = player.score;
      previousTurn.time = player.time;
    } else {
      alert(
        `Você fez ${player.score} nessa rodada, ${
          previousTurn.score - player.score
        } pontos a menos que sua melhor rodada`
      );
    }
  } else {
    rankingRecord.push(player);
  }
}

// verifies if player is in the record
function isPlayerInRecord(playerName) {
  if (rankingRecord.length > 0) {
    for (let i = 0; rankingRecord.length > i; i++) {
      if (playerName === rankingRecord[i].playerName) {
        return rankingRecord[i];
      }
    }
  }
  return false;
}

// order record list in descending order based on player score
function orderList(list) {
  if (list.length > 1) {
    for (let i = 1; i < list.length; i++) {
      for (let j = 0; j < i; j++)
        if (list[i].score > list[j].score) {
          let x = list[i];
          list[i] = list[j];
          list[j] = x;
        }
    }
  }

  return list;
}

function calculateScore() {
  numberOfCards;
  sec;
  nTurns;

  let score = numberOfCards * 500 * (numberOfCards / nTurns) - sec * 2;

  return score;
}

// toggles mobile ranking modal
function showRanking() {
  const ranking = document.querySelector(".ranking");
  const overlay = document.querySelector(".overlay");

  ranking.classList.toggle("active");
  overlay.classList.toggle("active");
}

function comparador() {
  return Math.random() - 0.5;
}
