<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[auto] mt-[4vh] absolute"
    >
      <!-- 圖片 -->
      <div
        class="bg-base rounded-button w-full flex flex-col gap-2. justify-center items-center h-[205px]"
      >
        <img
          class="w-[136px] h-[133.02px] shadow"
          :src="info?.deviceType.pictureUrl"
        />
        <span class="text-baseC text-base">{{ info?.name }}</span>
        <span class="text-baseC text-base"
          >類型: {{ info?.deviceType.name }}</span
        >
        <span class="text-baseC text-base">位置: {{ info?.location }}</span>
      </div>

      <!-- 付費框框 -->

      <div class="flex flex-col w-full">
        <div
          class="border-primary rounded-t-button border-solid border-l-[1px] border-t-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 px-2.5 pt-2.5"
        >
          <button
            :class="
              optionsValue == 1
                ? 'border-primary rounded-option border-solid border-[1.5px] bg-primary/20'
                : 'border-base/30 rounded-option border-solid border-[1px]'
            "
            class="w-[50%] flex flex-row justify-center items-center"
            @click="optionsValue = 1"
          >
            <div class="flex flex-row w-full justify-between p-1.5">
              <div class="flex flex-col items-end">
                <span class="text-baseC text-base font-bold tracking-wide"
                  >1H</span
                >
                <span class="text-small font-normal text-baseC/50"
                  >平均:
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
                ? 'border-primary rounded-option border-solid border-[1.5px] bg-primary/20'
                : 'border-base/30 rounded-option border-solid border-[1px]'
            "
            class="w-[50%] flex flex-row justify-center items-center"
            @click="optionsValue = 2"
          >
            <div class="flex flex-row w-full justify-between p-1.5">
              <div class="flex flex-col justify-start items-end">
                <span class="text-baseC text-base font-bold tracking-wide"
                  >2H</span
                >
                <span class="text-small font-normal text-baseC/50"
                  >平均:
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

        <!-- 輸入 -->
        <div
          class="border-primary rounded-b-card border-solid border-b-[1px] border-l-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 p-2.5"
        >
          <div
            :class="
              optionsValue == 3
                ? 'border-primary rounded-option border-solid border-[1.5px] bg-primary/20 '
                : 'border-base/30 rounded-option border-solid border-[1px]'
            "
            class="flex flex-row w-full justify-center items-center p-2.5"
            @click="optionsValue = 3"
          >
            <input
              v-model="inputValue"
              type="number"
              class="w-[177px] h-[34px] text-center truncate py-[5px] rounded-[5px] shadow-inner text-base font-bold"
            />

            <div
              class="text-baseC text-base font-bold w-[15%] flex flex-row justify-center items-center"
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
                >平均:
                {{
                  executePriceFunction(1, formDataOrder.function_price)
                }}HKD/H</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- TODO:修改支付成功邏輯 -->
      <PrimaryButton
        class="grow-x-1"
        :disabled="runningOrder != null"
        @click="onPay"
      >
        <template #default>
          <div
            v-if="runningOrder == null"
            class="h-[24px] flex flex-row justify-center items-center gap-2"
          >
            <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            <span class="text-larger text-inverted font-bold tracking-wide"
              >即刻支付</span
            >
          </div>
          <div
            v-else
            class="h-[24px] flex flex-col justify-center items-center"
          >
            <div class="flex flex-row justify-center items-center gap-2">
              <i-icon icon="mingcute:lock-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >使用中 ({{ remainingTimeFormatted }})</span
              >
            </div>
          </div>
        </template>
      </PrimaryButton>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
import { reactive, computed, ref, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { getSocketInfo } from "@/api/socket";
import { executePriceFunction } from "@/typings/data";

const info = ref<any>();
const router = useRouter();
//獲取網址上的一個id
const socketId = router.currentRoute.value.params.socketId;
// 初始化表單數據
const formDataOrder = ref<{
  name: string;
  location?: string;
  quantity?: string;
  amount?: string;
  pictureUrl?: string;
  function_price?: string;
}>({
  name: "",
  location: "",
  quantity: "",
  amount: "",
  pictureUrl: "",
  function_price: "function calc(amount) {return amount * 2.1}"
});

const runningOrder = ref<{
  startAt: string;
  endAt: string;
  quantity: number;
  price: number;
  remark: string;
  orderPayment: null;
  uuid: string;
  status: string;
  createdAt: string;
  deletedAt: null;
} | null>(null);

// TODO:獲取數據
onBeforeMount(async () => {
  try {
    const res: any = await getSocketInfo({ socketId: `${socketId}` });
    info.value = res.data.device;
    formDataOrder.value = res.data.device;
    formDataOrder.value.function_price = res.data.device.priceFormula;
    runningOrder.value = res.data.currentOrder;
    updateRemainingTime();
  } catch (error) {
    console.error("Error fetching list info", error);
  }
});

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);

const optionsValue = ref(1);
const inputValue = ref(4);

const onPay = () => {
  let duration =
    optionsValue.value === 3 ? inputValue.value : optionsValue.value;

  let price = executePriceFunction(
    duration,
    formDataOrder.value.function_price
  );
  router.push({
    name: "OrderConfirm",
    query: {
      device_id: socketId,
      location: info.value?.location,
      quantity: duration,
      amount: price,
      name: info.value?.name
    }
  });
};

// 添加计算剩余时间的逻辑
const remainingTime = ref(0);
const remainingTimeFormatted = computed(() => {
  if (!remainingTime.value || remainingTime.value <= 0) return "0h0min";

  const hours = Math.floor(remainingTime.value / (60 * 60 * 1000));
  const minutes = Math.floor(
    (remainingTime.value % (60 * 60 * 1000)) / (60 * 1000)
  );

  return `${hours}h${minutes}min`;
});

// 更新剩余时间的计时器
let timer: number | null = null;

const updateRemainingTime = () => {
  if (runningOrder.value && runningOrder.value.endAt) {
    const endTime = new Date(runningOrder.value.endAt).getTime();
    const now = new Date().getTime();
    remainingTime.value = Math.max(0, endTime - now);
  } else {
    remainingTime.value = 0;
  }
};

if (timer !== null) {
  clearInterval(timer);
}
timer = window.setInterval(updateRemainingTime, 10000); // 每分钟更新一次
</script>
