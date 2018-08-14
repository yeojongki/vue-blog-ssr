import * as types from './mutation-types'

const mutation = {
  [types.SET_USER](state, user) {
    localStorage.setItem('yeojongki-blog-user', user.name)
    state.user = user
  },
  [types.ISLOGIN](state) {
    state.isLogin = !state.isLogin
  },
  [types.ISADMIN](state) {
    state.isAdmin = !state.isAdmin
  },
  [types.SET_ARTICLE](state, article) {
    state.article = article
  },
  [types.SET_ARTICLELIST](state, articleList) {
    state.articleList = articleList
  },
  [types.SET_CURRENT_ARTICLE](state, article) {
    state.currentArticle = article
  },
  [types.CHANGE_ARTICLE_STATE](state) {
    state.currentArticle.state = -1
  },
  [types.CLEAN_CURRENTARTICLE](state) {
    state.currentArticle = ''
  },
  [types.SET_ALL_PAGE](state, allPage) {
    state.allPage = allPage
  },
  [types.SET_CUR_PAGE](state, curPage) {
    state.curPage = curPage
  }
}

export default mutation