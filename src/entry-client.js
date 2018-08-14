import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './main'
import Loading from '@/components/loading'

// global loading
const loading = Vue.prototype.$loading = new Vue(Loading).$mount()
document.body.appendChild(loading.$el)

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

//热更新
if (module.hot) {
  module.hot.accept();
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    // only show loading bar when there are matching asyncData hooks
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    // 这里如果有加载指示器(loading indicator)，就触发
    loading.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // 停止加载指示器(loading indicator)
        loading.finish()
        next()
      })
      .catch(next)
  })

  // 因为可能存在异步组件，所以等待router将所有异步组件加载完毕，服务器端配置也需要此操作
  app.$mount('#app')
})
