<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col pr-2.5 py-2.5 w-[95vw] h-[auto] mt-[20vh] absolute"
    >
      <div class="text-largest font-bold tracking-wide flex justify-center">
        游客登陸
      </div>

      <!-- 登录表单 -->
      <form class="flex flex-col" @submit.prevent="handleLogin">
        <div class="relative mt-2.5 ml-2.5">
          <input
            v-model="formData.email"
            type="email"
            placeholder="邮箱/选填"
            class="p-2 border rounded w-full"
          />
          <div class="flex h-2.5">
            <span
              v-if="isValidEmail && isShowEmailSpan"
              class="text-red-500 text-sm"
              >邮箱格式不正确</span
            >
          </div>
        </div>
        <div class="relative mt-2.5 flex flex-row justify-center items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.phone"
            type="tel"
            placeholder="手机号码"
            class="p-2 border rounded w-full"
          />
        </div>
        <div class="flex h-2.5 ml-2.5">
          <span
            v-if="!isValidPhone && isShowPhoneSpan"
            class="text-red-500 text-sm"
            >手机号码不能位空且为6~12位数字</span
          >
        </div>

        <div class="flex justify-center items-center ml-2.5 gap-2.5 p-2.4 mt-3">
          <InvertedButton @click="router.push({ name: 'Login' })">
            <template #default>
              <div
                class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
              >
                <span
                  class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  密碼登錄
                </span>
              </div>
            </template>
          </InvertedButton>
          <PrimaryButton class="grow" type="submit">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide"
                  >即刻登录</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </form>
      <div class="flex justify-center items-center p-2.4 mt-2.5">
        <span
          class="text-primary/80 text-small hover:text-primary cursor-pointer"
          @click="router.push('/register')"
          >没有账号?点击注册</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { guestUserLogin } from "@/api/auth";

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();
const isShowPasswordSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowEmailSpan = ref(false);
const formData = reactive({
  email: "",
  phone: ""
});

// uuid: 1,
//         type: "游客",
//         token: "12345634sdfsdfsdfsdfsdfsdf"
type LoginAfter = {
  uuid: string;
  type: string;
  token: string;
};
const loginAfter = ref<any>();
const isValidEmail = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
);
const isValidPhone = computed(() => {
  return (
    formData.phone.length >= 6 &&
    formData.phone.length <= 12 &&
    /^\d+$/.test(formData.phone)
  );
});

async function handleLogin() {
  isShowPhoneSpan.value = !isValidPhone.value || !formData.phone;
  isShowEmailSpan.value = !isValidEmail.value && !formData.email;

  if (!isValidPhone.value || !formData.phone) {
    console.error("Please fill all required fields correctly!");
    return;
  }
  guestUserLogin({ mobile: formData.phone })
    .then(res => {
      console.log("res", res);
      loginAfter.value = res;

      localStorage.setItem("token", loginAfter.value.token);
    })
    .catch(err => {
      console.log("err", err);
    })
    .finally(() => {
      router.push({ name: "Home" });
    });

  console.log("Email:", formData.email);
  console.log("Phone:", formData.phone);
}
</script>
