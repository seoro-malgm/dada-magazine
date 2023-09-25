<template>
  <!-- <div class="horizon-bar">
    <div class="bar rounded-left" />
    <img
      class="pin"
      :src="require('@/assets/images/hr-pin.svg')"
      alt="가로 바 핀"
    />
    <div class="bar rounded-right" />
  </div> -->
  <hr class="hr" />
</template>

<script>
export default {
  props: {
    left: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style lang="scss" scoped>
hr.hr {
  margin: 0 auto !important;
  border-width: 4px;
  border-color: $primary;
}
.horizon-bar {
  display: flex;
  align-items: top;
  width: 100%;
  .bar {
    width: 100%;
    height: 10px;
    background-color: $primary;
  }
  img.pin {
    width: 20px;
    height: auto;
  }
}
</style>
