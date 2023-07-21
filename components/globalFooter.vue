<template>
  <footer id="gnf">
    <b-container class="py-3">
      <ul class="list-unstyled">
        <li>
          <h4 class="logo mb-2">
            <img :src="require('@/assets/logo.svg')" />
          </h4>
        </li>
        <li>
          <strong> 주식회사 공스타 </strong>
        </li>
        <li>대표자 옹아름</li>
        <li>사무실 주소 : 충남 공주시 흑수골길 41 2층</li>
        <li>개인정보 보호 책임자 : 이상준</li>
        <li>마케팅 제휴 문의 : gongstar2021@gmail.com</li>
        <li>
          <span class="copyright"> &copy; copyright gongstar reserved. </span>
        </li>
        <!-- <li class="mt-4">
            <b-btn variant="dark" pill>다크모드</b-btn>
          </li> -->
      </ul>
      <nav class="footer-nav">
        <b-btn variant="link" :to="{ name: 'terms-privacy' }"
          >개인정보처리방침</b-btn
        >
        <b-btn variant="link" :to="{ name: 'customer-services-qna' }"
          >고객지원</b-btn
        >
        <b-btn variant="link" :to="{ name: 'customer-services-faq' }"
          >자주 묻는 질문</b-btn
        >
      </nav>
    </b-container>
  </footer>
</template>

<script>
import { copyText } from "~/plugins/commons.js";
export default {
  data() {
    return {
      contacts: [
        {
          icon: "mail-1",
          url: "/",
        },
        {
          icon: "instagram",
          url: "/",
        },
        {
          icon: "comment-empty",
          url: "/",
        },
      ],
    };
  },
  methods: {
    copyText,
  },
};
</script>

<style lang="scss" scoped>
#gnf {
  border-top: 1px solid $gray-600;

  .footer-nav {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .btn {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0;
      margin-right: 8px;
    }
  }
  h4.logo {
    > img {
      width: 80px;
    }
  }
  li {
    margin-bottom: 2px;
    font-size: 13px;
    color: $gray;
    .btn {
      font-size: 0.85rem;
    }
  }
}
</style>
