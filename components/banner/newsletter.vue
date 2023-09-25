<template>
  <section class="bg-primary">
    <b-container class="py-3">
      <b-row align-v="center" class="justify-content-center text-lightest">
        <b-col cols="12" lg="5">
          <div class="px-1 px-lg-3">
            <div class="mb-2">
              <i class="icon icon-book text-56 text-md-100" />
            </div>
            <h3 class="mb-3 text-24 text-md-28 lh-110">
              충남 공주시의 웹 로컬 매거진<br />
              다다매거진을 구독하세요!
            </h3>
          </div>
        </b-col>
        <b-col cols="12" lg="7" class="mb-4 mb-lg-0">
          <p class="text-14 text-md-15">
            다다매거진은 로컬의 귀중한 이야기를 매거진으로 만들어드립니다.
            <br />
            이 잡지를 무료로 구독해보세요! 당장 최신의 잡지부터 전송해드릴게요!
            <br />
            이메일만 작성하시면 저희가 잡지를 만들 때마다 계속 보내드리겠습니다.
          </p>
          <div class="mt-3">
            <a
              class="btn btn-lightest text-primary px-4 py-3 rounded-pill text-14 text-md-15"
              href="https://dada-magazine.stibee.com/subscribe/"
              target="_blank"
            >
              <i class="icon icon-paper-plane" />
              구독신청하러가기
            </a>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.form-check {
  user-select: none;
}
.invite-form {
  padding: 1.5rem;
  background-color: $white;
  box-shadow: 0 10px 30px rgba($color: #000000, $alpha: 0.15);
}
</style>
