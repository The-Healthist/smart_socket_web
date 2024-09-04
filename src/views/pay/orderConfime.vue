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
          <span class="text-small text-baseC font-normal truncate"
            >插座名稱 :</span
          >
          <div class="text-larger">{{ order.name }}</div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate"
            >插座地址 :</span
          >
          <div class="text-larger">{{ order.address }}</div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate"
            >租用時間 :</span
          >
          <div class="text-large font-bold">{{ order.duration }}kWh</div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-small text-baseC font-normal truncate"
            >支付金额 :</span
          >
          <div class="text-larger font-bold">{{ order.duration }}HKD</div>
        </div>

        <!-- Payment Details -->
        <div class="flex flex-row gap-2.5 mt-2.5 justify-between items-center">
          <label for="email" class="w-[20vw] text-small text-baseC font-normal"
            >邮箱地址 :</label
          >
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="请输入邮箱地址/选填"
            class="border rounded p-1 grow"
          />
        </div>
        <div class="flex h-2.5">
          <span v-if="isShowEmailSpan" class="text-red-500 text-sm"
            >邮箱格式不正确</span
          >
        </div>
        <div
          class="flex flex-row gap-2.5 justify-between mt-2.5 ml-[-10px] items-center"
        >
          <label
            for="phone"
            class="w-[20vw] text-small text-baseC font-normal flex flex-row justify-center items-center"
          >
            <span class="text-red-500 text-sm text-center w-2.5">*</span
            >支付手机号:</label
          >
          <input
            id="phone"
            v-model="formData.mobile"
            type="tel"
            placeholder="请输入手机号/不可为空"
            class="border rounded p-1 grow ml-2.5"
          />
        </div>
        <div class="flex h-2.5">
          <span v-if="isShowPhoneSpan" class="text-red-500 text-sm"
            >手机号码不能位空且为6~12位数字</span
          >
        </div>

        <!-- One-Click Register Checkbox -->
        <!-- <div v-if="noToken" class="flex items-center mt-4"> -->
        <div class="flex items-center mt-4">
          <input
            id="register-checkbox"
            v-model="isRegistering"
            type="checkbox"
            class="mr-2"
          />
          <label
            for="register-checkbox"
            class="text-small text-baseC font-normal"
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
            class="text-small text-baseC font-normal w-[20vw]"
            ><span class="text-red-500 text-sm text-center w-2.5">*</span>密码
            :</label
          >
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            class="border rounded p-1 grow ml-2.5"
          />
        </div>
        <div class="flex h-2.5">
          <span v-if="isShowPasswordSpan" class="text-red-500 text-sm"
            >密码不能为空且必须是6~16位</span
          >
        </div>
        <div
          v-if="isRegistering"
          class="flex flex-row gap-2.5 ml-[-10px] mt-2.5 justify-between items-center"
        >
          <label
            for="confirm-password"
            class="text-small text-baseC font-normal w-[20vw]"
            ><span class="text-red-500 text-sm text-center w-2.5">*</span
            >确认密码 :</label
          >
          <input
            id="confirm-password"
            v-model="formData.confirmPassword"
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

const route = useRoute();
const order = route.query;
console.log(order);

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();
const noToken = ref(true);

//注册相关
const formData = reactive({
  email: "",
  mobile: "",
  password: "",
  confirmPassword: ""
});
// const isRegistering = computed(() => {
//   if (noToken.value) return true;
//   return false;
// });
const isRegistering = ref(false);
const isValidEmail = computed(() => validateField("email", formData.email));
const isValidPhone = computed(() => validateField("mobile", formData.mobile));
const isValidPassword = computed(() =>
  validateField("password", formData.password)
);
// 应该返回 true 或 false 根据密码长度

const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);
const loginAfter = ref<any>();
interface formdata {
  email?: string;
  mobile: string;
  password: string;
  formData: string;
}
interface Factor {
  email?: string;
  mobile: string;
  formData: string;
}

async function handleRegister() {
  isShowEmailSpan.value = formData.email && !isValidEmail.value;
  isShowPhoneSpan.value = !formData.mobile || !isValidPhone.value;
  isShowPasswordSpan.value = !formData.password || !isValidPassword.value;
  isShowConfirmPasswordSpan.value =
    formData.password !== formData.confirmPassword;

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
  //base64加密
  let baseFormData = !!formData.email
    ? encodeFormData(formData.mobile, formData.password, formData.email)
    : encodeFormData(formData.mobile, formData.password);
  let formdata: formdata = {
    mobile: formData.mobile,
    password: formData.password,
    formData: baseFormData
  };
  if (formData.email) {
    formdata = { ...formdata, email: formData.email };
  }

  Register(formdata)
    .then(res => {
      loginAfter.value = res;
      localStorage.setItem("token", loginAfter.value.token);
      localStorage.setItem("mobile", formData.mobile);
      localStorage.setItem("password", formData.password);
      localStorage.setItem("uuid", loginAfter.value.uuid);
      if (formData.email) {
        localStorage.setItem("email", formData.email);
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

interface after {
  url: string;
  qrCode: string;
}
const handlePayment = () => {
  // Handle payment logic here
  if (isRegistering.value) {
    handleRegister();
  }

  let baseFormData = encodeOrderData(order);
  //表单数据,手机号,邮箱可选
  let factor: Factor = {
    mobile: formData.mobile,
    formData: baseFormData
  };
  if (formData.email) {
    factor = { ...factor, email: formData.email };
  }

  createOrder(factor).then(res => {
    console.log(res);
    const after: any = res;
    router.push(after.url);
  });
};
onBeforeMount(async () => {
  // 判断本地有没有存token和mobile
  let token = localStorage.getItem("token");
  let mobile = localStorage.getItem("mobile");
  let email = localStorage.getItem("email");
  if (mobile) {
    formData.mobile = mobile;
  }
  if (email) {
    formData.email = email;
  }
  if (token) {
    noToken.value = false;
  }
});
</script>
