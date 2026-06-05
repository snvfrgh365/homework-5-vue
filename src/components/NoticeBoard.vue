<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  { id: 1, src: '/images/eAsia_p_s.jpg' },
  { id: 2, src: '/images/eAsia_p_s.jpg' },
  { id: 3, src: '/images/award_p_s.jpg' },
  { id: 4, src: '/images/tax_p_s.jpg' },
  { id: 5, src: '/images/eAsia_p_s.jpg' }
];

const currentIndex = ref(0);
let timer = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

const setSlide = (index) => {
  currentIndex.value = index;
};

onMounted(() => {
  timer = setInterval(nextSlide, 3500);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="private_main clearfix">
    <div class="private_left">
      <h2 class="title"><span>公告事項<em></em></span><a class="more" id="showmore">More</a></h2>
      <ul class="news_page">
        <li>
          <img src="/images/list_icon.png" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;
          <font color="red"><b>親愛的華銀客戶您好，為強化您與貴機構使用本行網路銀行的資料傳輸安全，將於114年8月15日(五)起，陸續關閉舊式加密的連線方式。若您仍使用較舊的瀏覽器或OS作業系統，將出現無法連線或顯示相關安全提示。請盡速更新您的網頁瀏覽器，以持續享有本行提供順暢與安全的數位服務，感謝您的理解與支持，華南銀行關心您！</b></font>
        </li>
        <li>
          <img src="/images/list_icon.png" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;
          <a href="#" target="_blank"><font color="RED">網路銀行BHO元件安裝說明操作手冊。</font></a>
        </li>
        <li>
          <img src="/images/list_icon.png" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;
          <a href="#" target="_blank">網路銀行單筆轉帳與整批多筆轉帳BHO元件下載</a>
        </li>
      </ul>
    </div>
    
    <div class="private_right">
      <h2 class="title"><span>華南榮耀<em></em></span></h2>
      <div class="slides_container" @mouseenter="clearInterval(timer)" @mouseleave="timer = setInterval(nextSlide, 3500)">
        <div class="bx-wrapper" style="max-width: 320px;">
          <div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative; height: 190px;">
            <ul id="slides_award2" :style="{ width: '500%', position: 'relative', transitionDuration: '0.5s', transform: `translate3d(-${currentIndex * 320}px, 0px, 0px)` }">
              <li v-for="slide in slides" :key="slide.id" style="float: left; list-style: none; position: relative; width: 320px;">
                <img class="slideAward2Pic" :src="slide.src" alt="">
              </li>
            </ul>
          </div>
          <div class="bx-controls bx-has-pager">
            <div class="bx-pager bx-default-pager">
              <div class="bx-pager-item" v-for="(slide, index) in slides" :key="'award-' + slide.id">
                <a href="#" :class="['bx-pager-link', { active: currentIndex === index }]" @click.prevent="setSlide(index)">
                  {{ index + 1 }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
