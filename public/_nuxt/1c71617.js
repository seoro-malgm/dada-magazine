(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{485:function(t,e,n){"use strict";n.r(e);var r=n(12),o=(n(54),n(45),{layout:"empty",head:function(){return{script:[{src:"https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js"}]}},redirect:function(){return this.$route.query.redirect},mounted:function(){this.getAuth()},methods:{signIn:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o,c,data,d;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.$firebase(),o=r.signup,n.prev=1,n.next=4,o(t);case 4:if(c=n.sent,data=c.data,d=c.token,!data){n.next=13;break}return n.next=10,e.$store.dispatch("setUser");case 10:return n.next=12,sessionStorage.setItem("dada-lab-dev-token",d.accessToken);case 12:e.$router.push(e.$route.query.redirect?{name:e.$route.query.redirect}:"/");case 13:n.next=19;break;case 15:n.prev=15,n.t0=n.catch(1),window.toast("오류로 인해 로그인하지 못했습니다.",{variant:"alert"}),setTimeout((function(){window.location.href="/"}),400);case 19:case"end":return n.stop()}}),n,null,[[1,15]])})))()},getAuth:function(){var t=this,e=new naver.LoginWithNaverId({clientId:void 0});e.init(),e.getLoginStatus(function(){var n=Object(r.a)(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r?t.signIn(e.user):(window.toast("오류로 인해 로그인하지 못했습니다.",{variant:"alert"}),setTimeout((function(){window.location.href="/"}),400));case 1:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())}}}),c=o,d=n(44),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center py-5"},[e("b-spinner",{attrs:{variant:"primary",large:""}}),t._v(" "),e("div",{staticClass:"mt-2"},[t._v("로그인 혹은 회원가입을 진행하는 중입니다 ...")])],1)}),[],!1,null,"2d7af6e6",null);e.default=component.exports}}]);