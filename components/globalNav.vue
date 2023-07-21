<template>
  <div id="gnb">
    <b-navbar type="light" variant="white">
      <b-container>
        <b-navbar-brand class="mr-5 mr-md-0">
          <nuxt-link to="/" replace>
            <img
              :src="require('@/assets/logo.svg')"
              alt="신물결 로고 이미지, 메인으로 이동"
            />
          </nuxt-link>
          <!-- <span class="status-beta" v-if="isBeta"> BETA</span> -->
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="d-flex align-items-center w-100">
            <client-only>
              <div class="ml-auto uitls-auth">
                <template v-if="auth">
                  <b-btn variant="text p-0" pill :to="{ name: 'auth-mypage' }">
                    <b-avatar
                      size="3rem"
                      :src="auth?.profile_image_url"
                    ></b-avatar>
                  </b-btn>
                  <b-btn
                    variant="outline-light mx-2 d-none d-lg-block px-3"
                    pill
                    :to="{ name: 'board-write' }"
                    >글쓰기</b-btn
                  >
                </template>
                <template v-else>
                  <b-btn
                    variant="primary mr-1"
                    pill
                    :to="{ name: 'auth-login' }"
                    >로그인</b-btn
                  >
                  <b-btn
                    variant="outline-light"
                    pill
                    :to="{ name: 'auth-signup' }"
                    >회원가입</b-btn
                  >
                </template>
              </div>
            </client-only>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    auth: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isBeta: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#gnb {
  border-bottom: 1px solid $primary;
  position: fixed;
  width: 100%;
  padding: 0.5rem 0 0;
  background-color: white;
  backdrop-filter: blur(2px);
  z-index: 1055;
  margin-top: 0;
  left: 0;
  right: 0;
  .navbar {
    border-radius: 24px;
    .navbar-brand {
      position: relative;
      width: 140px;
      > svg {
        width: 100%;
      }
      .status-beta {
        position: absolute;
        top: 0;
        right: -40px;
        background-color: $primary;
        color: $darkest;
        font-size: 12px;
        font-weight: 700;
        border-radius: 20rem;
        padding: 2px 4px;
      }
    }
    .utils {
      @media (min-width: $breakpoint-lg) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .nuxt-link {
        text-decoration: none;
        border-radius: 20rem;
        color: $darkest;
        font-weight: 700;
        border: 1px solid $darkest;
        transition: all 0.3s $ease-in-out;
        &:hover,
        &.nuxt-link-exact-active {
          background-color: $primary;
          border-color: $primary;
          color: white;
        }
      }
    }
    .uitls-auth {
      display: flex;
      align-items: center;
      a,
      button {
        white-space: nowrap;
      }
    }
  }
}
</style>
