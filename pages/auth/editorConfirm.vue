<template>
  <div>
    <b-container class="my-5 py-5">
      <header class="mb-2 pb-2 border-bottom border-primary">
        <h1 class="text-18 text-md-32">에디터 신청하기</h1>
        <p class="text-14 text-md-15">
          다다매거진의 에디터가 되고 싶으신가요? 지금 신청하세요!
        </p>
      </header>
      <client-only>
        <section>
          <pre class="terms mb-2" v-if="formPrivacy">
          <p v-html="formPrivacy"></p>
        </pre>
          <b-form-checkbox v-model="form.agree1">
            개인정보 처리방침에 동의합니다
          </b-form-checkbox>
        </section>
      </client-only>
      <section class="mt-4 text-center">
        <b-btn
          variant="primary px-3 py-2 text-15 text-lg-18"
          @click="submit()"
          :disabled="!form?.agree1"
        >
          에디터 신청하기
        </b-btn>
      </section>
    </b-container>
  </div>
</template>

<script>
import formPrivacy from "@/assets/forms/form_privacy.js";

export default {
  props: {
    auth: {
      type: [Object],
      default: null,
    },
  },
  data() {
    return {
      formPrivacy,
      form: {
        agree1: false,
      },
    };
  },
  mounted() {
    if (!this.auth) {
      this.$router.push("/");
    }
  },
  methods: {
    async submit() {
      try {
        const { setUserEditor } = this.$firebase();
        const data = await setUserEditor(this.auth?.id);
        if (data) {
          window.toast("에디터 신청이 완료되었습니다. 이제 글을 쓸 수 있어요!");
          this.$router.push("/");
        }
      } catch (error) {
        window.toast("오류료 인해 신청에 실패했습니다.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
pre.terms {
  width: 100%;
  max-height: 300px;
  overflow: auto;
  background-color: $gray-200;
  color: $gray-700;
  padding: 1rem;
  font-size: 14px;
}
</style>
