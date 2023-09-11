<template>
  <div
    class="floating-button"
    :style="{
      ...position,
    }"
  >
    <b-btn
      :variant="variant"
      @click="$emit('click')"
      :style="{
        ...btnStyle,
      }"
    >
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
    btnStyle: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.floating-button {
  position: fixed;
  z-index: 1055;
  transition: all 0.3s $default-ease;
  .btn {
    // border-radius: 40rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 5px 8px rgba($color: #000000, $alpha: 0.1);
  }
}
</style>
