<template>
  <div>
    <b-container>
      <section>
        <template v-if="pending.items">
          <div class="py-5">
            <b-row align-v="center" align-h="center" class="mx-2">
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
            </b-row>
          </div>
        </template>
        <template v-else>
          <template v-if="items?.length">
            <div class="py-5">
              <b-row align-v="center" align-h="center" class="mx-2">
                <b-col
                  cols="12"
                  md="6"
                  xl="4"
                  class="px-2 mb-3"
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <board-item :item="item" />
                </b-col>
              </b-row>
            </div>
          </template>
        </template>
        <template v-if="!items?.length && !pending.items">
          <div class="py-5">
            <b-row align-v="center" align-h="center" class="mx-2">
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
            </b-row>
          </div>
        </template>
      </section>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: {
        items: false,
      },
      items: [],
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

<style lang="scss" scoped></style>
