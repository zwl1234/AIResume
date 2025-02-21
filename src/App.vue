<script setup lang="ts">
import Header from "./components/Header/index.vue";
import ThemeSwitcher from './components/ThemeSwitcher/index.vue';
import { useResumeStore } from './store/useResumeStore';
import { useSettingsStore } from './store/useSettingsStore';
import { onMounted } from 'vue';
// 获取 Pinia 的 store 实例
const settingsStore = useSettingsStore();

// 页面加载时初始化
onMounted(() => {
  const resumeStore = useResumeStore();
  resumeStore.initializeCurrentId();
  // 初始化当前id
  settingsStore.initTheme();
});
</script>

<template>
  <!-- 头部组件 -->
  <Header />
  <a-config-provider :theme="{
    token: {
      colorPrimary: settingsStore.theme,
    },
  }">
    <router-view />
  </a-config-provider>
  <ThemeSwitcher />
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
