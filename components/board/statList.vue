<template>
  <div>
    <b-container>
      <template v-if="items?.length">
        <b-row tag="header" class="py-2 border-bottom bg-lightest">
          <b-col cols="2" lg="1" class="text-center">
            <span class="text-13 text-gray-700"> 랭킹 </span>
          </b-col>
          <b-col cols="6" lg="7">
            <span class="text-13 text-gray-700"> 제목 </span>
          </b-col>
          <b-col cols="2" lg="2">
            <span class="text-13 text-gray-700"> 카테고리 </span>
          </b-col>
          <b-col cols="2" lg="2" class="text-right">
            <span class="text-13 text-gray-700"> 조회수 </span>
          </b-col>
        </b-row>
        <ul class="pb-5">
          <b-row
            tag="li"
            align-v="center"
            class="py-2 mb-2 border-bottom"
            v-for="(item, i) in items"
            :key="i"
          >
            <b-col cols="2" lg="1" class="text-center">
              <span class="text-20 fw-700 text-primary"> {{ i + 1 }} </span>
            </b-col>
            <b-col cols="6" lg="7">
              <div class="text-truncate">
                <nuxt-link :to="`/board/${item.docId}`" class="text-15">
                  {{ item?.title }}
                </nuxt-link>
              </div>
            </b-col>
            <b-col cols="2" lg="2">
              <span class="text-13 text-md-14 text-gray-600">
                {{ getCategory(item.category) }}
              </span>
            </b-col>
            <b-col cols="2" lg="2" class="text-right text-14 text-md-15">
              {{ item?.viewer }}
            </b-col>
          </b-row>
          <!-- 리스트 끝 -->
          <!-- pending -->
          <template v-if="pending.items">
            <b-spinner />
          </template>
          <template v-else>
            <div v-if="items?.length >= size">
              <!-- 더보기 버튼 -->
              <div class="mt-5 text-center">
                <template v-if="onLastIndex">
                  <span class="text-13 text-gray-600"> 마지막 글입니다 </span>
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
            </div>
          </template>
        </ul>
      </template>
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
      size: 10,
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
      return this.items?.length ? this.items?.at(-1) : null;
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
      console.log("body:", body);
      try {
        const data = await getAllBoardItems("board", body, this.size, [
          "viewer",
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
