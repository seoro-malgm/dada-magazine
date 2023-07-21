<template>
  <div class="text-center py-5">
    <b-spinner variant="primary" large />
  </div>
</template>

<script>
export default {
  name: "auth-logout",
  mounted() {
    this.logoutProcess();
  },
  methods: {
    async logoutProcess() {
      const { logout } = this.$firebase();
      await logout();
      // 스토리지에서 제거
      sessionStorage.removeItem(process.env.TOKEN_NAME);
      // store에서 제거
      this.$store.dispatch("setState", ["user", null]);
      window.location.href = "/";
    },
  },
};
</script>

<style lang="scss" scoped></style>
