<template>
  <b-container>
    <section class="mt-3 mb-4">
      <header class="mb-3 pb-2">
        <h1 class="bg-flow text-20 text-lg-3">
          글쓰기
          <svg-line-path />
        </h1>
      </header>
      <b-row>
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
        <b-col cols="12" md="8" lg="9">
          <h6 class="py-2">제목</h6>
          <b-form-input v-model="form.title" placeholder="제목을 입력하세요" />
        </b-col>
      </b-row>
    </section>
    <section class="mb-4">
      <client-only>
        <h6 class="mt-3 mb-2">내용</h6>
        <vue-editor
          useCustomImageHandler
          @image-removed="onImageRemoved"
          @image-added="onImageAdded"
          v-model="form.desc"
          placeholder="내용을 입력하세요"
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
            name="thumnaiilSelected"
            class="label-thumbnail"
          >
            <img :src="url" :alt="`${index + 1}번째로 추가된 이미지`" />
          </label>
        </li>
      </ul>
    </section> -->
    <section class="mt-4">
      <b-row align-h="end" class="mt-3">
        <b-col cols="12" md="3">
          <template v-if="no">
            <b-btn variant="outline-primary w-100 py-3 fw-700" @click="update">
              <i class="icon icon-edit" />

              수정</b-btn
            >
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
</template>

<script>
import { resize, createHash } from "~/plugins/commons.js";
import allCategories from "~/assets/json/allCategories";

export default {
  layout: "default",
  name: "board-write",
  props: {
    auth: {
      type: Object,
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
      resize,
    };
  },
  computed: {
    no() {
      return this.$route.query?.no;
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

    if (this.no) {
      await this.init(this.no);
    }
  },
  methods: {
    createHash,
    async init(no) {
      this.pending.init = true;
      if (!no) {
        if (this.form?.user.id !== this.auth.id) {
          window.toast("잘못된 접근입니다");
        }
        return;
      } else {
        try {
          const { getBoardItem } = this.$firebase();
          const loadBoardItem = await getBoardItem(no);
          if (loadBoardItem) {
            // ref를 찾은 뒤에 form에 적용함
            this.form = {
              ...loadBoardItem,
            };
            // 완료
            this.pending.init = false;
          }
        } catch (error) {
          window.toast("잘못된 접근입니다");
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

    async onImageAdded(file, Editor, cursorLocation, resetUploader) {
      let _this = this;
      // Editor.insertEmbed(cursorLocation, "image", uploadedFile.url)
      const { getImageURL } = this.$firebase();
      // Vue editor 에서 제공하는 이미지핸들러
      const type = file.name.split(".").at(-1); // split으로 .을 기준으로 두번째 배열인 것을 가져옴, 파일이름은 제외하고 뒤의 확장자만 가져온다
      const fileName = `image_${new Date().valueOf()}.${type}`; // 학장자를 가져오고 그 앞에 초단위의 날짜를 입력하여 이름이 중복되지 않게 한다
      // gif 이미지 업로드
      if (type === "gif") {
        try {
          const uploadedFile = await getImageURL(file, "gif/");
          if (uploadedFile?.url) {
            Editor.insertEmbed(cursorLocation, "image", uploadedFile.url); //업로드한 이미지를 에디터 안(커서로케이션)에 나타나게 한다
            resetUploader();
          }
        } catch (error) {
          window.toast("파일업로드 실패");
        }
      } else {
        this.resize.photo("w", file, 720, "object", async (result) => {
          const uploadedFile = await getImageURL(
            result.blob,
            result.blob.type,
            "images",
            fileName
          );
          if (uploadedFile?.url) {
            Editor.insertEmbed(cursorLocation, "image", uploadedFile.url); //업로드한 이미지를 에디터 안(커서로케이션)에 나타나게 한다
            // 이미지 목록에도 추가
            _this.imagesAttached.push(uploadedFile.url);
            _this.form.thumbnail = uploadedFile.url;
            resetUploader();
          }
        });
      }
    },
    // 이미지가 제거되었을 때 file의 url을 불러옴
    onImageRemoved(url) {
      if (this.form.thumbnail === url) {
        this.form.thumbnail = null;
      }
      this.imagesAttached.splice(url, 1);
      const { deleteImage } = $firebase();
      deleteImage(url);
    },
    // 업로드
    async submit() {
      this.form.createdAt = new Date();
      const { addBoardItem, getBoardCount } = this.$firebase();
      try {
        const no = this.createHash(); // await getBoardCount();
        const data = await addBoardItem({
          ...this.form,
          no,
          viewer: 0,
          like: 0,
          user: {
            nickname: this.auth?.nickname || null,
            email: this.auth?.email || null,
            profile_image_url: this.auth?.profile_image_url || null,
            id: this.auth?.id || null,
          },
        });
        if (data) {
          window.toast("업로드에 성공했습니다.");
          this.$router.push(`/board/${no}`);
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
        const updated = await updateBoardItem(this.no, this.form);
        // console.log('updated:', updated)
        if (updated) {
          window.toast("수정에 성공했습니다.");
          // this.reset()
          this.$router.push(`/board/${this.no}`);
        }
      } catch (error) {
        window.toast("수정에 실패했습니다.");
        console.error("error:", error);
      }
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
</style>
