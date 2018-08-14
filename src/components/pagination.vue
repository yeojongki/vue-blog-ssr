<template>
  <ul class="pagination">
    <li class="pagination_button" @click="prevPage" :class="{'disable' : this.curPage <= 1}">
      <i class="fa fa-chevron-left" ></i>
    </li>
    <li class="pagination_item" :key="page" v-for="page in pageArr" @click="switchPage(page)" :class="{'pagination_item_active':page == curPage}">
      {{page}}
    </li>
    <li class="pagination_button" @click="nextPage" :class="{'disable' :this.curPage >= this.allPage}">
      <i class="fa fa-chevron-right"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {}
  },
  computed: {
    pageArr() {
      let arr = []
      if (this.allPage <= 7) {
        //1 2 3 4 5 6 7
        for (let i = 1; i <= this.allPage; i++) {
          arr.push(i)
        }
      } else {
        if (this.curPage - 1 < 3) {
          //1 2 3 4 ... allpage
          for (let i = 1; i <= this.curPage + 1; i++) {
            arr.push(i)
          }
          arr.push('...')
          arr.push(this.allPage)
        } else if (this.allPage - this.curPage < 3) {
          // 1 ... 34 35 36 37
          arr.push(1)
          arr.push('...')
          for (let i = this.curPage - 1; i <= this.allPage; i++) {
            arr.push(i)
          }
        } else {
          //1 ... 3 4 5 ... 37
          arr.push(1)
          arr.push('...')
          arr.push(this.curPage - 1)
          arr.push(this.curPage)
          arr.push(this.curPage + 1)
          arr.push('...')
          arr.push(this.allPage)
        }
      }
      return arr
    }
  },
  props: {
    curPage: {
      type: Number,
      required: true
    },
    allPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    prevPage() {
      if (this.curPage <= 1) {
        return false
      }
      this.$emit('changePage', this.curPage - 1)
    },
    nextPage() {
      if (this.curPage >= this.allPage) {
        return false
      }
      this.$emit('changePage', this.curPage + 1)
    },
    switchPage(page) {
      if (page == '...') {
        return
      }
      // 触发父组件的changePage方法，实现从父组件再修改props,单向数据流
      this.$emit('changePage', page)
    }
  },
}
</script>

<style lang="css" scoped>
.pagination {
  background-color: #d8dee2;
  display: flex;
  height: 40px;
  max-width: 200px;
  list-style: none;
  margin: 25px auto;
  padding-left: 0;
  border-radius: 4px;
}
.pagination li {
  line-height: 40px;
  color: #337ab7;
}
.pagination li i {
  color: #fff;
}
.pagination_button {
  flex: 1;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.pagination_button:hover {
  background-color: #7dc1f5;
}
.pagination_button:first-child:hover {
  border-radius: 4px 0 0 4px;
}
.pagination_button:last-child:hover {
  border-radius: 0 4px 4px 0;
}
.pagination .disable {
  cursor: not-allowed;
}
.pagination .disable:hover {
  background-color: #d8dee2;
}
.pagination_item {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.pagination_item:hover {
  color: #fff;
  background-color: #cad2da;
}
.pagination_item_active {
  background-color: #cad2da;
}
</style>