<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const uppercase = ref(false)
const keysLower = ['1','2','3','4','5','6','7','8','9','0','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m']

let targetInput = null

const toggleCase = () => {
  uppercase.value = !uppercase.value
}

const getChar = (ch) => {
  if (/[a-zA-Z]/.test(ch)) return uppercase.value ? ch.toUpperCase() : ch
  return ch
}

const insertAtFocus = (ch) => {
  if (!targetInput) return
  const el = targetInput
  let start = el.selectionStart
  let end = el.selectionEnd
  if (start === undefined) start = el.value.length
  if (end === undefined) end = start
  
  const v = el.value || ''
  const newVal = v.slice(0, start) + ch + v.slice(end)
  el.value = newVal
  
  el.dispatchEvent(new Event('input', { bubbles: true }))
  
  const pos = start + ch.length
  el.selectionStart = el.selectionEnd = pos
  el.focus()
}

const backspaceAtFocus = () => {
  if (!targetInput) return
  const el = targetInput
  let start = el.selectionStart
  let end = el.selectionEnd
  if (start === undefined) start = el.value.length
  if (end === undefined) end = start
  
  const v = el.value || ''
  if (start === end && start > 0) {
    el.value = v.slice(0, start - 1) + v.slice(end)
    start = start - 1
  } else if (start !== end) {
    el.value = v.slice(0, start) + v.slice(end)
  }
  
  el.dispatchEvent(new Event('input', { bubbles: true }))
  
  el.selectionStart = el.selectionEnd = start
  el.focus()
}

const closeKeyboard = () => {
  show.value = false
}

const handleFocus = (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') && e.target.type !== 'checkbox' && e.target.type !== 'radio') {
    targetInput = e.target
  }
}

window.openVirtualKeyboard = () => {
  show.value = true
}

onMounted(() => {
  window.addEventListener('focus', handleFocus, true)
})

onUnmounted(() => {
  window.removeEventListener('focus', handleFocus, true)
})
</script>

<template>
  <div v-if="show" id="virtualKeyboard" style="position: fixed; right: 20px; bottom: 20px; z-index: 9999; background: rgba(255, 255, 255, 0.98); border: 1px solid rgb(204, 204, 204); padding: 8px; box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 10px; border-radius: 6px; user-select: none;">
    <div style="display: grid; grid-template-columns: repeat(10, 36px); gap: 6px;">
      <button v-for="k in keysLower" :key="k" type="button" style="width: 36px; height: 36px; border-radius: 4px; border: 1px solid rgb(187, 187, 187); background: rgb(123, 31, 162); color: rgb(255, 255, 255); cursor: pointer;" @click.prevent="insertAtFocus(getChar(k))">
        {{ getChar(k) }}
      </button>
    </div>
    <div style="margin-top: 8px; display: flex; gap: 8px;">
      <button type="button" style="padding: 6px 10px;" @click.prevent="toggleCase">切換大小寫</button>
      <button type="button" style="padding: 6px 20px;" @click.prevent="insertAtFocus(' ')">空格</button>
      <button type="button" style="padding: 6px 10px;" @click.prevent="backspaceAtFocus">刪除</button>
      <button type="button" style="padding: 6px 10px;" @click.prevent="closeKeyboard">關閉</button>
    </div>
  </div>
</template>
