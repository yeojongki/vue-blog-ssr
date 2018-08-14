<template>
  <div class="main">
    <div class="header">
      <h1 class="text-center">The best is yet to come</h1>
      <h2 class="text-center domain">http://ssr.yeojongki.cn</h2>
    </div>
    <div class="article-wrap">
      <div class="article text-center" :key="article._id" v-for="(article,index) in articleList" v-if="article.state == -1">
        <div class="article-body" :class="{'border':index !== articleList.length-1}">
          <h3 class="article-header ellipsis2" @click="setCurrentArticle(index)">
            <router-link :to="{name:'article', params:{id:article._id}}" class="article-title">{{article.title}}</router-link>
          </h3>
          <div class="article-description ellipsis2" v-if="article.description">
            <span class="descp">{{article.description}}</span>
          </div>
          <div class="article-extra">
            <div class="article-extra-label" v-for="tag in article.tags" :key="tag.id">
              <i class="fa fa-tags"></i>{{tag.name}}
            </div>
            <div class="article-extra-info">
              <span class="date"><i class="fa fa-clock-o"></i>{{article.date|formatTime}}</span>
              <span class="date" v-if="article.edit_time"><i class="fa fa-edit"></i>{{article.edit_time|formatTime}}</span>
              <span class="read"><i class="fa fa-eye"></i>{{article.read||'0'}}</span>
              <span class="go-detail">              
                <router-link :to="{name:'article', params:{id:article._id}}" class="readmore">More 
                <i class="fa fa-angle-right"></i>
              </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from 'components/Pagination'
export default {
  name: 'index',
  asyncData({ store, route }) {
    let query = {
      limit: 4,
      page: 1
    }
    return store.dispatch('FETCH_LIST', query)
  },
  components: {
    Pagination
  },
  data(){
    return {
      homeUrl: ''
    }
  },
  mounted() {
    this.homeUrl = location.origin
  },
  computed: {
    ...mapGetters(['articleList', 'allPage', 'curPage'])
  },
  methods: {
    setCurrentArticle(index) {
      this.$store.commit('SET_CURRENT_ARTICLE', this.articleList[index])
    },
    //换页
    changePage(cur) {
      let query = {
        limit: 4,
        page: cur
      }
      return this.$store.dispatch('FETCH_LIST', query)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #337ab7;
}
a:hover {
  color: #23527c;
}
.header {
  background-color: #a1b8ce;
  color: #fff;
  padding-top: 18px;
  padding-bottom: 48px;
  h1 {
    margin-top: 0;
  }
  .domain {
    display: block;
    font-size: 16px;
    color: #fff;
  }
}
.article {
  &:not(:last-child) {
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  &-body {
    margin: 0;
    padding: 12px 10px 18px;
  }
  &-header {
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 5px;
  }
  &-title {
    line-height: 1.6;
  }
  &-description {
    margin: 10px 0;
    font-size: 18px;
    color: #bbb;
  }
  &-extra {
    &-info {
      margin-top: 6px;
      color: #95a5a6;
      >span + span {
        margin-left: 10px;
      }
      i {
        margin-right: 2px;
      }
      .readmore {
        margin-left: 6px;
      }
    }
    &-label {
      display: inline-block;
      background-color: #e8e8e8;
      padding: 6px 8px;
      color: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      margin: 0 8px 5px 0;
      cursor: pointer;
      user-select: none;
      &:hover {
        background: #d1d1d1;
      }
    }
  }
}
</style>
