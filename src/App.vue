<script setup>
import AppHeader from './components/AppHeader.vue'
import ImageSlider from './components/ImageSlider.vue'
import LoginForm from './components/LoginForm.vue'
import QuickLinks from './components/QuickLinks.vue'
import NoticeBoard from './components/NoticeBoard.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="private">
    <AppHeader />
    
    <div class="content">
      <div class="wrapper">
        <div class="login_box clearfix">
          <ImageSlider />
          <LoginForm />
        </div>
        
        <QuickLinks />
        <NoticeBoard />
      </div>
    </div> 
    
    <AppFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
