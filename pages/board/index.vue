<template>
  <b-container>
    <Loading />
  </b-container>
</template>

<script>
export default {
  layout: "default",
  head() {
    return {
      title: `다다매거진 | 메거진`,
    };
  },
  mounted() {
    this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped></style>
