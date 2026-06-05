<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  { id: 1, src: '/images/hr_20260323_061_2.png', link: 'https://svc.tabf.org.tw/115hncb02' },
  { id: 2, src: '/images/hr_20260323_061_1.png', link: 'https://svc.tabf.org.tw/115hncb01' },
  { id: 3, src: '/images/Loan_1151231_071_1.jpg', link: 'https://www.hncb.com.tw/wps/portal/HNCB/msg/co-management/pb-best-offer/c1/t3/115+FUBON+Q1-Q2' },
  { id: 4, src: '/images/Loan_1151231_071_1.jpg', link: 'https://camp.hncb.com.tw/weba071-0008/' },
  { id: 5, src: '/images/10910_071_3.jpg', link: '' }
]

const currentIndex = ref(0)
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const setSlide = (index) => {
  currentIndex.value = index
}

const startTimer = () => {
  timer = setInterval(nextSlide, 3000)
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
  <div class="slides_container" style="float: left;width: 690px;height: 350px; position: relative; overflow: hidden; background: #fff;" @mouseenter="stopTimer" @mouseleave="startTimer">
    <div id="slides_home" style="width: 100%; height: 100%;">
      <template v-for="(slide, index) in slides" :key="slide.id">
        <div v-show="currentIndex === index" style="width: 100%; height: 100%;">
          <a v-if="slide.link" :href="slide.link" target="_blank">
            <img class="slideHomePic" :src="slide.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
          </a>
          <img v-else class="slideHomePic" :src="slide.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </template>
    </div>
    
    <ul class="pagination" style="position: absolute; right: 10px; bottom: 10px;">
      <li v-for="(slide, index) in slides" :key="'dot-'+slide.id" :class="{ current: currentIndex === index }">
        <a href="#" @click.prevent="setSlide(index)">{{ slide.id }}</a>
      </li>
    </ul>
  </div>
</template>
