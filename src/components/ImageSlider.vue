<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  { id: 1, src: '/images/hr_20260323_061_2.png', link: 'https://svc.tabf.org.tw/115hncb02' },
  { id: 2, src: '/images/hr_20260323_061_1.png', link: 'https://svc.tabf.org.tw/115hncb01' },
  { id: 3, src: '/images/Loan_1151231_071_1.jpg', link: 'https://www.hncb.com.tw/wps/portal/HNCB/msg/co-management/pb-best-offer/c1/t3/115+FUBON+Q1-Q2' },
  { id: 4, src: '/images/Loan_1151231_071_1.jpg', link: 'https://camp.hncb.com.tw/weba071-0008/' },
  { id: 5, src: '/images/10910_071_3.jpg', link: '' }
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
  <div class="slides_container" style="float: left;width: 690px;height: 350px;" @mouseenter="clearInterval(timer)" @mouseleave="timer = setInterval(nextSlide, 3500)">
    <div class="bx-wrapper" style="max-width: 690px;">
      <div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative; height: 350px;">
        <ul id="slides_home" :style="{ width: '500%', position: 'relative', transitionDuration: '0.5s', transform: `translate3d(-${currentIndex * 690}px, 0px, 0px)` }">
          <li v-for="(slide, index) in slides" :key="slide.id" style="float: left; list-style: none; position: relative; width: 690px;">
            <a v-if="slide.link" :href="slide.link" target="_blank">
              <img class="slideHomePic" :src="slide.src" alt="">
            </a>
            <img v-else class="slideHomePic" :src="slide.src" alt="">
          </li>
        </ul>
      </div>
      <div class="bx-controls bx-has-pager">
        <div class="bx-pager bx-default-pager">
          <div class="bx-pager-item" v-for="(slide, index) in slides" :key="'pager-' + slide.id">
            <a href="#" :class="['bx-pager-link', { active: currentIndex === index }]" @click.prevent="setSlide(index)">
              {{ index + 1 }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
