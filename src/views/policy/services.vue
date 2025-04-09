<template>
  <div class="services-container">
    <h1 class="title">
      {{ currentLanguage === "en" ? "Service Terms" : "服務條款" }}
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

      <div class="section">
        <p class="clause">
          1.1 We, AJO PARTNERS LIVING TECHNOLOGY LIMITED (hereinafter referred
          to as "we," "us," "our," or "the website"), own and operate this
          website. Our website provides convenient payment services (the
          "Services") through the internet (including through applications or
          software). AJO is located in Hong Kong. By displaying services on our
          website, AJO only sells to those who accept governance by Hong Kong
          law. If you make payments on this website, the payments will be
          considered subject to Hong Kong law and bound by these Terms of Use.
        </p>
      </div>

      <div class="section">
        <p class="clause">
          1.2 Your use of the website and payments made on this website indicate
          your agreement to be bound by the following terms and conditions.
          Please read these terms and conditions carefully.
        </p>
      </div>

      <div class="section">
        <p class="clause">
          1.3 The meaning of certain terms used in these terms and conditions:
        </p>
        <p class="sub-clause">
          1.3.1 "We" refers to (the name of the person or company providing the
          services).
        </p>
        <p class="sub-clause">
          1.3.2 "You" refers to the person to whom we provide services or
          deliver goods and who is required to pay for the goods we deliver.
        </p>
        <p class="sub-clause">
          1.3.3 "Content" refers to all text, graphics, logos, icons,
          photographs, images, moving visual representations or combinations of
          sound and images, and other materials selected, displayed, or used by
          or in connection with our website, including images, sounds, computer
          programs, and other materials.
        </p>
        <p class="sub-clause">
          1.3.4 "Goods" refers to the goods or services ordered by you through
          our website and for which you will pay.
        </p>
        <p class="sub-clause">
          1.3.5 "Services" has the meaning given in clause 1.1.
        </p>
        <p class="sub-clause">
          1.3.6 "Supplier" refers to the supplier of goods ordered by you
          through our website.
        </p>
        <p class="sub-clause">
          1.3.7 "User Content" has the meaning given in clause 11.1.
        </p>
      </div>

      <div class="section">
        <p class="clause">
          2. In case of any dispute, AJO reserves the right of final decision.
        </p>
      </div>
    </div>

    <div v-else class="content">
      <p class="last-updated">最後更新於 2024年4月17日</p>

      <div class="section">
        <p class="clause">
          1.1
          我們阿租物業科技有限公司(以下簡稱為「我們」、「本網站」)，且我們擁有及經營網站。我們的網站透過互聯網（包括透過使用應用程式或軟件）提供便利的繳費服務（「服務」）。AJO位於香港。通過顯示在網站上的服務，AJO只銷售給那些可接受香港法律規管的人。如果在本網站付款，款項將被視為受香港法律及被本使用條款所約束。
        </p>
      </div>

      <div class="section">
        <p class="clause">
          1.2
          閣下使用網站及於本網站付款，即代表閣下同意受下列條款及細則所約束。請細閱有關條款及細則。
        </p>
      </div>

      <div class="section">
        <p class="clause">1.3 條款及細則所用若干詞彙的涵義：</p>
        <p class="sub-clause">
          1.3.1「我們」乃對（提供服務的人士或公司的姓名或名稱）的提述。
        </p>
        <p class="sub-clause">
          1.3.2「閣下」乃對我們向其提供服務或交付商品的人士及須就我們所交付的商品付款的人士的提述。
        </p>
        <p class="sub-clause">
          1.3.3「內容」指所有文字、圖像、標誌、圖標、相片、影像、移動視覺具象圖像或聲音的結合及我們的網站所選、所示或所用或與之有關的圖像、音效、電腦程式及其他材料。
        </p>
        <p class="sub-clause">
          1.3.4「商品」指閣下透過我們的網站所訂購及將會支付的貨物或服務。
        </p>
        <p class="sub-clause">1.3.5「服務」具有第1.1條所賦予的涵義。</p>
        <p class="sub-clause">
          1.3.6「供應商」指閣下透過我們的網站所訂購商品的供應商。
        </p>
        <p class="sub-clause">1.3.7「用戶內容」指具有第11.1條所賦予的涵義。</p>
      </div>

      <div class="section">
        <p class="clause">2.如有任何爭議，AJO保留最終決定權</p>
      </div>
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
.services-container {
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
  margin-bottom: 20px;
}

.section {
  margin-bottom: 20px;
}

.clause {
  margin-bottom: 10px;
}

.sub-clause {
  margin-left: 20px;
  margin-bottom: 8px;
}
</style>
