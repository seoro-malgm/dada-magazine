<template>
  <div
    class="floating-button"
    :style="{
      ...position,
    }"
  >
    <b-btn :variant="variant" @click="$emit('click')">
      <slot name="content" />
    </b-btn>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0,
        };
      },
    },
    variant: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
.floating-button {
  position: fixed;
  z-index: 1055;
  .btn {
    border-radius: 40rem;
    font-size: 1.15rem;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
