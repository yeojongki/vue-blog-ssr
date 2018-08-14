<template>
  <header class="navbar">
    <div class="navbar-container" :class="{'navbar--show':showNavbar}" >
      <div class="navbar-header">
        <div class="navbar-toggle-wrap" :class="{'navbar-toggle--show':showNavbar}" @click="showNavbar = !showNavbar">
          <button class="navbar-toggle collapsed"></button>
        </div>
        <router-link to='/' class="navbar-brand">
          <img src="//img.yeojongki.cn/logo.png" alt="logo" width="166" height="50">
        </router-link>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><router-link to='/'>Home</router-link></li>
          <li><router-link to='/'>Message board</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #a1b8ce;
  margin: 0 auto;
  &-container {
    max-width: 1200px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    &::after {
      clear: both;
      display: table;
      content: ' ';
    }
  }
  &-header {
    margin-right: -15px;
    margin-left: -15px;
  }
  &-nav {
    float: right;
    margin: 0;
    padding: 0;
    > li {
      float: left;
      a {
        color:#fff;
        padding: 15px;
        display: block;
        &:hover {
          color: black;
        }
      }
    }
  }
  &-brand {
    float: left;
    font-size: 18px;
    padding: 5px 15px 0;
  }
  &-toggle {
    color: #fff;
    &::after,
    &::before {
      position: absolute;
      left: 0;
      display: block;
      content: '';
      height: 3px;
      width: 22px;
      background: currentColor;
      transition: all 0.5s;
    }
    &::before {
      top: -7px;
    }
    &::after {
      top: 7px;
    }
    &-wrap {
      transition: 0.5s;
      float: right;
      padding: 15px;
      cursor: pointer;
      &:not(.navbar-toggle--show) {
        &:hover {
          .navbar-toggle {
            transform: rotate(-360deg);
          }
        }
      }
    }
    position: relative;
    cursor: pointer;
    width: 22px;
    height: 3px;
    background: #fff;
    padding: 0;
    border: none;
    border-radius: 4px;
    -webkit-appearance: button;
    outline: none;
  }
  &-collapse {
    border-top: 1px solid transparent;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    margin-right: -15px;
    margin-left: -15px;
    transition: height 0.4s;
  }
}

@media (min-width: 768px) {
  .navbar-toggle-wrap {
    display: none;
  }
}

@media (max-width: 768px) {
  .collapse {
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
  .navbar--show {
    .collapse {
      height: 235px;
      opacity: 1;
      visibility: visible;
    }
    .navbar-toggle {
      transition: all 0.5s;
      background: transparent;
      &::before {
        top: 0;
        transform: rotate(45deg);
      }
      &::after {
        top: 0;
        transform: rotate(-45deg);
      }
    }
  }
  .navbar-header {
    &::after {
      clear: both;
      display: table;
      content: ' ';
    }
  }
  .navbar-nav,
  .navbar-nav > li,
  .navbar-right {
    float: none;
  }
}
</style>
