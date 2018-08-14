<template>
  <div class="loading" :class="{'loading--show': show}">
    <div class="loading-mask align-center"></div>
    <div class="loading-bar align-center">
      <span class="left"></span>
      <span class="middle"></span>
      <span class="right"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    start() {
      this.show = true
    },
    finish() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #fffe00;
$blue: #5b7492;
$gray: #acb9c8;
.align-center {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loading {
  transition: all .3s;
  opacity: 0;
  visibility: hidden;
  &-mask {
    background: rgba(0, 0, 0, 0.16);
    width: 36%;
    height: 10%;
    border-radius: .5em;
  }
  &-bar {
    width: 20%;
    margin: 0 auto;
    span {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: $blue;
      position: absolute;
      top:50%;
      transform: translate(-50%, -50%);
    }
    .left {
      background: $yellow;
      animation: lMove 2.5s ease infinite;
    }
    .middle {
      left: 50%;
      animation: mMove 2.5s ease infinite;
    }
    .right {
      left: 100%;
      background: $gray;
      animation: rMove 2.5s ease infinite;
    }
  }
  &--show {
    opacity: 1;
    visibility: visible;
  }
}

@media (min-width: 768px) {
  .loading {
    &-mask {
      width: 17%;
    }
    &-bar {
      width: 12%;
    }
  }
}

@keyframes lMove {
  0% {
    left: 0;
  }
  25% {
    left: 50%;
    background: $yellow;
  }
  50% {
    left: 100%;
    background: $blue;
  }
  75% {
    left: 50%;
    background: $gray;
  }
  100% {
    left: 0;
  }
}
@keyframes mMove {
  0% {
  }
  25% {
    background: $blue;
  }
  50% {
    background: $yellow;
  }
  75% {
    background: $blue;
  }
  100% {
  }
}
@keyframes rMove {
  0% {
    left: 100%;
  }
  25% {
    left: 50%;
  }
  50% {
    left: 0;
    background: $gray;
  }
  75% {
    left: 50%;
    background: $yellow;
  }
  100% {
    left: 100%;
  }
}
</style>
