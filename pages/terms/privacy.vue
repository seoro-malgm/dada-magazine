<template>
  <b-container class="py-5">
    <article>
      <header>
        <h3>개인정보 처리 방침</h3>
      </header>
      <section>
        <p v-html="formPrivacy" />
      </section>
    </article>
  </b-container>
</template>

<script>
import formPrivacy from "@/assets/forms/form_privacy.js";
export default {
  data() {
    return {
      formPrivacy,
    };
  },
};
</script>

<style lang="scss" scoped></style>
