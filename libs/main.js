import Vue from 'vue'
import iView from '@ppc/iview'
import VueRouter from 'vue-router'
import store from '@/store'
import Routers from '@/router'
import {
  addTitle
} from 'libs/utils/common'

import App from '@/App.vue'
import 'libs/my-theme/index.less'
import 'babel-polyfill'

import timeformat from 'libs/directive/timeformat'
Vue.use(timeformat)
Vue.use(iView)
Vue.use(VueRouter)

import 'lodash'
/* ==上面是公共的== */
import '@/_main.js'

// // directive
// import Highlight from 'libs/directive/highlight'
// Vue.use(Highlight)

// const bus = new Vue()
// Vue.prototype.$bus = bus

// 路由配置
const RouterConfig = {
  routes: Routers.basicRouters
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  // console.log(to.path)
  iView.LoadingBar.start()
  addTitle(to.meta.title)

  // getAllRoute().then(res => {
  //   console.log(res)
  // })

  store.dispatch('GetUserInfo')
    .then(() => store.dispatch('GetALLModuleRoute'))
    .then(() => store.dispatch('GetPermission'))
    .then(res => {
      // console.log(res)
      if (res.refresh === true) {
        router.addRoutes(res.data)
        // console.log(router)
        next({ ...to }) // 重新跳转一次，这样会采用新挂载的 router
      } else {
        next()
      }
    }).catch(err => {
      if (err.code === 401) {
        iView.Message.error(err.msg)
        setTimeout(() => [
          location.assign('/login/index.html')
        ], 1000)
        return
      }
      iView.Message.error('获取用户信息错误：' + err)
      // next({ path: '/401' })
      console.error(err)
    })
})

router.afterEach(() => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
