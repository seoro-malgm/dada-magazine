<template>
  <div>
    <b-form class="w-100" @submit.prevent="$emit('submit', form)">
      <div class="p-3 border">this is form</div>
      <b-row align-h="center" class="mt-4">
        <b-col cols="11" md="8" lg="6">
          <b-btn variant="primary w-100 py-3 text-18 text-lg-20" type="submit">
            협업 요청
          </b-btn>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style lang="scss" scoped></style>
