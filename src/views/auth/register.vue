<template>
  <!-- 主容器 -->
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <!-- 註冊卡片 -->
    <div
      class="rounded-card bg-base flex flex-col py-2.5 pr-2.5 w-[95vw] h-[auto] mt-[15vh] absolute"
    >
      <!-- 標題 -->
      <div class="text-largest font-bold tracking-wide flex justify-center">
        註冊帳號
      </div>

      <!-- 註冊表單 -->
      <form class="flex flex-col" @submit.prevent="handleRegister">
        <!-- 郵箱輸入 -->
        <div class="relative mt-2.5 ml-2.5">
          <input
            v-model="formData.email"
            placeholder="郵箱"
            class="p-2 border rounded w-full"
          />
          <!-- 郵箱錯誤提示 -->
          <div class="flex h-2.5">
            <span
              v-if="isShowEmailSpan && formData.email"
              class="text-red-500 text-sm"
              >郵箱格式不正確</span
            >
          </div>
        </div>
        <!-- 手機號輸入 -->
        <div class="relative mt-2.5 flex flex-row items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.mobile"
            type="tel"
            placeholder="手機號碼"
            class="p-2 border rounded w-full"
          />
        </div>
        <!-- 手機號錯誤提示 -->
        <div class="flex h-2.5 ml-2.5">
          <span v-if="isShowPhoneSpan" class="text-red-500 text-sm"
            >手機號碼不能位空且為6~12位數字</span
          >
        </div>
        <!-- 密碼輸入 -->
        <div class="relative mt-2.5 flex flex-row justify-center items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.password"
            type="password"
            placeholder="密碼"
            class="p-2 border rounded w-full"
          />
        </div>
        <!-- 密碼錯誤提示 -->
        <div class="flex h-2.5 ml-2.5">
          <span v-if="isShowPasswordSpan" class="text-red-500 text-sm"
            >密碼不能為空且必須是6~16位</span
          >
        </div>
        <!-- 確認密碼輸入 -->
        <div class="relative mt-2.5 flex flex-row items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="確認密碼"
            class="p-2 border rounded w-full"
          />
        </div>
        <!-- 確認密碼錯誤提示 -->
        <div class="flex h-2.5 ml-2.5">
          <span v-if="isShowConfirmPasswordSpan" class="text-red-500 text-sm"
            >確認密碼與密碼不匹配</span
          >
        </div>
        <!-- 按鈕區 -->
        <div class="flex justify-center items-center gap-2.5 p-2.4 mt-3 ml-2.5">
          <!-- 返回登錄按鈕 -->
          <InvertedButton @click="router.push({ name: 'Login' })">
            <template #default>
              <div
                class="w-[22vw] h-[22px] flex flex-row justify-center items-center"
              >
                <span
                  class="text-base text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  返回登錄
                </span>
              </div>
            </template>
          </InvertedButton>
          <!-- 提交註冊按鈕 -->
          <PrimaryButton class="grow" type="submit">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide"
                  >立即註冊</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </form>
      <!-- 已有帳號登錄提示 -->
      <div class="flex justify-center items-center p-2.4 mt-2.5">
        <span
          class="text-primary/80 text-small hover:text-primary cursor-pointer"
          @click="router.push('/login')"
          >已有帳號?點擊登錄</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Register">
// 引入Vue相關功能
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue"; // 主按鈕組件
import InvertedButton from "@/components/Button/InvertedButton.vue"; // 反轉按鈕組件
import { useThemeStore } from "@/store/theme/themeStore"; // 主題存儲
import { useRoundedStore } from "@/store/theme/roundStore"; // 圓角存儲
import { useFontSizeStore } from "@/store/theme/fontsizeStore"; // 字體大小存儲
import { useTextStore } from "@/store/theme/textStore"; // 文本存儲
import { useRouter } from "vue-router"; // 路由功能
import { Register } from "@/api/auth"; // 註冊API
import { showSuccessToast, showFailToast } from "vant"; // 提示信息組件
import { decodeFormData, encodeFormData, validateField } from "@/typings/data"; // 數據處理和驗證

// 使用存儲和計算屬性
const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();

// 表單數據
const formData = ref({
  email: "2021632245@qq.com",
  mobile: "15666823185",
  password: "1090119",
  confirmPassword: "1090119"
});

// 驗證字段
interface Factor {
  email?: string;
  mobile: string;
  password: string;
  token?: string;
}

const isValidEmail = computed(() =>
  validateField("email", formData.value.email)
);
const isValidPhone = computed(() =>
  validateField("mobile", formData.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formData.value.password)
);

// 顯示錯誤信息的狀態
const isShowEmailSpan = ref(false);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);
const isShowConfirmPasswordSpan = ref(false);
const loginAfter = ref<any>();

// 處理註冊邏輯
async function handleRegister() {
  isShowEmailSpan.value = formData.value.email && !isValidEmail.value;
  isShowPhoneSpan.value = !formData.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value = !formData.value.password || !isValidPassword.value;
  isShowConfirmPasswordSpan.value =
    formData.value.password !== formData.value.confirmPassword;

  // 檢查所有字段是否正確填寫
  if (
    isShowEmailSpan.value ||
    isShowPhoneSpan.value ||
    isShowPasswordSpan.value ||
    isShowConfirmPasswordSpan.value
  ) {
    showFailToast("請正確填寫所有必填字段!");
    return;
  }
  let factor: Factor = {
    mobile: formData.value.mobile,
    password: formData.value.password
  };
  if (formData.value.email) {
    factor = { ...factor, email: formData.value.email };
  }
  const isGuest = localStorage.getItem("isGuest") === "true";
  const token = localStorage.getItem("common_token");
  if (isGuest && token) {
    factor = { ...factor, token };
  }

  // 調用註冊API
  Register(factor)
    .then(res => {
      loginAfter.value = res;
      console.log(res);
      localStorage.setItem("common_token", loginAfter.value.token);
      localStorage.setItem("mobile", formData.value.mobile);
      localStorage.setItem("password", formData.value.password);
      localStorage.setItem("isGuest", "false");
      if (formData.value.email) {
        localStorage.setItem("email", formData.value.email);
      }
      showSuccessToast("註冊成功");
      router.push({ name: "Home" });
    })
    .catch(err => {
      console.log(err);
      showFailToast(`註冊失敗:${err.response.data.message}`);
    });
}
</script>
