<script setup>
defineProps({
  lang: {
    type: String,
    default: 'tw'
  }
})
</script>

<template>
  <div class="clearfix">
    <template v-if="lang === 'tw'">
      <div class="books">
        <h2>必讀手冊</h2>
        <div class="list_box">
          <ul>
            <li class="clearfix"><span>1</span><a href="https://netbank.hncb.com.twnotice/autoprocsys.html" target="_blank">電子帳簿自動遞送服務功能說明....</a></li>
            <li class="clearfix"><span>2</span><a href="http://www.hncb.com.tw/ibankqa/index.shtml" target="_blank">網銀小秘書</a></li>
            <li class="clearfix"><span>3</span><a href="http://www.hncb.com.tw/ibankqa/LoginLogout.shtml" target="_blank">忘記密碼與代號了嗎</a></li>
            <li class="clearfix"><span>4</span><a href="https://netbank.hncb.com.tw/netbank/pages/jsp/Time/html/time_edit.jsp" target="_blank">交易時間列表</a></li>
          </ul>
        </div>
      </div>
      <div class="download">
        <h2>軟體下載</h2>
        <div class="list_box">
          <ul>
            <li class="clearfix"><span>1</span><a href="https://event.hncb.com.tw/ibankqa/cfca_nonset_tw.shtml" target="_blank">憑證小秘書</a></li>
          </ul>
        </div>
      </div>
      <div class="link">
        <h2>快速連結</h2>
        <div class="list_box">
          <ul class="clearfix">
            <li><a href="https://pfpa.hncb.com.tw/pfpaip/web/" class="link_03">線上申請專區</a></li>
            <li><a href="#" class="link_06" target="_blank">e手包辦<br>繳費網</a></li>
            <li><a href="https://www.hnpoint.com.tw/" class="link_05" target="_blank">華得來點數<br>兌換平台</a></li>
            <li><a href="#" class="link_04">網路ATM</a></li>
          </ul>
        </div>
      </div>
    </template>
    
    <template v-else-if="lang === 'en'">
      <br>
    </template>

    <template v-else-if="lang === 'cn'">
      <div class="books">
        <h2>必读手册</h2>
        <div class="list_box">
          <ul>
            <li class="clearfix"><span>1</span><a href="https://netbank.hncb.com.twnotice/autoprocsys.html" target="_blank">电子帐簿自动递送服务功能说明....</a></li>
            <li class="clearfix"><span>2</span><a href="http://www.hncb.com.tw/ibankqa/index.shtml" target="_blank">网银小秘书</a></li>
            <li class="clearfix"><span>3</span><a href="http://www.hncb.com.tw/ibankqa/LoginLogout.shtml" target="_blank">忘记密码与代号了吗</a></li>
            <li class="clearfix"><span>4</span><a href="https://netbank.hncb.com.tw/netbank/pages/jsp/Time/html/time_edit.jsp" target="_blank">交易时间列表</a></li>
          </ul>
        </div>
      </div>
      <div class="download">
        <h2>软体下载</h2>
        <div class="list_box">
          <ul>
            <li class="clearfix"><span>1</span><a href="https://event.hncb.com.tw/ibankqa/cfca_nonset_cn.shtml" target="_blank">凭证小秘书</a></li>
          </ul>
        </div>
      </div>
      <div class="link">
        <h2>快速连结</h2>
        <div class="list_box">
          <ul class="clearfix">
            <li><a href="https://pfpa.hncb.com.tw/pfpaip/web/" class="link_03">线上申请专区</a></li>
            <li><a href="#" class="link_06" target="_blank">e手包办<br>缴费网</a></li>
            <li><a href="https://www.hnpoint.com.tw/" class="link_05" target="_blank">华得来点数<br>兑换平台</a></li>
            <li><a href="#" class="link_04">网路ATM</a></li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
