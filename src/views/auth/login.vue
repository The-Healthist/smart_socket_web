<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize}`"
    class="text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"
  >
    <div
      class="rounded-card bg-base flex flex-col pr-2.5 py-2.5 w-[95vw] h-[auto] mt-[20vh] absolute"
    >
      <div class="text-largest font-bold tracking-wide flex justify-center">
        登录账号
      </div>

      <!-- 登录表单 -->
      <form class="flex flex-col">
        <div class="relative mt-2.5 flex flex-row justify-center items-center">
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.mobile"
            type="number"
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
        <div class="relative mt-2.5 flex flex-row justify-center items-center">
          <!-- 添加一個紅色星號 -->
          <span class="text-red-500 text-sm text-center w-2.5">*</span>
          <input
            v-model="formData.password"
            type="password"
            placeholder="密码"
            class="p-2 border rounded w-full"
          />
        </div>
        <div class="flex h-2.5 ml-2.5">
          <span
            v-if="!isValidPassword && isShowPasswordSpan"
            class="text-red-500 text-sm"
            >密码不能为空且必须是6~16位</span
          >
        </div>
        <div class="flex justify-center items-center ml-2.5 gap-2.5 p-2.4 mt-3">
          <InvertedButton @click="handleLoginGuest()">
            <template #default>
              <div
                class="w-[30vw] h-[22px] flex flex-row justify-center items-center"
              >
                <span
                  class="text-large text-primary font-bold font-CactusClassicalSerifHK text-center"
                >
                  使用游客登陸
                </span>
              </div>
            </template>
          </InvertedButton>
          <PrimaryButton class="grow" @click="handleLogin()">
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

<script setup lang="ts" name="Login">
import { reactive, computed, ref } from "vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import InvertedButton from "@/components/Button/InvertedButton.vue";
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";
import { showFailToast, showSuccessToast } from "vant";
import { validateField } from "@/typings/data";
import { Login } from "@/api/auth";
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

const formData = ref({
  mobile: "13583325035",
  password: "test1234"
});

const isValidPhone = computed(() =>
  validateField("mobile", formData.value.mobile)
);
const isValidPassword = computed(() =>
  validateField("password", formData.value.password)
);
const isShowPhoneSpan = ref(false);
const isShowPasswordSpan = ref(false);

const loginAfter = ref<any>();
async function handleLogin() {
  isShowPhoneSpan.value = !formData.value.mobile || !isValidPhone.value;
  isShowPasswordSpan.value = !formData.value.password || !isValidPassword.value;

  if (isShowPhoneSpan.value || isShowPasswordSpan.value) {
    console.error("Please fill all required fields correctly!");
    return;
  }
  Login(formData.value)
    .then(res => {
      loginAfter.value = res;
      console.log("loginAfter", loginAfter.value);
      localStorage.setItem("common_token", loginAfter.value.token);
      console.log("common_token", localStorage.getItem("common_token"));
      localStorage.setItem("mobile", formData.value.mobile);
      localStorage.setItem("password", formData.value.password);
      localStorage.setItem("isGuest", "false");
      showSuccessToast("登录成功");
      router.push({ path: "/home" });
    })
    .catch(err => {
      showFailToast(`登录失败:${err}`);
    });
}

async function handleLoginGuest() {
  isShowPhoneSpan.value = false;
  isShowPasswordSpan.value = false;
  guestUserLogin()
    .then(res => {
      loginAfter.value = res;
      console.log("loginAfter", loginAfter.value);
      localStorage.setItem("common_token", loginAfter.value.token);
      localStorage.setItem("isGuest", "true");
      showSuccessToast("游客登录成功");
      router.push({ name: "Home" });
    })
    .catch(err => {
      showFailToast(`登录失败:${err}`);
    });
}
</script>
