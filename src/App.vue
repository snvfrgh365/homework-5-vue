<script setup>
import { RouterView } from 'vue-router'
import VirtualKeyboard from './components/VirtualKeyboard.vue'
import PasswordInfo from './components/PasswordInfo.vue'
</script>

<template>
  <RouterView />
  <VirtualKeyboard />
  <PasswordInfo />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
