import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  // 是否为暗黑模式
  const isDark = ref(localStorage.getItem('theme') === 'dark');
  // 主题颜色
  const theme = ref(isDark.value ? '#9c87fe' : '#672DEA');

  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    theme.value = isDark.value ? '#9c87fe' : '#672DEA';
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  // 初始化主题
  const initTheme = () => {
    isDark.value = localStorage.getItem('theme') === 'dark';
    theme.value = isDark.value ? '#9c87fe' : '#672DEA';
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  return {
    isDark,
    theme,
    toggleTheme,
    initTheme,
  };
});
