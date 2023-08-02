<template>
  <div>
    <div>
      <template v-if="!pid || !user">
        <b-container>
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
        </b-container>
      </template>
      <template v-else>
        <header class="mb-5 pb-4">
          <section class="pt-5 pb-3 bg-primary">
            <b-container>
              <b-row align-v="end">
                <b-col
                  offset="5"
                  offset-md="4"
                  offset-lg="3"
                  offset-xl="2"
                  cols="5"
                  md="7"
                  lg="8"
                  xl="9"
                >
                  <div class="d-flex flex-column align-items-start">
                    <b-btn
                      variant="text p-0 text-gray-800 text-28 text-md-28 fw-700 mb-0"
                      :to="`/${user.pid}`"
                    >
                      {{ user.nickname || "-" }}
                    </b-btn>
                    <span class="text-16 text-md-16 fw-700">
                      @{{ user?.pid }}
                    </span>
                  </div>
                </b-col>
                <b-col cols="2" md="1" class="text-right">
                  <b-dd variant="text p-0" class="ml-2" no-caret>
                    <template #button-content>
                      <i class="icon icon-cog text-16 text-md-20" />
                    </template>
                    <template v-if="isMine">
                      <b-dd-item-btn
                        @click="
                          $router.push({
                            name: 'auth-mypage',
                          })
                        "
                      >
                        <i class="icon icon-edit" />
                        <span>프로필 수정하기</span>
                      </b-dd-item-btn>
                    </template>
                    <template v-else-if="!isMine">
                      <!-- v-if="!isMine" -->
                      <b-dd-item-btn
                        @click="$bvModal.show('modal-report-board')"
                      >
                        <i class="icon icon-attention" />
                        <span>유저 신고하기</span>
                      </b-dd-item-btn>
                    </template>
                  </b-dd>
                </b-col>
              </b-row>
            </b-container>
          </section>
          <b-container class="position-relative">
            <div class="position-absolute" :style="{ marginTop: '-5rem' }">
              <b-btn :to="`/${user.pid}`" variant="text p-0 ">
                <b-avatar
                  size="10rem"
                  class="shadow"
                  :src="user.profile_image_url"
                >
                </b-avatar>
              </b-btn>
            </div>
            <b-row>
              <b-col
                offset="5"
                offset-md="4"
                offset-lg="3"
                offset-xl="2"
                cols="7"
                md="8"
                lg="9"
                xl="10"
              >
                <p class="text-14 text-lg-15 py-1">
                  {{ user?.introduction || "자기소개가 없습니다." }}
                </p>
              </b-col>
            </b-row>
          </b-container>
        </header>
        <section class="border-top mt-5 py-3">
          <b-container>
            <client-only>
              <b-row align-v="center" class="mx-2">
                <b-col
                  cols="6"
                  md="4"
                  class="px-2 mb-2"
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <board-item :item="item" />
                </b-col>
              </b-row>
            </client-only>
          </b-container>
        </section>
      </template>
    </div>
    <!-- 유저 신고 모달 -->
    <!-- <modal-report-user
      :user="user"
      :reportUser="auth"
      @reported="isReported = true"
    /> -->
  </div>
</template>

<script>
export default {
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
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
    const { pid } = params;
    const { getProfile } = $firebase();
    const user = await getProfile(["pid", pid]);
    return {
      pid,
      user,
    };
  },
  data() {
    return {
      items: null,
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    isMine() {
      return this.auth?.pid === this?.pid;
    },
  },
  async mounted() {
    await this.getItems(this.query);
  },
  methods: {
    async getItems(q) {
      const { getAllBoardItems } = this.$firebase();
      this.items = await getAllBoardItems(
        "board",
        { ...q, author: this.user?.uid },
        10,
        ["createdAt", "desc"]
      );
      console.log("this.items:", this.items);
    },
  },
};
</script>

<style lang="scss" scoped></style>
