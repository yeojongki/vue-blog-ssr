import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      user: {
        name: '',
        password: ''
      },
      isLogin: false,
      isAdmin: false,
      articleList: [],
      article:{},
      currentArticle: {
        date: '',
        title: '',
        content: '',
        description: '',
        state: '1',
        id: ''
      },
      allPage: 1,
      curPage: 1
    },
    mutations,
    getters,
    actions
  });
}
