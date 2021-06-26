<template>
  <div class="stats-controls">
    <div class="stats-controls__button">
      <button
        v-if="!start"
        class="stats-controls__button-green"
        @click="startGame"
      >
        Start
      </button>
      <button v-else class="stats-controls__button-red" @click="resetGame">
        {{ startAgain }}
      </button>
    </div>
    <div class="stats-controls-score" :class="{ finish }">
      <div>Turns: {{ score }}</div>
      <div>Total Time : {{ min }} : {{ sec }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: false,
      totalTime: { minutes: 0, seconds: 0 },
      handleInterval: 0,
      attempts: 0,
    };
  },
  props: {
    score: {
      type: Number,
      required: true,
    },
    finish: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    finish(newValue) {
      if (newValue) {
        this.gameFinished();
      }
    },
  },
  computed: {
    sec() {
      if (this.totalTime.seconds < 10) {
        return "0" + this.totalTime.seconds;
      }
      return this.totalTime.seconds;
    },
    min() {
      if (this.totalTime.minutes < 10) {
        return "0" + this.totalTime.minutes;
      }
      return this.totalTime.minutes;
    },
    startAgain() {
      return this.finish === true ? "Play Again" : "Restart";
    },
  },
  methods: {
    startGame() {
      this.start = true;
      this.$emit("gameStart", this.start);
      this.handleInterval = setInterval(this.startCounter, 1000);
    },
    startCounter() {
      if (this.totalTime.seconds !== 59) {
        this.totalTime.seconds++;
        return;
      }

      this.totalTime.minutes++;
      this.totalTime.seconds = 0;
    },
    gameFinished() {
      clearInterval(this.handleInterval);
    },
    resetGame() {
      this.start = false;
      this.attempts = 0;
      this.totalTime = { minutes: 0, seconds: 0 };
      clearInterval(this.handleInterval);
      this.$emit("resetGame");
    },
  },
};
</script>

<style lang="scss" scoped>
.stats-controls {
  display: flex;
  justify-content: space-around;
  margin: 0 2em;

  &__button-green {
    width: 6em;
    padding: 0.5em;
    background: #50c878;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }
  &__button-red {
    width: 6em;
    padding: 0.5em;
    background: #e64725;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }

  .stats-controls-score {
    &.finish {
      background: #50c878;
      border-radius: 4px;
      text-align: center;
      padding: 0.5em;
    }
  }
}
</style>
