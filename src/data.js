const INIT_DATA = [
  {
    position: null,
    cardName: "maserati",
    img: "../assets/maserati.png",
    isFlipped: false,
    isMatched: false,
  },
  {
    position: null,
    cardName: "lamborghini",
    img: "../assets/lamborghini.png",
    isFlipped: false,
    isMatched: false,
  },
  {
    position: null,
    cardName: "mercedes",
    img: "../assets/mercedes.png",
    isFlipped: false,
    isMatched: false,
  },
  {
    position: null,
    cardName: "rollsroyce",
    img: "../assets/rollsroyce.png",
    isFlipped: false,
    isMatched: false,
  },
];

export function getCards() {
  let cards = [];
  let totalCards = [];
  cards = [...INIT_DATA, ...INIT_DATA];
  cards.sort(() => Math.random() - 0.5);

  totalCards = cards.map((card, index) => {
    return { ...card, position: index };
  });
  return totalCards;
}
