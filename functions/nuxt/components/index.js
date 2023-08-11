export const BrandSymbol = () => import('../../components/brandSymbol.vue' /* webpackChunkName: "components/brand-symbol" */).then(c => wrapFunctional(c.default || c))
export const GlobalFooter = () => import('../../components/globalFooter.vue' /* webpackChunkName: "components/global-footer" */).then(c => wrapFunctional(c.default || c))
export const GlobalNav = () => import('../../components/globalNav.vue' /* webpackChunkName: "components/global-nav" */).then(c => wrapFunctional(c.default || c))
export const GlobalSidebar = () => import('../../components/globalSidebar.vue' /* webpackChunkName: "components/global-sidebar" */).then(c => wrapFunctional(c.default || c))
export const Loading = () => import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const BoardContent = () => import('../../components/board/content.vue' /* webpackChunkName: "components/board-content" */).then(c => wrapFunctional(c.default || c))
export const BoardItem = () => import('../../components/board/item.vue' /* webpackChunkName: "components/board-item" */).then(c => wrapFunctional(c.default || c))
export const BtnFloating = () => import('../../components/btn/floating.vue' /* webpackChunkName: "components/btn-floating" */).then(c => wrapFunctional(c.default || c))
export const BtnVeiwMore = () => import('../../components/btn/veiwMore.vue' /* webpackChunkName: "components/btn-veiw-more" */).then(c => wrapFunctional(c.default || c))
export const DiscussApplyForm = () => import('../../components/discuss/applyForm.vue' /* webpackChunkName: "components/discuss-apply-form" */).then(c => wrapFunctional(c.default || c))
export const DiscussItem = () => import('../../components/discuss/item.vue' /* webpackChunkName: "components/discuss-item" */).then(c => wrapFunctional(c.default || c))
export const EditorItem = () => import('../../components/editor/item.vue' /* webpackChunkName: "components/editor-item" */).then(c => wrapFunctional(c.default || c))
export const EditorWrite = () => import('../../components/editor/write.vue' /* webpackChunkName: "components/editor-write" */).then(c => wrapFunctional(c.default || c))
export const GroupTags = () => import('../../components/group/tags.vue' /* webpackChunkName: "components/group-tags" */).then(c => wrapFunctional(c.default || c))
export const InputImage = () => import('../../components/input/image.vue' /* webpackChunkName: "components/input-image" */).then(c => wrapFunctional(c.default || c))
export const MarqueeBar = () => import('../../components/marquee/bar.vue' /* webpackChunkName: "components/marquee-bar" */).then(c => wrapFunctional(c.default || c))
export const Modal = () => import('../../components/modal/index.vue' /* webpackChunkName: "components/modal" */).then(c => wrapFunctional(c.default || c))
export const ModalReportBoard = () => import('../../components/modal/reportBoard.vue' /* webpackChunkName: "components/modal-report-board" */).then(c => wrapFunctional(c.default || c))
export const ModalReportUser = () => import('../../components/modal/reportUser.vue' /* webpackChunkName: "components/modal-report-user" */).then(c => wrapFunctional(c.default || c))
export const NewsletterInvite = () => import('../../components/newsletter/invite.vue' /* webpackChunkName: "components/newsletter-invite" */).then(c => wrapFunctional(c.default || c))
export const SvgLinePath = () => import('../../components/svg/line-path.vue' /* webpackChunkName: "components/svg-line-path" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
