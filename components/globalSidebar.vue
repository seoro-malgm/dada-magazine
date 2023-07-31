<template>
  <b-sidebar
    id="global-sidebar"
    no-header
    shadow
    bg-variant="white"
    text-variant="darkest"
    :visible="visible"
    right
  >
    <div class="d-flex flex-column justify-content-between h-100">
      <!-- header -->
      <header class="d-flex flex-column p-3 bg-gray-100 border-bottom">
        <div class="text-right">
          <b-btn @click="$emit('on-close')" variant="text p-0">
            <i
              class="icon icon-window-close text-20 text-lg-24 text-gray-600"
            />
          </b-btn>
        </div>
        <!-- 로그인 -->
        <template v-if="auth">
          <b-btn variant="text mb-3 p-0" pill to="/auth/mypage">
            <!-- :to="`/@${auth.pid}`" -->
            <b-avatar size="3rem" :src="auth?.profile_image_url" />
            <div class="mt-3">
              <h3 class="text-center">{{ auth?.nickname }}</h3>
            </div>
          </b-btn>
          <div class="px-3">
            <template v-if="auth?.isEditor">
              <b-btn
                variant="outline-primary w-100"
                pill
                :to="{ name: 'board-write' }"
              >
                글쓰기
              </b-btn>
            </template>
            <template v-else-if="!auth?.isEditor">
              <b-btn
                variant="outline-primary w-100"
                pill
                :to="{ name: 'auth-editorConfirm' }"
              >
                에디터 신청
              </b-btn>
            </template>
          </div>
        </template>
        <!-- 비로그인 -->
        <template v-else>
          <div class="mb-3 text-center">
            <b-avatar size="3rem" />
            <span class="text-14 text-md-15 d-block mt-2">
              서비스 이용을 위해서 <strong>로그인</strong> 혹은
              <strong>회원가입</strong>을 진행해주세요!
            </span>
          </div>
          <b-btn variant="primary mb-2" pill :to="{ name: 'auth-login' }">
            로그인
          </b-btn>
          <b-btn
            variant="outline-gray-400 mb-2"
            :to="{ name: 'auth-signup' }"
            pill
          >
            회원가입
          </b-btn>
        </template>
      </header>
      <!-- body -->
      <section class="mt-4 mb-auto algin-self-stretch">
        <div class="px-3">
          <template v-if="auth">
            <ul>
              <li class="text-center">
                <b-btn variant="text text-15 text-md-18" :to="`/@${auth.pid}`">
                  나의 다다
                </b-btn>
              </li>
              <li class="text-center">
                <b-btn
                  variant="text text-15 text-md-18"
                  :to="{ name: 'auth-stats' }"
                >
                  내 글 통계
                </b-btn>
              </li>
            </ul>
          </template>
        </div>
      </section>
      <!-- footer -->
      <footer class="d-flex flex-column mb-4">
        <div class="px-4 text-right">
          <template v-if="auth">
            <b-btn
              variant="text text-gray-600 p-0 text-14 text-lg-15"
              pill
              :to="{ name: 'auth-logout' }"
              >로그아웃
            </b-btn>
          </template>
        </div>
      </footer>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
    isBeta: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.b-sidebar-outer {
  z-index: 4000;
  #global-sidebar {
  }
}
</style>
