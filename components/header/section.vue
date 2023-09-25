<template>
  <b-row align-h="center" tag="header" class="header-section">
    <b-col cols="10" md="9" lg="4">
      <h3>{{ title }}</h3>
      <!-- <bar-horizon /> -->
      <hr class="hr" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.header-section {
  h3 {
    text-align: center;
    margin-bottom: 12px;
    font-size: 20px;
    @media (min-width: $breakpoint-lg) {
      font-size: 28px;
    }
  }
  hr.hr {
    border-width: 4px;
    border-color: $primary;
  }
}
</style>
