<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary/20 to-skin-primary h-[140vh]"
  >
    <!-- 主容器 -->
    <div>
      <!-- 內部佈局容器 -->
      <div class="flex flex-col w-full space-y-2.5 p-2.5 absolute">
        <!-- 卡片樣式容器 -->
        <div class="rounded-card w-full h-[128px] bg-base/90" />
        <div class="flex flex-row space-x-2.5 w-full h-[100px]">
          <div class="rounded-card w-[50vw] h-[100px] bg-base/90" />
          <div class="rounded-card w-[50vw] h-[100px] bg-base/90" />
        </div>
        <div class="rounded-card w-full h-[128px] bg-base/90" />
        <!-- 登錄按鈕容器 -->
        <div class="flex flex-row w-full p-2.5">
          <div class="flex flex-row space-x-[15px]">
            <img
              class="rounded-full w-[15vw] h-[15vw]"
              src="/src/assets/ang.png"
              alt="ang"
              @click="router.push({ name: 'Login' })"
            />
            <div class="flex flex-col space-y-[2.75px] w-[65vw]">
              <span class="text-larger text-baseC font-medium">iSmart</span>
              <span class="text-inverted text-base font-normal"
                >為你生活來電的第365天</span
              >
            </div>
          </div>
          <div>
            <button
              class="text-inverted hover:text-primary w-[6vw] h-full flex justify-center items-center"
              @click="navigateToSetting"
            >
              <i-icon icon="uil:setting" class="text-[22px]" />
            </button>
          </div>

          <div />
        </div>
        <!-- 功能按鈕區 -->
        <div
          class="rounded-card bg-base text-mutedC flex flex-row justify-between space-x-2.5 w-full h-[77px] px-5 py-2.5"
        >
          <div class="flex flex-col space-y-[4px] justify-center items-center">
            <i-icon icon="bx:wallet" class="text-[36px]" />
            <div>我的錢包</div>
          </div>
          <div class="flex flex-col space-y-[4px] justify-center items-center">
            <i-icon icon="cil:list" class="text-[36px]" />
            <div>我的訂單</div>
          </div>
          <div class="flex flex-col space-y-[4px] justify-center items-center">
            <i-icon icon="icon-park-outline:woman" class="text-[36px]" />
            <div>客服中心</div>
          </div>
          <div class="flex flex-col space-y-[4px] justify-center items-center">
            <i-icon icon="hugeicons:safari" class="text-[36px]" />
            <div>使用指南</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="AuthPage">
// 引入Vue相關功能
import { reactive, computed } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";

// 使用主題相關的store
const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const texts = computed(() => textStore.getTexts);
const router = useRouter();

// 導航到設置頁面的函數
const navigateToSetting = () => {
  console.log("Navigating to Setting");
  router.push({ name: "Setting" }).catch((err) => console.error(err));
};
</script>
