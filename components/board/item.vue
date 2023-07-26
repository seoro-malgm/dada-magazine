<template>
  <div>
    <router-link :to="`/board/${item.docId}`">
      <figure
        class="board-item bg-img ratio-sm-90 ratio-56"
        :class="{ 'bg-primary text-white': !item.thumbnail }"
      >
        <template v-if="item?.thumbnail">
          <img
            class="item-image"
            :src="item.thumbnail"
            :alt="`${item.title} 썸네일 이미지`"
          />
        </template>
        <figcaption>
          <div class="text">
            <span class="text-13 d-block mb-2">
              {{ getCategory(item.category) }}
            </span>
            <hr />
            <h6 class="text-20 text-lg-24 px-3 fw-700">
              {{ item.title }}
            </h6>
          </div>
        </figcaption>
      </figure>
    </router-link>
  </div>
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
    articleKey: {
      type: String,
      default: "docId",
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
.board-item {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s $default-ease;

  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 0;
    z-index: 2;
    background-color: $primary;
  }
  img {
    object-fit: contain;
    height: auto;
    min-width: 100%;
  }

  .item-image,
  figcaption {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
  }

  .item-image {
    transform: scale(1) translate(-50%, -50%);
    transition: transform 0.3s $default-ease;
  }

  figcaption {
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 0.3);
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    opacity: 1;
    color: white;
    text-align: center;

    > .text {
      text-align: center;
      position: absolute;
      padding: 4px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      hr {
        width: 100%;
        max-width: 120px;
        border-bottom: 5px solid $primary;
        margin: 0.5rem auto 0.75rem;
      }
    }
    @media (max-width: 1320px) {
      opacity: 1;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    transform: scale(0.96);
    cursor: pointer;
    .item-image {
      transform: scale(1.45), translate(-50%, -50%);
    }
    // figcaption {
    //   opacity: 1;
    //   transition: opacity 0.3s $default-ease;
    // }
  }
}
</style>
