<template>
  <article
    class="ariticle-item"
    @click="
      $router.push({
        path: `/board/${item.no}`,
      })
    "
  >
    <b-row class="mx-n1">
      <b-col cols="2" md="1" v-if="item?.thumbnail" class="px-1">
        <figure class="article-image" v-if="item?.thumbnail">
          <img :src="item.thumbnail" :alt="`${item.title} 썸네일`" />
        </figure>
      </b-col>
      <b-col
        :cols="item?.thumbnail ? 10 : 12"
        :md="item?.thumbnail ? 11 : 12"
        class="px-1 article-body"
      >
        <div class="">
          <template
            v-if="item?.pinned?.seconds && isPinned(item.pinned.seconds)"
          >
            <span class="text-category bg-primary border-primary pr-3">
              <i class="icon icon-rocket" />
              <strong>Sponsored</strong>
            </span>
          </template>
          <span class="text-category mb-1" v-if="item?.category">
            {{ getCategory(item.category) }}
          </span>
        </div>

        <h6 class="title text-truncate line-2" v-if="item?.title">
          {{ item.title }}
        </h6>
      </b-col>
    </b-row>
    <footer>
      <ul class="article-info">
        <li class="d-flex align-items-center">
          <i class="icon icon-heart"></i>
          <span>{{ item?.like }}</span>
        </li>
        <li class="d-flex align-items-center">
          <i class="icon icon-eye"></i>
          <span>{{ item?.viewer }}</span>
        </li>

        <!-- <li class="d-flex align-items-center">
          <i class="icon icon-comment"></i>
          <span>0</span>
        </li> -->
        <li class="ml-auto">
          {{ createdDate }}
        </li>
      </ul>
    </footer>
  </article>
</template>

<script>
import allCategories from "~/assets/json/allCategories";
import { getTimestamp, isPinned } from "~/plugins/commons";
export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      allCategories,
    };
  },
  computed: {
    createdDate() {
      const { seconds } = this.item?.createdAt;
      return seconds ? getTimestamp(new Date(seconds * 1000)) : "";
    },
  },
  methods: {
    // getTimestamp,
    isPinned,
    getCategory(category) {
      return this.allCategories[category]
        ? this.allCategories[category]
        : this.allCategories["ETC"];
    },
  },
};
</script>

<style lang="scss" scoped>
.ariticle-item {
  // border-radius: 24px;
  padding: 12px 0 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid $gray-500;

  .article-header {
    transition: all 0.2s;
    box-shadow: 0px 4px 10px rgba($color: #000000, $alpha: 0.1);
    // border-radius: 24px;
    overflow: hidden;
  }
  .article-body {
    .category {
      font-size: 13px;
      color: $light;
      filter: grayscale(100%);
      text-transform: capitalize;
    }
    h6.title {
      margin-top: 2px;
      margin-bottom: 6px;
      font-size: 1.05rem;
    }
  }
  .article-image {
    // min-height: 270px;
    border: 1px solid $gray-300;
    width: 100%;
    position: relative;
    padding-bottom: 100%;
    overflow: hidden;

    img {
      min-width: 100%;
      width: auto;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      object-fit: contain;
      transform: translate(-50%, -50%);
    }
  }
  .article-info {
    margin: 6px 0 2px;
    font-size: 0.85rem;
    list-style-type: none;
    display: flex;
    align-items: center;
    color: $gray-500;
    li {
      margin: 0 4px;
    }
  }

  &:hover {
    cursor: pointer;
    .article-header {
      transform: translateY(-10px);
      box-shadow: 0px 10px 30px rgba($color: #000000, $alpha: 0.3);
    }
    .article-body {
      h6.title {
        // color: $primary;
        text-decoration: underline;
      }
    }
  }

  // &[spread="lg"] {
  //   @media (min-width: 992px) {
  //     display: flex;
  //     flex-direction: row;
  //     .article-header {
  //       flex: 20% 0 0;
  //       max-width: 20%;
  //     }
  //   }
  // }
}
</style>
