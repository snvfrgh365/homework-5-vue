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
            <li class="clearfix"><span>1</span><a href="#">網路銀行最新防制洗錢宣導</a></li>
            <li class="clearfix"><span>2</span><a href="#">網路銀行服務常見問題及說明</a></li>
            <li class="clearfix"><span>3</span><a href="#">「華南銀行+」APP使用說明與常見問題解答</a></li>
            <li class="clearfix"><span>4</span><a href="#">本行防護措施</a></li>
            <li class="clearfix"><span>5</span><a href="#">客戶應採行防護措施</a></li>
            <li class="clearfix"><span>6</span><a href="#">最新公告</a></li>
          </ul>
        </div>
      </div>
      <div class="download">
        <h2>軟體下載</h2>
        <div class="list_box">
          <ul>
            <li class="clearfix"><img src="/images/icon_1.png">
              <a href="#"><strong>華南銀行+ 企業版 App</strong><br>
                <span>提供企業戶更多元行動服務</span>
              </a>
            </li>
            <li class="clearfix"><img src="/images/icon_2.png">
              <a href="#"><strong>華南銀行+ App</strong><br>
                <span>提供個人戶更多元行動服務</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="link">
        <h2>快速連結</h2>
        <div class="list_box">
          <ul>
            <li><a href="#">信用卡</a></li>
            <li><a href="#">理財資訊</a></li>
            <li><a href="#">信託網</a></li>
            <li><a href="#">學雜費代收</a></li>
            <li><a href="#">票據法</a></li>
            <li><a href="#">線上申貸</a></li>
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
            <li class="clearfix"><span>1</span><a href="#">网路银行最新防制洗钱宣导</a></li>
            <li class="clearfix"><span>2</span><a href="#">网路银行服务常见问题及说明</a></li>
            <li class="clearfix"><span>3</span><a href="#">「华南银行+」APP使用说明与常见问题解答</a></li>
            <li class="clearfix"><span>4</span><a href="#">本行防护措施</a></li>
            <li class="clearfix"><span>5</span><a href="#">客户应采行防护措施</a></li>
            <li class="clearfix"><span>6</span><a href="#">最新公告</a></li>
          </ul>
        </div>
      </div>
      <div class="download">
        <h2>软体下载</h2>
        <div class="list_box">
          <ul>
            <li class="clearfix"><img src="/images/icon_1.png">
              <a href="#"><strong>华南银行+ 企业版 App</strong><br>
                <span>提供企业户更多元行动服务</span>
              </a>
            </li>
            <li class="clearfix"><img src="/images/icon_2.png">
              <a href="#"><strong>华南银行+ App</strong><br>
                <span>提供个人户更多元行动服务</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="link">
        <h2>快速连结</h2>
        <div class="list_box">
          <ul>
            <li><a href="#">信用卡</a></li>
            <li><a href="#">理财资讯</a></li>
            <li><a href="#">信托网</a></li>
            <li><a href="#">学杂费代收</a></li>
            <li><a href="#">票据法</a></li>
            <li><a href="#">线上申贷</a></li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
