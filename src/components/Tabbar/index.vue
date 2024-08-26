<template>
  <div :class="`theme-${theme}`">
    <div
      class="bg-base/80 h-[55px] px-5 py-[5px] rounded-[20px] fixed bottom-2 gap-3 flex justify-between items-center shadow"
    >
      <router-link
        to="/home"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/home') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="ion:home-outline" class="text-[24px]" />
        <div>首頁</div>
      </router-link>
      <router-link
        to="/order"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/order') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="cil:list" class="text-[24px]" />
        <div>訂單</div>
      </router-link>
      <router-link
        to="/auth"
        :class="[
          'hover:text-primary focus:text-primary w-[59px]  flex-col justify-center items-center gap-1 flex',
          isActive('/auth') ? 'text-primary' : 'text-muted'
        ]"
      >
        <i-icon icon="ion:person-outline" class="text-[24px]" />
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "@/store/theme/themeStore";

// Access the theme store
const themeStore = useThemeStore();
const theme = computed(() => themeStore.getTheme);

// Access the current route
const route = useRoute();

// Function to check if the current route matches the path
const isActive = (path: string) => route.path === path;
</script>
