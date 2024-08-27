<template>
  <div
    :class="`theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[140vh]"
  >
    <div
      class="flex flex-col w-full h-full justify-center items-center px-2.5 py-5"
    >
      <div class="rounded-card bg-base w-[95vw] h-full flex flex-col">
        <div class="bg-primary flex flex-row gap-0">
          <button
            class="w-[47.5vw] h-[42px] flex flex-row gap-2.5 justify-center items-center"
            :class="
              isUse
                ? 'text-primary rounded-t-card'
                : 'text-inverted bg-primary rounded-br-card'
            "
            @click="isUse = true"
          >
            <span class="text-large">使用中</span>
            <i-icon icon="mingcute:flash-line" class="text-[20px]" />
          </button>
          <button
            class="w-[47.5vw] flex flex-row gap-2.5 justify-center items-center"
            :class="
              !isUse ? 'text-primary' : 'text-muted bg-primary rounded-bl-card'
            "
            @click="isUse = false"
          >
            <i-icon icon="tabler:clock" class="text-[20px]" />
            <span class="text-base">历史订单</span>
          </button>
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

const isUse = ref(true);
</script>
