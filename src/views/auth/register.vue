<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col py-2.5 pr-2.5 w-[95vw] h-[auto] mt-[15vh] absolute"
    >
      <div class="text-largest font-bold tracking-wide flex justify-center">
        注册账号
      </div>

      <!-- 注册表单 -->
      <form class="flex flex-col" @submit.prevent="handleRegister">
        <div class="relative mt-2.5 ml-2.5">
          <input
            v-model="formData.email"
            placeholder="邮箱"
            class="p-2 border rounded w-full"
          />
          <div class="flex h-2.5">
            <span
              v-if="isShowEmailSpan && formData.email"
              class="text-red-500 text-sm"
              >邮箱格式不正确</span
            >
          </div>
        </div>
        <div class="relative mt-2.5 flex flex-row items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.mobile"
            type="tel"
            placeholder="手机号码"
            class="p-2 border rounded w-full"
          />
        </div>
        <div class="flex h-2.5 ml-2.5">
          <span v-if="isShowPhoneSpan" class="text-red-500 text-sm"
            >手机号码不能位空且为6~12位数字</span
          >
        </div>
        <div class="relative mt-2.5 flex flex-row justify-center items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.password"
            type="password"
            placeholder="密码"
            class="p-2 border rounded w-full"
          />
        </div>
        <div class="flex h-2.5 ml-2.5">
          <span v-if="isShowPasswordSpan" class="text-red-500 text-sm"
            >密码不能为空且必须是6~16位</span
          >
        </div>
        <div class="relative mt-2.5 flex flex-row items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="确认密码"
            class="p-2 border rounded w-full"
          />
        </div>
        <div class="flex h-2.5 ml-2.5">
          <span v-if="isShowConfirmPasswordSpan" class="text-red-500 text-sm"
            >确认密码与密码不匹配</span
          >
        </div>
        <div class="flex justify-center items-center gap-2.5 p-2.4 mt-3 ml-2.5">
          <InvertedButton @click="router.push({ name: 'Login' })">
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
          <PrimaryButton class="grow" type="submit">
            <template #default>
              <div
                class="h-[22px] flex flex-row justify-center items-center gap-2"
              >
                <i-icon icon="mingcute:flash-line" class="text-[20px]" />
                <span class="text-larger text-inverted font-bold tracking-wide"
                  >立即注册</span
                >
              </div>
            </template>
          </PrimaryButton>
        </div>
      </form>
      <div class="flex justify-center items-center p-2.4 mt-2.5">
        <span
          class="text-primary/80 text-small hover:text-primary cursor-pointer"
          @click="router.push('/login')"
          >已有账号?点击登录</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { Register } from "@/api/mock";
import { showSuccessToast, showFailToast } from "vant";
import { decodeFormData, encodeFormData, validateField } from "@/typings/data";

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.getTheme);
const roundedStore = useRoundedStore();
const currrentRounded = computed(() => roundedStore.getRounded);
const fontsizeStore = useFontSizeStore();
const currentFontSize = computed(() => fontsizeStore.getFontSize);
const textStore = useTextStore();
const text = computed(() => textStore.getText);
const router = useRouter();
const formData = reactive({
  email: "",
  mobile: "",
  password: "",
  confirmPassword: ""
});
interface Factor {
  email?: string;
  mobile: string;
  password: string;
  formData: string;
}

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
  let factor: Factor = {
    mobile: formData.mobile,
    password: formData.password,
    formData: baseFormData
  };
  if (formData.email) {
    factor = { ...factor, email: formData.email };
  }

  Register(factor)
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
      router.push({ name: "Home" });
    });
}
</script>
