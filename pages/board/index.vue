<template>
  <b-container>
    <!-- <header class="mb-4 pb-2 border-bottom">
      <h2 class="text-capitalize">
        {{ category }}
      </h2>
    </header> -->
    <template v-if="pending.items">
      <Loading />
    </template>
    <template v-else>
      <template v-if="!items.length">
        <div class="p-4 text-center">
          <span class="text-light">글이 아직 없습니다.</span>
        </div>
      </template>
      <template v-else>
        <b-row class="article-list">
          <b-col
            cols="12"
            md="6"
            lg="4"
            class="article-list-item"
            v-for="(item, i) in items"
            :key="i"
          >
            <article-item :item="item" />
          </b-col>
        </b-row>
      </template>
    </template>

    <!-- <btn-view-more /> -->
  </b-container>
</template>

<script>
export default {
  layout: "default",
  head() {
    return {
      title: `신물결 | 메거진`,
    };
  },
  async asyncData({ app, $firebase, query }) {
    // const { category } = query;
    // if (!category) app.router.push("/");
    const items = await $firebase().getAllBoardItems(null);
    return {
      items,
    };
  },
  data() {
    return {
      // items: [
      //   {
      //     id: 0,
      //     category: "category",
      //     title: "asd",
      //     createdAt: "2023-01-01",
      //     thumbnail:
      //       "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      //   },
      //   {
      //     id: 0,
      //     category: "category",
      //     title: "asd",
      //     createdAt: "2023-01-01",
      //     thumbnail:
      //       "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      //   },
      //   {
      //     id: 0,
      //     category: "category",
      //     title: "asd",
      //     createdAt: "2023-01-01",
      //     thumbnail:
      //       "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      //   },
      //   {
      //     id: 0,
      //     category: "category",
      //     title: "asd",
      //     createdAt: "2023-01-01",
      //     thumbnail:
      //       "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      //   },
      //   {
      //     id: 0,
      //     category: "category",
      //     title: "asd",
      //     createdAt: "2023-01-01",
      //     thumbnail:
      //       "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      //   },
      //   {
      //     id: 0,
      //     category: "category",
      //     title: "asd",
      //     createdAt: "2023-01-01",
      //     thumbnail:
      //       "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      //   },
      // ],
      pending: {
        items: false,
      },
    };
  },
  computed: {
    category() {
      const { category } = this.$route.query;
      return category;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    category(n) {
      this.getItems(n);
    },
  },
  methods: {
    async getItems(category) {
      this.pending.items = true;
      this.items = await this.$firebase().getAllBoardItems(category);
      this.pending.items = false;
    },
    async goWrite() {
      if (!this.user) {
        const bool = await window.confirm(
          "로그인이 필요합니다. 로그인하시겠습니까?"
        );
        if (bool) {
          this.$queryr.push("/auth/login");
        }
      } else {
        this.$router.push("/write");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
