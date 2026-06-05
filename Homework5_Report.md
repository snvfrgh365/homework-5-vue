# 作業5 Vue 單一檔案元件 (SFCs) 實作報告

**姓名**：[請填寫您的姓名]  
**班級**：[請填寫您的班級]  
**網站標題**：釣魚網站 (華南銀行個人網路銀行) Vue 重構版  

---

## 一、 專案執行流程與畫面說明

本次作業的目標是將原本混雜了大量 HTML、CSS 與原生 JavaScript 操作的釣魚網站 (作業3)，徹底改寫為現代化的 **Vue 3 單一檔案元件 (SFC)** 架構。

### 步驟 1：建立 Vue 專案與環境設定
1. 使用 `npm create vue@latest` 建立基礎專案。
2. 安裝並設定 `vue-router`，透過路由 `/`、`/en`、`/cn` 來控制網站的多國語系切換，取代過去需要三份實體 HTML 檔案 (`bank.html`, `bank_en.html`, `bank_cn.html`) 的作法。
3. 將原有的全域 CSS (`css.css`, `keyboard.css` 等) 引入 `main.js` 或 `index.html` 中，保持入口檔案乾淨。

### 步驟 2：版面拆解與元件化
我將整個網站的 UI 拆解成多個可複用的 Vue 元件 (放置於 `src/components/` 下)，並且統一接收 `lang` (語系) 的 Props，讓元件可以根據當前路由自動變換語言文字。

*(此處請附上您的網站首頁截圖：例如：`![網站首頁](您的截圖路徑.png)`)*

### 步驟 3：互動邏輯 Vue 化
原本 `bank.js` 裡充斥著 `document.getElementById` 等直接操作 DOM 的程式碼。在 Vue 的世界裡，我們改用「資料驅動視圖」的概念：
- 使用 `ref` 與 `reactive` 定義狀態 (如密碼是否顯示、小鍵盤是否開啟)。
- 使用 `v-model` 雙向綁定表單輸入框。
- 使用 `v-if` / `v-show` 搭配條件判斷來控制 DOM 的顯示與隱藏。

*(此處請附上小鍵盤開啟時的截圖：例如：`![虛擬小鍵盤畫面](您的截圖路徑.png)`)*

---

## 二、 網站元件介紹與架構解析

為了解決原本架構過於龐大難以維護的問題，我將網站拆分成以下核心元件：

### 1. `AppHeader.vue` (網站頭部)
負責顯示網站的 Logo 以及右上角的語系切換導覽列。
透過 `<router-link>`，點擊 English 或 简体中文 時，會透過 Vue Router 無縫切換路由，避免畫面重新整理。

### 2. `LoginForm.vue` (登入表單核心)
這是本專案最核心的元件，負責處理：
- 身分證字號、代號、密碼的雙向綁定 (`v-model`)。
- 圖形驗證碼的重新產生功能 (`@click` 觸發更換圖片 src)。
- **觸發小鍵盤**：透過 `$emit` 或全域狀態呼叫小鍵盤開啟。
- **密碼提示框**：點擊 `(i)` 時觸發顯示密碼提示。

### 3. `VirtualKeyboard.vue` (虛擬小鍵盤)
將原本幾百行的原生鍵盤邏輯封裝在此。
- 利用陣列 `v-for` 渲染鍵盤按鈕。
- 內部維護「大小寫狀態」(`capsLock`) 與「輸入值」。
- 將點擊的字元透過原生事件或事件匯流排回傳給 `LoginForm.vue` 裡的密碼框。

### 4. `PasswordInfo.vue` (密碼說明提示框)
純粹的展示型元件，透過 `v-if` 控制顯示。並會接收 `lang` Prop 來決定顯示繁體中文、英文或簡體中文的密碼規則。

### 5. `QuickLinks.vue` (快速連結與手冊)
包含「必讀手冊」、「軟體下載」、「快速連結」三大區塊。
透過 `v-if="lang === 'tw'"` 等判斷式，在英文版時隱藏不必要的資訊，在簡中版時替換為簡體字。

### 6. `NoticeBoard.vue` (重要公告區)
包含下方的安全提示與系統公告。同理，利用 `v-if` 判斷當前語系，呈現出原本 `bank_en.html` 與 `bank.html` 完全不同的排版與內容。

### 7. `AppFooter.vue` (網站頁尾)
負責顯示版權宣告、客服專線與相關圖示。

---

## 三、 元件如何構成整個網站 (組裝方式)

在 Vue SFC 的架構下，所有的元件最終都會在「頁面元件 (Views)」中被組合起來。

我的組裝邏輯如下：
1. **`src/App.vue`** (根節點)
   作為整個應用的入口，內部只放置 `<RouterView />` 以及全域的浮動元件 (`<VirtualKeyboard />` 和 `<PasswordInfo />`)。

2. **`src/views/Home.vue`** (首頁骨架)
   這是由 Router 載入的主要頁面。在此檔案中，我引入了所有拆分好的子元件，並將路由取得的語系變數傳遞下去：
   ```vue
   <template>
     <div class="private">
       <!-- 傳遞 lang prop 給所有子元件 -->
       <AppHeader :lang="currentLang" />
       
       <div class="content">
         <div class="wrapper">
           <div class="login_box clearfix">
             <!-- 左側輪播圖保留 -->
             <!-- 右側登入框 -->
             <LoginForm :lang="currentLang" />
           </div>
           
           <QuickLinks :lang="currentLang" />
           <NoticeBoard :lang="currentLang" />
         </div>
       </div>
       
       <AppFooter :lang="currentLang" />
     </div>
   </template>
   ```

**總結教學**：
透過這樣的元件化設計，未來若要修改「登入表單」，只需打開 `LoginForm.vue`；若要修改「公告」，只需編輯 `NoticeBoard.vue`。所有的 HTML、CSS 與 JS 都被高度內聚在各自的單一檔案中，這就是 Vue SFC 帶來的最大優勢！
