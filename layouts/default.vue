<template>
  <div id="app">
    <global-nav :auth="auth" />
    <!-- 내용 -->
    <main id="main">
      <nuxt-child :auth="auth" />
    </main>
    <btn-floating
      :position="{
        bottom: onScrolled ? '2rem' : '-7rem',
        right: '1.5rem',
      }"
      variant="white text-darkest rounded-circle p-0"
      :btnStyle="{
        width: '48px',
        height: '48px',
      }"
      @click="scrollTo(0, 0)"
    >
      <template #content>
        <i class="icon icon-up-circled text-48" />
      </template>
    </btn-floating>
    <btn-floating
      :position="{
        bottom: onScrolled ? '2rem' : '-4rem',
        left: '1.5rem',
      }"
      variant="lightest rounded-pill fw-700 text-13"
      @click="linkTo('https://dada-magazine.stibee.com/subscribe/')"
    >
      <template #content>
        <i class="icon icon-paper-plane" />
        다다매거진 구독하기
      </template>
    </btn-floating>

    <!-- footer -->

    <global-footer />
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      onScrolled: false,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getUser;
    },
    routeName() {
      return this.$route.name;
    },
  },
  mounted() {
    // 스크롤 핸들러
    window.addEventListener("scroll", this.handleScroll);
    this.modal();
    window.toast = this.toast;
  },
  beforeDestroy() {
    // 스크롤 핸들러 해제
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    scrollTo(x, y) {
      window.scrollTo(x, y);
    },
    linkTo(link) {
      window.open(link, "_blank");
    },
    modal() {
      window.alert = async (
        msg,
        obj = {
          title: "알림",
        }
      ) => {
        const opt = {
          titleClass: "text-left text-16",
          dangerMsg: "",
          bodyClass: "px-3 pt-3 pb-2",
          contentClass: "confirm border-0 overflow-hidden ",
          headerClass: "rounded-0 bg-primary bg-opacity-15 text-left ",
          footerClass: "border-0 d-flex justify-content-end ",
          okTitle: "예",
          okVariant: "primary text-16 py-1 px-3",
          centered: true,
          size: "sm",
          noCloseOnBackdrop: true,
          autoFocusButton: "ok",
          returnFocus: this.$refs.app,
          hideHeaderClose: false,
          headerCloseContent: `<i class="icon icon-times text-16"/>`,
          ...obj,
        };
        const msgVNode =
          typeof msg === "string"
            ? this.$createElement("div", {
                domProps: {
                  innerHTML: `
        <span class="text-16 lh-200 opacity-8">${msg}</span>
      `,
                },
              })
            : msg;
        return await this.$bvModal.msgBoxOk([msgVNode], opt);
      };
      window.confirm = async (
        msg,
        obj = {
          title: "알림",
        }
      ) => {
        const options = {
          titleClass: "text-left text-16",
          dangerMsg: "",
          bodyClass: "px-3 pt-3 pb-2",
          contentClass: "confirm border-0 overflow-hidden",
          headerClass: "rounded-0 bg-primary bg-opacity-15 text-left ",
          footerClass: "border-0 d-flex justify-content-end",
          okTitle: "예",
          cancelTitle: "아니오",
          okVariant: "primary text-16 py-1 px-3 text-white",
          cancelVariant: "secondary text-16 py-1 px-3",
          centered: true,
          size: "sm",
          noCloseOnBackdrop: true,
          autoFocusButton: "ok",
          hideHeaderClose: false,
          headerCloseContent: `<i class="icon icon-times text-16"/>`,
          ...obj,
        };
        const msgVNode =
          typeof msg === "string"
            ? this.$createElement("div", {
                domProps: {
                  innerHTML: `
        <span class="mb-4 text-16 lh-200 opacity-8">${msg}</span>
        <span class="text-danger text-16 lh-200">${options.dangerMsg}</span>
      `,
                },
              })
            : msg;
        return await this.$bvModal.msgBoxConfirm([msgVNode], options);
      };
    },
    async toast(
      msg,
      opt = {
        id: "toast",
        variant: "info",
        textVariant: "white",
      }
    ) {
      const h = this.$createElement;

      const bodyNode = h("div", {
        class: "px-2",
        domProps: {
          innerHTML: `
          <div class="text-${opt.textVariant} text-center">
            <span class="text-16 fw-500">${msg}</span>
          </div>
          `,
        },
      });

      this.$bvToast.toast(bodyNode, {
        solid: true,
        noCloseButton: true,
        headerClass: `bg-${opt.variant} p-0 border-0 text-white fw-600`,
        bodyClass: `bg-${opt.variant} py-3 border-0 rounded text-white fw-600`,
        toastClass: "border-0  pt-0",
        toaster: "b-toaster-bottom-right",
      });
    },
    handleScroll(e) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      this.scrollY = scrollTop;
      if (scrollTop <= 100) {
        this.onScrolled = false;
      }

      if (scrollTop >= 180) {
        this.onScrolled = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$gnb-height: 69px;
#main {
  min-height: 100vh;
  // @media (max-width: $breakpoint-md) {
  //   padding-top: 72px;
  // }
  // padding-top: 82px;
  padding-top: 69px;
  @media (min-width: $breakpoint-lg) {
    padding-top: 69px;
    // padding-top: calc($gnb-height + 12px);
  }
  // padding-bottom: 2.5rem;
}
</style>
