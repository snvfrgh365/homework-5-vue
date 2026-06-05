# 作業5 Vue 單一檔案元件 SFCs - 華南網銀釣魚網站改寫

**姓名**：[請填寫您的姓名]  
**班級**：[請填寫您的班級]  
**網站標題**：華南銀行網路銀行 - SFCs 改寫版  
**GitHub Pages 連結**：https://[您的GitHub帳號].github.io/vue-sfc/  
**GitHub Repo**：https://github.com/[您的GitHub帳號]/vue-sfc  

---

## 一、專案目標與執行流程

本次作業的目標是將原本以純 HTML、CSS、JS 構成的「華南網銀釣魚網站（作業3）」，改寫為由 **Vue SFC (Single File Components)** 組成的現代前端專案架構。我們將介面拆解成數個獨立元件，並保持 `index.html` 與 `main.js` 的乾淨度。

### 執行流程：
1. **建立 Vue 專案**：使用 Vite 建立名為 `vue-sfc` 的專案目錄 (`npm create vue@latest`)。
2. **遷移靜態資源**：將原本提取出的 CSS (例如 `css.css`, `keyboard.css`) 及圖片 (例如 `logo.gif`, `banner.jpg`) 移至專案的 `public/` 目錄中，讓 Vue 可以直接存取。
3. **拆解與實作元件**：把原本龐大的 `bank.html` 依照版面結構拆分成 5 大 Vue 獨立元件，並存放於 `src/components/` 資料夾下。
4. **App.vue 整合**：在 `App.vue` 引入上述建立好的元件，完成整個畫面的組裝。
5. **部署設定**：設定 `vite.config.js` 的 `base` 路徑，並建立 `.github/workflows/deploy.yml` 讓 GitHub Actions 能自動發布到 GitHub Pages。

---

## 二、元件架構介紹

我們將整個網站的 UI 切割成以下幾個功能獨立的 Vue SFC 元件：

### 1. `AppHeader.vue` (頁首區域)
負責顯示華南銀行的 Logo 以及上方的快速導覽連結（例如：語言切換、企業網銀、華南金控）。這部分抽離出來後，使得整體版面的頭部邏輯更為清晰。

### 2. `ImageSlider.vue` (左側輪播圖)
原本這區塊依賴外部的 bxslider 程式庫，現在我們改用 Vue 原生的資料驅動 (Data-driven) 方式。
- **作法**：使用 `v-for` 渲染圖片列表，並透過 `setInterval` 計時器自動改變 `currentIndex` 來達成輪播效果。滑鼠移入時會暫停計時。

### 3. `LoginForm.vue` (核心登入表單)
包含使用者身分證字號、代號、密碼輸入框以及圖形驗證碼。
- **作法**：
  - 使用 `v-model` 綁定輸入資料。
  - 密碼框的「顯示/隱藏」功能改用 Vue 的狀態切換 (`type="text"` 或 `type="password"`) 達成，拋棄了原本複雜的 DOM 操作。
  - 實作了「清除重填」的方法 (`resetForm`)，點擊後會把綁定的變數清空。

### 4. `QuickLinks.vue` (快速連結區塊)
負責登入表單下方的三欄式連結：**必讀手冊**、**軟體下載** 與 **快速連結**。這個元件是純靜態展示，主要目的是為了避免 `App.vue` 中的 HTML 結構過度肥大。

### 5. `NoticeBoard.vue` (公告與榮耀區塊)
負責網頁最下方版面的「公告事項」文字列表與右側的「華南榮耀」圖片輪播區塊。
- **作法**：跟 `ImageSlider` 類似，我們同樣使用了 Vue 的響應式資料與計時器來實作小型的自動輪播展示。

### 6. `AppFooter.vue` (頁腳區域)
包含頁面底部的版權聲明、聯絡資訊以及存款保險的標誌。

---

## 三、如何用元件構成整個網站？

經過上述的拆解後，我們可以看看原本複雜的 HTML 是如何在 `App.vue` 中被優雅地組合起來：

```vue
<script setup>
// 引入所有子元件
import AppHeader from './components/AppHeader.vue'
import ImageSlider from './components/ImageSlider.vue'
import LoginForm from './components/LoginForm.vue'
import QuickLinks from './components/QuickLinks.vue'
import NoticeBoard from './components/NoticeBoard.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="private">
    <!-- 頁首 -->
    <AppHeader />
    
    <div class="content">
      <div class="wrapper">
        <div class="login_box clearfix">
          <!-- 左側輪播圖與右側登入表單 -->
          <ImageSlider />
          <LoginForm />
        </div>
        
        <!-- 三欄式連結 -->
        <QuickLinks />
        
        <!-- 公告事項與華南榮耀 -->
        <NoticeBoard />
      </div>
    </div> 
    
    <!-- 頁腳 -->
    <AppFooter />
  </div>
</template>

<style>
/* 匯入所有全域 CSS 以套用原本的樣式 */
@import url('/css/css.css');
@import url('/css/keyboard.css');
@import url('/css/jquery-ui.min.css');
@import url('/css/jquery.bxslider.css');
@import url('/css/font-awesome.css');

body {
  margin: 0;
  padding: 0;
}
</style>
```

**教學小結**：
透過 Vue 的組件化設計，主程式碼 `App.vue` 變得非常乾淨，只有像積木一樣的元件組合。`index.html` 中也只留下了 `<div id="app"></div>`，完全隔離了結構 (HTML)、樣式 (CSS) 與邏輯 (JavaScript) 的糾纏，達到了現代化網頁開發「關注點分離」的要求！

*(請在此處插入截圖：展示 npm run dev 後本地運行的畫面，以及 GitHub Pages 成功部署的畫面)*
