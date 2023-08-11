<template>
  <div class="min-vh-100">
    <b-container fluid class="py-5 my-5">
      <b-row align-h="center">
        <b-col cols="11" md="8" lg="6">
          <h1 class="text-center mb-4 text-20 text-lg-28">회원가입</h1>
          <b-form class="w-100" @submit.prevent="signup(form)">
            <b-card class="w-100">
              <b-card-header
                header-bg-variant="white"
                header-border-variant="white"
                header-tag="header"
              >
                <b-card-title
                  title-tag="h2"
                  class="text-center text-20 text-lg-24"
                >
                  로그인 정보 입력
                </b-card-title>
              </b-card-header>
              <b-card-body>
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
                    @input="checkUser('email', form.email)"
                    :state="state.email"
                    autocomplete="off"
                  />
                  <b-form-invalid-feedback>
                    <span class="text-14 text-lg-15 fw-700 text-alert">
                      <i class="icon icon-window-close" />
                      이메일을 입력하세요
                    </span>
                  </b-form-invalid-feedback>
                  <template v-if="state.email">
                    <template v-if="pending.email">
                      <span>
                        <b-spinner small /> 중복된 이메일인지 검사중입니다...
                      </span>
                    </template>
                    <template v-else>
                      <span
                        class="text-14 text-lg-15 fw-700"
                        :class="`text-${check.email ? 'info' : 'alert'}`"
                        v-if="typeof check.email === 'boolean'"
                      >
                        <i
                          :class="`icon icon-${
                            check.email ? 'check' : 'window-close'
                          }`"
                        />
                        <template v-if="check.email === true">
                          사용가능한 이메일입니다
                        </template>
                        <template v-if="check.email === false">
                          이미 사용 중인 이메일입니다.
                        </template>
                      </span>
                    </template>
                  </template>
                </b-form-group>
                <b-form-group
                  label="비밀번호:"
                  label-for="pwd"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="pwd"
                    v-model="form.pwd"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="off"
                  />
                </b-form-group>
                <b-form-group
                  label="비밀번호 확인:"
                  label-for="pwdConfirm"
                  label-cols-sm="2"
                  label-align-sm="left"
                >
                  <b-form-input
                    id="pwdConfirm"
                    v-model="form.pwdConfirm"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="off"
                    :state="
                      form.pwd?.length >= 4 &&
                      form.pwdConfirm?.length >= 4 &&
                      state.pwdConfirm
                    "
                  />
                  <b-form-invalid-feedback>
                    <span class="text-14 text-lg-15 fw-700 text-alert">
                      <i class="icon icon-window-close" />
                      확인을 위해 비밀번호와 동일하게 입력해주세요.
                    </span>
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-card-body>
            </b-card>
            <hr class="border-primary my-5" />

            <b-card class="w-100">
              <b-card-header
                header-bg-variant="white"
                header-border-variant="white"
                header-tag="header"
              >
                <b-card-title
                  title-tag="h2"
                  class="text-center text-20 text-lg-24"
                >
                  회원정보 입력
                </b-card-title>
                <p class="text-center">
                  회원정보는 에디터로 다다매거진 안에서 표시할 회원정보를
                  입력합니다.
                </p>
              </b-card-header>
              <b-card-body>
                <div class="mt-3">
                  <b-form-group
                    label="프로필 아이디:"
                    label-for="pid"
                    label-cols-sm="2"
                    label-align-sm="left"
                  >
                    <b-form-input
                      id="pid"
                      type="text"
                      v-model="form.pid"
                      @input="checkUser('pid', form.pid)"
                      placeholder="아이디를 입력하세요"
                      :state="state.pid"
                    />
                    <b-form-invalid-feedback>
                      <span class="text-14 text-lg-15 fw-700 text-alert">
                        <i class="icon icon-window-close" />
                        사용할 수 없는 아이디입니다
                      </span>
                      <small class="d-block text-alert">
                        2~15자, 영문 소문자, 언더바(_)사용가능
                      </small>
                    </b-form-invalid-feedback>
                    <template v-if="state.pid">
                      <template v-if="pending.pid">
                        <span>
                          <b-spinner small /> 중복된 아이디인지 검사중입니다...
                        </span>
                      </template>
                      <template v-else>
                        <span
                          class="text-14 text-lg-15 fw-700"
                          :class="`text-${check.pid ? 'info' : 'alert'}`"
                          v-if="typeof check.pid === 'boolean'"
                        >
                          <i
                            :class="`icon icon-${
                              check.pid ? 'check' : 'window-close'
                            }`"
                          />
                          <template v-if="check.pid === true">
                            사용가능한 아이디입니다
                          </template>
                          <template v-if="check.pid === false">
                            중복된 아이디입니다.
                          </template>
                        </span>
                      </template>
                    </template>
                  </b-form-group>
                </div>
                <div class="mt-3">
                  <b-form-group
                    label="별명:"
                    label-for="nickname"
                    label-cols-sm="2"
                    label-align-sm="left"
                    :state="state.nickname"
                  >
                    <b-form-input
                      id="nickname"
                      type="text"
                      v-model="form.nickname"
                      @input="checkUser('nickname', form.nickname)"
                      placeholder="별명을 입력하세요"
                      :state="state.nickname"
                    />
                    <b-form-invalid-feedback>
                      <span class="text-14 text-lg-15 fw-700 text-alert">
                        <i class="icon icon-window-close" />
                        사용할 수 없는 별명입니다
                      </span>
                      <small class="d-block text-alert">
                        2~15자 한/영조합
                      </small>
                    </b-form-invalid-feedback>
                    <template v-if="state.nickname">
                      <template v-if="pending.nickname">
                        <span>
                          <b-spinner small /> 중복된 별명인지 검사중입니다...
                        </span>
                      </template>
                      <template v-else>
                        <span
                          class="text-14 text-lg-15 fw-700"
                          :class="`text-${check.nickname ? 'info' : 'alert'}`"
                          v-if="typeof check.nickname === 'boolean'"
                        >
                          <i
                            :class="`icon icon-${
                              check.nickname ? 'check' : 'window-close'
                            }`"
                          />
                          <template v-if="check.nickname === true">
                            사용가능한 별명입니다
                          </template>
                          <template v-if="check.nickname === false">
                            다른 유저가 사용중인 별명입니다.
                          </template>
                        </span>
                      </template>
                    </template>
                  </b-form-group>
                </div>
              </b-card-body>
            </b-card>

            <b-row class="mt-5">
              <b-col cols="12">
                <b-btn
                  variant="primary w-100 py-3 text-18 text-lg-20"
                  :disabled="validate"
                  type="submit"
                  >회원가입
                </b-btn>
              </b-col>
            </b-row>
            <div class="mt-4 text-center">
              <small>이미 가입을 했다면?</small>
              <b-btn
                variant="outline-light ml-2"
                :to="{ name: 'auth-login' }"
                :disabled="disabled"
                >로그인
              </b-btn>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {
  validateEmailHelper,
  validateIdHelper,
  validateNicknameHelper,
} from "~/plugins/helper";

export default {
  layout: "default",
  name: "auth-signup",
  head() {
    return {
      title: `다다매거진 | 회원가입`,
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
        pwd: null,
        pwdConfirm: null,
        pid: null,
        nickname: null,
      },
      disabled: false,
      pending: {
        email: false,
        pid: false,
        nickname: false,
        submit: false,
      },
      check: {
        email: null,
        pid: null,
        nickname: null,
      },
    };
  },
  computed: {
    validate() {
      // 입력체크
      const { email, pwd, pwdConfirm, pid, nickname } = this.form;

      // 중복체크
      const allChecked =
        this.state.email &&
        this.check.email &&
        this.state.pid &&
        this.check.pid &&
        this.state.nickname &&
        this.check.nickname;

      return !(email && pwd && pwdConfirm && pwd === pwdConfirm,
      pid && nickname && allChecked);
    },
    redirect() {
      return this.$route.query.redirect;
    },
    state() {
      const email = validateEmailHelper(this.form.email);
      const pwdConfirm = this.form.pwd === this.form.pwdConfirm;
      const pid = validateIdHelper(this.form.pid);
      const nickname = validateNicknameHelper(this.form.nickname, 15);
      return {
        email,
        pwdConfirm,
        pid,
        nickname,
      };
    },
  },
  methods: {
    async signup(form) {
      const { signup } = this.$firebase();
      this.pending.submit = true;
      try {
        const { data, token } = await signup(form);
        if (data) {
          window.toast("회원가입이 완료되었습니다!");
          // 세션스토리지에 저장
          sessionStorage.setItem(process.env.TOKEN_NAME, token);
          // store에 저장
          this.$store.dispatch("setUser");
          this.$router.push("/");
        }
      } catch (error) {
        console.error("error:", error);
      }
      this.pending.submit = false;
    },
    async checkUser(field, value) {
      if (value && value !== "") {
        this.pending[field] = true;
        const { checkDuplicate } = this.$firebase();
        try {
          const check = await checkDuplicate(field, value);
          this.check[field] = !check;
          this.pending[field] = false;
        } catch (error) {
          console.error("error:", error);
        }
      }
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
