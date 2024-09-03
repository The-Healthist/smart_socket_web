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
          <span
            v-if="!isValidEmail && isShowEmailSpan"
            class="text-red-500 text-sm"
            >邮箱格式不正确</span
          >
        </div>
        <div class="flex flex-row gap-2.5 justify-between mt-2.5 items-center">
          <label for="phone" class="w-[20vw] text-small text-baseC font-normal"
            >支付手机号 :</label
          >
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="请输入手机号/不可为空"
            class="border rounded p-1 grow"
          />
        </div>
        <div class="flex h-2.5">
          <span
            v-if="!isValidPhone && isShowPhoneSpan"
            class="text-red-500 text-sm"
            >手机号码不能位空且为6~12位数字</span
          >
        </div>

        <!-- One-Click Register Checkbox -->
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
          class="flex flex-row gap-2.5 mt-2.5 justify-between items-center"
        >
          <label
            for="password"
            class="text-small text-baseC font-normal w-[20vw]"
            >密码 :</label
          >
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            class="border rounded p-1 grow"
          />
        </div>
        <div class="flex h-2.5">
          <span
            v-if="!isValidPassword && isShowPasswordSpan"
            class="text-red-500 text-sm"
            >密码不能为空且必须是6~16位</span
          >
        </div>
        <div
          v-if="isRegistering"
          class="flex flex-row gap-2.5 mt-2.5 justify-between items-center"
        >
          <label
            for="confirm-password"
            class="text-small text-baseC font-normal w-[20vw]"
            >确认密码 :</label
          >
          <input
            id="confirm-password"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请确认密码"
            class="border rounded p-1 grow"
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
import { computed, ref, reactive } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter, useRoute } from "vue-router";

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

const isRegistering = ref(false);

const formData = reactive({
  email: "",
  phone: "",
  password: "",
  confirmPassword: ""
});

const isValidEmail = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
);
const isValidPhone = computed(() => /^\d{6,12}$/.test(formData.phone));
const isValidPassword = computed(() => /^.{6,16}$/.test(formData.password));
const isPasswordMatch = computed(
  () => formData.password === formData.confirmPassword
);

const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);
function handleRegister() {
  isShowPhoneSpan.value = !isValidPhone.value && !formData.phone;
  isShowPasswordSpan.value = !isValidPassword.value && !formData.password;
  isShowConfirmPasswordSpan.value =
    !isPasswordMatch.value && !!formData.confirmPassword;
  isShowEmailSpan.value = !isValidEmail.value && !!formData.email;

  if (
    !isValidEmail.value ||
    !isValidPhone.value ||
    !isValidPassword.value ||
    !isPasswordMatch.value
  ) {
    console.error("Please fill all required fields correctly!");
    return;
  }

  console.log("Email:", formData.email);
  console.log("Phone:", formData.phone);
  console.log("Password:", formData.password);
}

const handlePayment = () => {
  // Handle payment logic here
  handleRegister();
};
</script>
