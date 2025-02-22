import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    // 是否为暗黑模式
    const isDark = ref<boolean>(localStorage.getItem('theme') === 'dark');
    // 主题颜色
    const theme = ref<string>(isDark.value ? '#9c87fe' : '#672DEA');
    // 阿里云apikey
    const aliApiKey = ref<string>('');
    // 阿里云调用接口
    const aliApiUrl = 'https://ai.2911396166.workers.dev/';  //这里用默认的
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

    // 监听 isDark 变化，自动更新主题颜色和 class
    watch(isDark, (value) => {
      theme.value = value ? '#9c87fe' : '#672DEA';
      document.documentElement.classList.toggle('dark', value);
    });

    return {
      isDark,
      theme,
      toggleTheme,
      initTheme,
      aliApiKey,
      aliApiUrl
    };
  },
  {
    persist: true, // 开启持久化存储
  }
);
