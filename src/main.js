// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.filter('formatTime', value => {
  return (value + '').substring(0, 10)
})

export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  // 创建应用程序实例，将 router 和 store 注入
  // 这样就可以在任何地方使用 `this.$router` and `this.$store`
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
