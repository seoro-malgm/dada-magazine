<template>
  <div class="mb-5 pb-5">
    <header
      class="mb-5 bg-img header-thumbnail border-bottom border-primary position-relative"
      :class="form?.thumbnail ? 'ratio-sm-90 ratio-45' : 'ratio-sm-45 ratio-15'"
    >
      <b-container class="py-5">
        <input-image
          path="thumbnails"
          label="썸네일"
          :file="form.thumbnail"
          @on-change="($event) => (form.thumbnail = $event)"
          :size="1920"
          class="position-center"
        />
      </b-container>
      <img
        :alt="`${form.title} 썸네일 이미지`"
        :src="form.thumbnail"
        v-if="form.thumbnail && typeof form.thumbnail === 'string'"
      />
    </header>
    <b-container>
      <section class="mt-3 mb-4">
        <b-row>
          <b-col cols="12" md="8" lg="9">
            <h6 class="py-2">제목</h6>
            <b-form-input
              v-model="form.title"
              placeholder="제목을 입력하세요"
              class="text-20 text-md-24"
            />
          </b-col>
          <b-col cols="12" md="4" lg="3">
            <h6 class="py-2">카테고리</h6>
            <b-form-select v-model="form.category">
              <b-form-select-option :value="null" disabled>
                카테고리를 선택하세요
              </b-form-select-option>
              <client-only>
                <b-form-select-option
                  v-for="(value, key) in allCategories"
                  :key="key"
                  :value="key"
                  >{{ value }}
                </b-form-select-option>
              </client-only>
            </b-form-select>
          </b-col>
        </b-row>
      </section>
      <section class="mb-4">
        <client-only>
          <h6 class="mt-3 mb-2">내용</h6>
          <editor-write
            @on-update="($event) => updateDesc($event)"
            @on-image-removed="($event) => onImageRemoved($event)"
            @on-error="($event) => onError($event)"
            imagePath="images"
            :content="form.desc"
            :imageSize="1920"
          />
        </client-only>
      </section>

      <!-- <section class="mt-5 border-top border-bottom pb-4">
      <header class="mt-2 mb-3">
        <h5>썸네일</h5>
      </header>
      <ul class="thumbnail-list">
        <li v-for="(url, index) in imagesAttached">
          <input
            :id="`file-${index}`"
            type="radio"
            v-model="form.thumbnail"
            :value="url"
          />
          <label
            :for="`file-${index}`"
            name="thumbnailSelected"
            class="label-thumbnail"
          >
            <img :src="url" :alt="`${index + 1}번째로 추가된 이미지`" />
          </label>
        </li>
      </ul>
    </section> -->
      <section class="mt-4">
        <b-row align-h="end" class="mt-3">
          <b-col cols="12" md="4">
            <template v-if="docId">
              <b-btn variant="primary w-100 py-3 fw-700" @click="update">
                <i class="icon icon-edit" />
                수정
              </b-btn>
            </template>
            <template v-else>
              <b-btn
                variant="primary w-100 py-3 fw-700"
                @click="submit"
                :disabled="!validate"
              >
                <i class="icon icon-pencil" /> 업로드
              </b-btn>
            </template>
          </b-col>
        </b-row>
      </section>
    </b-container>
  </div>
</template>

<script>
import { createHash } from "~/plugins/commons.js";
import allCategories from "~/assets/json/allCategories";

export default {
  layout: "default",
  name: "board-write",
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  data() {
    return {
      pending: {
        thumbnail: false,
      },
      form: {
        title: null,
        desc: null,
        category: null,
        createdAt: null,
        thumbnail: null,
        like: 0,
      },
      imagesAttached: [],
      allCategories,
    };
  },
  computed: {
    docId() {
      return this.$route.query?.docId;
    },
    validate() {
      return !(
        !this.form.title ||
        this.form.title === "" ||
        !this.form.category ||
        !this.form.desc ||
        this.form.desc === "<p></p>"
      );
    },
  },
  async mounted() {
    if (!this.auth) {
      window.toast("로그인이 필요한 페이지입니다.");
      this.$router.push({
        name: "auth-login",
        query: {
          redirect: "board-write",
        },
      });
    }

    if (this.docId) {
      await this.init(this.docId);
    }
  },
  methods: {
    createHash,
    updateDesc(n) {
      this.form.desc = n;
    },
    async init(docId) {
      this.pending.init = true;
      if (!docId) {
        if (this.form?.author !== this.auth.uid) {
          this.$router.push("/");
          window.toast("잘못된 접근입니다");
        }
        return;
      } else {
        try {
          const { getBoardItem } = this.$firebase();
          const loadBoardItem = await getBoardItem("board", ["docId", docId]);
          // console.log("loadBoardItem:", loadBoardItem);
          if (loadBoardItem) {
            // ref를 찾은 뒤에 form에 적용함
            this.form = {
              ...loadBoardItem,
              author: this.auth?.uid,
            };
            // 완료
            this.pending.init = false;
          }
        } catch (error) {
          window.toast("잘못된 접근입니다");
          this.$router.push("/");
          console.error("error:", error);
        }
      }
    },

    // form 리셋
    reset() {
      const defaultForm = {
        title: null,
        desc: null,
        createdAt: null,
      };
      this.form = defaultForm;
    },

    onImageRemoved(url) {
      if (this.form.thumbnail === url) {
        this.form.thumbnail = null;
      }
      this.imagesAttached.splice(url, 1);
      const { deleteImage } = this.$firebase();
      deleteImage(url);
    },

    // 업로드
    async submit() {
      this.form.createdAt = new Date();
      const { addBoardItem, getBoardCount } = this.$firebase();
      try {
        const docId = this.createHash(); // await getBoardCount();
        const body = {
          ...this.form,
          docId,
          viewer: 0,
          like: 0,
          author: this.auth?.uid,
        };
        const data = await addBoardItem("board", body);
        if (data) {
          window.toast("업로드에 성공했습니다.");
          this.$router.push(`/board/${docId}`);
        }
      } catch (error) {
        window.toast("업로드에 실패했습니다.");
        console.error("error:", error);
      }
    },
    // 업데이트
    async update() {
      this.form.createdAt = new Date();
      const { updateBoardItem } = this.$firebase();
      try {
        const updated = await updateBoardItem("board", ["docId", this.docId], {
          ...this.form,
          author: this.auth?.uid,
        });
        // console.log('updated:', updated)
        if (updated) {
          window.toast("수정에 성공했습니다.");
          // this.reset()
          this.$router.push(`/board/${this.docId}`);
        }
      } catch (error) {
        window.toast("수정에 실패했습니다.");
        console.error("error:", error);
      }
    },
    onError(text) {
      window.toast(text);
      console.error("error:", text);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-thumbnail {
  width: 100%;
  padding: 3rem 3rem 49%;
  border-radius: 14px;
  border: 1px solid #eee;
  background-color: #ededed;
  text-align: center;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .label-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.code-preview {
  width: 100%;
  max-height: 300px;
  padding: 16px;
  overflow-y: auto;
  background-color: #ededed;
}

.thumbnail-list {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  li {
    margin-right: 8px;
    margin-bottom: 8px;
    img {
    }
    input {
      display: none;
      + label {
        width: 94px;
        height: 94px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          position: absolute;
          height: 96px;
          width: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        border: 2px solid $white;
      }
      &:checked {
        + label {
          border-color: $primary;
          &:after {
            position: absolute;
            z-index: 2;
            content: "선택됨";
            background-color: $primary;
            color: white;
            display: block;
            padding: 2px 4px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}

.header-thumbnail {
  transition: padding 0.4s $default-ease;
}
</style>
