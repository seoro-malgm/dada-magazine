<template>
  <div>
    <b-container>
      <client-only>
        <b-row align-h="center">
          <b-col cols="12" md="10" lg="9">
            <section class="section-category" v-if="categories?.length">
              <ul class="list-category">
                <li class="list-item">
                  <button
                    class="btn btn-outline-darkest btn-category text-20 text-lg-28 fw-700"
                    :class="{ active: !categorySelected }"
                    @click="
                      $router.push({
                        path: '/',
                      })
                    "
                  >
                    <span>ALL</span>
                  </button>
                </li>
                <li
                  class="list-item"
                  v-for="(category, i) in categories"
                  :key="i"
                >
                  <button
                    class="btn btn-outline-darkest btn-category text-20 text-lg-28 fw-700"
                    :class="{ active: categorySelected === category.value }"
                    @click="
                      $router.push({
                        path: '/',
                        query: {
                          categorySelected: category.value,
                        },
                      })
                    "
                  >
                    <span>{{ category.text }}</span>
                  </button>
                </li>
              </ul>
            </section>
          </b-col>
        </b-row>
        <bar-horizon />
      </client-only>
      <section>
        <ul class="list" v-if="items?.length">
          <!-- lastVisible:
          {{
            lastVisible?.title
          }} -->
          <!-- 목록 -->
          <li class="list-item" v-for="(item, i) in items" :key="i">
            <template v-if="i >= 1 && !(i % 7)">
              <div class="banner my-2 mb-4">
                <span class="ad">광고</span>
                <a
                  href="https://maker-space-dream-frame.web.app/supporters/"
                  target="_blank"
                >
                  <img
                    class="w-100"
                    :src="require('@/assets/images/banner.png')"
                    alt=""
                  />
                </a>
              </div>
            </template>
            <article class="item">
              <header class="header text-truncate">
                <nuxt-link
                  class="text-24 text-md-28 text-lg-36 btn btn-text btn-text-gray-600"
                  :to="`/board/${item.docId}`"
                >
                  {{ item?.title }}
                </nuxt-link>
                <div class="mt-2 d-flex align-items-center">
                  <small
                    class="text-14 text-lg-14 fw-700 text-info border border-info rounded-pill px-3 py-1"
                  >
                    {{ getCategory(item.category) }}
                  </small>
                  <ul class="ml-2 d-flex align-items-center text-gray-500">
                    <li class="mr-2 d-flex align-items-center mr-2">
                      <i class="icon icon-calendar mr-1" />
                      <span>{{ getDate(item?.createdAt) }}</span>
                    </li>
                    <li class="d-flex align-items-center mr-2">
                      <i class="icon icon-eye mr-1" />
                      <span>{{ item?.viewer }}</span>
                    </li>
                    <li class="d-flex align-items-center mr-2">
                      <i class="icon icon-heart mr-1" />
                      <span>{{ item?.like }}</span>
                    </li>
                  </ul>
                </div>
              </header>
              <div
                class="item-thumbnail d-none d-lg-block"
                v-if="item?.thumbnail"
                :style="{
                  backgroundImage: `url(${item.thumbnail})`,
                }"
              />
              <figure
                class="d-block d-lg-none"
                v-if="item?.thumbnail"
                @click="$router.push(`/board/${item.docId}`)"
              >
                <img :src="`${item.thumbnail}`" class="w-100" alt="" />
              </figure>
            </article>
          </li>

          <!-- 더보기 -->
          <li v-if="items?.length >= size">
            <div class="mt-5 text-center">
              <template v-if="onLastIndex">
                <span class="text-13 text-gray-600"> 마지막 글입니다 </span>
              </template>
              <template v-else>
                <b-btn
                  variant="outline-darkest px-4 py-2 rounded-0 text-16 text-lg-18"
                  @click="
                    getItems(
                      {
                        startAfter: lastVisible,
                      },
                      true
                    )
                  "
                >
                  더보기
                </b-btn>
              </template>
            </div>
          </li>
        </ul>
        <template v-if="pending.loadMore">
          <div class="py-3">
            <b-skeleton
              height="96px"
              animation="wave"
              class="rounded mb-4"
              v-for="i in 6"
              :key="i"
            />
          </div>
        </template>
        <!-- pending -->
        <section v-else>
          <template v-if="items !== null && !items?.length">
            <div class="py-3">
              <b-skeleton
                height="96px"
                animation="wave"
                class="rounded mb-4"
                v-for="i in 6"
                :key="i"
              />
            </div>
          </template>
        </section>
      </section>
    </b-container>
  </div>
</template>

<script>
import allCategories from "~/assets/json/allCategories";
export default {
  data() {
    return {
      pending: {
        items: false,
        loadMore: false,
      },
      allCategories,
      size: 14,
      items: [],
      onLastIndex: false,
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    categories() {
      const result = [];
      for (const [key, value] of Object.entries(allCategories)) {
        result.push({
          text: value,
          value: key,
        });
      }
      return result;
    },
    // 선택된 카테고리
    categorySelected() {
      return this.$route.query?.categorySelected;
    },
    // 마지막
    lastVisible() {
      return this.items?.length ? this.items?.at(-1)?.createdAt : null;
    },
  },
  watch: {
    categorySelected(n) {
      this.getItems(
        n
          ? {
              category: n,
            }
          : null
      );
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    // 글 불러오기
    async getItems(query, loadMore = false) {
      this.pending.items = true;
      if (loadMore) {
        this.pending.loadMore = true;
      }
      const { getAllBoardItems } = this.$firebase();
      const body = {
        ...query,
      };
      try {
        const data = await getAllBoardItems("board", body, this.size, [
          "createdAt",
          "desc",
        ]);
        if (data) {
          this.items = loadMore ? [...this.items, ...data] : [...data];
          this.pending.items = false;
          if (loadMore) {
            this.pending.loadMore = false;
            if (!data?.length) {
              this.onLastIndex = true;
            }
          }
          // window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("error:", error);
        this.pending.items = false;
      }
    },
    // 카테고리 불러오기
    getCategory(category) {
      return this.allCategories[category]
        ? this.allCategories[category]
        : this.allCategories["ETC"];
    },
    // 글날짜불러오기
    getDate(time) {
      const { seconds } = time;
      return seconds ? new Date(seconds * 1000)?.toLocaleDateString() : "";
    },
  },
};
</script>

<style lang="scss" scoped>
// 필터링
.section-category {
  margin-bottom: 1rem;
  padding: 1rem 1rem 0.5rem;
  // border-top: 1px solid $gray-600;
  // border-bottom: 1px solid $gray-600;

  .list-category {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-item {
      margin: 0 12px 12px 0;
      .btn-category {
        border-radius: 0;
        &.active {
          background-color: $gray-600;
          border-color: $gray-600;
        }
      }
    }
  }
}

// 목록
.list {
  margin-top: 48px;
  @media (max-width: $breakpoint-lg) {
    display: flex;
    flex-direction: column;
    .list-item {
      flex: 100% 0 0;
      max-width: 100%;
      padding: 0;
      margin-bottom: 24px;
      background-color: white;
      .item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-top: 1px solid $gray-600;
        .item-thumbnail {
          order: 0;
          width: 100%;
          padding-bottom: 100%;
          background-position: center center;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .header {
          order: 1;
          max-width: 100%;
          width: 100%;
          padding: 8px;
          border-bottom: 1px solid $gray-600;
          .btn {
            padding: 0;
            font-weight: 700;
          }
        }
      }
    }
  }
  @media (min-width: $breakpoint-lg) {
    padding-bottom: 40px;
    .list-item {
      margin-bottom: 24px;
      padding: 0.75rem 0.5rem;
      border-bottom: 1px solid $gray-600;
      position: relative;
      .item {
        .header {
        }

        .item-thumbnail {
          transform: translateY(35%) scale(0.2);
          transition: transform 0.4s $default-ease;
          user-select: none;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        &:hover {
          .header {
            .btn {
              font-weight: 700;
            }
          }
          .item-thumbnail {
            position: absolute;
            bottom: 0%;
            right: 2%;
            width: 240px;
            padding-bottom: 240px;
            z-index: 2;
            mix-blend-mode: multiply;
            @media (max-width: $breakpoint-md) {
              width: 400px;
              max-width: 45vw;
              padding-bottom: 45vw;
              right: 3vw;
            }
            transform: translateY(35%) scale(1);
          }
        }
      }
    }
  }
}
.banner {
  position: relative;

  span.ad {
    background-color: white;
    border: 1px solid $gray-200;
    background-color: white;
    position: absolute;
    z-index: 2;
    display: block;
    top: 0.25rem;
    left: 0.25rem;
    border-radius: 40rem;
    font-size: 10px;
    padding: 0.1rem 0.25rem;
  }
}
</style>
