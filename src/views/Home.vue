<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import ImageSlider from '../components/ImageSlider.vue'
import LoginForm from '../components/LoginForm.vue'
import QuickLinks from '../components/QuickLinks.vue'
import NoticeBoard from '../components/NoticeBoard.vue'
import AppFooter from '../components/AppFooter.vue'

const route = useRoute()
const lang = computed(() => route.meta.lang || 'tw')
</script>

<template>
  <div class="private">
    <AppHeader :lang="lang" />
    
    <div class="content">
      <div class="wrapper">
        <div class="login_box clearfix">
          <ImageSlider :lang="lang" />
          <LoginForm :lang="lang" />
        </div>
        
        <QuickLinks :lang="lang" />
        <NoticeBoard :lang="lang" />
      </div>
    </div> 
    
    <AppFooter :lang="lang" />
  </div>
</template>
