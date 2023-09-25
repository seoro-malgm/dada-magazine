<template>
  <div>
    <client-only>
      <b-row align-h="center">
        <b-col cols="12" md="10" lg="12" xl="10">
          <section class="section-category" v-if="categories?.length">
            <ul class="list-category">
              <li class="list-item">
                <button
                  class="btn btn-outline-darkest btn-category text-18 text-md-22 text-lg-28 fw-700 text-oa"
                  :class="{ active: !categorySelected }"
                  @click="
                    $router.push({
                      path: '/',
                    })
                  "
                >
                  <span>모두</span>
                </button>
              </li>
              <li
                class="list-item"
                v-for="(category, i) in categories"
                :key="i"
              >
                <button
                  class="btn btn-outline-darkest btn-category text-20 text-lg-28 fw-700 text-oa"
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
  </div>
</template>

<script>
import allCategories from "~/assets/json/allCategories";
export default {
  computed: {
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
      this.$emit("category-change", n);
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
</style>
