<template>
  <div class="card" :class="{ disabled: value.isMatched || !start || reset }">
    <div v-if="!value.isFlipped" class="card-face" @click="selectedCard(value)">
      <img height="200px" width="200px" src="../assets/front.png" />
    </div>
    <div v-else class="card-face">
      <img
        height="200px"
        width="200px"
        :src="require(`../assets/${value.cardName}.png`)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    start: {
      type: Boolean,
      required: true,
    },
    reset: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    selectedCard(card) {
      this.$emit("selectedCard", card);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 200px;
  margin: 1rem;
  position: relative;
  width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  .card-face {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
