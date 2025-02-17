<template>
  <button @click="toggleTheme">
    <SvgIcon :iconName="isDark ? 'white' : 'dark'" className="theme_box"></SvgIcon>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SvgIcon from "../SvgIcon.vue";
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>
<style scoped>
button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  padding: 16px 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

/* button的点击事件 */
button:hover {
  transform: scale(1.1);
}

/* 点击动画 */
button:active {
  transform: scale(0.9);
}

.theme_box {
  width: 24px;
  height: 24px;
}
</style>