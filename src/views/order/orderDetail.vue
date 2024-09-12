<template>
  <div
    :class="` font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-primary/10 h-[140vh]"
  >
    <div
      class="flex flex-col w-full h-full justify-center items-center px-2.5 py-5"
    >
      <div class="w-[95vw] h-full flex flex-col">
        <!-- 订单详情 -->

        <div
          class="bg-base w-[95vw] h-[auto] flex flex-col overflow-y-scroll rounded-card mt-[10vh]"
        >
          <div
            class="text-primary text-largest flex justify-center items-center"
          >
            <!-- <i-icon icon="streamline:return-2" class="text-[20px] text-inverted" /> -->
            订单详情
          </div>
          <div
            v-for="order in ordersH"
            :key="order.uuid"
            class="w-[95vw] p-2.5 flex flex-col gap-2 mt-2"
          >
            <div class="flex flex-col gap-2.5">
              <!-- Existing order details -->
              <div class="flex justify-between items-center">
                <span class="text-base text-baseC font-bold truncate"
                  >插座名稱 :</span
                >
                <div class="text-large font-bold">{{ order.device.name }}</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-base text-baseC font-bold truncate"
                  >插座地址 :</span
                >
                <div class="text-large font-bold">
                  {{ order.device.location }}
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-base text-baseC font-bold truncate"
                  >購買時間 :</span
                >
                <div class="text-large font-bold">{{ order.quantity }}小时</div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-base text-baseC font-bold truncate"
                  >支付金額 :</span
                >
                <div class="text-large font-bold">{{ order.price }}HKD</div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-large text-baseC font-normal truncate"
                  >訂單創建時間 :</span
                >
                <div class="text-base">
                  {{ moment(order.createdAt).format("yyyy/MM/DD HH:ss") }}
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-base text-baseC font-normal truncate"
                  >服務開始時間 :</span
                >
                <div class="text-large">
                  {{ moment(order.startAt).format("yyyy/MM/DD HH:ss") }}
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-base text-baseC font-normal truncate"
                  >服務結束時間 :</span
                >
                <div class="text-large">
                  {{ moment(order.endAt).format("yyyy/MM/DD HH:ss") }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              class="flex flex-row justify-center items-center gap-2.5 w-full m-5"
            >
              <button class="text-primary text-base font-normal">
                有疑問？聯繫客服
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderDetails">
import { computed, onBeforeMount, ref } from "vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { getOrder } from "@/api/order";
import { showFailToast } from "vant";
import moment from "moment"; // Import moment

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();
//转换成字符串
const orderId = router.currentRoute.value.query.uuid;
// console.log(orderId);
const ordersH = ref([]);
onBeforeMount(async () => {
  if (typeof orderId === "string")
    getOrder({ uuid: orderId })
      .then((res: any) => {
        console.log(res);
        let data = res.data;
        ordersH.value = [data];
        // console.log(ordersH.value);
      })
      .catch(err => {
        console.log(err);
        showFailToast("獲取訂單失敗");
      });
});
</script>
