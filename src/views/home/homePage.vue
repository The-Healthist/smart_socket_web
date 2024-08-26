<template>
  <div :class="`theme-${currentTheme}`">
    <div class="flex flex-col gap-[10px] p-2.5">
      <div class="flex flex-row gap-2.5 w-full h-[128px]">
        <div class="w-[50%] h-[128px] bg-slate-300"></div>
        <div class="w-[50%] h-[128px] bg-slate-300"></div>
      </div>
      <div class="w-9/10 h-[128px] bg-slate-300"></div>
      <div class="flex flex-row gap-2.5 w-full h-[128px] px-5 py-2.5"></div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Demo">
import { reactive, computed } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";

const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const switchTheme = (theme: string) => {
  themeStore.setTheme(theme as ThemeColor);
};
</script>
