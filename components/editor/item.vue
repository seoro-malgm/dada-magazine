<template>
  <b-card class="editor-item" @click="$router.push(`/${item.pid}`)">
    <b-card-header>
      <b-avatar size="80px" class="mb-2" :src="item?.profile_image_url" />
      <h6 class="text-14 text-md-16 text-truncate w-100 px-1">
        {{ item.nickname }}
      </h6>
      <div class="text-10 text-md-12 text-truncate w-100 px-1 text-gray-500">
        @{{ item.pid }}
      </div>
    </b-card-header>
    <!-- <b-card-body>
      <p
        class="text-15 text-md-15 border-top border-light py-2"
        v-if="item?.introduction"
      >
        {{ item.introduction }}
      </p>
    </b-card-body> -->
    <!-- <b-card-footer> foote </b-card-footer> -->
  </b-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.editor-item {
  border: 0;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.1);
  cursor: pointer;
  transition: transform 0.2s $default-ease;
  &:hover {
    transform: scale(1.08);
  }
  > .card-body {
    padding: 1rem;
    .card-header {
      padding: 0.25rem 0.25rem 0.75rem;
      background-color: transparent;
      border: 0;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      .b-avatar {
        min-width: 40px;
        min-height: 40px;
      }
    }
    .card-body {
      padding: 0.25rem;
    }
    .card-footer {
      padding: 0.25rem;
      background-color: transparent;
      border: 0;
    }
  }
}
</style>
