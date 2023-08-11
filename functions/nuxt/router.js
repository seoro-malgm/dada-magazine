import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3a46f562 = () => interopDefault(import('../pages/board/index.vue' /* webpackChunkName: "pages/board/index" */))
const _e104c496 = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _2cfb9676 = () => interopDefault(import('../pages/auth/editorConfirm.vue' /* webpackChunkName: "pages/auth/editorConfirm" */))
const _b04a6568 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _bee03692 = () => interopDefault(import('../pages/auth/logout.vue' /* webpackChunkName: "pages/auth/logout" */))
const _0921c8e8 = () => interopDefault(import('../pages/auth/mypage.vue' /* webpackChunkName: "pages/auth/mypage" */))
const _c04e6d76 = () => interopDefault(import('../pages/auth/signup.vue' /* webpackChunkName: "pages/auth/signup" */))
const _da73d0fc = () => interopDefault(import('../pages/auth/stats.vue' /* webpackChunkName: "pages/auth/stats" */))
const _037eb3ce = () => interopDefault(import('../pages/auth/verifiedForm.vue' /* webpackChunkName: "pages/auth/verifiedForm" */))
const _81a93448 = () => interopDefault(import('../pages/board/write.vue' /* webpackChunkName: "pages/board/write" */))
const _dfdf854c = () => interopDefault(import('../pages/customer-services/faq.vue' /* webpackChunkName: "pages/customer-services/faq" */))
const _297b5db0 = () => interopDefault(import('../pages/customer-services/qna.vue' /* webpackChunkName: "pages/customer-services/qna" */))
const _4a7680e6 = () => interopDefault(import('../pages/terms/privacy.vue' /* webpackChunkName: "pages/terms/privacy" */))
const _2f7242f3 = () => interopDefault(import('../pages/auth/callback/naver.vue' /* webpackChunkName: "pages/auth/callback/naver" */))
const _2eac60a5 = () => interopDefault(import('../pages/auth/edit/pwd.vue' /* webpackChunkName: "pages/auth/edit/pwd" */))
const _3aa35472 = () => interopDefault(import('../pages/board/_docId.vue' /* webpackChunkName: "pages/board/_docId" */))
const _e1d52890 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _69debb54 = () => interopDefault(import('../pages/_pid.vue' /* webpackChunkName: "pages/_pid" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/board",
    component: _3a46f562,
    name: "board"
  }, {
    path: "/search",
    component: _e104c496,
    name: "search"
  }, {
    path: "/auth/editorConfirm",
    component: _2cfb9676,
    name: "auth-editorConfirm"
  }, {
    path: "/auth/login",
    component: _b04a6568,
    name: "auth-login"
  }, {
    path: "/auth/logout",
    component: _bee03692,
    name: "auth-logout"
  }, {
    path: "/auth/mypage",
    component: _0921c8e8,
    name: "auth-mypage"
  }, {
    path: "/auth/signup",
    component: _c04e6d76,
    name: "auth-signup"
  }, {
    path: "/auth/stats",
    component: _da73d0fc,
    name: "auth-stats"
  }, {
    path: "/auth/verifiedForm",
    component: _037eb3ce,
    name: "auth-verifiedForm"
  }, {
    path: "/board/write",
    component: _81a93448,
    name: "board-write"
  }, {
    path: "/customer-services/faq",
    component: _dfdf854c,
    name: "customer-services-faq"
  }, {
    path: "/customer-services/qna",
    component: _297b5db0,
    name: "customer-services-qna"
  }, {
    path: "/terms/privacy",
    component: _4a7680e6,
    name: "terms-privacy"
  }, {
    path: "/auth/callback/naver",
    component: _2f7242f3,
    name: "auth-callback-naver"
  }, {
    path: "/auth/edit/pwd",
    component: _2eac60a5,
    name: "auth-edit-pwd"
  }, {
    path: "/board/:docId",
    component: _3aa35472,
    name: "board-docId"
  }, {
    path: "/",
    component: _e1d52890,
    name: "index"
  }, {
    path: "/:pid",
    component: _69debb54,
    name: "pid"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
