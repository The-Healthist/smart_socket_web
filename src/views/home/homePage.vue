<template>
  <div :class="`theme-${currentTheme}`">
    <div class="flex flex-col gap-[10px]">
      <div class="flex flex-row gap-2.5">
        <div class="w-4.5/10 h-[128px] bg-slate-300"></div>
        <div class="w-4.5/10 h-[128px] bg-slate-300"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Demo">
import { reactive, computed } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type Theme } from "@/store/theme/themeStore";

const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const switchTheme = (theme: string) => {
  themeStore.setTheme(theme as Theme);
};
</script>
