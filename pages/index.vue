<template>
  <div>
    <b-container class="mt-3 mb-5 pb-5">
      <b-row>
        <b-col cols="12" md="5" lg="3" class="mb-4" order="1" order-md="0">
          <!-- hot tags -->
          <section class="mb-4">
            <header class="mb-2 text-center text-md-left">
              <h5 class="bg-flow pr-1 text-2">
                Categories
                <svg-line-path />
              </h5>
              <strong class="fw-700 d-block">카테고리</strong>
            </header>
            <group-tags
              :items="allCategories"
              @btn-clicked="selectCategory($event)"
              :activeCondition="query?.category"
            >
              <li class="tag-item">
                <button
                  @click="$router.push('/')"
                  :class="{ active: !query?.category }"
                >
                  전체
                </button>
              </li>
            </group-tags>
          </section>
        </b-col>
        <b-col cols="12" md="7" lg="9" class="mb-4" order="0" order-md="1">
          <section class="mb-5">
            <header class="mb-2 text-center text-md-left">
              <h1 class="bg-flow text-2 text-lg-4 pr-1">
                <template v-if="query?.category">
                  {{ query.category }}
                </template>
                <template v-else> New Waves </template>
                <svg-line-path />
              </h1>
              <strong class="text-1 text-lg-2 d-block">
                <template v-if="query?.category">
                  {{ allCategories[query.category] }}
                </template>
                <template v-else> 최신 글 </template>
              </strong>
            </header>
            <template v-if="pending.items">
              <div class="text-center p-4">
                <b-spinner />
              </div>
            </template>
            <template v-else>
              <template v-if="items?.length">
                <ul class="list-unstyled border-top border-gray-500">
                  <li v-for="(item, i) in itemPinned" :key="`pinned-${i}`">
                    <article-item :item="item" />
                  </li>
                  <li v-for="(item, i) in items" :key="i">
                    <article-item :item="item" />
                  </li>
                </ul>
              </template>
            </template>
            <template v-if="!items?.length && !pending.items">
              <div class="text-center p-4 border-top border-bottom">
                <small>글이 없습니다.</small>
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
                </div>
              </div>
            </template>
          </section>
          <!-- <div class="text-center mt-5">
            <b-btn
              variant="outline-light"
              class="btn-arr-right px-4"
              pill
              @click="getItems"
            >
              <span class="text-1 fw-700">More Waves</span>
              <i class="icon icon-right-big text-1" />
            </b-btn>
          </div> -->
        </b-col>
      </b-row>
    </b-container>

    <!-- <hr class="hr" /> -->

    <!-- <b-container class="pb-5">
      <section>
        <header class="section-header">
          <div>
            <h1 class="bg-flow text-4 pr-2">
              Discussions
              <svg-line-path />
            </h1>
            <div>더 나은 세상을 위해 토론하기</div>
          </div>
        
        </header>
        <b-row class="pt-3" align-v="center">
          <b-col cols="12" md="6">
            <div class="bg-img bg-lightest rounded-circle">토론 이미지</div>
          </b-col>
          <b-col cols="12" md="6">
            <article>
              <header class="py-3 mb-2">
                <h2 class="text-2 text-md-4">AI는 도구가 될 수 있을까요?</h2>
              </header>
              <p class="text-1 lh-180 mb-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
                ad veritatis laboriosam? Provident dolore quo magnam tempore
                nam. Unde distinctio rem iusto sed vero harum sint eius illo.
                Eos, earum!
              </p>
              <group-tags :tags="['지역', '경제']" />
            </article>
          </b-col>
        </b-row>
      </section>

      <section class="mt-5">
        <section class="mb-5">
          <discuss-item :items="discussItems"></discuss-item>
        </section>
        <div class="text-center">
          <b-btn
            variant="outline-light"
            class="btn-arr-right px-4"
            pill
            to="/discussion"
          >
            <span class="text-2 fw-700">More Discussions</span>
            <i class="icon icon-right-big text-2" />
          </b-btn>
        </div>
      </section>
    </b-container>
    <section class="my-5">
      <marquee-bar :items="allTags" variant="primary" />
      <b-container class="my-5 py-5">
        <b-row align-v="center" align-h="center" class="my-lg-5">
          <b-col cols="12" md="8" order="1" order-md="0">
            <div class="py-3 px-lg-4">
              <h3 class="mb-2 text-2 text-lg-3 bg-flow pr-0 pt-2 pt-md-0">
                토론하고 싶은 주제가 있나요?
                <svg-line-path />
              </h3>
              <p class="text-1 text-md-1 my-4">
                토론에 참여하세요 주제신청이 가능합니다 Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Iure quod facilis nobis
                voluptatibus necessitatibus, eaque eius quaerat velit illo,
                placeat obcaecati numquam iusto consectetur labore! dolor unde
                reiciendis!
              </p>
              <b-row>
                <b-col cols="12" lg="8">
                  <discuss-apply-form />
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="10" md="4" order="0" order-md="1">
            <div class="bg-img bg-lightest rounded-circle">토론 이미지</div>
          </b-col>
        </b-row>
      </b-container>
    </section> -->
  </div>
</template>

<script>
import allCategories from "~/assets/json/allCategories";

export default {
  layout: "default",
  components: {},
  // async asyncData({ app, $firebase, query }) {
  //   const items = await $firebase().getAllBoardItems(query, 30);
  //   const pending = {
  //     items: true,
  //   };
  //   if (items) {
  //     pending.items = false;
  //   }
  //   return {
  //     items,
  //     pending,
  //   };
  // },
  props: {
    auth: {
      type: Object,
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
      // this.getItems(n);
    },
  },
  mounted() {
    // this.getItems();
  },
  methods: {
    async getItems(query) {
      this.pending.items = true;
      try {
        const data = await this.$firebase().getAllBoardItems(query, 30);
        if (data) {
          this.items = data;
          console.log("data:", data);
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
