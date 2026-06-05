<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  lang: {
    type: String,
    default: 'tw'
  }
})

const awardSlides = [
  { id: 1, src: 'images/tax_p_s.jpg' },
  { id: 2, src: 'images/eAsia_p_s.jpg' },
  { id: 3, src: 'images/award_p_s.jpg' },
  { id: 4, src: 'images/tax_p_s.jpg' },
  { id: 5, src: 'images/eAsia_p_s.jpg' }
]

const currentAwardIndex = ref(0)
let awardTimer = null

const nextAwardSlide = () => {
  currentAwardIndex.value = (currentAwardIndex.value + 1) % awardSlides.length
}

const startAwardTimer = () => {
  if (!awardTimer) {
    awardTimer = setInterval(nextAwardSlide, 3000)
  }
}

const stopAwardTimer = () => {
  if (awardTimer) {
    clearInterval(awardTimer)
    awardTimer = null
  }
}

const setAwardSlide = (index) => {
  currentAwardIndex.value = index
}

onMounted(() => {
  startAwardTimer()
})

onUnmounted(() => {
  stopAwardTimer()
})
</script>

<template>
  <div class="private_main clearfix">
    <template v-if="lang === 'tw'">
      <div class="private_left">
        <h2 class="title"><span>公告事項<em></em></span><a class="more" id="showmore">More</a></h2>
        <ul class="news_page">
          <li><img :src="'images/list_icon.png'" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;<font color="red"><b>親愛的華銀客戶您好，為強化您與貴機構使用本行網路銀行的資料傳輸安全，將於114年8月15日(五)起，陸續關閉舊式加密的連線方式。若您仍使用較舊的瀏覽器或OS作業系統，將出現無法連線或顯示相關安全提示。請盡速更新您的網頁瀏覽器，以持續享有本行提供順暢與安全的數位服務，感謝您的理解與支持，華南銀行關心您！</b></font></li>
          <li><img :src="'images/list_icon.png'" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;<a href="https://netbank.hncb.com.twnotice/BHO_MANUAL.pdf" target="_blank"><font color="RED">網路銀行BHO元件安裝說明操作手冊。</font></a></li>
          <li><img :src="'images/list_icon.png'" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;<a href="https://netbank.hncb.com.twnotice/BHO.html" target="_blank">網路銀行單筆轉帳與整批多筆轉帳BHO元件下載</a></li>
        </ul>
      </div>
      <div class="private_right">
        <h2 class="title"><span>華南榮耀<em></em></span></h2>
        <div class="slides_container" @mouseenter="stopAwardTimer" @mouseleave="startAwardTimer">
          <div class="bx-wrapper" style="max-width: 320px;">
            <div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative; height: 190px;">
              <ul id="slides_award2" style="width: 100%; height: 100%; position: relative; padding: 0; margin: 0; list-style: none;">
                <template v-for="(slide, index) in awardSlides" :key="slide.id">
                  <li v-show="currentAwardIndex === index" style="list-style: none; position: absolute; width: 320px; top: 0; left: 0;">
                    <img class="slideAward2Pic" :src="slide.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                  </li>
                </template>
              </ul>
            </div>
            <div class="bx-controls bx-has-pager">
              <div class="bx-pager bx-default-pager">
                <div v-for="(slide, index) in awardSlides" :key="'award-dot-'+slide.id" class="bx-pager-item">
                  <a href="#" @click.prevent="setAwardSlide(index)" :class="['bx-pager-link', { active: currentAwardIndex === index }]">{{ slide.id }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="lang === 'cn'">
      <div class="private_left">
        <h2 class="title"><span>公告事项<em></em></span><a class="more" id="showmore">More</a></h2>
        <ul class="news_page">
          <li><img :src="'images/list_icon.png'" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;<font color="red"><b>親愛的華銀客戶您好，為強化您與貴機構使用本行網路銀行的資料傳輸安全，將於114年8月15日(五)起，陸續關閉舊式加密的連線方式。若您仍使用較舊的瀏覽器或OS作業系統，將出現無法連線或顯示相關安全提示。請盡速更新您的網頁瀏覽器，以持續享有本行提供順暢與安全的數位服務，感謝您的理解與支持，華南銀行關心您！</b></font></li>
          <li><img :src="'images/list_icon.png'" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;<a href="https://netbank.hncb.com.tw/netbank/pages/images/notice/BHO_MANUAL.pdf" target="_blank"><font color="RED">網路銀行BHO元件安裝說明操作手冊。</font></a></li>
          <li><img :src="'images/list_icon.png'" hspace="0" vspace="0" align="middle">&nbsp;&nbsp;<a href="https://netbank.hncb.com.tw/netbank/pages/images/notice/BHO.html" target="_blank">網路銀行單筆轉帳與整批多筆轉帳BHO元件下載</a></li>
        </ul>
      </div>
      <div class="private_right">
        <h2 class="title"><span>华南荣耀<em></em></span></h2>
        <div class="slides_container" @mouseenter="stopAwardTimer" @mouseleave="startAwardTimer">
          <div class="bx-wrapper" style="max-width: 320px;">
            <div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative; height: 190px;">
              <ul id="slides_award2" style="width: 100%; height: 100%; position: relative; padding: 0; margin: 0; list-style: none;">
                <template v-for="(slide, index) in awardSlides" :key="slide.id">
                  <li v-show="currentAwardIndex === index" style="list-style: none; position: absolute; width: 320px; top: 0; left: 0;">
                    <img class="slideAward2Pic" :src="slide.src" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                  </li>
                </template>
              </ul>
            </div>
            <div class="bx-controls bx-has-pager">
              <div class="bx-pager bx-default-pager">
                <div v-for="(slide, index) in awardSlides" :key="'award-dot-'+slide.id" class="bx-pager-item">
                  <a href="#" @click.prevent="setAwardSlide(index)" :class="['bx-pager-link', { active: currentAwardIndex === index }]">{{ slide.id }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <template v-else-if="lang === 'en'">
      <table width="96%" border="0" cellspacing="0" cellpadding="3">
        <tbody>
          <tr class="content12gy">
            <td><table border="0" cellspacing="0" cellpadding="0">
                <tbody><tr>
                  <td width="4" height="4" align="center" class="title12rdb"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bgl.gif" width="4" height="23"></td>
                  <td width="80" align="center" background="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bg.gif"><span class="title20bg">Declaration </span></td>
                  <td width="4"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bgr.gif" width="900px" height="23"></td>
                  <td background="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlebar_bg.gif">&nbsp;</td>
                </tr>
              </tbody></table></td>
          </tr>
          <tr class="content12gy">
            <td valign="top"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/icon_cross2.gif" width="7" height="7" hspace="4" vspace="4" align="absmiddle">Security Advice : Base on the security reason,<br>
              <ol>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tbody><tr><td align="right" width="15" valign="top">1.</td><td>Don't disclose your password to anybody : Our Bank will never ask you to reveal e-Banking password in any way.</td></tr>
                  <tr><td align="right" width="15" valign="top">2.</td><td>Key in the website address by yourself : Don't access the e-Banking through hyperlinks embedded in e-mails or others website.</td></tr>
                  <tr><td align="right" width="15" valign="top">3.</td><td>Open the lock to identify the genuine website : Make sure you are accessing genuine Hua Nan Bank website, you can follow the steps below to verify that :</td></tr>
                  <tr><td></td><td>Double click the key icon on the browser page to determine if the certification is valid for "netbank.hncb.com.tw" or "ibank.hncb.com.tw" to ensure that you accessing the Bank's website.</td></tr>
                  <tr><td align="right" width="15" valign="top">4.</td><td>Periodically check your e-Banking settings.</td></tr>
                  </tbody>
                </table>
                <ul type="i"><br><br>Should you have any enquiry or comment, please call 886-2-21810101.<br></ul>
              </ol>            
            </td>
          </tr>
          <tr class="content12gy">
            <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0">
              <tbody><tr>
                <td width="4" height="4" align="center" class="title12rdb"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bgl.gif" width="4" height="23"></td>
                <td width="130" align="center" background="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bg.gif"><span class="title20bg">Useful Information </span></td>
                <td width="4"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bgr.gif" width="850px" height="23"></td>
                <td background="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlebar_bg.gif">&nbsp;</td>
              </tr>
            </tbody></table>
              <table width="660" border="0" cellspacing="2" cellpadding="2">
                <tbody><tr>
                  <td width="20"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/icon_book.gif" width="12" height="11" hspace="4" vspace="2" align="absmiddle"></td>
                  <td width="310"><a href="#"><span class="content12be">Security Quick Tips</span></a></td>
                  <td width="20" class="content12gy"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/icon_book.gif" width="12" height="11" hspace="4" vspace="2" align="absmiddle"></td>
                  <td width="310" class="content12gy"><a href="#"><span class="content12be">Your Role in Safeguarding Your Account Information</span></a></td>
                </tr>
                <tr>
                  <td><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/icon_book.gif" width="12" height="11" hspace="4" vspace="2" align="absmiddle"></td>
                  <td class="content12gy"><a href="#"><span class="content12be">Protecting your Pin</span></a></td>
                  <td class="content12gy"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/icon_book.gif" width="12" height="11" hspace="4" vspace="2" align="absmiddle"></td>
                  <td class="content12gy"><a href="#"><span class="content12be">Guarding Against Phishing</span></a></td>
                </tr>
              </tbody></table></td>
          </tr>
      </tbody></table>
    </template>
  </div>
</template>
