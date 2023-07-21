<template>
  <b-container class="pt-4 pb-5">
    <template v-if="currentBoardItem">
      <article class="mb-5">
        <header class="mb-4">
          <span class="text-category mb-1" v-if="currentBoardItem.category">
            {{ getCategory(currentBoardItem.category) }}
          </span>
          <h1 class="text-2 text-md-3 mt-1">
            {{ currentBoardItem.title }}
          </h1>
          <div
            class="mt-3 d-flex justify-content-between border-top border-bottom border-skeleton p-2 text-1"
          >
            <div class="d-flex align-items-center">
              <b-avatar
                size="1.5rem"
                class="mr-2"
                :src="currentBoardItem?.user?.profile_image_url"
              >
              </b-avatar>
              <span class="text-light">{{
                currentBoardItem?.user?.nickname
              }}</span>
            </div>
            <div class="d-flex align-items-center">
              <small>
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
                            no: currentBoardItem.no,
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
                      <i class="icon icon-attention" /> <span>글 신고하기</span>
                    </b-dd-item-btn>
                    <b-dd-item-btn @click="blockUser(currentBoardItem.user)">
                      <i class="icon icon-block" /> <span>유저 차단하기</span>
                    </b-dd-item-btn>
                  </template>
                  <!-- v-if="!isMine" -->
                  <!-- <b-dd-item-btn @click="blockUser(currentBoardItem.user)">
                  <i class="icon icon-block" /> <span>유저 차단하기</span>
                </b-dd-item-btn> -->
                  <!-- <b-dd-item-btn>
                  <i class="icon icon-share" /> <span>글 공유하기</span>
                </b-dd-item-btn> -->
                </b-dd>
              </template>
            </div>
          </div>
        </header>
        <section class="bg-white p-4">
          <div class="board-desc" v-html="currentBoardItem.desc" />
        </section>
        <!-- 글 하단 버튼 -->
        <section>
          <b-btn
            variant="outline-heart d-flex align-items-center mx-auto px-4 py-3 like-button"
            :class="{ actvie: onLikeToggle }"
            pill
            :disabled="!auth"
            @click="likeToggle"
          >
            <i class="icon icon-heart text-1 text-md-2 mr-3" />
            <span class="text-1 text-md-1 fw-700">
              {{ currentBoardItem?.like }}
            </span>
          </b-btn>
          <div class="mt-2 text-center">
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
                    no: currentBoardItem.no,
                  },
                })
              "
              >수정</b-btn
            >
            <b-btn variant="outline-light" @click="onRemove">삭제</b-btn>
          </section>
        </client-only> -->
      </article>
      <article class="mb-5 py-3 border-top border-bottom">
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
      </article>
      <div class="d-flex justify-content-between">
        <b-btn
          variant="secondary btn-go-top d-inline-flex align-items-center"
          pill
          @click="goTop"
          aria-label="맨 위로 이동 버튼"
          aria-description="스크롤을 맨 위로 이동시키는 버튼입니다"
        >
          맨 위로
        </b-btn>
      </div>
      <!-- 글 신고 모달 -->
      <modal-report-board
        :boardUser="currentBoardItem.user"
        :boardNo="no"
        :reportUser="auth"
        @reported="isReported = true"
      />
    </template>
    <template v-else>
      <Loading />
    </template>
  </b-container>
</template>

<script>
import allCategories from "~/assets/json/allCategories";
import { getTimestamp, copyText } from "~/plugins/commons";
export default {
  layout: "default",
  name: "board-detail",
  props: {
    auth: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: `${this.currentBoardItem.title} | 신물결`,
      meta: [
        {
          hid: "title",
          name: "title",
          content: `${this.currentBoardItem.title} | 신물결`,
        },
        {
          hid: "description",
          name: "description",
          content: this.currentBoardItem.desc,
        },
      ],
    };
  },
  async asyncData({ params, $firebase }) {
    const { getBoardItem } = $firebase();
    const boardItem = await getBoardItem(params.no);
    return {
      currentBoardItem: boardItem,
    };
  },
  data() {
    return {
      newReply: null,
      onLikeToggle: false,
      allCategories,
      toggleUtil: false,
      isReported: false,
    };
  },
  computed: {
    no() {
      return this.$route.params?.no;
    },
    url() {
      return process.env.BASE_URL + this.$route.fullPath;
    },
    createdDate() {
      const { seconds } = this.currentBoardItem?.createdAt;
      return seconds ? getTimestamp(new Date(seconds * 1000)) : "";
    },
    // 내가 쓴 글인경우
    isMine() {
      return this.currentBoardItem?.user?.id === this.auth?.id;
    },
    // todo: 신고한 글인 경우
    // isReported(){

    // }
  },
  onLikeToggle: {
    onLikeToggle(n) {
      console.log("n:", n);
    },
  },

  async mounted() {
    const { incrementViewer } = this.$firebase();
    await incrementViewer(this.no);
  },

  methods: {
    copyText,
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
    // 댓글 추가
    addReply() {
      console.log("%c Hello ", "background: #333399; color: #ededed");
    },
    // 좋아요 버튼
    async likeToggle() {
      this.onLikeToggle = true;
      const { incrementLike } = this.$firebase();
      incrementLike(this.no);
      this.currentBoardItem.like += 1;
      // this.pending.like = false;
      this.onLikeToggle = false;
    },
    // 글 삭제
    async onRemove() {
      const bool = await window.confirm("정말 삭제하시겠습니까?");
      if (bool) {
        const { removeBoardItem } = this.$firebase();
        try {
          const response = await removeBoardItem(this.no);
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
.board-desc::v-deep iframe {
  width: 50%;
  height: 320px;
}
@media all and (max-width: 768px) {
  .board-desc::v-deep iframe {
    width: 100%;
    height: 360px;
  }
}

.board-desc::v-deep p {
  margin: 0;
}

.board-desc::v-deep img {
  width: 540px;
  max-width: 100%;
  height: auto;
  margin-bottom: 24px;
}
.writing-text::v-deep * {
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.7;
  color: $gray;
  word-break: keep-all;
  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 1.9;
  }
}
.writing-text::v-deep h2 {
  strong {
    font-size: 20px;
    line-height: 1.8;
    color: $gray;
    font-weight: 700;
    @media (min-width: 1024px) {
      font-size: 22px;
      line-height: 2;
    }
  }
}

.writing-text::v-deep h3 {
  strong {
    font-size: 18px;
    line-height: 1.8;
    color: $gray;
    font-weight: 700;
    @media (min-width: 1024px) {
      font-size: 20x;
      line-height: 2;
    }
  }
}
.writing-text::v-deep a {
  color: $gray;
  text-decoration: underline;
}

.like-button {
}
</style>
