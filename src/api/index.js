import axios from 'axios'
const is_prod = process.env.NODE_ENV === 'production'
const base = is_prod ? 'http://ssr.yeojongki.cn' : 'http://localhost:3003'
// const base = 'http://localhost:3003'
export const fetchList = (query) => {
	return axios.post(`${base}/api/getArticleList`, query)
}
export const fetchArticle = (id) => {
	return axios.get(`${base}/api/getArticle?id=${id}`)
}