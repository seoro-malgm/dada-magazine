<template>
  <b-modal
    id="modal-report-board"
    title-class="text-left text-1"
    title="유저 신고하기"
    body-class="px-3 pt-3 pb-2"
    content-class="confirm border-0 overflow-hidden"
    header-class="rounded-0 bg-primary bg-opacity-15 text-left "
    footer-class="border-0 d-flex justify-content-end "
    ok-title="신고하기"
    ok-variant="alert"
    @ok="reportBoard"
    :ok-disabled="!input || input === ''"
    cancel-title="취소"
    cancel-variant="darkest"
    centered
    size="sm"
    no-close-on-backdrop
    auto-focus-button="ok"
    hide-header-close
  >
    <b-textarea
      class="border p-1"
      v-model="input"
      placeholder="신고사유를 작성해주세요"
    >
    </b-textarea>
  </b-modal>
</template>

<script>
export default {
  props: {
    // 신고 받을 유저
    user: {
      type: Object,
      default: null,
    },
    // 신고자
    reportUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      input: null,
    };
  },
  methods: {
    async reportBoard() {
      const { reportBoardItem } = this.$firebase();
      try {
        const data = {
          docId: this.docId,
          boardUser: this.user,
          reportUser: this.reportUser.email,
          content: this.input,
        };
        const response = await reportBoardItem(data);
        if (response) {
          window.toast("신고내용이 접수되었습니다.");
          this.input = null;
          this.$emit("reported");
        }
      } catch (error) {
        window.toast("오류로 인해 신고에 실패했습니다.");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
