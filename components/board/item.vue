<template>
  <div>
    <template v-if="item">
      <nuxt-link :to="`/board/${item.docId}`">
        <figure
          class="board-item bg-img ratio-100"
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
              <span class="text-15 text-md-16 d-block mb-2">
                {{ getCategory(item.category) }}
              </span>
              <hr />
              <h6
                class="px-2 fw-700 text-truncate line-2 text-17 text-lg-20"
                :class="titleClass"
              >
                {{ item.title }}
              </h6>
            </div>
            <div class="mt-1 py-1 text-footer">
              <ul
                class="ml-2 d-flex align-items-center justify-content-end text-gray-500"
              >
                <li
                  class="mr-2 d-flex align-items-center mr-2 text-13 text-md-45"
                >
                  <i class="icon icon-calendar mr-1" />
                  <span>{{ getDate(item?.createdAt) }}</span>
                </li>
                <!-- <li class="d-flex align-items-center mr-2 text-13 text-md-14">
                  <i class="icon icon-eye mr-1" />
                  <span>{{ item?.viewer }}</span>
                </li>
                <li class="d-flex align-items-center mr-2 text-13 text-md-14">
                  <i class="icon icon-heart mr-1" />
                  <span>{{ item?.like }}</span>
                </li> -->
              </ul>
            </div>
          </figcaption>
        </figure>
      </nuxt-link>
    </template>
    <template v-else-if="!item">
      <b-skeleton-img height="210px" animation="wave" class="rounded" />
    </template>
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
    titleClass: {
      type: String,
      default: "text-18  text-xl-22",
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
    // 글날짜불러오기
    getDate(time) {
      const { seconds } = time;
      const data = new Date(seconds * 1000);
      return seconds
        ? `${data?.getFullYear()}년 ${data?.getMonth() + 1}월`
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.board-item {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s $default-ease;
  border-radius: 8px;

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
    width: auto;
    min-height: 100%;
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
    background-color: rgba($color: #000, $alpha: 0.4);
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
      width: 90%;
      max-width: 90%;
      transform: translate(-50%, -50%);
      hr {
        width: 100%;
        max-width: 120px;
        border-bottom: 5px solid $primary;
        margin: 0.5rem auto 0.75rem;
      }
    }
    @media (max-width: $breakpoint-lg) {
      opacity: 1;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .text-footer {
      text-align: center;
      position: absolute;
      bottom: 1rem;
      left: 50%;
      width: 90%;
      max-width: 90%;
      transform: translateX(-50%);
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
