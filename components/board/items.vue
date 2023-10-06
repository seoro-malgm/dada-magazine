<template>
  <div>
    <b-container>
      <!-- 카테고리 -->
      <list-categories
        @category-change="
          ($event) => {
            this.getItems(
              $event
                ? {
                    category: $event,
                  }
                : null
            );
          }
        "
      />
      <!-- 아이템 목록 -->
      <section>
        <template v-if="items?.length">
          <div class="py-5">
            <b-row align-v="center" align-h="center" class="mx-2">
              <b-col
                :cols="isBanner(i + 1) ? 12 : 12"
                :md="isBanner(i + 1) ? 12 : 6"
                :xl="isBanner(i + 1) ? 12 : 4"
                class="px-2 mb-3"
                v-for="(item, i) in items"
                :key="i"
              >
                <template v-if="isBanner(i + 1)">
                  <div class="banner my-2 mb-4">
                    <span class="ad">광고</span>
                    <a href="https://gjccc.or.kr/events/19" target="_blank">
                      <!-- <img
                        class="w-100 d-block d-md-none"
                        :src="require('@/assets/images/banner-m.png')"
                        alt=""
                      /> -->
                      <img
                        class="w-100"
                        :src="require('@/assets/images/banner.png')"
                        alt=""
                      />
                    </a>
                  </div>
                </template>
                <template v-else>
                  <board-item :item="item" />
                </template>
              </b-col>

              <!-- 리스트 끝 -->
              <!-- pending -->
              <template v-if="pending.items">
                <b-col
                  cols="12"
                  md="6"
                  xl="4"
                  class="px-2 mb-3"
                  v-for="i in 12"
                  :key="i"
                >
                  <board-item :item="null" />
                </b-col>
              </template>
              <template v-else>
                <b-col v-if="items?.length >= size" cols="12" md="6" xl="4">
                  <!-- 더보기 버튼 -->
                  <div class="mt-5 text-center">
                    <template v-if="onLastIndex">
                      <span class="text-13 text-gray-600">
                        마지막 글입니다
                      </span>
                    </template>
                    <template v-else>
                      <b-btn
                        variant="outline-darkest rounded-pill px-4 py-2 text-16 text-lg-18"
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
                </b-col>
              </template>
            </b-row>
          </div>
        </template>
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
      size: 7,
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
    isBanner(index) {
      const page = this.size & index;
      return index >= 1 && !(index % this.size);
    },
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

<style lang="scss" scoped></style>
