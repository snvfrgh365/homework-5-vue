<script setup>
defineProps({
  lang: {
    type: String,
    default: 'tw'
  }
})
</script>

<template>
  <div class="footer">
    <div class="wrapper">
      <template v-if="lang === 'tw'">
        <table>
          <tbody><tr>
          <td>
            <ul class="nav clearfix">
              <li><a href="#">聯絡我們</a></li>
              <li><a href="#">網路安全</a></li>
              <li><a href="#">客戶隱私權保護</a></li>
            </ul>
            <p><a href="https://netbank.hncb.com.tw/">https://netbank.hncb.com.tw</a>　華南銀行　版權所有　Hua Nan Bank. All Rights Reserved</p>
            <p>24小時客戶服務中心：(02)2181-0101、免付費專線：0800-487888(限市話) 華南銀行 機構代號 008</p>
          </td>
          <td>
            <p><a href="https://www.cdic.gov.tw/main_ch/index.aspx" target="_blank">
            　 <img :src="'images/cdic_logo.jpeg'" alt=""></a></p>
          </td>
          </tr>
          </tbody>
        </table>
      </template>

      <template v-else-if="lang === 'en'">
        <table>
          <tbody><tr>
          <td>
            <ul class="nav clearfix">
              <li><a></a></li>
              <li><a></a></li>
              <li><a></a></li>
            </ul>
            <p><a href="https://netbank.hncb.com.tw/">https://netbank.hncb.com.tw</a>　Hua Nan Bank. All Rights Reserved</p>
            <p>HUA NAN COMMERCIAL BANK LTD.</p>
            <p>Business ID number  03742301</p>
          </td>
          <td>
            <p><a href="https://www.cdic.gov.tw/main_en/english.html" target="_blank">
            　 <img :src="'images/cdic_logo.jpeg'" alt=""></a></p>
          </td>
          </tr>
          </tbody>
        </table>
      </template>

      <template v-else-if="lang === 'cn'">
        <table>
          <tbody><tr>
          <td>
            <ul class="nav clearfix">
              <li><a href="#">联络我们</a></li>
              <li><a href="#">网路安全</a></li>
              <li><a href="#">客户隐私权保护</a></li>
            </ul>
            <p><a href="https://netbank.hncb.com.tw/">https://netbank.hncb.com.tw</a>　华南银行　版权所有　Hua Nan Bank. All Rights Reserved</p>
            <p>24小时客户服务中心：(02)2181-0101、免付费专线：0800-487888(限市话) 华南银行 机构代号 008</p>
          </td>
          <td>
            <p><a href="https://www.cdic.gov.tw/main_ch/index.aspx" target="_blank">
            　 <img :src="'images/cdic_logo.jpeg'" alt=""></a></p>
          </td>
          </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
