<template>
  <div>
    <label for="file" v-if="!file" class="btn btn-outline-primary text-black">
      {{ label }} 추가 <i class="icon icon-file-image" />
      <b-form-file
        id="file"
        v-model="fileURL"
        class="d-none"
        @change="onChange"
        accept="image/jpeg, image/png, image/gif"
      />
    </label>
    <template v-else>
      <template v-if="pending">
        <div class="p-2">
          <b-spinner small />
        </div>
      </template>
      <template v-else>
        <div class="util">
          <b-btn @click="onImageRemoved(file?.url)" variant="alert text-nowrap">
            {{ label }} 이미지 삭제
          </b-btn>
        </div>
      </template>
    </template>
    <div class="mt-2">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
import { resize, createHash } from "~/plugins/commons.js";
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    desc: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    path: {
      path: String,
      default: "images",
    },
    file: {
      path: Object,
      default: null,
    },
    size: {
      path: Number,
      default: 1140,
    },
  },
  data() {
    return {
      resize,
      pending: false,
      fileName: null,
      fileURL: null,
    };
  },
  watch: {
    fileURL(n) {
      if (n) {
        this.$emit("on-change", this.fileURL);
      }
    },
  },
  methods: {
    // 썸네일 업로드
    async onChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      // 초기화
      this.fileName = null;
      this.fileURL = null;
      // pending 시작
      this.pending = true;
      // 이미 올린 썸네일이 있으면 그건 삭제함
      if (this.file) {
        this.$firebase().deleteImage(`${this.path}/${this.fileName}`);
      }
      const type = file?.type.split("/").at(-1);
      // console.log('type:', type)
      const fileName = `${this.path}_${new Date().valueOf()}.${type}`;
      // gif 이미지 업로드
      if (type === "gif") {
        try {
          const uploadedFile = await this.$firebase().getImageURL(
            file,
            "gif",
            `${this.path}/gif`,
            fileName
          );
          if (uploadedFile?.url) {
            this.fileName = uploadedFile.name;
            this.fileURL = uploadedFile.url;
            this.pending = false;
          }
        } catch (error) {
          window.toast("파일업로드 실패");
        }
      } else {
        // gif 이미지가 아닌 경우 파일 업로드
        this.resize.photo("w", file, this.size, "object", async (result) => {
          const uploadedFile = await this.$firebase().getImageURL(
            result.blob,
            result.blob.type,
            this.path,
            fileName
          );
          if (uploadedFile?.url) {
            this.fileName = uploadedFile.name;
            this.fileURL = uploadedFile.url;
            this.pending = false;
          }
        });
      }
    },
    // 이미지가 제거되었을 때 file의 url을 불러옴
    onImageRemoved(url) {
      // console.log(this.fileURL, url);
      this.fileName = null;
      this.fileURL = null;
      this.$emit("on-change", null);
      this.$firebase().deleteImage(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.util {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style>
