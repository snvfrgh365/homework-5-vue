<script setup>
defineProps({
  lang: {
    type: String,
    default: 'tw'
  }
})
</script>

<template>
  <div class="header">
    <div class="wrapper clearfix">
      <template v-if="lang === 'tw'">
        <h1 class="logo text_none"><a href="http://www.hncb.com.tw/" target="_blank">華南銀行</a></h1>
        <h2 class="text_none"><span>個人網路銀行</span></h2>
        <ul class="language">
          <li><router-link to="/en">English</router-link></li>
          <li><router-link to="/cn">简体中文</router-link></li>
        </ul>
        <ul class="top_nav">
          <li><a href="#">企業網銀</a></li>
          <li><a href="http://www.hnfhc.com.tw/" target="_blank">華南金控</a></li>
        </ul>
      </template>

      <template v-else-if="lang === 'en'">
        <h1 class="logo text_none"><a href="http://www.hncb.com.tw/" target="_blank"></a></h1>
        <h2 class="text_none"><span></span></h2>
        <ul class="language">
          <li><router-link to="/en">English</router-link></li>
          <li><router-link to="/">繁體中文</router-link></li>
          <li><router-link to="/cn">简体中文</router-link></li>
        </ul>
        <ul class="top_nav">
          <li><a href="#">企業網銀</a></li>
          <li><a href="http://www.hnfhc.com.tw/en/htm/about01.shtml" target="_blank">華南金控</a></li>
        </ul>
      </template>

      <template v-else-if="lang === 'cn'">
        <h1 class="logo text_none"><a href="http://www.hncb.com.tw/" target="_blank">华南银行</a></h1>
        <h2 class="text_none"><span>个人网路银行</span></h2>
        <ul class="language">
          <li><router-link to="/en">English</router-link></li>
          <li><router-link to="/">繁體中文</router-link></li>
        </ul>
        <ul class="top_nav">
          <li><a href="#">企业网银</a></li>
          <li><a href="http://www.hnfhc.com.tw/" target="_blank">华南金控</a></li>
        </ul>
      </template>
    </div>
  </div>
</template>
