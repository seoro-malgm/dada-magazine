(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{419:function(t,e,r){var content=r(443);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(62).default)("bd26925a",content,!0,{sourceMap:!1})},442:function(t,e,r){"use strict";r(419)},443:function(t,e,r){var n=r(61)(!1);n.push([t.i,'.shadow-primary[data-v-be5f4296]{box-shadow:0 0 10px rgba(0,0,0,.15)}.btn.disabled[data-v-be5f4296],.btn[data-v-be5f4296]:disabled,button.disabled[data-v-be5f4296],button[data-v-be5f4296]:disabled{cursor:not-allowed}.btn-link[data-v-be5f4296]{color:#352f2d}figcaption[data-v-be5f4296],figure[data-v-be5f4296],h1[data-v-be5f4296],h2[data-v-be5f4296],h3[data-v-be5f4296],h4[data-v-be5f4296],h5[data-v-be5f4296],h6[data-v-be5f4296],p[data-v-be5f4296]{margin:0}.btn-arr-right i.icon[data-v-be5f4296]{transition:all .2s cubic-bezier(.73,.33,.31,.89)}.btn-arr-right:hover i.icon[data-v-be5f4296]{transform:translateX(10px)}hr.hr[data-v-be5f4296]{border-top:1px solid #333;margin:48px 0}a.btn[data-v-be5f4296],a[data-v-be5f4296]:link{color:inherit}a.btn[data-v-be5f4296]{text-decoration:none}.underline-primary[data-v-be5f4296]{position:relative;display:inline-block}.underline-primary>*[data-v-be5f4296]{position:relative;z-index:2}.underline-primary[data-v-be5f4296]:after{position:absolute;z-index:1;content:"";display:block;bottom:0;left:0;width:100%;height:50%;background-color:#d0df00}pre.terms[data-v-be5f4296]{width:100%;max-height:300px;overflow:auto;background-color:#f5f3f2;color:#495057;padding:1rem;font-size:14px}',""]),t.exports=n},474:function(t,e,r){"use strict";r.r(e);var n=r(12),o=(r(54),r(403)),d={props:{auth:{type:[Object],default:null}},data:function(){return{formPrivacy:o.a,form:{agree1:!1}}},mounted:function(){this.auth||this.$router.push("/")},methods:{submit:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.$firebase(),o=n.setUserEditor,e.next=4,o(null===(r=t.auth)||void 0===r?void 0:r.email);case 4:e.sent&&(window.toast("에디터 신청이 완료되었습니다. 이제 글을 쓸 수 있어요!"),t.$router.push("/")),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),window.toast("오류료 인해 신청에 실패했습니다.");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}},c=(r(442),r(44)),component=Object(c.a)(d,(function(){var t,e=this,r=e._self._c;return r("div",[r("b-container",{staticClass:"my-5 py-5"},[r("header",{staticClass:"mb-2 pb-2 border-bottom border-primary"},[r("h1",{staticClass:"text-18 text-md-32"},[e._v("에디터 신청하기")]),e._v(" "),r("p",{staticClass:"text-14 text-md-15"},[e._v("\n        다다매거진의 에디터가 되고 싶으신가요? 지금 신청하세요!\n      ")])]),e._v(" "),r("client-only",[r("section",[e.formPrivacy?r("pre",{staticClass:"terms mb-2"},[e._v("        "),r("p",{domProps:{innerHTML:e._s(e.formPrivacy)}}),e._v("\n      ")]):e._e(),e._v(" "),r("b-form-checkbox",{model:{value:e.form.agree1,callback:function(t){e.$set(e.form,"agree1",t)},expression:"form.agree1"}},[e._v("\n          개인정보 처리방침에 동의합니다\n        ")])],1)]),e._v(" "),r("section",{staticClass:"mt-4 text-center"},[r("b-btn",{attrs:{variant:"primary px-3 py-2 text-15 text-lg-18",disabled:!(null!==(t=e.form)&&void 0!==t&&t.agree1)},on:{click:function(t){return e.submit()}}},[e._v("\n        에디터 신청하기\n      ")])],1)],1)],1)}),[],!1,null,"be5f4296",null);e.default=component.exports}}]);