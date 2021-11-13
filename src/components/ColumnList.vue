<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// defineComponent给予了组件对象正确的类型推断
import { defineComponent, PropType } from 'vue'

// Column属性接口，定义它具有哪些属性
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // ColumnProps[]表示项为ColumnProp形状的数组
      // Vue中的props.type指定类型时要用 as PropType<..>
      // 下面表示list是ColumnProps[]的数组
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = props.list.map(column => {
      if (!column.avatar) {
        column.avatar = require('@/assets/column.jpg')
      }
      return column
    })
    return {
      columnList
    }
  }
})
</script>

<style>

</style>
