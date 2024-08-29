<template>
  <div
    :class="`bg-gradient-to-b from-skin-primary/30 to-skin-primary/10 tools-content pt-[20px] px-[12px] h-[135vh] font-${text} theme-color-${currentTheme} theme-rounded-${rounded} theme-fontsize-${currentFontSize}`"
  >
    <!-- Theme switcher -->
    <div class="mt-0">
      <span class="text-primary">主题颜色</span>
      <div class="mt-5">
        <button
          v-for="t in themes"
          :key="t"
          class="border rounded-button p-2 mr-5 bg-primary text-inverted"
          @click="themeStore.setTheme(t)"
        >
          {{ t }}
        </button>
      </div>
    </div>
    <!-- Roundness Switcher -->
    <div :class="`theme-rounded-${rounded} mt-10`">
      <span class="text-primary">圆角大小</span>
      <div class="mt-5">
        <button
          v-for="r in roundeds"
          :key="r"
          class="border rounded-button p-2 mr-5 bg-primary text-inverted"
          @click="roundedStore.setRounded(r)"
        >
          {{ r }}
        </button>
      </div>
    </div>

    <!-- Font Size Switcher -->
    <div :class="`text-base mt-10`">
      <span class="text-primary">字体大小</span>
      <div class="mt-5">
        <button
          v-for="size in currentFontSizes"
          :key="size"
          class="border rounded p-2 mr-5 bg-primary text-inverted"
          @click="fontsizeStore.setFontSize(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- text switcher -->
    <div class="mt-10">
      <span class="text-primary">字体选择</span>
      <div class="mt-5 grid grid-cols-3 gap-4">
        <!-- NotoSansHK -->
        <button
          class="font-NotoSansHK border rounded p-2 bg-primary text-inverted"
          @click="textStore.setText('NotoSansHK')"
        >
          NotoSansHK
        </button>

        <!-- NotoSerifHK -->
        <button
          class="font-NotoSerifHK border rounded p-2 bg-primary text-inverted"
          @click="textStore.setText('NotoSerifHK')"
        >
          NotoSerifHK
        </button>

        <!-- CactusClassicalSerifHK -->
        <button
          class="font-CactusClassicalSerifHK border rounded p-2 bg-primary text-inverted"
          @click="textStore.setText('CactusClassicalSerifHK')"
        >
          CactusClassicalSerifHK
        </button>

        <!-- NotoSansTC -->
        <button
          class="font-NotoSansTC border rounded p-2 bg-primary text-inverted"
          @click="textStore.setText('NotoSansTC')"
        >
          NotoSansTC
        </button>

        <!-- NotoSerifTC -->
        <button
          class="font-NotoSerifTC border rounded p-2 bg-primary text-inverted"
          @click="textStore.setText('NotoSerifTC')"
        >
          NotoSerifTC
        </button>

        <!-- LXGWWenKaiMonoTCHK -->
        <button
          class="font-LXGWWenKaiMonoTCHK border rounded p-2 bg-primary text-inverted"
          @click="textStore.setText('LXGWWenKaiMonoTCHK')"
        >
          LXGWWenKaiMonoTCHK
        </button>
      </div>
    </div>

    <!-- Color Palette -->
    <div class="mt-10">
      <h3 class="font-bold text-[18px] my-[4px]">Color Palette</h3>
      <div class="grid grid-cols-6 gap-4 mt-5">
        <div
          v-for="color in colorPalette"
          :key="color.varName"
          class="flex flex-col items-center"
        >
          <div
            :style="{
              width: '22px',
              height: '22px',
              backgroundColor: `rgb(var(${color.varName}))`,
              border: '1px solid #000'
            }"
            class="mb-1"
          />
          <span class="text-sm">{{ color.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useThemeStore, ThemeColor } from "@/store/theme/themeStore";
import "vant/es/toast/style";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useTextStore } from "@/store/theme/textStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";

const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const texts = computed(() => textStore.getTexts);
const roundedStore = useRoundedStore();
const rounded = computed(() => roundedStore.getRounded);
const roundeds = computed(() => roundedStore.getRoundeds);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const currentFontSizes = computed(() => fontsizeStore.getFontSizes);

// 颜色调色板
const colorPalette = [
  { name: "Primary", varName: "--color-primary" },
  { name: "Secondary", varName: "--color-secondary" },
  { name: "Background", varName: "--color-background" },
  { name: "Background Secondary", varName: "--color-background-secondary" },
  { name: "Card Background", varName: "--color-card-background" },
  { name: "Separator", varName: "--color-separator" },
  { name: "Text Primary", varName: "--color-text-primary" },
  { name: "Text Secondary", varName: "--color-text-secondary" },
  { name: "Border", varName: "--color-border" },
  { name: "Link", varName: "--color-link" },
  { name: "Link Hover", varName: "--color-link-hover" },
  { name: "Error", varName: "--color-error" },
  { name: "Success", varName: "--color-success" }
];
</script>
