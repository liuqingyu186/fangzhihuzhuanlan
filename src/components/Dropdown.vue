<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <dropdown-item>
        <a href="#" class="dropdown-item">新建文章</a>
      </dropdown-item>
      <dropdown-item disabled>
        <a href="#" class="dropdown-item">编辑资料</a>
      </dropdown-item>
      <dropdown-item>
        <a href="#" class="dropdown-item">退出登录</a>
      </dropdown-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import DropdownItem from './DropdownItem.vue'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'DropDown',
  components: {
    DropdownItem
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    // 刚开始dropdownRef为null类型，挂载完成后为HTMLElement类型，所以这里设置为联合类型
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const isClickOutSide = useClickOutside(dropdownRef)
    watch(isClickOutSide, () => {
      if (isClickOutSide.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
