<template>
  <div class="container my-5 pb-5">
    <!-- <div class="row mb-3">
      <div class="col-12 col-md-6 col-lg-4"> -->
    <b-input-group class="py-2 border border-primary rounded-pill">
      <b-form-input
        type="text"
        class="px-3 text-15 text-lg-20 border-0 bg-transparent"
        v-model="str"
        placeholder="검색어를 입력하세요"
        @keypress.enter="search(str)"
      />
      <template #append>
        <b-btn variant="text p-0 btn-search" @click="search(str)">
          <i class="icon icon-search text-24" />
        </b-btn>
      </template>
      <!-- </div>
      </div> -->
    </b-input-group>
    <header class="page-header flex-column flex-md-row">
      <h2 class="mb-0 d-flex align-items-center text-nowrap">
        <strong class="text-truncate d-block" :style="{ maxWidth: '80vw' }"
          >{{ query }} </strong
        >에 대한 검색결과
      </h2>
      <h2 class="result-length ms-0 mt-3 mt-md-0 ms-md-auto">
        총
        <strong class="text-primary">
          {{ itemsLength }}
        </strong>
        개
      </h2>
    </header>
    <section class="mt-5 py-5">...</section>
  </div>
</template>

<script>
export default {
  layout: "trash",
  data() {
    return {
      pending: {
        items: false,
      },
      str: null,
      items: [],
    };
  },
  computed: {
    query() {
      return this.$route?.query?.query;
    },
    itemsLength() {
      return 1;
    },
  },
  mounted() {
    if (this.query) this.getItem(this.query);
  },
  methods: {
    getItem() {
      window.toast("검색기능은 현재 준비중입니다.");
      // console.log("%c Hello ", "background: #333399; color: #ededed");
    },
    search(q) {
      this.$router.push({
        path: "/search",
        query: {
          query: q,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  .result-length {
    font-size: 20px;
  }
}
.btn-link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
