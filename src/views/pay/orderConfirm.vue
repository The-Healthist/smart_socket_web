<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[auto] mt-[7vh] absolute"
    >
      <div class="text-largest font-bold tracking-wide flex justify-center">
        訂單確認
      </div>
      <div class="flex flex-col">
        <!-- Order Details -->
        <div class="flex justify-between items-center">
          <span class="text-base text-baseC font-normal truncate"
            >插座名稱 :</span
          >
          <div class="text-larger">{{ formDataOrder?.name }}</div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-base text-baseC font-normal truncate"
            >插座地址 :</span
          >
          <div class="text-larger">{{ formDataOrder?.location }}</div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-base text-baseC font-normal truncate"
            >租用時間 :</span
          >
          <div class="text-large font-bold">
            {{ formDataOrder?.quantity }}/H
          </div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-base text-baseC font-normal truncate"
            >支付金额 :</span
          >
          <div class="text-larger font-bold">
            {{ formDataOrder?.amount }}HKD
          </div>
        </div>

        <!-- Payment Details -->
        <div class="flex flex-row gap-2.5 mt-2.5 justify-between items-center">
          <label for="email" class="w-[24vw] text-base text-baseC font-normal"
            >邮箱地址 :</label
          >
          <input
            id="email"
            v-model="formDataAuth.email"
            type="email"
            placeholder="请输入邮箱地址/选填"
            class="border rounded p-1 grow"
          />
        </div>
        <div class="flex h-2.5">
          <span v-if="isShowEmailSpan" class="text-red-500 text-base"
            >邮箱格式不正确</span
          >
        </div>
        <div
          class="flex flex-row gap-2.5 justify-between mt-2.5 ml-[-10px] items-center"
        >
          <label
            for="phone"
            class="w-[24vw] text-base text-baseC font-normal flex flex-row justify-start items-center"
          >
            <span class="text-red-500 text-base text-center w-2.5">*</span
            >手机号:</label
          >
          <input
            id="phone"
            v-model="formDataAuth.mobile"
            type="tel"
            placeholder="请输入手机号/不可为空"
            class="border rounded p-1 grow ml-2.5"
          />
        </div>
        <div class="flex h-2.5">
          <span v-if="isShowPhoneSpan" class="text-red-500 text-base"
            >手机号码不能位空且为6~12位数字</span
          >
        </div>

        <!-- One-Click Register Checkbox -->
        <div v-if="isShowRegister" class="flex items-center mt-4">
          <input
            id="register-checkbox"
            v-model="isRegistering"
            type="checkbox"
            class="mr-2"
          />
          <label
            for="register-checkbox"
            class="text-base text-baseC font-normal"
          >
            一键注册
          </label>
        </div>

        <!-- Conditional Password Inputs -->
        <div
          v-if="isRegistering"
          class="flex flex-row gap-2.5 ml-[-10px] mt-2.5 justify-between items-center"
        >
          <label
            for="password"
            class="text-base text-baseC font-normal w-[24vw]"
            ><span class="text-red-500 text-base text-center w-2.5">*</span>密码
            :</label
          >
          <input
            id="password"
            v-model="formDataAuth.password"
            type="password"
            placeholder="请输入密码"
            class="border rounded p-1 grow ml-2.5"
          />
        </div>
        <div class="flex h-2.5">
          <span v-if="isShowPasswordSpan" class="text-red-500 text-small"
            >密码不能为空且必须是6~16位</span
          >
        </div>
        <div
          v-if="isRegistering"
          class="flex flex-row gap-2.5 ml-[-10px] mt-2.5 justify-between items-center"
        >
          <label
            for="confirm-password"
            class="text-base text-baseC font-normal w-[24vw]"
            ><span class="text-red-500 text-base text-center w-2.5">*</span
            >确认密码 :</label
          >
          <input
            id="confirm-password"
            v-model="formDataAuth.confirmPassword"
            type="password"
            placeholder="请确认密码"
            class="border rounded p-1 grow ml-2.5"
          />
        </div>

        <div class="flex flex-row justify-between gap-2.5 w-full mt-4">
          <InvertedButton @click="router.go(-1)">
            <template #default>
              <div
                class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
              >
                <span
                  class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  返回上级
                </span>
              </div>
            </template>
          </InvertedButton>
          <PrimaryButton class="grow" @click="handlePayment">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide"
                  >即刻支付</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="OrderConfirm">
// 导入Vue相关功能和组件
import { computed, ref, reactive, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore, type ThemeColor } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";

import { useRouter, useRoute } from "vue-router";
import { Register } from "@/api/auth";
import { showSuccessToast, showFailToast } from "vant";
import { showLoadingToast, closeToast } from "vant";
import {
  decodeOrderData,
  encodeOrderData,
  executePriceFunction,
  validateField
} from "@/typings/data";
import { getSocketInfo } from "@/api/socket";
import { AddOrder, getOrderOnPayMent, payOrder } from "@/api/order";

// 使用主题相关的store
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);

// 使用Vue Router
const router = useRouter();
const route = useRoute();
const device_id = ref("");

// 定义表单数据类型
interface formdataAuth {
  email?: string;
  mobile: string;
  password: string;
  formData?: string;
}
interface formdataOrder {
  name: string;
  location: string;
  quantity: string;
  amount?: string;
  device_id: string;
}

// 解析路由查询参数
const orderQuery = route.query;

// 初始化表单数据
const formDataOrder = ref<formdataOrder>({
  name: "",
  location: "",
  quantity: "",
  amount: "",
  device_id: device_id.value
});
const formDataAuth = ref({
  email: "",
  mobile: "",
  password: "",
  confirmPassword: ""
});
interface formdataRegister {
  email?: string;
  mobile: string;
  password: string;
  token: string;
  formData: string;
}
const formDataRegister = ref<formdataRegister>({
  email: "",
  mobile: "",
  password: "",
  token: "",
  formData: ""
});
const isRegistering = ref(false);
const isShowRegister = ref(false);

// 计算属性用于验证表单字段
const isValidEmail = computed(() =>
  validateField("email", formDataAuth.value.email)
);
const isValidPhone = computed(() =>
  validateField("mobile", formDataAuth.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formDataAuth.value.password)
);

// 控制错误信息显示
const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);

// 注册处理函数
async function handleRegister() {
  // 更新错误信息显示状态
  isShowEmailSpan.value = formDataAuth.value.email && !isValidEmail.value;
  isShowPhoneSpan.value = !formDataAuth.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value =
    !formDataAuth.value.password || !isValidPassword.value;
  isShowConfirmPasswordSpan.value =
    formDataAuth.value.password !== formDataAuth.value.confirmPassword;

  // 验证表单数据
  if (
    isShowEmailSpan.value ||
    isShowPhoneSpan.value ||
    isShowPasswordSpan.value ||
    isShowConfirmPasswordSpan.value
  ) {
    showFailToast("请正确填写所有必填字段!");
    return;
  } else {
    Register(formDataRegister.value)
      .then((res: any) => {
        console.log("res", res);

        if (res.token) {
          localStorage.setItem("common_token", res.token);
          localStorage.setItem("isGuest", "false");
          showSuccessToast("注册成功,请在手机上确认");
          router.push({ path: "/afterRegister" });
        } else if (res.error) {
          showFailToast(res.error);
        }
      })
      .catch(err => {
        showFailToast(`注册失败:${err}`);
      });
  }
}

// 支付处理函数
const handlePayment = () => {
  let queryString = new URLSearchParams({
    mobile: formDataAuth.value.mobile,
    email: formDataAuth.value.email,
    quantity: formDataOrder.value.quantity,
    amount: formDataOrder.value.amount,
    device_id: device_id.value
  }).toString();
  let decodedString = decodeURIComponent(queryString);

  // 换成需要的数据结构字符串了
  formDataRegister.value = {
    mobile: formDataAuth.value.mobile,
    password: formDataAuth.value.password,
    formData: encodeOrderData(decodedString),
    token: localStorage.getItem("common_token") as string
  };

  // 添加邮箱
  if (formDataAuth.value.email) {
    formDataRegister.value = {
      ...formDataRegister.value,
      email: formDataAuth.value.email
    };
  }

  if (isShowRegister.value && isRegistering.value) {
    handleRegister();
    return;
  }
  // 注册成功后添加订单
  AddOrder({
    quantity: parseInt(formDataOrder.value.quantity),
    deviceUuid: device_id.value,
    remark: formDataOrder.value.location
  })
    .then((res: any) => {
      payOrder({
        uuid: res.data.uuid
      }).then((res2: any) => {
        console.log("res2", res2);
        router.push({
          name: "PayedAfter",
          query: {
            orderId: res2.data.orderUuid
          }
        });
      });
      //TODO: 支付订单
    })
    .catch(err => {
      showFailToast(err);
    });
};

// 组件挂载前的逻辑
onBeforeMount(async () => {
  const infoQuery = route.query;
  let isGuest = localStorage.getItem("isGuest");
  isShowRegister.value = isGuest === "true" ? true : false;
  // 如果token存在，则表示是链接由qq直接跳转过来的
  if (infoQuery.token) {
    isShowRegister.value = false; //不显示注册按钮
    //设置token mobile 选填email 时间
    localStorage.setItem("common_token", infoQuery.token as string);
    localStorage.setItem("mobile", infoQuery.mobile as string);
    formDataAuth.value.mobile = infoQuery.mobile as string;
    formDataOrder.value.quantity = infoQuery.quantity as string;
    if (infoQuery.email) {
      localStorage.setItem("email", infoQuery.email as string);
      formDataAuth.value.email = infoQuery.email as string;
    }
    device_id.value = infoQuery.device_id as string;
    // 获取设备详细信息
    getSocketInfo({ socketId: device_id.value })
      .then((res: any) => {
        formDataOrder.value.location = res.data.location;
        formDataOrder.value.name = res.data.name;
        formDataOrder.value.amount = executePriceFunction(
          parseInt(formDataOrder.value.quantity),
          res.data.priceFormula
        ).toString();
        console.log("formDataOrder.value.amount", formDataOrder.value.amount);
      })
      .catch(err => {
        showFailToast(err);
      });
  }
  //不是由链接跳转,正常过来的
  else {
    device_id.value = infoQuery.device_id as string;
    formDataOrder.value.device_id = device_id.value;
    formDataOrder.value.location = orderQuery.location as string;
    formDataOrder.value.name = orderQuery.name as string;
    formDataOrder.value.quantity = orderQuery.quantity as string;
    formDataOrder.value.amount = orderQuery.amount as string;
  }

  let mobile = localStorage.getItem("mobile");
  let email = localStorage.getItem("email");

  formDataAuth.value.mobile = formDataAuth.value.mobile
    ? formDataAuth.value.mobile
    : mobile;
  formDataAuth.value.email = formDataAuth.value.email
    ? formDataAuth.value.email
    : email;
});
</script>
