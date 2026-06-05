<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  userId: '',
  rememberUserId: false,
  hideUserId: false,
  nickname: '',
  rememberNickname: false,
  password: '',
  captcha: ''
})

const showPassword = ref(false)
const captchaSrc = ref('/images/CaptchaImage_2.png')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const refreshCaptcha = () => {
  captchaSrc.value = '/images/CaptchaImage_2.png?rnd=' + Date.now()
}

const resetForm = () => {
  form.userId = ''
  form.rememberUserId = false
  form.hideUserId = false
  form.nickname = ''
  form.rememberNickname = false
  form.password = ''
  form.captcha = ''
}

const submit = () => {
  alert('登入功能尚未實作')
}
</script>

<template>
  <div class="login"> 
    <h3><span>網路銀行/個人用戶</span></h3>          
    <div style="margin:3px 0 0 160px; font-size:14px;">
      <span id="littleKeyboard" style="color:blue; cursor: pointer;">開啟小鍵盤</span>&nbsp;
      <img src="/images/bt_login.gif">&nbsp;<a href="#">首次簽入</a>
    </div>
    <hr style="margin-top:0;">
    
    <div class="input_box_private">
      <input class="text_bar" v-model="form.userId" type="text" maxlength="10" autocomplete="off" placeholder="請輸入身分證字號">
      <input type="checkbox" v-model="form.rememberUserId" id="list_a1">
      <label for="list_a1">記住</label>
      <input type="checkbox" v-model="form.hideUserId" id="list_a2">
      <label for="list_a2">隱碼</label>      
    </div>
    
    <div class="input_box_private">
      <input class="text_bar" v-model="form.nickname" type="text" maxlength="10" autocomplete="off" placeholder="請輸入您的代號">
      <input type="checkbox" v-model="form.rememberNickname" id="list_b1">
      <label for="list_b1">記住</label> 
      <a class="text_r">提示</a> 
    </div>  
    
    <div class="input_box_private">
      <div class="input_box_witheye">          	
        <input class="input_box_witheye input" v-model="form.password" :type="showPassword ? 'text' : 'password'" minlength="8" maxlength="16" autocomplete="off" placeholder="請輸入8~16位密碼">
        <img class="eye-icon" src="/images/eye-closed.svg" @click="togglePassword" :style="{ opacity: showPassword ? 0.5 : 1 }">
      </div>          	            
    </div>
    
    <div class="input_box_private" style="padding-top:2px;padding-bottom:0px;">
      <div style="float:left;">
        <input v-model="form.captcha" type="text" class="text_bar_private" size="5" maxlength="4" placeholder="圖形驗證碼">
      </div>
      <div style="float:center;">
        <img :src="captchaSrc" height="30" width="80">&nbsp;&nbsp;
        <a type="button" @click="refreshCaptcha" style="cursor:pointer;">重新產生</a>
      </div>
    </div>
    
    <div style="float:left;padding-left:25px">
      <ul class="main_btn_private main_btn">
        <li class="btn_r"><a @click="submit" style="cursor:pointer;">確定登入</a></li>
        <li class="btn_w"><a type="button" @click="resetForm" style="cursor:pointer;">清除重填</a></li>            
      </ul> 
    </div>
  </div>
</template>
