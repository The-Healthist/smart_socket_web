<template>
  <div
    :class="`tools-content pt-[20px] px-[12px] theme-${currentTheme} rounded-${rounded}`"
  >
    <!-- Mock -->

    <!-- online iconify icon -->
    <div>
      <i-icon
        v-for="item in iconOnlineList"
        :key="item"
        :icon="item"
        class="inline-block text-[24px] mr-3 text-primary"
      />
    </div>

    <!-- local svg file icon -->
    <div>
      <svg-icon
        v-for="item in svgIconLocalList"
        :key="item"
        :name="item"
        class="inline-block text-[24px] mr-3 text-primary"
      />
    </div>

    <!-- Theme switcher -->
    <div class="mt-10">
      <span class="text-primary/[0.5]">点击下方按钮切换主题</span>
      <div class="mt-5">
        <button
          v-for="t in themes"
          :key="t"
          class="border rounded p-2 mr-5 bg-secondary text-primary"
          @click="themeStore.setTheme(t)"
        >
          {{ t }}
        </button>
      </div>
    </div>
    <!-- Roundness Switcher -->
    <div :class="`rounded-${rounded} mt-10`">
      <span class="text-inverted/[0.5]">点击下方按钮切换圆角</span>
      <div class="mt-5">
        <button
          v-for="r in roundeds"
          :key="r"
          class="border rounded p-2 mr-5 bg-secondary text-inverted"
          @click="roundedStore.setRounded(r)"
        >
          {{ r }}
        </button>
      </div>
    </div>

    <!-- text switcher -->
    <div :class="`font-${text} mt-10`">
      <span class="text-primary/[0.5]">点击下方按钮切换字体</span>
      <div class="mt-5">
        <button
          v-for="t in texts"
          :key="t"
          class="border rounded p-2 mr-5 bg-secondary text-inverted"
          @click="textStore.setText(t)"
        >
          {{ t }}
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

    <!-- Primary Button -->
    <div :class="`rounded-${rounded} mt-10 flex flex-row gap-2.5 `">
      <InvertedButton>
        <template #default>
          <div
            class="text-primary w-[80px] h-[22px] flex flex-row justify-center items-center"
          >
            <span class="font-bold font-CactusClassicalSerifHK text-center">
              遠程啓動
            </span>
          </div>
        </template>
      </InvertedButton>
      <PrimaryButton>
        <template #default>
          <div
            class="text-inverted w-[234px] h-[22px] flex flex-row justify-center items-center gap-2"
          >
            <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            <span class="font-NotoSansHK text-xl font-bold tracking-wide"
              >扫码租用</span
            >
          </div>
        </template>
      </PrimaryButton>
    </div>
    <PrimaryButton>
      <template #default>
        <div
          class="text-inverted w-[234px] h-[22px] flex flex-row justify-center items-center gap-2"
        >
          <i-icon icon="mingcute:flash-line" class="text-[20px]" />
          <span class="font-NotoSerifHK text-xl font-bold tracking-wide"
            >扫码租用</span
          >
        </div>
      </template>
    </PrimaryButton>
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

const iconOnlineList = [
  "material-symbols:admin-panel-settings-outline",
  "jam:android",
  "lucide:badge-check",
  "pixelarticons:heart",
  "fxemoji:alienmonster",
  "meteocons:thunderstorms-day-overcast-fill",
  "mdi:electricity-outline"
];

const modules = import.meta.glob("../../icons/svg/*.svg", { eager: true });
const svgIconLocalList = Object.keys(modules).map(key =>
  key.replace("../../icons/svg/", "").replace(".svg", "")
);
const themeStore = useThemeStore();
const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const texts = computed(() => textStore.getTexts);
const roundedStore = useRoundedStore();
const rounded = computed(() => roundedStore.getRounded);
const roundeds = computed(() => roundedStore.getRoundeds);
const switchTheme = (theme: string) => {
  themeStore.setTheme(theme as ThemeColor);
};

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
