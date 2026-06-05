<script setup>
import { ref } from 'vue';

const userId = ref('');
const nickname = ref('');
const password = ref('');
const captcha = ref('');
const showPassword = ref(false);
const rememberUserId = ref(false);
const rememberNickname = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const resetForm = () => {
  userId.value = '';
  nickname.value = '';
  password.value = '';
  captcha.value = '';
  rememberUserId.value = false;
  rememberNickname.value = false;
};

const submitForm = () => {
  // Simulate form submit
  alert(`登入資訊：\n身分證字號: ${userId.value}\n代號: ${nickname.value}\n密碼: ${password.value}`);
};

const refreshCaptcha = () => {
  const cap = document.getElementById('code_Cap');
  if (cap) {
    cap.src = '/images/CaptchaImage_2.png?rnd=' + Date.now();
  }
};
</script>

<template>
  <div class="login"> 
    <h3><span>網路銀行/個人用戶</span></h3>          
    <div style="margin:3px 0 0 160px; font-size:14px;">
      <span style="color:blue;cursor:pointer;">開啟小鍵盤</span>&nbsp;
      <img src="/images/bt_login.gif">&nbsp;<a href="#">首次簽入</a>
    </div>
    <hr style="margin-top:0;">
    
    <div class="input_box_private">
      <input class="text_bar" v-model="userId" type="text" maxlength="10" autocomplete="off" placeholder="請輸入身分證字號">
      <input type="checkbox" v-model="rememberUserId" id="list_a1">
      <label for="list_a1">記住</label>
      <input type="checkbox" id="list_a2">
      <label for="list_a2">隱碼</label>      
    </div>
    
    <div class="input_box_private">
      <input class="text_bar" v-model="nickname" type="text" maxlength="10" autocomplete="off" placeholder="請輸入您的代號">
      <input type="checkbox" v-model="rememberNickname" id="list_b1">
      <label for="list_b1">記住</label> 
      <a class="text_r">提示</a> 
    </div>  
    
    <div class="input_box_private">
      <div class="input_box_witheye">          	
        <input class="input_box_witheye input" v-model="password" :type="showPassword ? 'text' : 'password'" minlength="8" maxlength="16" autocomplete="off" placeholder="請輸入8~16位密碼">
        <img class="eye-icon" src="/images/eye-closed.svg" @click="togglePassword" :style="{ opacity: showPassword ? 0.6 : 1 }">
      </div>          	            
    </div>
    
    <div class="input_box_private" style="padding-top:2px;padding-bottom:0px;">
      <div style="float:left;">
        <input v-model="captcha" type="text" class="text_bar_private" size="5" maxlength="4" placeholder="圖形驗證碼">
      </div>
      <div style="float:center;">
        <img src="/images/CaptchaImage_2.png" id="code_Cap" height="30" width="80">&nbsp;&nbsp;
        <a type="button" @click.prevent="refreshCaptcha" style="cursor:pointer;">重新產生</a>
      </div>
    </div>
    
    <div style="float:left;padding-left:25px">
      <ul class="main_btn_private main_btn">
        <li class="btn_r"><a @click.prevent="submitForm">確定登入</a></li>
        <li class="btn_w"><a type="button" @click.prevent="resetForm">清除重填</a></li>            
      </ul> 
    </div>
  </div>    
</template>

<style scoped>
</style>
