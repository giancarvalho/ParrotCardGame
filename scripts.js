let listTag = document.querySelector("ul");
let numberOfCards;
let nTurns;
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
function startGame() {
  nTurns = 0;
  numberOfCards = Number(
    prompt(
      "Com quantas cartas deseja jogar? Escolha um número par entre 4 e 16"
    )
  );
  if (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    startGame();
  } else {
    deckSorted = parrotCards.sort(comparador);
    buildDeck(deckSorted);
  }
}

function buildDeck(deckSorted) {
  let fullDeck = [];
  for (let i = 0; i < numberOfCards / 2; i++) {
    fullDeck.push(deckSorted[i]);
    fullDeck.push(deckSorted[i]);
  }

  fullDeck = fullDeck.sort(comparador);
  console.log(fullDeck);
  buildGame(fullDeck);
}

function buildGame(deck) {
  listTag.innerHTML = "";
  for (let i = 0; i < deck.length; i++) {
    console.log(i);
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
}

function flipCard(backcard) {
  nTurns++;
  card = backcard.parentNode;
  card.classList.add("active");
  isTwoFlipped();
}

function isTwoFlipped() {
  let flippedCards = document.querySelectorAll(".active");
  console.log(flippedCards);

  if (flippedCards.length >= 2) {
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

startGame();
