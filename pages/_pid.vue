<template>
  <div>
    <b-container>
      <div class="p-4">
        <template v-if="!pid">
          <div class="text-center py-4">
            <i class="icon icon-window-close text-40 text-lg-64 text-alert" />
            <h4 class="text-18 text-md-20">
              죄송합니다 페이지를 찾을 수 없습니다.
            </h4>
            <p class="text-15 text-md-16">
              클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
            </p>
            <b-btn variant="link mt-3 text-underline" to="/">
              메인으로 돌아가기
            </b-btn>
          </div>
        </template>
        <template v-else>
          <section class="my-3 p-3 border border-primary">
            <section>
              <!-- 에디터 정보 -->
              <header>
                <h4 class="text-15 text-md-16 mb-2">에디터</h4>
              </header>
              <div class="d-flex align-items-center">
                <b-btn :to="`/@${user.pid}`" variant="text p-0">
                  <b-avatar
                    size="8rem"
                    class="mr-3"
                    :src="user.profile_image_url"
                  >
                  </b-avatar>
                </b-btn>
                <div class="d-flex flex-column">
                  <b-btn
                    variant="text p-0 text-gray-800 text-28 text-md-28 fw-700 mb-1"
                    :to="`/@${user.pid}`"
                  >
                    {{ user.nickname || "-" }}
                  </b-btn>
                  <small class="text-13"> ... </small>
                </div>
              </div>
            </section>
          </section>
          <!-- <section class="py-3" v-if="items?.length">
          <h5 class="text-16 text-md-18 mb-2">이런 글은 어떠세요?</h5>
          <b-row class="mx-0">
            <b-col
              cols="6"
              md="4"
              class="px-0"
              v-for="(item, i) in items"
              :key="i"
            >
              <board-item :item="item" titleClass="text-15 text-lg-18" />
            </b-col>
          </b-row>
        </section> -->
        </template>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.user?.nickname} | 다다매거진`,
      meta: [
        {
          hid: "title",
          name: "title",
          content: `${this.user?.nickname} | 다다매거진`,
        },
      ],
    };
  },
  async asyncData({ params, $firebase }) {
    const { pid: id } = params;
    const pid = id?.split("@")[1];
    const { getProfile } = $firebase();
    const user = await getProfile(["pid", pid]);
    return {
      pid,
      user,
    };
  },
};
</script>

<style lang="scss" scoped></style>
