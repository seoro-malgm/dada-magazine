<template>
  <div class="board-content">
    <p v-html="content" v-if="content" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
$default-line-height: 1.6;

.board-content {
  &:deep(*) {
    font-family: "Noto Sans KR", sans-serif;
    line-height: $default-line-height !important;
  }
  &:deep(span),
  &:deep(span *) {
    // display: ;
    display: pre;
    white-space: pre-wrap;
    // width: 100%;
  }
  &:deep(span),
  &:deep(span *),
  &:deep(p),
  &:deep(p *) {
    margin-bottom: 0;
    font-size: 16px;
    // white-space: normal;
    min-width: auto;
    word-wrap: break-word;
    @media (min-width: $breakpoint-md) {
      font-size: 17px;
    }
  }
  &:deep(h1),
  &:deep(h1 *) {
    font-size: 36px;
    line-height: $default-line-height !important;
    @media (min-width: $breakpoint-md) {
      font-size: 40px;
    }
  }
  &:deep(h2),
  &:deep(h2 *) {
    font-size: 32px;
    line-height: $default-line-height !important;
    @media (min-width: $breakpoint-md) {
      font-size: 36px;
    }
  }
  &:deep(h3),
  &:deep(h3 *) {
    font-size: 28px;
    line-height: $default-line-height !important;
    @media (min-width: $breakpoint-md) {
      font-size: 32px;
    }
  }
  &:deep(h4),
  &:deep(h4 *) {
    font-size: 24px;
    line-height: $default-line-height !important;
    @media (min-width: $breakpoint-md) {
      font-size: 28px;
    }
  }
  &:deep(h5),
  &:deep(h5 *) {
    font-size: 20px;
    line-height: $default-line-height !important;
    @media (min-width: $breakpoint-md) {
      font-size: 24px;
    }
  }
  &:deep(h6),
  &:deep(h6 *) {
    font-size: 18px;
    line-height: $default-line-height !important;
    @media (min-width: $breakpoint-md) {
      font-size: 19px;
    }
  }
  &:deep(.ql-size-small),
  &:deep(.ql-size-small *) {
    font-size: 12px;
    @media (min-width: $breakpoint-md) {
      font-size: 13px;
    }
  }
  &:deep(.ql-size-large),
  &:deep(.ql-size-large *) {
    font-size: 22px;
    @media (min-width: $breakpoint-md) {
      font-size: 24px;
    }
  }
  &:deep(.ql-size-huge),
  &:deep(.ql-size-huge *) {
    font-size: 30px;
    @media (min-width: $breakpoint-md) {
      font-size: 32px;
    }
  }

  $indents: (1, 2, 3, 4, 5, 6, 8);
  @each $var in $indents {
    &:deep(.ql-indent-#{$var}),
    &:deep(.ql-indent-#{$var} *) {
      padding-left: calc($var * 1rem);
    }
  }
  &:deep(.ql-font-serif),
  &:deep(.ql-font-serif *) {
    font-family: "Noto Serif KR", serif;
  }
  &:deep(.ql-font-monospace),
  &:deep(.ql-font-monospace *) {
    font-family: "Roboto Mono", monospace;
  }
  &:deep(ol) {
    list-style-type: decimal;
    font-size: 16px;
  }
  &:deep(ul) {
    list-style-type: disc;
    font-size: 16px;
  }
  &:deep(strong),
  &:deep(strong *) {
    font-weight: 900 !important;
  }
  $text-aligns: (left, right, center, justify);
  @each $var in $text-aligns {
    &:deep(.ql-align-#{$var}),
    &:deep(.ql-align-#{$var} *) {
      text-align: #{$var};
    }
  }
  &:deep(.ql-align-right),
  &:deep(.ql-align-right *) {
    text-align: right;
    &.ql-direction-rtl {
      text-align: right;
    }
  }
  &:deep(div.ql-video),
  &:deep(iframe.ql-video, iframe) {
    width: 100%;
    min-height: 240px;
    @media (min-width: $breakpoint-lg) {
      min-height: 480px;
    }
  }
  &:deep(img) {
    max-width: 100%;
    height: auto;
  }
}
</style>
