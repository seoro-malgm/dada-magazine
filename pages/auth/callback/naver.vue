<template>
  <div class="text-center py-5">
    <b-spinner variant="primary" large />
    <div class="mt-2">로그인 혹은 회원가입을 진행하는 중입니다 ...</div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  head() {
    return {
      script: [
        {
          src: "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js",
        },
      ],
    };
  },
  redirect() {
    return this.$route.query.redirect;
  },
  mounted() {
    // this.createUser();
    this.getAuth();
  },
  methods: {
    async signIn(info) {
      const { signup } = this.$firebase();
      try {
        const { data, token } = await signup(info);
        // console.log("user, token:", data, token);
        if (data) {
          // store에 저장
          await this.$store.dispatch("setUser");
          // 세션스토리지에 저장
          await sessionStorage.setItem(
            process.env.TOKEN_NAME,
            token.accessToken
          );
          this.$router.push(
            this.$route.query.redirect
              ? {
                  name: this.$route.query.redirect,
                }
              : "/"
          );
        }
      } catch (error) {
        window.toast("오류로 인해 로그인하지 못했습니다.", {
          variant: "alert",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 400);
      }
    },
    getAuth() {
      let _ = this;
      // init
      const naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.NAVER_CLIENT_ID,
      });
      naverLogin.init();
      // 로그인 진행
      naverLogin.getLoginStatus(async (status) => {
        if (status) {
          _.signIn(naverLogin.user);
        } else {
          window.toast("오류로 인해 로그인하지 못했습니다.", {
            variant: "alert",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 400);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
