<template>
  <a-collapse class="personal-evaluation-collapse">
    <a-collapse-panel key="1" header="个人总结">
      <a-space direction="vertical" style="width: 100%">
        <!-- 姓名、联系电话同行 -->

        <a-textarea v-model:value="summary" placeholder="请输入个人总结" :auto-size="{ minRows: 2, maxRows: 5 }" />

      </a-space>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useResumeStore } from '../../../store';

// 获取 store 实例
const resumeStore = useResumeStore();

// 将 summary 直接绑定为 ref 类型，便于修改
const summary = ref(resumeStore.summary);

// 监听 summary 的变化并保存到 store
watch(summary, (newValue) => {
  resumeStore.summary = newValue;
  resumeStore.saveToLocalStorage();
}, { immediate: true });
</script>

<style scoped>
.personal-evaluation-collapse {
  margin: 0 auto;
  max-width: 800px;
  font-family: 'zql';
  background-color: var(--color-7);
  margin-top: 20px;
}

/* 针对 a-textarea 组件中的 textarea 元素设置 box-sizing */
.ant-input {
  box-sizing: border-box;
  font-family: 'zql';
}
</style>
