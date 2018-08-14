<template>
  <div id="app">
    <myheader/>
    <main class="wrap">
      <router-view></router-view>
    </main>
    <myfooter class="footer"/>
    <button v-show="scrolled" class="backTop" @click="backTop"><i class="fa fa-chevron-up fa-x"></i></button>
  </div>
</template>

<script>
import myheader from 'components/header.vue'
import myfooter from 'components/footer.vue'
import marked from 'static/js/marked.js'
export default {
  name: 'app',
  components: {
    myheader,
    myfooter
  },
  data() {
    return {
      scrolled: false
    }
  },
  methods: {
    backTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)
          window.scrollTo(0, currentScroll - currentScroll / 5)
        }
      })()
    },
    handleScroll() {
      let height = Math.ceil(window.screen.height / 2)
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > height) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
@import '../static/css/hljs.css';
.wrap {
  min-height: 100%;
  min-height: calc(100% - 100px);
  padding-bottom: 30px;
}
.footer {
  position: relative;
  margin-top: -42px;
  height: 42px;
  clear: both;
}
.backTop {
  cursor: pointer;
  background: hsla(0, 0%, 100%, 0.8);
  color: #a1adbb;
  outline: none;
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  right: 5%;
  bottom: 7%;
}
</style>
