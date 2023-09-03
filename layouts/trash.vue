<template>
  <div class="text-center p-4">
    <b-spinner />
  </div>
</template>

<script>
export default {
  name: "trash",
  mounted() {
    this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped></style>
