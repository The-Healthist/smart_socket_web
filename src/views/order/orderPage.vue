<template>
  <div
    :class="` font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-primary/10 h-[140vh]"
  >
    <div
      class="flex flex-col w-full h-full justify-center items-center px-2.5 py-5"
    >
      <div class="w-[95vw] h-full flex flex-col">
        <div class="flex flex-row gap-0 relative">
          <!-- 使用中 -->
          <div
            class="w-[47.5vw] h-[42px] flex justify-center items-center relative overflow-hidden"
            :class="isUse ? 'bg-primary' : 'bg-base'"
          >
            <button
              class="w-full h-full flex flex-row gap-2.5 justify-center items-center relative z-10"
              :class="
                isUse
                  ? 'text-primary bg-base rounded-t-bar'
                  : 'text-inverted bg-primary rounded-br-bar'
              "
              @click="isUse = true"
            >
              <span class="text-large">使用中</span>
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
            </button>
          </div>
          <!-- 历史订单 -->
          <div
            class="w-[47.5vw] h-[42px] flex justify-center items-center relative overflow-hidden"
            :class="!isUse ? 'bg-primary ' : 'bg-base '"
          >
            <button
              class="w-full h-full flex flex-row gap-2.5 justify-center items-center relative z-10"
              :class="
                !isUse
                  ? 'text-primary bg-base rounded-t-bar'
                  : 'text-inverted bg-primary rounded-bl-bar'
              "
              @click="isUse = false"
            >
              <i-icon icon="tabler:clock" class="text-[20px]" />
              <span class="text-base">历史订单</span>
            </button>
          </div>
        </div>
        <!-- 订单列表 -->
        <div
          class="bg-base w-[95vw] h-[83vh] flex flex-col overflow-y-scroll"
          :class="
            isUse
              ? 'rounded-tr-bar rounded-b-card'
              : 'rounded-tl-bar rounded-b-card'
          "
        >
          <div
            v-if="isUse"
            class="flex justify-center items-center flex-col overflow-scroll mt-6"
          >
            <div
              v-for="order in displayedOrders"
              :key="order.id"
              class="w-[95vw] p-2.5 flex flex-col gap-2"
            >
              <div class="flex flex-col gap-2.5">
                <!-- 第一行 -->
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    插座名稱 :
                  </span>
                  <div class="text-large">{{ order.name }}</div>
                </div>
                <!-- 第二行 -->
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    插座地址 :
                  </span>
                  <div class="text-large">{{ order.address }}</div>
                </div>
                <!-- 第三行 -->
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    已使用 :
                  </span>
                  <div class="text-large font-bold">{{ order.usage }}</div>
                </div>
                <!-- 第四行 -->
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    剩餘 :
                  </span>
                  <div class="text-large font-bold">{{ order.shenyu }}</div>
                </div>
              </div>

              <!-- button -->
              <div>
                <div class="flex flex-row gap-2.5 w-full">
                  <InvertedButton>
                    <template #default>
                      <div
                        class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
                      >
                        <span
                          class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                        >
                          結束使用
                        </span>
                      </div>
                    </template>
                  </InvertedButton>
                  <PrimaryButton class="grow">
                    <template #default>
                      <div
                        class="grow h-[22px] flex flex-row justify-center items-center gap-2"
                      >
                        <i-icon
                          icon="mingcute:flash-line"
                          class="text-[20px]"
                        />
                        <span
                          class="text-larger text-inverted font-bold tracking-wide"
                          >充值續費</span
                        >
                      </div>
                    </template>
                  </PrimaryButton>
                </div>
              </div>
              <!-- seperator -->
              <div
                class="bg-separator/30 flex flex-row justify-center w-full h-[1px]"
              />
            </div>
          </div>
          <div v-else>
            <div
              v-for="order in ordersH"
              :key="order.transactionNumber"
              class="w-[95vw] p-2.5 flex flex-col gap-2"
            >
              <div class="flex flex-col gap-2.5">
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    插座名稱 :
                  </span>
                  <div class="text-large">{{ order.name }}</div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    插座地址 :
                  </span>
                  <div class="text-large">{{ order.address }}</div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    購買電量 :
                  </span>
                  <div class="text-large font-bold">
                    {{ order.powerPurchased }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    支付金額 :
                  </span>
                  <div class="text-large text-[#ff4400]">
                    {{ order.amountPaid }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    訂單編號 :
                  </span>
                  <div class="text-base">
                    {{ order.orderNumber }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    付款方式 :
                  </span>
                  <div class="text-base">
                    {{ order.paymentMethod }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-small text-baseC font-normal truncate">
                    交易編號 :
                  </span>
                  <div class="text-base">
                    {{ order.transactionNumber }}
                  </div>
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
  </div>
</template>

<script setup lang="ts" name="Home">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";

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

const isUse = ref(true);

const orders = ref([
  {
    id: 1,
    name: "仁英大廈01A 空調插座",
    address: "XX路xxx號仁英大廈01A",
    usage: "3.5kWh",
    shenyu: "6.5kWh",
    status: "inUse"
  },
  {
    id: 2,
    name: "仁英大廈02B 空調插座",
    address: "XX路xxx號仁英大廈02B",
    usage: "2.8kWh",
    shenyu: "6.5kWh",
    status: "inUse"
  },
  {
    id: 3,
    name: "仁英大廈03C 空調插座",
    address: "XX路xxx號仁英大廈03C",
    usage: "1.5kWh",
    shenyu: "6.5kWh",
    status: "history"
  },
  {
    id: 4,
    name: "仁英大廈04D 空調插座",
    address: "XX路xxx號仁英大廈04D",
    usage: "4.0kWh",
    shenyu: "6.5kWh",
    status: "history"
  }
]);

const displayedOrders = computed(() =>
  orders.value.filter(order =>
    isUse.value ? order.status === "inUse" : order.status === "history"
  )
);
const ordersH = ref([
  {
    name: "仁英大廈01A 空調插座",
    address: "XX路xxx號仁英大廈01A",
    powerPurchased: "10kWh",
    amountPaid: "10HKD",
    orderNumber: "827857199803457",
    paymentMethod: "銀行卡",
    transactionNumber: "47178858238"
  },
  {
    name: "仁英大廈02B 空調插座",
    address: "XX路xxx號仁英大廈02B",
    powerPurchased: "5kWh",
    amountPaid: "5HKD",
    orderNumber: "827857199803458",
    paymentMethod: "微信支付",
    transactionNumber: "47178858239"
  },
  {
    name: "仁英大廈03C 空調插座",
    address: "XX路xxx號仁英大廈03C",
    powerPurchased: "8kWh",
    amountPaid: "8HKD",
    orderNumber: "827857199803459",
    paymentMethod: "支付寶",
    transactionNumber: "47178858240"
  },
  {
    name: "仁英大廈04D 空調插座",
    address: "XX路xxx號仁英大廈04D",
    powerPurchased: "12kWh",
    amountPaid: "12HKD",
    orderNumber: "827857199803460",
    paymentMethod: "銀行卡",
    transactionNumber: "47178858241"
  },
  {
    name: "仁英大廈05E 空調插座",
    address: "XX路xxx號仁英大廈05E",
    powerPurchased: "6kWh",
    amountPaid: "6HKD",
    orderNumber: "827857199803461",
    paymentMethod: "微信支付",
    transactionNumber: "47178858242"
  },
  {
    name: "仁英大廈06F 空調插座",
    address: "XX路xxx號仁英大廈06F",
    powerPurchased: "15kWh",
    amountPaid: "15HKD",
    orderNumber: "827857199803462",
    paymentMethod: "支付寶",
    transactionNumber: "47178858243"
  }
]);
</script>
