// 判断是否点击了元素外面
// Ref表示一个类型
import { Ref, ref, onMounted, onUnmounted } from 'vue'
const useClickOutside = (eleRef: Ref<null | HTMLElement>): Ref<boolean> => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (eleRef.value) {
      // 这里e.target需要使用断言，告诉TS这里肯定是个HTMLElement类型，否则报错
      // 在TS中，e.target是EventTarget类型，范围比较大，这是因为如自定义事件，就可能不是HTMLElement
      // 判断点击的目标元素是否属于dropdown节点内（X也属于X内，即X.contains(X)返回true）
      if (eleRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
