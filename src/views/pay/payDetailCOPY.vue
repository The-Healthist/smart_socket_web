<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[auto] mt-[4vh] absolute"
    >
      <!-- 图片 -->
      <div
        class="bg-base rounded-button w-full flex flex-col gap-2. justify-center items-center h-[205px]"
      >
        <img class="w-[136px] h-[133.02px] shadow" :src="info?.imgUrl" />
        <span class="text-baseC text-base">{{ info.address }}</span>
      </div>

      <!-- 付费框框 -->

      <div class="flex flex-col w-full">
        <!-- 按量付費/按时间付費切换 -->
        <div class="flex flex-row gap-0 w-full">
          <div
            class="w-[47.5vw] h-[42px] flex justify-center items-center relative overflow-hidden"
            :class="isByTime ? ' bg-primary rounded-tl-bar' : 'bg-base'"
          >
            <button
              class="w-full h-full flex flex-row gap-2.5 justify-center items-center relative z-10"
              :class="
                isByTime
                  ? 'text-primary bg-base rounded-t-bar border-primary border-solid border-t-[1px] border-l-[1px]'
                  : 'text-inverted bg-primary rounded-br-bar rounded-tl-card border-l-[1px] border-t-[1px] border-primary'
              "
              @click="isByTime = true"
            >
              <span class="text-large">按量付費</span>
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            </button>
          </div>
          <!-- 历史订单 -->
          <div
            class="w-[47.5vw] h-[42px] flex justify-center items-center relative overflow-hidden"
            :class="!isByTime ? 'bg-primary rounded-tr-bar ' : 'bg-base '"
          >
            <button
              class="w-full h-full flex flex-row gap-2.5 justify-center items-center relative z-10"
              :class="
                !isByTime
                  ? 'text-primary bg-base rounded-t-bar  border-primary border-solid border-t-[1px] border-r-[1px]'
                  : 'text-inverted bg-primary rounded-bl-bar rounded-tr-bar'
              "
              @click="isByTime = false"
            >
              <i-icon icon="tabler:clock" class="text-[20px]" />
              <span class="text-base">按鐘付費</span>
            </button>
          </div>
        </div>

        <!--10/20 选项 -->
        <div
          class="border-primary border-solid border-l-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 px-2.5 pt-2.5"
        >
          <button
            :class="
              optionsValue == 1
                ? 'border-primary rounded-option border-solid border-[1px] bg-primary/10'
                : 'border-base/30 rounded-option border-solid border-[1px]'
            "
            class="w-[50%] flex flex-row justify-center items-center"
            @click="optionsValue = 1"
          >
            <div class="flex flex-row w-full justify-between p-1.5">
              <div class="flex flex-col">
                <span class="text-baseC text-small font-bold tracking-wide"
                  >1h</span
                >
                <span class="text-small font-normal text-baseC/50"
                  >Avg: 1HKD/H</span
                >
              </div>
              <div class="flex justify-center items-center">
                <span class="text-red-500 text-base font-bold">10HKD</span>
              </div>
            </div>
          </button>
          <button
            :class="
              optionsValue == 2
                ? 'border-primary rounded-option border-solid border-[1px] bg-primary/10'
                : 'border-base/30 rounded-option border-solid border-[1px]'
            "
            class="w-[50%] flex flex-row justify-center items-center"
            @click="optionsValue = 2"
          >
            <div class="flex flex-row w-full justify-between p-1.5">
              <div class="flex flex-col">
                <span class="text-baseC text-small font-bold tracking-wide"
                  >2h</span
                >
                <span class="text-small font-normal text-baseC/50"
                  >Avg: 1HKD/H</span
                >
              </div>
              <div class="flex justify-center items-center">
                <span class="text-red-500 text-base font-bold">20HKD</span>
              </div>
            </div>
          </button>
        </div>

        <!-- 输入 -->
        <div
          class="border-primary rounded-b-card border-solid border-b-[1px] border-l-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 p-2.5"
        >
          <div
            :class="
              optionsValue == 3
                ? 'border-primary rounded-option border-solid border-[1px] bg-primary/10 '
                : 'border-base/30 rounded-option border-solid border-[1px]'
            "
            class="flex flex-row w-full justify-center items-center p-2.5"
            @click="optionsValue = 3"
          >
            <input
              v-model="inputValue"
              type="number"
              class="w-[177px] h-[34px] text-center truncate py-[5px] rounded-[5px] shadow-inner"
            />

            <div
              class="text-baseC text-small font-bold w-[15%] flex flex-row justify-center items-center"
            >
              kWh
            </div>
            <div class="flex flex-col justify-end items-end w-[25%]">
              <span class="text-red-500 text-base font-bold"
                >{{ allPriceInput }}HKD</span
              >
              <span class="text-baseC/60 text-small truncate"
                >Avg: 0.25 HKD</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- TODO:修改支付成功逻辑 -->
      <PrimaryButton
        class="grow-x-1"
        @click="
          router.push({
            name: 'OrderConfime',
            params: {
              ...info
            }
          })
        "
      >
        <template #default>
          <div class="h-[px] flex flex-row justify-center items-center gap-2">
            <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            <span class="text-larger text-inverted font-bold tracking-wide"
              >即可支付</span
            >
          </div>
        </template>
      </PrimaryButton>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
import { reactive, computed, ref, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { idText } from "typescript";
import { getSocketInfo } from "@/api/info";
import axios from "axios";
import { getListApi } from "@/api/mock";

type socketInfo = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
};
const info = ref<any>();
const router = useRouter();
//获取网址上的一个id
const socketId = router.currentRoute.value.params.id;

onBeforeMount(async () => {
  try {
    const res = await getSocketInfo({ id: `${socketId}` });
    info.value = res;
    console.log("info.value", info.value.imgUrl);
    console.log("await res", res);
  } catch (error) {
    console.error("Error fetching list info", error);
  }

  axios.get("/api/socket/1").then(res => {
    console.log("axios res", res.data.result); // 比较这与 await 的输出
  });
});

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

const isByTime = ref(true);
const optionsValue = ref(0);
const inputValue = ref(160);
const allPriceInput = computed(() => {
  if (inputValue.value < 0) return 0;
  else return inputValue.value * 0.25;
});
const allPrice = computed(() => {
  return optionsValue.value == 0
    ? 10
    : optionsValue.value == 1
      ? 20
      : optionsValue.value == 2
        ? 40
        : inputValue.value * 0.25;
});
const allPower = computed(() => {
  return optionsValue.value == 0
    ? 10
    : optionsValue.value == 1
      ? 20
      : optionsValue.value == 2
        ? 40
        : inputValue.value;
});
</script>
