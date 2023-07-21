<template>
  <div id="app">
    <!-- 내용 -->
    <main id="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: "empty",
  mounted() {
    window.toast = this.toast;
  },
  methods: {
    async toast(
      msg,
      opt = {
        id: "toast",
        variant: "primary",
        textVariant: "white",
      }
    ) {
      const h = this.$createElement;

      const bodyNode = h("div", {
        class: "px-2",
        domProps: {
          innerHTML: `
          <div class="text-${opt.textVariant}">
            <span class="text-1 fw-500">${msg}</span>
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
        toaster: "b-toaster-bottom-center",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#main {
  min-height: 100vh;
}
</style>
