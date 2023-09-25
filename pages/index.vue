<template>
  <div class="pt-5 pt-lg-0">
    <!-- header -->
    <header class="px-3 text-center">
      <b-container fluid class="pt-md-5">
        <h1 class="text-40 text-lg-48 text-primary">Like DADAISM</h1>
        <b-row align-h="center">
          <b-col cols="12" lg="4">
            <p class="text-14 text-md-15 text-light">
              충남 공주시의 웹 로컬 매거진을 만나보세요.
            </p>
          </b-col>
        </b-row>
      </b-container>
    </header>

    <!-- 큐레이션 -->
    <!-- <section class="my-5 py-5">
      <header-section title="큐레이션" />
    </section> -->

    <!-- 글들 -->
    <section class="pt-3 pb-5">
      <!-- <header-section title="포스트" /> -->
      <board-items />
    </section>
    <!-- 에디터 -->
    <section class="py-5 bg-gray-100">
      <template v-if="pending.editors">
        <div class="text-center p-5">
          <b-spinner />
        </div>
      </template>
      <template v-else>
        <template v-if="editors?.length">
          <b-container>
            <header class="text-center">
              <h4 class="text-20 text-md-30 text-lg-36">크리에이터</h4>
              <span>
                다다매거진의 이야기를 수록하는 전문 크리에이터들을 만나보세요.
              </span>
            </header>
            <b-row align-h="center" class="my-3">
              <b-col cols="12" md="10" lg="7">
                <bar-horizon />
              </b-col>
            </b-row>
            <div class="pt-4 pb-5">
              <b-row align-v="start" align-h="center" class="mx-n1 mx-md-n2">
                <b-col
                  cols="4"
                  lg="2"
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
        </div>
      </template>
    </section>

    <!-- SNS -->
    <!-- <section class="section-gap">
      <header-section title="SNS" />
      <b-container class="mt-4">
        <b-row align-h="center">
          <b-col cols="3" class="text-center">
            <a
              href="https://www.instagram.com/dada_magazine23/"
              target="_blank"
              class="btn btn-outline-primary p-4 rounded-circle text-40 text-lg-48"
            >
              <i class="icon icon-instagram"></i>
            </a>
          </b-col>
        </b-row>
      </b-container>
    </section> -->
    <!-- 뉴스레터 구독 -->
    <newsletter-invite />
    <!-- 협력요청 -->
    <b-row class="py-3 py-md-0" align-v="stretch">
      <b-col cols="12" md="6" class="text-center px-2 border-right">
        <a
          class="w-100 px-4 text-18 text-md-24 h-100 d-block py-2 py-md-3"
          href="https://gongstar.notion.site/fdde182e8b1543a19e5311e8c69d25af?pvs=4"
          target="_blank"
        >
          <i class="icon icon-left-dir" />
          다다매거진에 대하여
        </a>
      </b-col>
      <b-col cols="12" md="6" class="text-center px-2">
        <nuxt-link
          id="coming-soon"
          class="w-100 px-4 text-18 text-md-24 h-100 d-block py-2 py-md-3"
          to="/corporate"
          v-b-tooltip.hover
          title="협업은 현재 준비중입니다."
        >
          다다매거진과 협업하기
          <i class="icon icon-right-dir" />
        </nuxt-link>
      </b-col>
      <b-col
        cols="12"
        md="6"
        class="text-center px-2 border-right bg-lightest border-top"
      >
        <a
          class="w-100 px-4 text-18 text-md-24 h-100 d-block py-2 py-md-3"
          href="https://naver.me/F40qvwJW"
          target="_blank"
        >
          👨‍👩‍👧‍👦 사람들 추천
        </a>
      </b-col>
      <b-col cols="12" md="6" class="text-center px-2 bg-lightest border-top">
        <a
          class="w-100 px-4 text-18 text-md-24 h-100 d-block py-2 py-md-3"
          href="https://naver.me/5Cr9wH30"
          target="_blank"
        >
          다다매거진에서 추천하는 여행루트 🚗
          <!-- <i class="icon icon-right-dir" /> -->
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import allCategories from "~/assets/json/allCategories";

export default {
  layout: "default",
  name: "index",
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  data() {
    return {
      editors: [],
      allCategories,
      pending: {
        editors: false,
      },
      page: 0,
      comingSoon: true,
    };
  },

  mounted() {
    this.getEditors();
  },

  methods: {
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
