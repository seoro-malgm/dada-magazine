<template>
  <b-container>
    <article>
      <header class="mb-3">
        <h3>자주 묻는 질문</h3>
      </header>
      <section>
        <ul class="border-top">
          <li v-for="(item, i) in items" :key="i">
            <b-btn
              block
              variant="text py-3  border-bottom d-flex align-items-center"
              v-b-toggle="`item-${i}`"
            >
              <strong class="text-2 mr-2">Q</strong>
              <span class="fw-700">
                {{ item.title }}
              </span>
            </b-btn>
            <b-collapse
              :id="`item-${i}`"
              visible
              accordion="faqs"
              role="tabpanel"
            >
              <div class="p-3 bg-gray-100 border-bottom">
                <p>
                  {{ item.content }}
                </p>
              </div>
            </b-collapse>
          </li>
        </ul>
      </section>
    </article>
  </b-container>
</template>

<script>
export default {
  name: "faq",
  data() {
    return {
      items: [
        {
          title: "회원가입은 어떻게하나요?",
          content: "네이버 로그인을 지원합니다.",
        },
        {
          title: "로그인이 안됩니다.",
          content: "네이버 로그인을 지원합니다.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
