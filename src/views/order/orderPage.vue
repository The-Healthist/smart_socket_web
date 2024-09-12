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
          class="bg-base w-[95vw] h-[auto] min-h-[80vh] flex flex-col overflow-y-scroll"
          :class="
            isUse
              ? 'rounded-tr-bar rounded-b-card'
              : 'rounded-tl-bar rounded-b-card'
          "
        >
          <div v-if="displayedOrders.length === 0 && ordersH.length === 0">
            <div class="flex flex-col justify-center items-center h-[50vh]">
              <span class="text-baseC">暫無數據</span>
            </div>
          </div>
          <div v-if="isUse">
            <div
              v-for="order in displayedOrders"
              :key="order.uuid"
              class="w-[95vw] p-2.5 flex flex-col gap-2"
            >
              <div
                class="flex flex-col gap-2.5 hover:bg-primary/10"
                @click="
                  router.push({
                    name: 'OrderDetail',
                    query: { uuid: order.uuid }
                  })
                "
              >
                <!-- 第一行 -->
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    插座名稱 :
                  </span>
                  <div v-if="order.device" class="text-large">
                    {{ order.device.name }}
                  </div>
                </div>
                <!-- 第二行 -->
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    插座地址 :
                  </span>
                  <div v-if="order.device" class="text-large">
                    {{ order.device.location }}
                  </div>
                </div>
                <!-- 第三行 -->
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    已使用 :
                  </span>
                  <div class="text-large font-bold">{{ order.quantity }}H</div>
                </div>
                <!-- 第四行 -->
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    支付金額 :
                  </span>
                  <div class="text-large font-bold">{{ order.price }}HKD</div>
                </div>
              </div>

              <!-- button -->
              <div>
                <div class="flex flex-row gap-2.5 w-full">
                  <InvertedButton>
                    <template #default>
                      <div
                        class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
                        @click="endOrderU(order.uuid)"
                      >
                        <span
                          class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                        >
                          結束使用
                        </span>
                      </div>
                    </template>
                  </InvertedButton>
                  <PrimaryButton class="grow" @click="RenewalOrder(order.uuid)">
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
              <div
                class="flex flex-col gap-2.5"
                @click="
                  router.push({
                    name: 'OrderDetail',
                    query: { uuid: order.uuid }
                  })
                "
              >
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    插座名稱 :
                  </span>
                  <div v-if="order.device" class="text-large">
                    {{ order.device.name }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    插座地址 :
                  </span>
                  <div v-if="order.device" class="text-large">
                    {{ order.device.location }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    購買電量 :
                  </span>
                  <div class="text-large font-bold">{{ order.quantity }}H</div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    支付金額 :
                  </span>
                  <div class="text-large text-[#ff4400]">
                    {{ order.price }}HKD
                  </div>
                </div>
                <!-- 订单编号 -->
                <div class="flex flex-row justify-between w-full">
                  <span class="text-base text-baseC font-normal">
                    訂單編號 :
                  </span>
                  <div class="text-small break-words">
                    {{ order.uuid }}
                  </div>
                </div>
                <!-- 设备编号 -->
                <div class="flex flex-row justify-between w-full">
                  <span class="text-base text-baseC font-normal">
                    设备編號:
                  </span>
                  <div class="text-small break-words">
                    {{ order.deviceUuid }}
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-base text-baseC font-normal truncate">
                    付款方式 :
                  </span>
                  <div class="text-base">
                    {{ order.paymentMethod }}
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
    <van-dialog
      v-model:show="isShowDialog"
      :show-cancel-button="false"
      :showConfirmButton="false"
      :close-on-click-overlay="true"
    >
      <div
        class="flex flex-col h-[40vh] bg-gradient-to-b from-skin-primary/10 to-skin-primary/30 items-center p-2.5 gap-2.5"
      >
        <h1 class="text-largest test-basec">充值續費</h1>
        <span
          class="flex flex-row justify-start text-baseC text-base w-full ml-2.5"
          >充值时间</span
        >
        <div class="flex flex-row items-center w-full -ml-2.5">
          <span class="text-primary text-base">*</span>
          <div
            class="-mt-2 w-full h-[38px] p-[5px] bg-base justify-center items-center rounded-button border-solid border-[2px]"
          >
            <div class="flex flex-row">
              <input
                id="number"
                v-model="duration"
                type="number"
                placeholder="请输入充值时间"
                class="w-[60vw] h-[24px] pl-2 rounded-button"
              />
              <span class="text-primary text-base mr-1.5">/小时</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row w-full ml-2 justify-between">
          <span class="flex flex-row justify-start text-baseC text-base w-full">
            总计金额</span
          >
          <span v-if="function_price" class="text-primary text-base mr-[26px]"
            >{{ totalPrice }}HKD</span
          >
        </div>
        <span
          v-if="isShowDurationSpan"
          class="h-2.5 w-full -mt-2.5 text-base ml-[2px] text-red-500"
        >
          充值时间需要>0且为整数
        </span>

        <PrimaryButton class="w-[98%]" @click="handleRenewalOrder">
          <template #default>
            <div
              class="h-[24px] flex flex-row justify-center items-center gap-2"
            >
              <i-icon icon="mingcute:flash-line" class="text-[20px]" />
              <span class="text-larger text-inverted font-bold tracking-wide"
                >即刻支付</span
              >
            </div>
          </template>
        </PrimaryButton>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts" name="OrderPage">
import { reactive, computed, ref, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import {
  endOrder,
  getOrder,
  getOrders,
  payOrder,
  renewOrder
} from "@/api/order";
import { showFailToast, showSuccessToast } from "vant";
import { validateField } from "@/typings/data";
import { executePriceFunction } from "@/typings/data";

const router = useRouter();
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
const orders = ref([]);
const displayedOrders = computed(() => orders.value);
const ordersH = ref([]);

const isShowDialog = ref(false);
const renewOrderId = ref("");
const duration = ref(2);
const totalPrice = computed(() =>
  executePriceFunction(duration.value, function_price.value)
);
const isShowDurationSpan = ref(false);
const isValidDuration = computed(() =>
  validateField("numberM", duration.value)
);
const endOrderU = async (id: string) => {
  endOrder({ uuid: id })
    .then(res => {
      console.log(res);
      let data: any = res;
      orders.value = data;
      console.log(orders.value);
      showSuccessToast("訂單已取消");
    })
    .catch(err => {
      console.log(err);
      showFailToast("取消訂單失敗");
    });
};
const function_price = ref();
const RenewalOrder = async (uuid: string) => {
  getOrder({ uuid: uuid })
    .then((res: any) => {
      console.log("lllldjaflksdjlfajdkf", res.data.device);
      if (res.data.device.priceFormula) {
        console.log(res.data.device.priceFormula);
        function_price.value = res.data.device.priceFormula;
      } else {
        console.log("Price formula not found");
      }
    })
    .catch(err => {
      console.log(err);
      showFailToast("獲取訂單失敗");
    });
  renewOrderId.value = uuid;
  isShowDialog.value = true;
};
const handleRenewalOrder = async () => {
  if (!isValidDuration.value) isShowDurationSpan.value = true;
  renewOrder({ uuid: renewOrderId.value, duration: duration.value }).then(
    (res: any) => {
      console.log(res);
      payOrder({ uuid: res.data.uuid })
        .then((res2: any) => {
          console.log(res2);
          router.push({
            name: "PayedAfter",
            query: { orderId: res.data.uuid }
          });
        })
        .catch(err => {
          console.log(err);
          showFailToast("支付失敗");
        });
      isShowDialog.value = false;
    }
  );
};

const validateDuration = event => {
  const value = event.target.value;
  // 只允许输入正整数
  if (!/^[1-9]\d*$/.test(value)) {
    event.target.value = value.replace(/[^1-9]\d*/g, "");
    duration.value = event.target.value;
  }
};

onBeforeMount(async () => {
  let mobile = localStorage.getItem("mobile");
  getOrders({ mobile: mobile, status: 1 })
    .then(res => {
      const after: any = res;
      ordersH.value = after.data;
      console.log(ordersH.value);
    })
    .catch(err => {
      console.log(err);
      showFailToast("獲取历史訂單失敗");
    });
  getOrders({ mobile: mobile, status: 0 })
    .then((res: any) => {
      const after: any = res.data;
      orders.value = after;
      console.log(orders.value);
    })
    .catch(err => {
      console.log(err);
      showFailToast("獲取訂單失敗");
    });
});
</script>
