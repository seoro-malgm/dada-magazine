<template>
  <div class="my-5 py-5 pt-lg-0">
    <b-container>
      <header class="pb-2">
        <h2 class="text-32 text-md-48">내 글 랭킹</h2>
        <small> 현재시간: {{ thisTime }} </small>
      </header>
      <div class="mt-3 mb-4">
        <board-stat-list :auth="auth" />
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "auth-stats",
  layout: "default",
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  head() {
    return {
      title: `내 글 랭킹 | 다다매거진`,
      meta: [
        {
          hid: "title",
          name: "title",
          content: `내 글 랭킹 | 다다매거진`,
        },
      ],
    };
  },
  computed: {
    thisTime() {
      return new Date().toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
