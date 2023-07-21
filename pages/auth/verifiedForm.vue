<template>
  <b-container class="py-3">
    <b-row align-h="center">
      <b-col cols="12" md="6">
        <header class="pb-2 border-bottom">
          <div class="underline-primary">
            <h2>잠시만요!</h2>
          </div>
          <h4>회원가입이 아직 마무리되지 않았습니다.</h4>
          <p class="mt-2 lh-200">
            원활한 서비스 이용을 위해 아래 항목에 동의를 해주세요.
          </p>
        </header>
        <ul class="mt-4 mb-5">
          <li class="mb-5">
            <div class="bg-gray-200 rounded py-4 px-3">
              <div class="text-center">
                <strong>로그인한 계정</strong>
                <div class="mt-2">
                  <client-only>
                    <template v-if="auth">
                      {{ auth.email }} /
                      {{ auth.nickname }}
                    </template>
                  </client-only>
                </div>
              </div>
            </div>
          </li>
          <li class="mb-5">
            <article>
              <header class="mb-3">
                <h5>
                  개인정보 처리방침
                  <span class="text-primary"> (필수) </span>
                </h5>
              </header>
              <client-only>
                <div class="pre-form">
                  <p v-html="formPrivacy"></p>
                </div>
              </client-only>
            </article>
          </li>
          <!-- <li class="mb-5">
            <article>
              <header class="mb-3">
                <h5>개인정보 처리방침(필수)</h5>
              </header>
              <pre class="pre-form">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam unde dolorem animi nam! Recusandae aut cupiditate aliquam atque, delectus quas reprehenderit rem similique repellat veritatis tempora voluptatem voluptatum eveniet et.
              </pre>
            </article>
          </li> -->
        </ul>
        <b-btn variant="primary w-100 py-3" :disabled="pending" @click="submit">
          <template v-if="pending">
            <b-spinner small variant="darkest" />
          </template>
          <template v-else> 동의하고 서비스 시작하기 </template>
        </b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import formPrivacy from "@/assets/forms/form_privacy.js";
export default {
  name: "auth-verifiedForm",
  props: {
    auth: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formPrivacy,
      pending: false,
    };
  },
  methods: {
    async submit() {
      this.pending = true;
      const { setUserVerify } = this.$firebase();
      try {
        const response = await setUserVerify(this.auth.id);
        console.log("response:", response);
        if (response) {
          window.toast("회원가입이 완료되었습니다.");
          this.$router.push("/");
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pre-form {
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  background-color: $gray-100;
  font-size: 0.75rem;
  padding: 8px;
}
</style>
