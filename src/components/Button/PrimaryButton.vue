<!-- 背景色是primary 的按钮 -->
<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const buttonClass = computed(() => {
  return {
    "bg-primary text-inverted rounded-button p-2.5 font-bold": true,
    "hover:opacity-70": !props.disabled,
    "opacity-50 cursor-not-allowed": props.disabled
  };
});
</script>
