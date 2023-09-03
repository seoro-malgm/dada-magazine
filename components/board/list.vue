<template>
  <div>
    <b-container>
      <client-only>
        <section class="section-category" v-if="categories?.length">
          <ul class="list-category">
            <li class="list-item">
              <button
                class="btn btn-outline-darkest btn-category text-16 text-lg-20"
                :class="{ active: !categorySelected }"
                @click="
                  $router.push({
                    path: '/',
                    query: {
                      categorySelected: null,
                    },
                  })
                "
              >
                <span>All</span>
              </button>
            </li>
            <li class="list-item" v-for="(category, i) in categories" :key="i">
              <button
                class="btn btn-outline-darkest btn-category text-16 text-lg-20"
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
        <bar-horizon />
      </client-only>
      <section>
        <ul class="list" v-if="items?.length">
          <li class="list-item" v-for="(item, i) in items" :key="i">
            <article class="item">
              <header class="header text-truncate">
                <nuxt-link
                  class="text-24 text-md-28 text-lg-36 btn btn-text btn-text-gray-600"
                  :to="`/board/${item.docId}`"
                >
                  {{ item.title }}
                </nuxt-link>
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
        </ul>
        <section v-else>
          <template v-if="items !== null && !items?.length">
            <div class="py-3">
              <b-skeleton
                height="96px"
                animation="wave"
                class="rounded mb-4"
                v-for="i in 10"
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
      },
      allCategories,
      items: [],
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
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
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
          transform: translateY(-50%) scale(0.2);
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
            top: 50%;
            right: 2%;
            width: 400px;
            padding-bottom: 400px;
            z-index: 2;
            mix-blend-mode: multiply;
            @media (max-width: $breakpoint-md) {
              width: 400px;
              max-width: 45vw;
              padding-bottom: 45vw;
              right: 3vw;
            }
            transform: translateY(-50%) scale(1);
          }
        }
      }
    }
  }
}
</style>
