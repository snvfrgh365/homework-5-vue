<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const top = ref(0)
const left = ref(0)
const lang = ref('tw')

window.togglePasswordInfo = (x, y, currentLang) => {
  if (show.value) {
    show.value = false
  } else {
    top.value = y + window.scrollY + 15
    left.value = x + window.scrollX - 250
    if (left.value < 10) left.value = 10
    lang.value = currentLang || 'tw'
    show.value = true
  }
}

const handleClickOutside = (e) => {
  if (show.value && !e.target.closest('#pwdInfoContent') && !e.target.closest('.pwd-exclaim')) {
    show.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div v-if="show" id="pwdInfoContent" :style="{ position: 'absolute', top: top + 'px', left: left + 'px', zIndex: 10000, background: 'white', border: '1px solid #ccc', padding: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }">
    <template v-if="lang === 'tw'">
      <p>密碼說明</p><hr><ol><li>密碼長度為8~16位</li><li>可為半形之英文、數字或!@#$%^&*()等符號</li><li>英文字大小寫視為不同</li></ol>
    </template>
    <template v-else-if="lang === 'en'">
      <p>password help</p><hr><ol><li>Password length is from 8 to 16.</li><li>It's for the half-width of letters, numbers, or the !@#$%^&*() Symbols.</li><li>English letter is case-sensitive.</li></ol>
    </template>
    <template v-else-if="lang === 'cn'">
      <p>密码说明</p><hr><ol><li>密码长度为8~16位</li><li>可为半形之英文、数字或!@#$%^&*()等符号</li><li>英文字大小写视为不同</li></ol>
    </template>
  </div>
</template>
