<template>
  <div :class="`theme-${theme}`">
    <div
      class="bg-card h-[55px] px-5 py-[5px] rounded-[20px] fixed bottom-2 gap-3 flex justify-between items-center shadow"
    >
      <router-link
        to="/"
        class="w-[59px] flex-col justify-center items-center gap-1 flex"
      >
        <i-icon icon="ion:home-outline" class="text-primary text-[24px]" />
        <div>首頁</div>
      </router-link>
      <router-link
        to="/order"
        class="w-[59px] flex-col justify-center items-center gap-1 flex"
      >
        <i-icon icon="cil:list" class="text-primary text-[24px]" />
        <div>訂單</div>
      </router-link>
      <router-link
        to="/auth"
        class="w-[59px] flex-col justify-center items-center gap-1 flex"
      >
        <i-icon icon="ion:person-outline" class="text-primary text-[24px]" />
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/store/theme/themeStore";

const themeStore = useThemeStore();
const theme = computed(() => themeStore.getTheme);
const router = useRouter();
</script>
