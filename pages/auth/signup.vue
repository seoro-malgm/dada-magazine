<template>
  <div class="min-vh-100">
    <b-container
      fluid
      class="py-5 my-5 w-100 d-flex flex-column align-items-center justify-content-center"
    >
      <b-row align-h="center" class="w-100">
        <b-col cols="12" md="7" xl="5">
          <b-card class="w-100">
            <b-card-header
              header-bg-variant="white"
              header-border-variant="white"
              header-tag="header"
            >
              <b-card-title title-tag="h1" class="text-center">
                회원가입
              </b-card-title>
            </b-card-header>
            <b-card-body>
              <b-btn
                variant="naver"
                class="btn-naver w-100 py-2"
                @click="loginWithNaver"
              >
                <img :src="require('@/assets/naver.svg')" alt="네이버 심볼" />
                <span class="ml-2">Naver로 회원가입</span>
              </b-btn>
              <div class="mt-4 text-center">
                <small>가입한 적이 없다면?</small>
                <b-btn
                  variant="outline-light ml-2"
                  :to="{ name: 'auth-login' }"
                  :disabled="disabled"
                  >로그인</b-btn
                >
              </div>

              <!-- <b-form @submit.prevent="setAuth(form.email, form.password)">
                <b-form-group
                  label="이메일:"
                  label-for="email"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="email"
                    type="email"
                    v-model="form.email"
                    placeholder="이메일을 입력하세요"
                  />
                </b-form-group>
                <b-form-group
                  label="비밀번호:"
                  label-for="password"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="on"
                  />
                </b-form-group>
                <b-form-group
                  label="비밀번호 확인:"
                  label-for="password"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="password"
                    v-model="form.passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="on"
                  />
                </b-form-group>
                <b-row class="mt-5">
                  <b-col cols="12">
                    <b-btn
                      variant="primary w-100"
                      :disabled="validate"
                      type="submit"
                      >회원가입
                    </b-btn>
                  </b-col>
                </b-row>
              </b-form> -->
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import firebase from '~/plugins/firebase'

export default {
  layout: "default",
  name: "auth-signup",
  head() {
    return {
      title: `신물결 | 회원가입`,
      script: [
        {
          src: "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js",
        },
      ],
    };
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
        passwordConfirm: null,
      },
      disabled: false,
    };
  },
  computed: {
    validate() {
      return false;
    },
    redirect() {
      return this.$route.query.redirect;
    },
  },
  methods: {
    // async login(info) {
    //   const { login } = this.$firebase();
    //   try {
    //     const { data, token } = await login(info);
    //     if (data) {
    //       // 세션스토리지에 저장
    //       sessionStorage.setItem(process.env.TOKEN_NAME, token.accessToken);
    //       // store에 저장
    //       this.$store.dispatch("setUser", data);
    //       this.$router.push("/");
    //     }
    //   } catch (error) {
    //     console.error("error:", error);
    //   }
    // },
    loginWithNaver() {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.NAVER_CLIENT_ID,
        callbackUrl: `${window.location.origin}/auth/callback/naver${
          this.redirect ? `?redirect=${this.redirect}` : ""
        }`,
        callbackHandle: true,
      });
      naverLogin.init();
      // 회원가입 진행
      naverLogin.reprompt();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-naver {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 24px;
    height: 24px;
  }
  span {
    font-size: 22px;
  }
}
</style>
