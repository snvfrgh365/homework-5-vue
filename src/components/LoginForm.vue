<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'tw'
  }
})

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

const openKeyboard = () => {
  if (window.openVirtualKeyboard) window.openVirtualKeyboard()
}

const showPasswordInfo = (e) => {
  if (window.togglePasswordInfo) window.togglePasswordInfo(e.clientX, e.clientY, props.lang)
}
</script>

<template>
  <div class="login"> 
    <h3>
      <span v-if="lang === 'tw'">網路銀行/個人用戶</span>
      <span v-else-if="lang === 'en'">e-Banking/Personal user</span>
      <span v-else-if="lang === 'cn'">网路银行/个人用户</span>
    </h3>          
    
    <div style="margin:3px 0 0 0px; font-size:14px; text-align: right; margin-right: 15px;">
      <span style="color:blue; cursor: pointer;" @click="openKeyboard">
        <template v-if="lang === 'tw'">開啟小鍵盤</template>
        <template v-else-if="lang === 'en'">open virtual keyboard</template>
        <template v-else-if="lang === 'cn'">开启小键盘</template>
      </span>&nbsp;
      <img src="/images/bt_login.gif">&nbsp;
      <a href="#">
        <template v-if="lang === 'tw'">首次簽入</template>
        <template v-else-if="lang === 'en'">First Time Login</template>
        <template v-else-if="lang === 'cn'">首次签入</template>
      </a>
    </div>
    <hr style="margin-top:0;">
    
    <div class="input_box_private">
      <input class="text_bar" v-model="form.userId" type="text" maxlength="10" autocomplete="off" :placeholder="lang === 'en' ? 'Please enter your ID !' : (lang === 'cn' ? '请输入身分证字号' : '請輸入身分證字號')">
      <input type="checkbox" v-model="form.rememberUserId" id="list_a1">
      <label for="list_a1">{{ lang === 'en' ? 'Save' : (lang === 'cn' ? '记住' : '記住') }}</label>
      <input type="checkbox" v-model="form.hideUserId" id="list_a2">
      <label for="list_a2">{{ lang === 'en' ? 'mask' : (lang === 'cn' ? '隐码' : '隱碼') }}</label>      
    </div>
    
    <div class="input_box_private">
      <input class="text_bar" v-model="form.nickname" type="text" maxlength="10" autocomplete="off" :placeholder="lang === 'en' ? 'Please enter Username !' : (lang === 'cn' ? '请输入您的代号' : '請輸入您的代號')">
      <input type="checkbox" v-model="form.rememberNickname" id="list_b1">
      <label for="list_b1">{{ lang === 'en' ? 'Save' : (lang === 'cn' ? '记住' : '記住') }}</label> 
      <a class="text_r">{{ lang === 'en' ? 'Hint' : (lang === 'cn' ? '提示' : '提示') }}</a> 
    </div>  
    
    <div class="input_box_private">
      <div class="input_box_witheye" style="position: relative; overflow: visible;">          	
        <input class="input_box_witheye input" v-model="form.password" :type="showPassword ? 'text' : 'password'" minlength="8" maxlength="16" autocomplete="off" :placeholder="lang === 'en' ? 'Please enter Password !' : (lang === 'cn' ? '请输入8~16位密码' : '請輸入8~16位密碼')">
        <button type="button" class="pwd-exclaim" style="position: absolute; right: 34px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; border-radius: 50%; border: none; background: #c62828; color: #fff; font-weight: bold; line-height: 24px; text-align: center; cursor: pointer; z-index: 1000; font-size: 14px;" @click.prevent="showPasswordInfo">i</button>
        <img class="eye-icon" src="/images/eye-closed.svg" @click="togglePassword" :style="{ opacity: showPassword ? 0.5 : 1, right: '6px', zIndex: 900 }">
      </div>          	            
    </div>
    
    <div class="input_box_private" style="padding-top:2px;padding-bottom:0px;">
      <div style="float:left;">
        <input v-model="form.captcha" type="text" class="text_bar_private" size="5" maxlength="4" :placeholder="lang === 'en' ? 'Captcha' : (lang === 'cn' ? '图形验证码' : '圖形驗證碼')">
      </div>
      <div style="float:center;">
        <img :src="captchaSrc" height="30" width="80">&nbsp;&nbsp;
        <a type="button" @click="refreshCaptcha" style="cursor:pointer;">{{ lang === 'en' ? 'Regenerate' : (lang === 'cn' ? '重新产生' : '重新產生') }}</a>
      </div>
    </div>
    
    <div style="float:left;padding-left:25px">
      <ul class="main_btn_private main_btn">
        <li class="btn_r"><a @click="submit" style="cursor:pointer;">{{ lang === 'en' ? 'Login' : (lang === 'cn' ? '确定登入' : '確定登入') }}</a></li>
        <li class="btn_w"><a type="button" @click="resetForm" style="cursor:pointer;">{{ lang === 'en' ? 'Reset' : (lang === 'cn' ? '清除重填' : '清除重填') }}</a></li>            
      </ul> 
    </div>
  </div>
</template>
