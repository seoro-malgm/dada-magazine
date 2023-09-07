<template>
  <div>
    <template v-if="currentBoardItem">
      <header
        class="bg-img header-thumbnail ratio-sm-90 ratio-45"
        v-if="currentBoardItem.thumbnail"
      >
        <img
          :src="currentBoardItem.thumbnail"
          :alt="`${currentBoardItem.title} 썸네일 이미지`"
        />
      </header>
      <b-container class="pt-4 pb-5">
        <article class="mb-5">
          <header class="mb-4 text-center">
            <span class="text-category mb-1" v-if="currentBoardItem.category">
              {{ getCategory(currentBoardItem.category) }}
            </span>
            <hr />
            <h1 class="text-20 text-md-28 mt-1">
              {{ currentBoardItem?.title }}
            </h1>
            <div class="mt-3 d-flex align-items-center justify-content-center">
              <small class="text-14 text-md-14">
                {{ createdDate }} | 조회수
                {{ currentBoardItem.viewer + 1 || 0 }}
              </small>
              <template v-if="auth">
                <b-dd variant="text p-0" class="ml-2" no-caret>
                  <template #button-content>
                    <i class="icon icon-cog" />
                  </template>
                  <template v-if="isMine">
                    <b-dd-item-btn
                      @click="
                        $router.push({
                          name: 'board-write',
                          query: {
                            docId: currentBoardItem.docId,
                          },
                        })
                      "
                    >
                      <i class="icon icon-pencil" /> <span>글 수정하기</span>
                    </b-dd-item-btn>
                    <b-dd-item-btn @click="onRemove">
                      <i class="icon icon-cancel" /> <span>글 삭제하기</span>
                    </b-dd-item-btn>
                  </template>
                  <template v-else-if="!isMine">
                    <!-- v-if="!isMine" -->
                    <b-dd-item-btn @click="$bvModal.show('modal-report-board')">
                      <i class="icon icon-attention" />
                      <span>글 신고하기</span>
                    </b-dd-item-btn>
                    <b-dd-item-btn @click="blockUser(currentBoardItem.user)">
                      <i class="icon icon-block" /> <span>유저 차단하기</span>
                    </b-dd-item-btn>
                  </template>
                </b-dd>
              </template>
            </div>
          </header>
          <bar-horizon class="my-3" />
          <section class="bg-white p-4">
            <client-only>
              <board-content :content="currentBoardItem.desc" />
            </client-only>
          </section>
          <!-- 글 하단 버튼 -->
          <section class="my-5 py-5">
            <template v-if="!isMine">
              <b-btn
                variant="outline-heart d-flex align-items-center mx-auto px-4 py-3 like-button"
                :class="{ actvie: onLikeToggle }"
                pill
                :disabled="!auth"
                @click="likeToggle"
              >
                <i class="icon icon-heart text-16 text-md-18 mr-3" />
                <span class="text-16 text-md-18 fw-700">
                  {{ currentBoardItem?.like }}
                </span>
              </b-btn>
            </template>
            <template v-else-if="isMine">
              <div
                class="d-flex align-items-center justify-content-center text-heart"
              >
                <i class="icon icon-heart text-16 text-md-18 mr-3" />
                <span class="text-16 text-md-18 fw-700">
                  {{ currentBoardItem?.like }}
                </span>
              </div>
            </template>
            <div class="mt-3 text-center">
              <b-btn
                variant="outline-gray-600"
                pill
                @click="copyText(url, '글 주소가')"
              >
                <i class="icon icon-share" />
                공유하기
              </b-btn>
            </div>
          </section>
          <!-- 수정/삭제용 utils -->
          <!-- <client-only>
          <section
            class="d-flex align-items-center justify-content-end"
            v-if="isMine"
          >
            <b-btn
              variant="outline-light mx-2"
              @click="
                $router.push({
                  name: 'board-write',
                  query: {
                    docId: currentBoardItem.docId,
                  },
                })
              "
              >수정</b-btn
            >
            <b-btn variant="outline-light" @click="onRemove">삭제</b-btn>
          </section>
        </client-only> -->
        </article>
        <section class="my-3 py-3 border-top border-bottom border-primary">
          <!-- 에디터 정보 -->
          <section>
            <header>
              <h4 class="text-15 text-md-16 mb-2">에디터</h4>
            </header>
            <template v-if="author">
              <div class="d-flex align-items-center">
                <b-btn :to="`/${author?.pid}`" variant="text p-0">
                  <b-avatar
                    size="5rem"
                    class="mr-3"
                    :src="author?.profile_image_url"
                  >
                  </b-avatar>
                </b-btn>
                <div class="d-flex flex-column align-items-start">
                  <b-btn
                    variant="text p-0 text-gray-800 text-15 text-md-18 fw-700 mb-1"
                    :to="`/${author?.pid}`"
                  >
                    {{ author?.nickname || "-" }}
                  </b-btn>
                  <small class="text-14"> {{ author?.introduction }} </small>
                </div>
              </div>
            </template>
          </section>

          <!-- 에디터의 다른 글 -->
          <!-- <div class="mt-3">
            <header>
              <h4 class="text-15 text-md-16 mb-2">에디터의 다른 글</h4>
            </header>
            <b-row class="mx-0">
              ...
              <b-col cols="6" md="4" class="px-0" v-for='(item, i) in items' :key='i'> 
              <board-item :item="item"></board-item>  
              </b-col>
            </b-row>
          </div> -->
        </section>
        <section class="py-3" v-if="items?.length">
          <h5 class="text-16 text-md-18 mb-2">이런 글은 어떠세요?</h5>
          <b-row class="mx-n2">
            <b-col
              cols="6"
              md="3"
              class="px-2 mb-3"
              v-for="(item, i) in items"
              :key="i"
            >
              <board-item :item="item" titleClass="text-15 text-lg-18" />
            </b-col>
          </b-row>
        </section>
        <!-- <article class="mb-5 py-3 border-top border-bottom">
        <h6>댓글</h6>
        <ul class="reply-list">
          <li>댓글 0</li>
        </ul>
        <section class="mt-3">
          <b-row align-v="stretch" class="mx-n1">
            <b-col cols="10" class="px-1">
              <b-textarea
                class="border"
                v-model="newReply"
                disabled
                placeholder="댓글 기능은 현재 준비중입니다!"
              />
            </b-col>
            <b-col cols="2" class="px-1">
              <b-btn
                variant="primary w-100 h-100"
                @click="addReply"
                :disabled="true"
                >등록</b-btn
              >
            </b-col>
          </b-row>
        </section>
      </article> -->
        <!-- <div class="d-flex justify-content-between">
          <b-btn
            variant="secondary btn-go-top d-inline-flex align-items-center"
            pill
            @click="goTop"
            aria-label="맨 위로 이동 버튼"
            aria-description="스크롤을 맨 위로 이동시키는 버튼입니다"
          >
            맨 위로
          </b-btn>
        </div> -->
        <!-- 글 신고 모달 -->
        <modal-report-board
          :boardUser="currentBoardItem.user"
          :docId="docId"
          :reportUser="auth"
          @reported="isReported = true"
        />
      </b-container>
    </template>
    <template v-else>
      <Loading />
    </template>
  </div>
</template>

<script>
import allCategories from "~/assets/json/allCategories";
import { getTimestamp } from "~/plugins/commons";
export default {
  layout: "default",
  name: "board-detail",
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  head() {
    return {
      title: `${this.currentBoardItem.title} | 다다매거진`,
      meta: [
        {
          hid: "title",
          name: "title",
          content: `${this.currentBoardItem.title} | 다다매거진`,
        },
        {
          hid: "description",
          name: "description",
          content: this.currentBoardItem.desc,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.currentBoardItem?.thumbnail || "/og-image.png",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `${this.currentBoardItem.title} | 다다매거진`,
        },
      ],
    };
  },
  async asyncData({ params, query, $firebase }) {
    const { getBoardItem, getAllBoardItems } = $firebase();
    const [boardItem, items] = await Promise.all([
      getBoardItem("board", ["docId", params.docId]),
      getAllBoardItems(
        "board",
        {
          ...query,
          docId: ["<", params.docId, 4],
        },
        4,
        ["docId", "desc"]
      ),
    ]);
    return {
      currentBoardItem: boardItem,
      items,
    };
  },
  data() {
    return {
      currentBoardItem: null,
      items: [],
      newReply: null,
      onLikeToggle: false,
      allCategories,
      toggleUtil: false,
      isReported: false,
    };
  },
  computed: {
    docId() {
      return this.$route.params?.docId;
    },
    url() {
      return this.docId ? `${process.env.BASE_URL}/board/${this.docId}` : "";
    },
    createdDate() {
      const { seconds } = this.currentBoardItem?.createdAt;
      return seconds && this.getTimestamp
        ? new Date(seconds * 1000)?.toLocaleDateString() // this.getTimestamp(new Date(seconds * 1000))
        : "";
    },
    author() {
      return this.currentBoardItem?.author || "";
    },
    // 내가 쓴 글인경우
    isMine() {
      return this.author?.uid === this.auth?.uid;
    },
  },

  async mounted() {
    // await this.getItem();
    // 조회수 추가
    const { incrementViewer } = this.$firebase();
    await incrementViewer("board", ["docId", this.docId]);

    // 다른 글 불러오기
    // await this.getItems();

    // if (!this.currentBoardItem) {
    //   await this.getItem();
    // }
  },

  methods: {
    getTimestamp,
    copyText(text) {
      const board = navigator.clipboard;
      board
        .writeText(
          `${this.url}
출처: ${this.currentBoardItem?.title} | 우리들의 다재다능한 이야기, 다다매거진`
        )
        .then(() => {
          window.toast("클립보드에 복사되었습니다.");
        })
        .catch((error) => {
          window.toast(error);
        });
    },
    // 카테고리 불러오기
    getCategory(category) {
      return this.allCategories[category]
        ? this.allCategories[category]
        : this.allCategories["ETC"];
    },
    // 맨 위로
    goTop() {
      window.scrollTo(0, 0);
    },
    async getItem() {
      const { getBoardItem } = this.$firebase();
      try {
        const data = await getBoardItem("board", ["docId", this.docId]);
        if (data) {
          this.currentBoardItem = data;
        }
      } catch (error) {
        console.error("error:", error);
      }
    },
    // async getItems(query) {
    //   const { getAllBoardItems } = this.$firebase();
    //   try {
    //     const data = await getAllBoardItems(
    //       "board",
    //       {
    //         ...query,
    //         docId: ["<", this.docId, 3],
    //       },
    //       3,
    //       ["docId"]
    //     );
    //     if (data) {
    //       this.items = data;
    //     }
    //   } catch (error) {
    //     console.error("error:", error);
    //   }
    // },
    selectCategory(category) {
      this.$router.push({
        name: "index",
        query: {
          category,
        },
      });
    },
    // 좋아요 버튼
    async likeToggle() {
      const { incrementLike } = this.$firebase();
      await incrementLike("board", ["docId", this.docId]);
      this.currentBoardItem.like += 1;
    },
    // 글 삭제
    async onRemove() {
      const bool = await window.confirm("정말 삭제하시겠습니까?");
      if (bool) {
        const { removeBoardItem } = this.$firebase();
        try {
          const response = await removeBoardItem("board", [
            "docId",
            this.docId,
          ]);
          if (response) {
            window.toast("정상적으로 삭제되었습니다");
            this.$router.replace("/");
          }
        } catch (error) {
          window.alert("삭제에 실패했습니다");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-category + hr {
  width: 100%;
  max-width: 120px;
  border-bottom: 5px solid $primary;
  margin: 0.5rem auto 0.75rem;
}

.header-thumbnail {
  position: relative;
  overflow: hidden;
  clip-path: inset(0);
  img {
    object-fit: cover;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
