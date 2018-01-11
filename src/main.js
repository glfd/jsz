// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/normalize.css'   //  样式表初始化
import iView from 'iview'       //  iview
import 'iview/dist/styles/iview.css'  //  iview 样式表
import VueI18n from 'vue-i18n'    //  vue国际化
import locale from 'iview/dist/locale/en-US'   //  国际化
//  import Vuex from 'vuex'
import vueg from 'vueg'   //  转场动画
import 'vueg/css/transition-min.css' //  转场动画样式表
import VueAwesomeSwiper from 'vue-awesome-swiper'  // swiper插件
import 'swiper/dist/css/swiper.css'  //  swiper样式表

import '../static/hover.css'   //  hover样式表
import mydata from './assets/data/data' //  数据

Vue.use(iView, { locale })
Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper)
//  Vue.use(Vuex)
Vue.use(vueg, router)

Vue.prototype.mydata = mydata
/* 国际化 */
const i18n = new VueI18n({
  locale: 'CN',    // 语言标识
  messages: {
    'CN': require('./assets/lang/cn'),   // 中文语言包
    'EN': require('./assets/lang/en')    // 英文语言包
  }
})

router.beforeEach((to, form, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(() => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: { App }
})
