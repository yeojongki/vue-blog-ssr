<template>
	<div class="article">
    <section>
      <div class="container">
        <h1 class="text-center article-title">{{article.title}}</h1>
        <p class="text-center article-author">发布日期：{{article.date|formatTime}} {{editTime}}</p>
      </div>
    </section>
    <div class="container">
      <div v-html="content"></div>
    </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'static/js/marked.js'

export default {
  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_ARTICLE', id)
  },
  computed: {
    ...mapGetters(['article']),
    content() {
      return marked(this.article.content)
    },
    editTime() {
      let time = this.article.edit_time
      let result = time ? `| 最后更新：${time.substring(0, 10)}` : ''
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/hljs.css';
.article {
  box-sizing: border-box;
  padding: 0 15px;
  margin: 0 auto;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
  }
  section {
    padding: 40px 10px;
    padding-top: 30px;
    margin: 0 -15px;
    background: #a1b8ce;
  }
  &-title {
    font-size: 28px;
    color: #fff;
    margin-top: 0;
  }
  &-author {
    color: #fff;
  }
}
</style>
