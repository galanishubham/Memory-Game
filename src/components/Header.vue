<template>
  <div class="header">
    <h1 class="header-main">Memory Game</h1>
    <h3>{{ gameMessage }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    finish: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    gameMessage() {
      return this.finish ? "Congratulations !!!" : "Welcome to Memory Game !!";
    },
  },
};
</script>

<style lang="scss" scoped></style>
