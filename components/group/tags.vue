<template>
  <ul class="tag-group mt-2">
    <slot name="default"> </slot>

    <li class="tag-item" v-for="(value, key) in items" :key="key">
      <template v-if="readonly">
        <span> {{ value }} </span>
      </template>
      <template v-else>
        <button
          @click="$emit('btn-clicked', key)"
          :class="{ active: activeCondition === key }"
        >
          {{ value }}
        </button>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: [Array, Object],
      default: [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    activeCondition: {
      type: [String, Object],
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-group {
  display: inline-flex;
  flex-wrap: wrap;
  list-style: none;
  .tag-item {
    margin-right: 8px;
    margin-bottom: 8px;
    button,
    span {
      font-size: 0.85rem;
      color: $light;
      border: 1px solid $light;
      background-color: transparent;
      border-radius: 8rem;
      padding: 2px 10px;
      transition: all 0.2s;
      &:hover {
        text-decoration: none;
      }
      &.active {
        background-color: $light;
        color: white;
      }
    }
    &:hover,
    &.active {
      button,
      span {
        background-color: $light;
        color: white;
      }
    }
  }
}
</style>
