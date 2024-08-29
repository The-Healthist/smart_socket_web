<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[140vh]"
  >
    <div>
      <div class="flex flex-col w-full gap-[10px] p-2.5 absolute">
        <div class="flex flex-row gap-2.5 w-full h-[100px]">
          <div class="rounded-card w-[50vw] h-[100px] bg-base/90" />
          <div class="rounded-card w-[50vw] h-[100px] bg-base/90" />
        </div>
        <div class="rounded-card w-full h-[128px] bg-base/90" />
        <!-- buttons -->
        <div
          class="rounded-card bg-base/90 text-mutedC flex flex-row justify-between gap-2.5 w-full h-[77px] px-5 py-2.5"
        >
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <i-icon icon="mdi:power-socket-uk" class="text-[36px]" />
            <div>附近插座</div>
          </div>
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <i-icon icon="icon-park-outline:shopping" class="text-[36px]" />
            <div>產品購買</div>
          </div>
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <i-icon icon="bi:people" class="text-[36px]" />
            <div>加入我们</div>
          </div>
          <div class="flex flex-col gap-[4px] justify-center items-center">
            <i-icon icon="hugeicons:safari" class="text-[36px]" />
            <div>使用指南</div>
          </div>
        </div>
        <div class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 h-[287px]">
          <!-- 地图 -->
          <div class="rounded-button w-full h-[235px] bg-slate-200" />
          <div class="flex flex-row justify-between gap-2.5 w-full">
            <InvertedButton>
              <template #default>
                <div
                  class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
                >
                  <span
                    class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                  >
                    遠程啓動
                  </span>
                </div>
              </template>
            </InvertedButton>
            <PrimaryButton
              class="grow"
              @click="router.push({ name: 'Scanner' })"
            >
              <template #default>
                <div
                  class="h-[22px] flex flex-row justify-center items-center gap-2"
                >
                  <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                  <span
                    class="text-larger text-inverted font-bold tracking-wide"
                    >扫码租用</span
                  >
                </div>
              </template>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
import { reactive, computed } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";

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
