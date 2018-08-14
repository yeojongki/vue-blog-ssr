import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/views/index')
const article = () => import('@/views/article')

Vue.use(Router)
export function createRouter() {
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
    routes: [
      { path: '/', name:'index', component: index },
      { path: '/article/:id', name: 'article', component: article },
    ]
  })
}
