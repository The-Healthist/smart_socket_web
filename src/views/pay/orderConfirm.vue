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
          <div class="text-larger">{{ formDataOrder?.address }}</div>
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
            {{ formDataOrder?.quantity }}HKD
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
        <!-- <div v-if="noToken" class="flex items-center mt-4"> -->
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
<script setup lang="ts" name="Home">
import { computed, ref, reactive, onBeforeMount } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter, useRoute } from "vue-router";
import { createOrder, Register } from "@/api/mock";
import { showSuccessToast, showFailToast } from "vant";
import {
  decodeFormData,
  decodeOrderData,
  encodeFormData,
  encodeOrderData,
  validateField
} from "@/typings/data";
import { info } from "node:console";
import { getSocketInfo } from "@/api/socket";
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();
const device_id = ref("");

interface formdataAuth {
  email?: string;
  mobile: string;
  password: string;
}
interface formdataOrder {
  name: string;
  address: string;
  quantity: string;
  amount?: string;
}
interface Factor {
  email?: string;
  mobile: string;
  formDataAuth: string;
}
const route = useRoute();
const orderQuery = route.query;
const formDataOrder = ref<formdataOrder>({
  name: "",
  address: "",
  quantity: "",
  amount: ""
});

//注册
const formDataAuth = ref({
  email: "",
  mobile: "",
  password: "",
  confirmPassword: ""
});
const isRegistering = ref(false);
const isShowRegister = ref(false);
//校验
const isValidEmail = computed(() =>
  validateField("email", formDataAuth.value.email)
);
const isValidPhone = computed(() =>
  validateField("mobile", formDataAuth.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formDataAuth.value.password)
);
// 应该返回 true 或 false 根据密码长度

const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);
const loginAfter = ref<any>();

async function handleRegister() {
  isShowEmailSpan.value = formDataAuth.value.email && !isValidEmail.value;
  isShowPhoneSpan.value = !formDataAuth.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value =
    !formDataAuth.value.password || !isValidPassword.value;
  isShowConfirmPasswordSpan.value =
    formDataAuth.value.password !== formDataAuth.value.confirmPassword;

  if (
    isShowEmailSpan.value ||
    isShowPhoneSpan.value ||
    isShowPasswordSpan.value ||
    isShowConfirmPasswordSpan.value
  ) {
    showFailToast("请正确填写所有必填字段!");
    console.error("Please fill all required fields correctly!");
    return;
  }
  // //base64加密
  // let baseFormDataAuth = !!formDataAuth.email
  //   ? encodeFormData(
  //       formDataAuth.mobile,
  //       formDataAuth.password,
  //       formDataAuth.email
  //     )
  //   : encodeFormData(formDataAuth.mobile, formDataAuth.password);
  // 将formdataOrder 的值拼接成字符串,然后base64加密
  //mobile=13849392993&device_id=644dd44e-67b3-485f-8f39-1c9ea49833d6& quantity=5 拼接成这样

  let queryString = new URLSearchParams(formDataOrder.value).toString();
  console.log(queryString);
  // 手机号,密码,邮箱可选
  let formdataAuth: formdataAuth = {
    mobile: formDataAuth.value.mobile,
    password: formDataAuth.value.password
  };
  if (formDataAuth.value.email) {
    formdataAuth = { ...formdataAuth, email: formDataAuth.value.email };
  }

  Register(formdataAuth)
    .then(res => {
      loginAfter.value = res;
      localStorage.setItem("token", loginAfter.value.token);
      localStorage.setItem("mobile", formDataAuth.value.mobile);
      localStorage.setItem("password", formDataAuth.value.password);
      localStorage.setItem("uuid", loginAfter.value.uuid);
      if (formDataAuth.value.email) {
        localStorage.setItem("email", formDataAuth.value.email);
      }
      showSuccessToast("注册成功");
    })
    .catch(err => {
      console.log(err);
      showFailToast("注册失败");
    })
    .finally(() => {
      console.log("finally");
    });
}

const handlePayment = () => {
  // Handle payment logic here
  if (isRegistering.value) {
    handleRegister();
  }

  let baseFormDataAuth = encodeOrderData(orderQuery);
  //表单数据,手机号,邮箱可选
  let factor: Factor = {
    mobile: formDataAuth.value.mobile,
    formDataAuth: baseFormDataAuth
  };
  if (formDataAuth.value.email) {
    factor = { ...factor, email: formDataAuth.value.email };
  }

  createOrder(factor).then(res => {
    console.log(res);
    const after: any = res;
    router.push(after.url);
  });
};
// 1
onBeforeMount(async () => {
  const infoQuery = route.query;
  console.log("query", infoQuery);
  //由链接跳转而来
  if (infoQuery.token) {
    console.log("token", infoQuery.token);
    localStorage.setItem("token", infoQuery.token as string);
    localStorage.setItem("mobile", infoQuery.mobile as string);
    formDataAuth.value.mobile = infoQuery.mobile as string;
    device_id.value = infoQuery.device_id as string; //设备id
    formDataOrder.value.quantity = infoQuery.quantity as string;
    if (infoQuery.email) {
      localStorage.setItem("email", infoQuery.email as string);
      formDataAuth.value.email = infoQuery.email as string;
    }
    getSocketInfo({ socketId: device_id.value })
      .then((res: any) => {
        // let data: any = res.data;
        formDataOrder.value.address = res.data.address;
        formDataOrder.value.name = res.data.name;
      })
      .catch(err => {
        showFailToast(err);
      });
  }
  // 不是链接跳转过来的
  else {
    device_id.value = orderQuery.device_id as string;
    formDataOrder.value.address = orderQuery.address as string;
    formDataOrder.value.name = orderQuery.name as string;
    formDataOrder.value.quantity = orderQuery.quantity as string;
  }

  // 是否需要注册
  let mobile = localStorage.getItem("mobile");
  let email = localStorage.getItem("email");
  let isGuest = localStorage.getItem("isGuest");
  formDataAuth.value.mobile = formDataAuth.value.mobile ? "" : mobile;
  formDataAuth.value.email = formDataAuth.value.email ? "" : email;
  isShowRegister.value = isGuest === "true" ? true : false;
  // localStorage.setItem("isGuest", "true");
});
</script>
