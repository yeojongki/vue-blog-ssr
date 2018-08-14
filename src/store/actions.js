import * as types from './mutation-types'
import { fetchList, fetchArticle } from 'api/index'

export default {
  FETCH_LIST: ({ commit }, query) => {
    return fetchList(query).then(res => {
      let data = res.data;
      commit(types.SET_ARTICLELIST, data.doc)
      commit(types.SET_CURRENT_ARTICLE, data.doc[0])
      commit(types.SET_ALL_PAGE, data.allPage)
      commit(types.SET_CUR_PAGE, query.page)
    }).catch(err => {
      console.error(err)
    })
  },
  FETCH_ARTICLE:({commit}, id) => {
    return fetchArticle(id).then(res=> {
      let data = res.data;
      commit(types.SET_ARTICLE, data)
    }).catch(err => {
      console.error(err)
    })
  }
}