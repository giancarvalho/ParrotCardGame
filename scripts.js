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

startGame();
