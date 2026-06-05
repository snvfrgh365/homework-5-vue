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
  if (!timer) {
    timer = setInterval(nextSlide, 3000)
  }
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div class="slides_container" style="float: left;width: 690px;height: 350px;" @mouseenter="stopTimer" @mouseleave="startTimer">
    <div class="bx-wrapper" style="max-width: 690px;">
      <div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative; height: 350px;">
        <ul id="slides_home" style="width: 100%; height: 100%; position: relative; padding: 0; margin: 0; list-style: none;">
          <template v-for="(slide, index) in slides" :key="slide.id">
            <li v-show="currentIndex === index" style="list-style: none; position: absolute; width: 690px; top: 0; left: 0;">
              <a v-if="slide.link" :href="slide.link" target="_blank">
                <img class="slideHomePic" :src="slide.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
              </a>
              <img v-else class="slideHomePic" :src="slide.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </li>
          </template>
        </ul>
      </div>
      <div class="bx-controls bx-has-pager">
        <div class="bx-pager bx-default-pager">
          <div v-for="(slide, index) in slides" :key="'dot-'+slide.id" class="bx-pager-item">
            <a href="#" @click.prevent="setSlide(index)" :class="['bx-pager-link', { active: currentIndex === index }]">{{ slide.id }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
