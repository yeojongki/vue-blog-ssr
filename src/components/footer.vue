<template>
  <footer class="copyright">
    <span>Copyright © yeojongki 2017 
      <a href='http://yeojongki.cn/admin'>·站长登录</a>
      <a href="http://www.miitbeian.gov.cn">粤ICP备17066228号</a>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44020402000191" class="beian"><img src="//static.hdslb.com/images/base/beiantubiao.png" alt="beian">粤公网安备 44020402000191号</a>
    </span>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a,
.copyright {
  font-size: 12px;
  width: 100%;
  color: #aaaaaa;
  text-align: center;
  text-decoration: none;
}
.copyright a:hover {
  color: #6fa4d4;
}
.beian {
  margin-top: 4px;
  display: block;
  img {
    width: 16px;
    height: 16px;
    vertical-align: top;
  }
}
</style>
