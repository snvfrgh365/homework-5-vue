<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const awards = [
  { id: 1, src: '/images/eAsia_p_s.jpg' },
  { id: 2, src: '/images/eAsia_p_s.jpg' },
  { id: 3, src: '/images/award_p_s.jpg' },
  { id: 4, src: '/images/tax_p_s.jpg' },
  { id: 5, src: '/images/eAsia_p_s.jpg' }
]

const currentIndex = ref(0)
let timer = null

const nextAward = () => {
  currentIndex.value = (currentIndex.value + 1) % awards.length
}

const setAward = (index) => {
  currentIndex.value = index
}

const startTimer = () => {
  timer = setInterval(nextAward, 3000)
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div class="private_main clearfix">
    <div class="private_left">
      <h2 class="title"><span>公告事項<em></em></span><a class="more" id="showmore" style="cursor:pointer;">More</a></h2>
      <ul class="news_page">
        <li>
          <img src="/images/list_icon.png" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;
          <font color="red"><b>親愛的華銀客戶您好，為強化您與貴機構使用本行網路銀行的資料傳輸安全，將於114年8月15日(五)起，陸續關閉舊式加密的連線方式。若您仍使用較舊的瀏覽器或OS作業系統，將出現無法連線或顯示相關安全提示。請盡速更新您的網頁瀏覽器，以持續享有本行提供順暢與安全的數位服務，感謝您的理解與支持，華南銀行關心您！</b></font>
        </li>
        <li>
          <img src="/images/list_icon.png" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;
          <a href="https://netbank.hncb.com.twnotice/BHO_MANUAL.pdf" target="_blank"><font color="RED">網路銀行BHO元件安裝說明操作手冊。</font></a>
        </li>
        <li>
          <img src="/images/list_icon.png" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;
          <a href="https://netbank.hncb.com.twnotice/BHO.html" target="_blank">網路銀行單筆轉帳與整批多筆轉帳BHO元件下載</a>
        </li>
      </ul>
    </div>
    <div class="private_right">
      <h2 class="title"><span>華南榮耀<em></em></span></h2>
      <div class="slides_container" style="position: relative; width: 320px; height: 190px; overflow: hidden;" @mouseenter="stopTimer" @mouseleave="startTimer">
        <div id="slides_award2" style="width: 100%; height: 100%;">
          <template v-for="(award, index) in awards" :key="award.id">
            <div v-show="currentIndex === index" style="width: 100%; height: 100%;">
              <img class="slideAward2Pic" :src="award.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </template>
        </div>
        <ul class="pagination" style="position: absolute; right: 100px; bottom: 0px;">
          <li v-for="(award, index) in awards" :key="'dot-'+award.id" :class="{ current: currentIndex === index }">
            <a href="#" @click.prevent="setAward(index)">{{ award.id }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
