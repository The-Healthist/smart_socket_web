<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[469px] mt-[30vh] absolute"
    >
      <div class="flex flex-col gap-2.5">
        <!-- 第一行 -->
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate">
            插座名稱 :
          </span>
          <div class="text-large">{{ order.name }}</div>
        </div>
        <!-- 第二行 -->
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate">
            插座地址 :
          </span>
          <div class="text-large">{{ order.address }}</div>
        </div>
        <!-- 第三行 -->
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate">
            已使用 :
          </span>
          <div class="text-large font-bold">{{ order.price }}</div>
        </div>
        <!-- 第四行 -->
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate">
            剩餘 :
          </span>
          <div class="text-large font-bold">{{ order.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const order = route.query;

console.log(order);

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
</script>
