<script setup lang="ts">
import { ref, computed } from "vue";
import { useThemeStore, Theme } from "@/store/theme/themeStore";
import { getListApi, getListApiError } from "@/api/mock";
import { showFailToast, showSuccessToast } from "vant";
import "vant/es/toast/style";
import Fa6SolidAddressBook from "@iconify-icons/fa6-solid/address-book";
import Fa6SolidAppleWhole from "@iconify-icons/fa6-solid/apple-whole";
import Fa6SolidBaby from "@iconify-icons/fa6-solid/baby";
import Fa6SolidBasketball from "@iconify-icons/fa6-solid/basketball";
import Fa6SolidBurger from "@iconify-icons/fa6-solid/burger";
import Fa6SolidChessKnight from "@iconify-icons/fa6-solid/chess-knight";

const themeStore = useThemeStore();
const showList: string[] = [];

const handleSuccessReq = async () => {
  const { list } = await getListApi();
  showSuccessToast("请求成功");
  showList.push(...list);
};

const handleErrorReq = () => {
  getListApiError().then(
    () => {},
    err => {
      console.log(err);
      showFailToast("请求有误");
    }
  );
};

const iconOnlineList = [
  "material-symbols:admin-panel-settings-outline",
  "jam:android",
  "lucide:badge-check",
  "pixelarticons:heart",
  "fxemoji:alienmonster",
  "meteocons:thunderstorms-day-overcast-fill"
];

const iconOfflineList = [
  Fa6SolidAddressBook,
  Fa6SolidAppleWhole,
  Fa6SolidBaby,
  Fa6SolidBasketball,
  Fa6SolidBurger,
  Fa6SolidChessKnight
];

const modules = import.meta.glob("../../icons/svg/*.svg", { eager: true });
const svgIconLocalList = Object.keys(modules).map(key =>
  key.replace("../../icons/svg/", "").replace(".svg", "")
);

const themes = themeStore.themes;
const currentTheme = computed(() => themeStore.getTheme);

const switchTheme = (theme: string) => {
  console.log(themeStore.getTheme);
  themeStore.setTheme(theme as Theme);
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

<template>
  <div :class="`tools-content pt-[20px] px-[12px] theme-${currentTheme}`">
    <!-- Mock -->

    <!-- Icon -->
    <div class="pl-[12px] border-l-[3px] border-primary mt-[24px] mb-[12px]">
      <h3 class="font-bold text-[18px] my-[4px]">Iconify Icon</h3>
    </div>
    <!-- online iconify icon -->
    <div>
      <i-icon
        v-for="item in iconOnlineList"
        :key="item"
        :icon="item"
        class="inline-block text-[24px] mr-3 text-primary"
      />
    </div>
    <!-- offline iconify icon -->
    <div class="mt-2">
      <i-icon
        v-for="(item, idx) in iconOfflineList"
        :key="idx"
        :icon="item"
        class="inline-block text-[24px] mr-3 text-primary"
      />
    </div>
    <div class="pl-[12px] border-l-[3px] text-primary mt-[24px] mb-[12px]">
      <h3 class="font-bold text-[18px] my-[4px]">Svg Icon</h3>
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
          @click="switchTheme(t)"
        >
          {{ t }}
        </button>
      </div>
    </div>

    <!-- Color Palette -->
    <div class="mt-10">
      <h3 class="font-bold text-[18px] my-[4px]">Color Palette</h3>
      <div class="grid grid-cols-3 gap-4 mt-5">
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
