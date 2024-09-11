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
        <img
          class="w-[136px] h-[133.02px] shadow"
          :src="info?.deviceType.pictureUrl"
        />
        <span class="text-baseC text-base">{{ info?.name }}</span>
        <span class="text-baseC text-base"
          >TYPE: {{ info?.deviceType.name }}</span
        >
        <span class="text-baseC text-base">LOCATION: {{ info?.location }}</span>
      </div>

      <!-- 付费框框 -->

      <div class="flex flex-col w-full">
        <div
          class="border-primary rounded-t-button border-solid border-l-[1px] border-t-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 px-2.5 pt-2.5"
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
              <div class="flex flex-col items-end">
                <span class="text-baseC text-small font-bold tracking-wide"
                  >1H</span
                >
                <span class="text-small font-normal text-baseC/50"
                  >Avg:
                  {{
                    executePriceFunction(1, formDataOrder.function_price)
                  }}HKD/H</span
                >
              </div>
              <div class="flex justify-center items-center">
                <span class="text-red-500 text-base font-bold"
                  >{{
                    executePriceFunction(1, formDataOrder.function_price)
                  }}HKD</span
                >
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
              <div class="flex flex-col justify-start items-end">
                <span class="text-baseC text-small font-bold tracking-wide"
                  >2H</span
                >
                <span class="text-small font-normal text-baseC/50"
                  >Avg:
                  {{
                    executePriceFunction(1, formDataOrder.function_price)
                  }}HKD/H</span
                >
              </div>
              <div class="flex justify-center items-center">
                <span class="text-red-500 text-base font-bold"
                  >{{
                    executePriceFunction(2, formDataOrder.function_price)
                  }}HKD</span
                >
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
              H
            </div>
            <div class="flex flex-col justify-end items-end w-[25%]">
              <span class="text-red-500 text-base font-bold"
                >{{
                  executePriceFunction(
                    inputValue,
                    formDataOrder.function_price
                  )
                }}HKD</span
              >
              <span class="text-baseC/60 text-small truncate"
                >Avg:
                {{
                  executePriceFunction(1, formDataOrder.function_price)
                }}HKD/H</span
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
            name: 'OrderConfirm',
            query: {
              device_id: socketId,
              location: info?.location,
              quantity: duration,
              amount: executePriceFunction(
                duration,
                formDataOrder.function_price
              ),
              name: info?.name
            }
          })
        "
      >
        <template #default>
          <div class="h-[24px] flex flex-row justify-center items-center gap-2">
            <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            <span class="text-larger text-inverted font-bold tracking-wide"
              >即刻支付</span
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
import { getSocketInfo } from "@/api/socket";
import { executePriceFunction } from "@/typings/data";

const info = ref<any>();
const router = useRouter();
//获取网址上的一个id
const socketId = router.currentRoute.value.params.socketId;
// 初始化表单数据
interface formdataOrder {
  name: string;
  location?: string;
  quantity?: string;
  amount?: string;
  pictureUrl?: string;
  function_price?: string;
}
const formDataOrder = ref<formdataOrder>({
  name: "",
  location: "",
  quantity: "",
  amount: "",
  pictureUrl: "",
  function_price: "function calc(amount) {return amount * 2.1}"
});
// TODO:获取数据

onBeforeMount(async () => {
  try {
    const res: any = await getSocketInfo({ socketId: `${socketId}` });
    info.value = res.data;
    console.log("info.value", info.value);
    formDataOrder.value.name = res.data.name;
    formDataOrder.value.location = res.data.location;
    formDataOrder.value.quantity = res.data.quantity;
    formDataOrder.value.pictureUrl = res.data.pictureUrl;
    formDataOrder.value.function_price = res.data.priceFormula;
    // 记下价格公式
  } catch (error) {
    console.error("Error fetching list info", error);
  }
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

const optionsValue = ref(1);
const inputValue = ref(4);

const duration = computed(() => {
  if (optionsValue.value == 1) {
    return 1;
  } else if (optionsValue.value == 2) {
    return 2;
  } else {
    return inputValue.value;
  }
});
</script>
