<template>
  <div class="game-board">
    <Header :finish="finish" />
    <Stats
      class="game-board-stats"
      :score="attempts"
      :finish="finish"
      @gameStart="initGame"
      @resetGame="resetGame"
    />

    <div class="cards-container">
      <Card
        v-for="(card, index) in cardList"
        :key="`card-${index}`"
        :value="card"
        :start="start"
        :reset="reset"
        @selectedCard="selectCard"
      />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Header from "./Header.vue";
import Stats from "./Stats.vue";

import { getCards } from "../data";

export default {
  components: { Card, Header, Stats },
  data() {
    return {
      cardList: [],
      flippedCards: [],
      pairedCard: [],
      attempts: 0,
      start: false,
      reset: false,
      finish: false,
    };
  },
  created() {
    this.cardList = getCards();
  },

  methods: {
    initGame() {
      this.start = true;
      this.reset = false;
      this.cardList = getCards();
    },
    //Track user selected cards
    selectCard(card) {
      this.attempts++;

      if (this.flippedCards.length < 2) {
        // It will insert till flippedcards has lenght 2
        this.flippedCards.push({ ...card });
        this.flippedCard(card);
      }

      if (this.flippedCards.length === 2) {
        this.findPairsOfCards();
      }
    },

    findPairsOfCards() {
      const [card1, card2] = this.flippedCards;

      if (card1 !== card2) {
        // if cards are match marked it as matched
        if (card1.cardName === card2.cardName) {
          this.pairedCard = [...this.flippedCards];
          this.pairedCard.forEach((card) => {
            this.cardList[card.position].isMatched = true;
          });

          this.flippedCards = [];

          // Game will finish if every cards are matches
          if (this.cardList.every((card) => card.isMatched === true)) {
            this.finish = true;
          }
        } else {
          setTimeout(() => {
            this.flippedBack();
          }, 500);
        }
      }
    },

    // flipped selected cards
    flippedCard(card) {
      if (card.isMatched || card.isFlipped) return;

      this.cardList[card.position].isFlipped = true;
    },

    // flipped back if cards not matched
    flippedBack() {
      this.flippedCards.forEach((card) => {
        this.cardList[card.position].isFlipped = false;
      });
      this.flippedCards = [];
    },

    resetGame() {
      this.reset = true;
      this.pairedCard = [];
      this.flippedCards = [];
      this.finish = false;
      this.attempts = 0;
      this.cardList.forEach((card) => {
        card.isFlipped = false;
        card.isMatched = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-board {
  .game-board-stats {
    margin-top: 2em;
    height: 50px;
  }
}
.cards-container {
  display: grid;
  margin: 50px 0;
  grid-template-columns: repeat(4, 300px);
  justify-content: center;
}
</style>
