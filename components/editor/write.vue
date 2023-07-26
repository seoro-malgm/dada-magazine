<template>
  <div id="writer-editor">
    <vue-editor
      useCustomImageHandler
      @image-removed="onImageRemoved"
      @image-added="onImageAdded"
      @ready="initializeEditor"
      v-model="desc"
      placeholder="내용을 입력하세요"
      ref="editor"
    />
  </div>
</template>

<script>
import { resize } from "~/plugins/commons.js";

export default {
  props: {
    content: {
      type: String,
      default: null,
    },
    imagePath: {
      type: String,
      default: "images",
    },
    imageSize: {
      type: Number,
      default: 720,
    },
  },
  data() {
    return {
      quill: null, // Variable to store the Quill editor instance
      desc: null,
      resize,
    };
  },
  watch: {
    desc(n) {
      // console.log("n:", n);
      this.$emit("on-update", n);
    },
    content(n) {
      this.desc = n;
    },
  },
  beforeDestroy() {
    if (this.quill) {
      this.quill.root.removeEventListener("paste", this.onPaste);
    }
  },
  methods: {
    initializeEditor(editor) {
      this.quill = editor;
      this.quill.root.addEventListener("paste", this.onPaste);
    },
    async onPaste(e) {
      const clipboardData =
        e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData);
      if (!clipboardData) return;

      console.log("clipboardData:", clipboardData);
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      console.log("items:", items);
      for (const item of items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file.type.startsWith("image/")) {
            console.log(
              "%c Hello file",
              "background: #333399; color: #ededed",
              file
            );
            try {
              const location = (this.quill.getSelection() || {}).index || 0;
              await this.onImageAdded(file, this.quill, location);
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          }
        }
      }
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
            if (resetUploader) {
              resetUploader();
            }
          }
        } catch (error) {
          this.$emit("on-error", "파일업로드 실패");
        }
      } else {
        this.resize.photo(
          "w",
          file,
          this.imageSize,
          "object",
          async (result) => {
            const uploadedFile = await getImageURL(
              result.blob,
              result.blob.type,
              this.imagePath,
              fileName
            );
            if (uploadedFile?.url) {
              Editor.insertEmbed(cursorLocation, "image", uploadedFile.url); //업로드한 이미지를 에디터 안(커서로케이션)에 나타나게 한다
              this.$emit("on-image-added", uploadedFile.url);
              if (resetUploader) {
                resetUploader();
              }
            } else {
              this.$emit("on-error", "파일업로드 실패");
            }
          }
        );
      }
    },
    // 이미지가 제거되었을 때 file의 url을 불러옴
    onImageRemoved(url) {
      this.$emit("on-image-removed", url);
    },
  },
};
</script>

<style lang="scss">
$default-line-height: 1.6;
#writer-editor {
  .quillWrapper {
    position: relative !important;
  }
  .ql-editor {
    max-height: 85vh;
    overflow-y: scroll;
    padding-top: 56px;
    line-height: $default-line-height;
  }
  .ql-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: white;
  }
  .ql-container {
    font-family: "Roboto", "Noto Sans KR", "Pretendard-Regular", sans-serif !important;
  }
  em {
    font-style: italic;
  }

  // desc
  span,
  span *,
  p,
  p * {
    font-size: 14px;
    @media (min-width: $breakpoint-md) {
      font-size: 16px;
    }
  }
  h1,
  h1 * {
    font-size: 36px;
    @media (min-width: $breakpoint-md) {
      font-size: 40px;
    }
  }
  h2,
  h2 * {
    font-size: 32px;
    @media (min-width: $breakpoint-md) {
      font-size: 36px;
    }
  }
  h3,
  h3 * {
    font-size: 28px;
    @media (min-width: $breakpoint-md) {
      font-size: 32px;
    }
  }
  h4,
  h4 * {
    font-size: 24px;
    @media (min-width: $breakpoint-md) {
      font-size: 28px;
    }
  }
  h5,
  h5 * {
    font-size: 18px;
    @media (min-width: $breakpoint-md) {
      font-size: 24px;
    }
  }
  h6,
  h6 * {
    font-size: 16px;
    @media (min-width: $breakpoint-md) {
      font-size: 18px;
    }
  }
  .ql-size-small,
  .ql-size-small * {
    font-size: 12px;
    @media (min-width: $breakpoint-md) {
      font-size: 13px;
    }
  }
  .ql-size-large,
  .ql-size-large * {
    font-size: 22px;
    @media (min-width: $breakpoint-md) {
      font-size: 24px;
    }
  }
  .ql-size-huge,
  .ql-size-huge * {
    font-size: 30px;
    @media (min-width: $breakpoint-md) {
      font-size: 32px;
    }
  }
  $indents: (1, 2, 3, 4, 5, 6, 8);
  @each $var in $indents {
    .ql-indent-#{$var},
    .ql-indent-#{$var} * {
      padding-left: calc($var * 1rem);
    }
  }
  .ql-font-serif,
  .ql-font-serif * {
    font-family: "Noto Serif KR", serif;
  }
  .ql-font-monospace,
  .ql-font-monospace * {
    font-family: "Roboto Mono", monospace;
  }
  ol {
    list-style-type: decimal;
    font-size: 16px;
  }
  ul {
    list-style-type: disc;
    font-size: 16px;
  }
  strong,
  strong * {
    font-weight: 900 !important;
  }
  $text-aligns: (left, right, center, justify);
  @each $var in $text-aligns {
    .ql-align-#{$var},
    .ql-align-#{$var} * {
      text-align: #{$var};
    }
  }
  .ql-align-right,
  .ql-align-right * {
    text-align: right;
    &.ql-direction-rtl {
      text-align: right;
    }
  }
  div.ql-video,
  iframe.ql-video {
    width: 100%;
    min-height: 240px;
    @media (min-width: $breakpoint-lg) {
      min-height: 480px;
    }
  }

  h6,
  .h6,
  h5,
  .h5,
  h4,
  .h4,
  h3,
  .h3,
  h2,
  .h2,
  h1,
  .h1 {
    line-height: $default-line-height !important;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
}
</style>
