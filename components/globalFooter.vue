<template>
  <div>
    <div class="py-3 border-top border-gray-400 bg-white">
      <b-container>
        <b-row align-h="center">
          <b-col
            cols="4"
            lg="14"
            class="py-2 d-flex flex-column align-items-center justify-content-center"
            v-for="(item, i) in partners"
            :key="i"
          >
            <div
              class="px-2 px-lg-1 d-flex flex-column align-items-center justify-content-center"
            >
              <a
                :href="item?.url"
                class="btn btn-text m-auto p-1"
                target="_blank"
              >
                <template v-if="item?.image">
                  <img
                    :src="require(`@/assets/images/partners/${item?.image}`)"
                    :alt="`${item?.name} 로고 이미지, 웹사이트로 이동`"
                    class="w-100"
                    :style="{
                      maxHeight: '64px',
                    }"
                    :title="item?.name"
                  />
                </template>
                <template v-else>
                  {{ item.name }}
                </template>
              </a>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <footer id="gnf" class="pb-5">
      <b-container class="pt-3 pb-5">
        <ul class="list-unstyled">
          <li>
            <h4 class="logo mb-2">
              <img :src="require('@/assets/symbol-gongstar-white.svg')" />
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
        <div class="d-flex justify-content-between">
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
          <ul class="list-unstyled">
            <li>
              <a
                href="https://www.instagram.com/gong__star2021/?hl=ko"
                target="_blank"
              >
                <i class="icon icon-instagram text-18 text-lg-24" />
              </a>
            </li>
          </ul>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { copyText } from "~/plugins/commons.js";
export default {
  data() {
    return {
      partners: [
        {
          image: "gongju.png",
          name: "공주시청",
          url: "https://www.gongju.go.kr/ ",
        },
        {
          image: "gongjucf.png",
          name: "공주문화관광재단",
          url: "https://www.gongjucf.or.kr/intro.do",
        },
        {
          image: "gjccc.png",
          name: "문화도시 공주",
          url: "https://gjccc.or.kr/",
        },
        {
          image: "gongjuuniv.svg",
          name: "공주대학교",
          url: "https://www.kongju.ac.kr/k_intro/index.html",
        },
        {
          image: "gjs.svg",
          name: "공주시 농촌신활력플러스",
          url: "https://www.gongju.go.kr/prog/bbsArticle/BBSMSTR_000000001142/list.do?kind=gctc_file5",
        },
        {
          image: "gongjusalon.svg",
          name: "공주살롱",
          url: "https://gongju-salon.web.app/",
        },
        {
          image: "splfshop.svg",
          name: "신풍애 농부들",
          url: "https://smartstore.naver.com/splfshop",
        },
      ],
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
  background-color: $darkest;
  color: $lightest;
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
      width: 72px;
    }
  }
  li {
    margin-bottom: 2px;
    font-size: 13px;
    color: $lightest;
    .btn {
      font-size: 0.85rem;
    }
  }
}
.col-20 {
  flex: 20% 0 0;
  max-width: 20%;
}

.col-lg-14 {
  @media (min-width: $breakpoint-lg) {
    flex: 14.2% 0 0;
    max-width: 14.2%;
  }
}
</style>
