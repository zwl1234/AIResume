<script lang="ts" setup>
import { inject, type Ref } from "vue";


const jd = inject<Ref<string>>("jd");
const resumeProject = inject<Ref<string>>("resumeProject");
</script>

<template>
  <div class="data-input">
    <div class="input-section">
      <div class="input-header">岗位 JD<span style="font-size: 12px;">（岗位要求）</span></div>
      <a-textarea v-model:value="jd" placeholder="请输入岗位 JD..." class="custom-textarea" />
    </div>
    <div class="input-section" id="input-value">
      <div class="input-header">经历<span style="font-size: 12px;">（建议一次深挖一段经历即可）</span></div>
      <a-textarea v-model:value="resumeProject" placeholder="请输入项目/实习/工作经历..." class="custom-textarea" />
    </div>
  </div>
</template>

<style scoped>
.data-input {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--bg-card-color);
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

.input-header {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  padding: 0 4px;
}

:deep(.custom-textarea) {
  flex: 1;
  display: flex;
  background: var(--chat-input-bg);
  border-color: var(--chat-border);
  border-radius: 8px;
  transition: all 0.3s;
}

:deep(.custom-textarea:hover) {
  border-color: var(--color-4);
}

:deep(.custom-textarea:focus) {
  border-color: var(--color-4);
  box-shadow: 0 0 0 2px rgba(var(--color-4-rgb), 0.1);
}

:deep(.ant-input) {
  background: var(--chat-input-bg);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  overflow-y: auto;
  height: 100% !important;
  min-height: unset !important;
}

:deep(.ant-input::placeholder) {
  color: var(--chat-placeholder);
}

:deep(.ant-input::-webkit-scrollbar) {
  width: 6px;
}

:deep(.ant-input::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.ant-input::-webkit-scrollbar-thumb) {
  background: var(--chat-border);
  border-radius: 3px;
}

:deep(.ant-input::-webkit-scrollbar-thumb:hover) {
  background: var(--color-6);
}
</style>