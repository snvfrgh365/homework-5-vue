<script setup>
defineProps({
  lang: {
    type: String,
    default: 'tw'
  }
})
</script>

<template>
  <div class="private_main clearfix">
    <template v-if="lang === 'tw' || lang === 'cn'">
      <table width="96%" border="0" cellspacing="0" cellpadding="3">
        <tbody>
          <tr class="content12gy">
            <td>
              <table border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td width="4" height="4" align="center" class="title12rdb"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bgl.gif" width="4" height="23"></td>
                    <td width="80" align="center" background="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bg.gif"><span class="title20bg">{{ lang === 'cn' ? '重要公告' : '重要公告' }} </span></td>
                    <td width="4"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlearea_bgr.gif" width="900px" height="23"></td>
                    <td background="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/titlebar_bg.gif">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="content12gy">
            <td valign="top"><img src="https://netbank.hncb.com.tw/netbank/pages/images/login_SGU/icon_cross2.gif" width="7" height="7" hspace="4" vspace="4" align="absmiddle">{{ lang === 'cn' ? '安全提示：为了保障您的网路交易安全，' : '安全提示：為了保障您的網路交易安全，' }}<br>
              <ol>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr><td align="right" width="15" valign="top">1.</td><td>{{ lang === 'cn' ? '密码勿告知他人：本行绝对不会以任何方式要求您告知网路银行密码。' : '密碼勿告知他人：本行絕對不會以任何方式要求您告知網路銀行密碼。' }}</td></tr>
                    <tr><td align="right" width="15" valign="top">2.</td><td>{{ lang === 'cn' ? '请自行输入网址：勿透过电子邮件或其他网站上之连结连至网路银行。' : '請自行輸入網址：勿透過電子郵件或其他網站上之連結連至網路銀行。' }}</td></tr>
                  </tbody>
                </table>
              </ol>
            </td>
          </tr>
        </tbody>
      </table>
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
