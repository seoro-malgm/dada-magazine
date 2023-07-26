<template>
  <div>
    <b-container fluid>
      <section>
        <template v-if="pending.items">
          <div class="text-center p-5">
            <b-spinner />
          </div>
        </template>
        <template v-else>
          <template v-if="items?.length">
            <b-row align-v="center" align-h="center" class="mx-n1">
              <b-col
                cols="6"
                class="px-1 mb-1"
                v-for="(item, i) in items"
                :key="i"
              >
                <board-item :item="item" />
              </b-col>
            </b-row>
            <div class="my-4 d-flex">
              <b-pagination class="mx-auto"></b-pagination>
            </div>
          </template>
        </template>
        <template v-if="!items?.length && !pending.items">
          <div class="text-center p-4">
            <b-spinner />
            <!-- <small>글이 없습니다.</small>
            <div class="mt-2">
              <b-btn
                variant="primary"
                pill
                :to="{
                  name: 'board-write',
                }"
              >
                <i class="icon icon-pencil" />
                글쓰기
              </b-btn>
            </div> -->
          </div>
        </template>
      </section>
    </b-container>
  </div>
</template>

<script>
import allCategories from "~/assets/json/allCategories";

export default {
  layout: "default",
  components: {},

  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  data() {
    return {
      items: [],
      allCategories,
      pending: {
        items: false,
      },
      page: 0,
    };
  },
  computed: {
    itemPinned() {
      if (!this.items?.length) return [];
      const pinned = this.items.filter((i) => i.pinned);
      return pinned;
    },
    query() {
      return this.$route.query;
    },
  },
  watch: {
    query(n) {
      this.getItems(n);
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems(query) {
      this.pending.items = true;
      try {
        const data = await this.$firebase().getAllBoardItems(
          "board",
          query,
          30,
          ["createdAt", "desc"]
        );
        if (data) {
          this.items = data;
          // console.log("data:", data);
          this.pending.items = false;
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("error:", error);
        this.pending.items = false;
      }
    },
    selectCategory(category) {
      this.$router.push({
        name: "index",
        query: {
          category,
        },
      });
    },
    // 카테고리 불러오기
    getCategory(category) {
      return this.allCategories[category]
        ? this.allCategories[category]
        : this.allCategories["ETC"];
    },
  },
};
</script>

<style lang="scss" scoped>
h1.logo {
  img {
    width: 140px;
  }
}

.section-intro {
  .col-carousel {
  }
  .col-info {
    border: 1px solid $lightest;
    border-top-width: 0;
    @media (min-width: $breakpoint-md) {
      border-left-width: 0;
      border-top-width: 1px;
    }
  }
}
</style>
