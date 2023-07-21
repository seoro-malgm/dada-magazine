<template>
  <ul class="article-list-items">
    <template v-if="items?.length">
      <li class="list-item" v-for="(item, i) in items" :key="i">
        <a href="#" class="item-link">
          {{ item.title }}
        </a>
      </li>
    </template>
    <template v-else> {{ title }}은 현재 준비중입니다 </template>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.article-list-items {
  list-style: none;
  border-top: 1px solid $gray-400;
  .list-item {
    padding: 4px 8px;
    border-bottom: 1px solid $gray-400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .item-link {
      font-size: 0.85rem;
      color: $darkest;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
