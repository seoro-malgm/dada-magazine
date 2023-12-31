require("dotenv").config();
// import head from "./utils/head.json";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  // mode: "universal",
  // target: "server",
  head: {
    title: "다다매거진",
    htmlAttrs: {
      lang: "ko-KR",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "title",
        name: "title",
        property: "title",
        content: "다다매거진",
      },
      {
        hid: "description",
        name: "description",
        property: "description",
        content: "충남 공주시의 웹 로컬 매거진",
      },
      {
        name: "keyword",
        content:
          "공주시, 공주인, 공주, 충남, 충청남도, 충청도, 공주여행, 커뮤니티, 공주커뮤니티, 다다매거진, 다다, 매거진다다, 매거진, 다다 매거진, 공주시웹사이트, 공주시청, 공주대학교, 공주원룸, 공주대, 공주교대, 공주원도심, 공주신도심, 신관동, 반죽동, 중학동",
      },
      {
        hid: "og:image",
        name: "og:image",
        property: "og:image",
        content: "/og-image.png",
      },
      {
        hid: "og:title",
        name: "og:title",
        property: "og:title",
        content: "다다매거진",
      },
      {
        hid: "og:description",
        name: "og:description",
        property: "og:description",
        content: "충남 공주시의 웹 로컬 매거진",
      },
      {
        name: "og:url",
        property: "og:url",
        content: "https://dada-magazine.com",
      },
      {
        name: "og:type",
        property: "og:type",
        content: "매거진, 웹진",
      },
      {
        name: "og:site_name",
        property: "og:site_name",
        content: "다다매거진",
      },
      {
        name: "msapplication-TileImage",
        property: "msapplication-TileImage",
        content: "/ms-icon-144x144.png",
      },
      {
        name: "msapplication-TileColor",
        property: "msapplication-TileColor",
        content: "#001b7f",
      },
      {
        name: "theme-color",
        property: "theme-color",
        content: "#001b7f",
      },
      {
        name: "twitter:card",
        hid: "twitter:card",
        content: "/og-image.png",
      },
      {
        property: "twitter:domain",
        content: "https://dada-magazine.com",
      },
      {
        property: "twitter:url",
        hid: "twitter:url",
        content: "https://dada-magazine.com",
      },
      {
        name: "twitter:title",
        hid: "twitter:title",
        content: "다다매거진",
      },
      {
        name: "twitter:description",
        hid: "twitter:description",
        content: "충남 공주시의 웹 로컬 매거진",
      },
      {
        name: "twitter:image",
        hid: "twitter:image",
        content: "/og-image.png",
      },
      // 네이버 서치어드바이저
      {
        name: "naver-site-verification",
        content: "e7e0d2f0aa7a7cf69ddf5a9467027f877e046828",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        color: "#001b7f",
        href: "/safari-pinned-tab.svg",
      },
      // fonts
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;0,900;1,400;1,700;1,900&display=swap'",
      },
    ],
  },
  css: [
    {
      src: "~/assets/styles/index.scss",
      lang: "scss",
    },
  ],

  plugins: [
    // { src: "~/plugins/axios.js" },
    { src: "~/plugins/router.js", mode: "client" },
    { src: "~/plugins/firebase.js" },
    { src: "~/plugins/carousel.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  build: {
    babel: {
      compact: true,
    },
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
  },
  // buildDir: "client",
  generate: {
    dir: "dist",
  },
  styleResources: {
    scss: ["~/assets/styles/variables.scss"],
  },
  dev: process.env.NODE_ENV === "development",

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "vue2-editor/nuxt",
    "@nuxtjs/style-resources",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // BoardItemaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },
  // 로딩바
  loading: {
    color: "#001b7f",
  },

  // 환경변수
  env: {
    MODE: process.env.MODE,
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_KEY: process.env.API_KEY,
    PROJECT_ID: process.env.PROJECT_ID,
    APP_ID: process.env.APP_ID,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    TOKEN_NAME: process.env.TOKEN_NAME,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  },
};
