<template>
  <div>
    <b-container fluid>
      <section>
        <template v-if="pending.items">
          <div class="text-center p-5 min-vh-100">
            <b-spinner />
          </div>
        </template>
        <template v-else>
          <template v-if="items?.length">
            <div class="py-5">
              <b-row align-v="center" align-h="center" class="mx-2 mx-xl-4">
                <b-col
                  cols="6"
                  md="4"
                  xl="3"
                  class="px-2 px-xl-4 mb-2 mb-xl-5"
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <board-item :item="item" />
                </b-col>
              </b-row>
            </div>

            <!-- <div class="my-4 d-flex">
              <b-pagination class="mx-auto" />
            </div> -->
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

      <!-- editors: {{ editors }} -->
    </b-container>
    <section class="py-5 bg-lightest">
      <template v-if="pending.editors">
        <div class="text-center p-5">
          <b-spinner />
        </div>
      </template>
      <template v-else>
        <template v-if="editors?.length">
          <b-container>
            <header class="text-center">
              <h4 class="text-20 text-md-30 text-lg-36 text-primary">
                EDITORS
              </h4>
              <span
                >다다매거진의 다재다능한 유능한 에디터들을 만나보세요.
              </span>
            </header>
            <div class="py-5">
              <b-row align-v="start" align-h="center" class="mx-n1 mx-md-n2">
                <b-col
                  cols="4"
                  md="3"
                  class="px-1 px-md-2 mb-5"
                  v-for="(editor, i) in editors"
                  :key="i"
                >
                  <editor-item :item="editor" />
                </b-col>
              </b-row>
            </div>
          </b-container>
        </template>
      </template>
      <template v-if="!editors?.length && !pending.editors">
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
    <!-- 뉴스레터 구독 -->
    <newsletter-invite></newsletter-invite>
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
      editors: [],
      allCategories,
      pending: {
        items: false,
        editors: false,
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
  async mounted() {
    await this.getItems();
    await this.getEditors();
  },
  methods: {
    // 글 불러오기
    async getItems(query) {
      this.pending.items = true;
      const { getAllBoardItems } = this.$firebase();
      try {
        const data = await getAllBoardItems("board", query, 30, [
          "createdAt",
          "desc",
        ]);
        if (data) {
          this.items = data;
          this.pending.items = false;
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("error:", error);
        this.pending.items = false;
      }
    },
    async getEditors() {
      this.pending.editors = true;
      const { getAllBoardItems } = this.$firebase();
      try {
        const data = await getAllBoardItems(
          "users",
          {
            isSponsored: true,
          },
          12,
          ["pid"]
        );
        if (data) {
          this.editors = data;
          // console.log("editors:", data);
          this.pending.editors = false;
        }
      } catch (error) {
        console.error("error:", error);
        this.pending.editors = false;
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
