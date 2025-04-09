<template>
  <div class="privacy-container">
    <h1 class="title">
      {{ currentLanguage === "en" ? "Privacy Policy" : "私隱政策" }}
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
      <p class="last-updated">Last updated: April 17, 2024</p>
      <p class="company-name">
        AJO PARTNERS LIVING TECHNOLOGY LIMITED (hereinafter "AJO")
      </p>

      <ol>
        <li>
          AJO is committed to protecting members' privacy and ensuring personal
          data is secured. Members' personal data will be treated
          confidentially, and policies and practices regarding the collection,
          use, storage, disclosure, transfer, confidentiality, and access to
          personal data comply with Hong Kong legal requirements.
        </li>
        <li>
          AJO will implement appropriate technical and organizational measures
          to protect personal data provided by members against accidental or
          unlawful destruction, loss, alteration, disclosure, or access.
        </li>
        <li>
          Members agree that AJO may use and retain personal data provided to
          AJO and data collected during members' use of AJO's website for the
          following purposes:
          <ul>
            <li>Processing applications of registered residents;</li>
            <li>Providing AJO's services to residents;</li>
            <li>
              Normal management, operation, and maintenance of AJO's website;
            </li>
            <li>
              Providing retail products or payment services requested by
              members;
            </li>
            <li>
              Investigating complaints, suspicious transactions, and researching
              service improvements;
            </li>
            <li>Preventing and detecting crime;</li>
            <li>Making disclosures as required by law.</li>
          </ul>
        </li>
        <li>
          AJO will not store members' credit card information for online
          payments made on the website.
        </li>
      </ol>
    </div>

    <div v-else class="content">
      <p class="last-updated">最後更新於2024年4月17日</p>
      <p class="company-name">阿租物業科技有限公司 下稱「AJO」</p>

      <ol>
        <li>
          AJO承諾保障會員的私隱，並確保會員的個人資料受到保護，會員的個人資料會保密處理，並確保有關收集、使用、保存、披露、轉移、保密及查閱個人資料的政策及常規，均符合香港法例規定。
        </li>
        <li>
          AJO將採取適當的技術和企業措施，以保護會員提供的個人資料，防止意外或非法銷毀、丟失、更改、披露或存取會員的個人資料。
        </li>
        <li>
          會員同意AJO可使用及保存會員向AJO提供的有關個人資料，及會員在使用AJO的網站以作：
          <ul>
            <li>處理的登記住戶之申請；</li>
            <li>向住戶提供AJO的服務；</li>
            <li>AJO網站的正常管理、運作及保養；</li>
            <li>向會員提供會員要求的零售產品或付款服務；</li>
            <li>調查投訴、備受懷疑的可疑交易及研究服務改善措施；</li>
            <li>防止及偵測罪行；</li>
            <li>根據法例作出披露。</li>
          </ul>
        </li>
        <li>於網站付款時，AJO將不會保存會員在網上付款的信用卡資料。</li>
      </ol>
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
.privacy-container {
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

.last-updated {
  font-style: italic;
  color: #666;
}

.company-name {
  font-weight: bold;
  margin-bottom: 20px;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 15px;
}

ul {
  margin-top: 10px;
  list-style-type: disc;
  padding-left: 20px;
}

ul li {
  margin-bottom: 5px;
}
</style>
