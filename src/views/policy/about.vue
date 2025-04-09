<template>
  <div class="about-container">
    <h1 class="title">
      {{ currentLanguage === "en" ? "About Us" : "關於我們" }}
    </h1>

    <div class="language-toggle">
      <button
        :class="{ active: currentLanguage === 'en' }"
        @click="setLanguage('en')"
      >
        English
      </button>
      <button
        :class="{ active: currentLanguage === 'zh' }"
        @click="setLanguage('zh')"
      >
        繁體中文
      </button>
    </div>

    <div v-if="currentLanguage === 'en'" class="content">
      <h2>Our Introduction</h2>
      <p>
        AJO is a IT company that helps Incorporated Owners perform their daily
        tasks with technology. support@ajoliving.com
      </p>

      <h2>Who We Are</h2>
      <p>
        Our dedicated team of IT experts and building management experts are
        passionate about helping Incorporated Owners.
      </p>

      <p>
        For further information, please visit our website at
        <a href="https://www.ajoliving.com">https://www.ajoliving.com</a> or
        contact us at <a href="mailto:info@ajo.com">info@ajoliving.com</a>.
      </p>
    </div>

    <div v-else class="content">
      <h2>公司簡介</h2>
      <p>
        阿租是一家幫助業主立案法團利用科技執行日常任務的IT公司。support@ajo.com
      </p>

      <h2>我們是誰</h2>
      <p>
        我們由專業的IT專家和樓宇管理專家組成的團隊，致力於幫助業主立案法團。
      </p>

      <p>
        如需更多資訊，請瀏覽我們的網站
        <a href="https://www.ajo.com">https://www.ajo.com</a> 或聯絡我們：<a
          href="mailto:info@ajo.com"
          >info@ajo.com</a
        >。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentLanguage = ref("zh");

const setLanguage = (lang: string) => {
  currentLanguage.value = lang;
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.language-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.language-toggle button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-toggle button.active {
  background-color: #4a90e2;
  color: white;
}

.content {
  line-height: 1.6;
}

h2 {
  margin-top: 20px;
  color: #4a90e2;
}

a {
  color: #4a90e2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
