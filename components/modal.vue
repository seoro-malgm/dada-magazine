<template>
  <b-modal
    id="modal-report-board"
    titleClass="text-left text-1"
    title="모달"
    bodyClass="px-3 pt-3 pb-2"
    contentClass="confirm border-0 overflow-hidden"
    headerClass="rounded-0 bg-primary bg-opacity-15 text-left "
    footerClass="border-0 d-flex justify-content-end "
    okTitle="예"
    okVariant="alert"
    @ok="$emit('ok', t)"
    cancelTitle="취소"
    cancelVariant="darkest"
    centered
    size="sm"
    noCloseOnBackdrop
    autoFocusButton="ok"
    hideHeaderClose
    headerCloseContent="`<i class='icon icon-times text-1'></i>``"
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
  data() {
    return {
      input: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
