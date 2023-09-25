<template>
  <header>
    <div id="gnb">
      <b-navbar type="light" variant="white">
        <b-container>
          <b-navbar-brand class="mr-5 mr-md-0">
            <nuxt-link to="/" replace>
              <img
                :src="require('@/assets/logo-horizontal.svg')"
                alt="다다매거진 로고 이미지, 메인으로 이동"
              />
            </nuxt-link>
            <span class="status-beta" v-if="isBeta">BETA</span>
            <span class="status-beta" v-if="isDev">DEV</span>
          </b-navbar-brand>
          <!-- <b-navbar-toggle target="nav-collapse" /> -->

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="d-flex align-items-center w-100">
              <client-only>
                <div class="ml-auto uitls-auth">
                  <!-- <b-btn variant="text p-0 mr-2" pill :to="{ name: 'search' }">
                    <i class="icon icon-search text-20 text-lg-24" />
                  </b-btn> -->
                  <b-btn
                    variant="text p-0"
                    pill
                    @click="showSidebar = !showSidebar"
                  >
                    <i class="icon icon-menu text-20 text-lg-24" />
                  </b-btn>
                </div>
              </client-only>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </div>
    <global-sidebar
      :auth="auth"
      :isBeta="isBeta"
      :visible="showSidebar"
      @on-close="showSidebar = false"
    />
  </header>
</template>

<script>
export default {
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  data() {
    return {
      isBeta: false,
      showSidebar: false,
    };
  },
  computed: {
    isDev() {
      return process.env.MODE === "DEV";
    },
  },
  watch: {
    $route(n) {
      if (this.showSidebar) {
        this.showSidebar = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#gnb {
  border-bottom: 1px solid $gray-200;
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
      width: 120px;
      @media (min-width: $breakpoint-lg) {
        width: 180px;
      }
      > svg {
        width: 100%;
      }
      .status-beta {
        position: absolute;
        top: 0;
        right: -24px;
        background-color: black;
        color: $darkest;
        font-size: 12px;
        font-weight: 700;
        border-radius: 20rem;
        padding: 2px 10px;
        color: white;
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
