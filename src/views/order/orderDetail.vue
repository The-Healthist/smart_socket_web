<template>
  <div
    :class="` font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-primary/10 h-[140vh]"
  >
    <div
      class="flex flex-col w-full h-full justify-center items-center px-2.5 py-5"
    >
      <div class="text-inverted text-largest flex justify-center items-center">
        订单详情
      </div>
      <div class="w-[95vw] h-full flex flex-col">
        <!-- 订单详情 -->
        <div
          class="bg-base w-[95vw] h-[80vh] flex flex-col overflow-y-scroll rounded-card mt-5"
        >
          <div
            v-for="order in ordersH"
            :key="order.transactionNumber"
            class="w-[95vw] p-2.5 flex flex-col gap-2"
          >
            <div class="flex flex-col gap-2.5">
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >插座名稱 :</span
                >
                <div class="text-large">{{ order.name }}</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >插座地址 :</span
                >
                <div class="text-large">{{ order.address }}</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >購買電量 :</span
                >
                <div class="text-large font-bold">
                  {{ order.powerPurchased }}
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >支付金額 :</span
                >
                <div class="text-large text-[#ff4400]">
                  {{ order.amountPaid }}
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >訂單編號 :</span
                >
                <div class="text-base">{{ order.orderNumber }}</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >付款方式 :</span
                >
                <div class="text-base">{{ order.paymentMethod }}</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >交易編號 :</span
                >
                <div class="text-base">{{ order.transactionNumber }}</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-small text-baseC font-normal truncate"
                  >訂單創建時間 :</span
                >
                <div class="text-base">{{ order.creationTime }}</div>
              </div>
            </div>
            <div>
              <div
                class="flex flex-row justify-center items-center gap-2.5 w-full"
              >
                <button class="text-primary text-base font-normal">
                  有疑問？聯繫客服
                </button>
              </div>
            </div>
            <div
              class="bg-separator/30 flex flex-row justify-center w-full h-[1px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderDetails">
import { computed, ref } from "vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);

const ordersH = ref([
  {
    name: "仁英大廈01A 空調插座",
    address: "XX路xxx號仁英大廈01A",
    powerPurchased: "10kWh",
    amountPaid: "10HKD",
    orderNumber: "827857199803457",
    paymentMethod: "銀行卡",
    transactionNumber: "47178858238",
    creationTime: "2024-09-01 14:32"
  }
  // Add more orders as needed
]);
</script>
