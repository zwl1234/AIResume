<template>
  <div class="settings-container">
    <a-card class="settings-card" :bordered="false">
      <h2 class="title">必要设置</h2>

      <div class="input-group">
        <label for="api-key">阿里云 API Key（使用大模型）</label>
        <a-input id="api-key" v-model:value="settingsStore.aliApiKey" placeholder="请输入 API Key" />
        <p class="tips">请填写阿里云 API Key 用于调用 AI 模型，<a href="https://bailian.console.aliyun.com/?apiKey=1#/api-key"
            target="_blank">获取阿里云百炼 APIKey</a>
        </p>
      </div>

      <div class="input-group">
        <label for="api-url">阿里云 API URL（使用大模型）</label>
        <a-input id="api-url" v-model:value="settingsStore.aliApiUrl" placeholder="请输入 API URL" />
        <!-- 描述 -->
        <p class="tips">请填写阿里云百炼 API URL（经过反向代理后的），用于调用 AI 模型，或者直接用我在cf构建的反代地址：https://ai.2911396166.workers.dev/ <a
            href="https://help.aliyun.com/zh/model-studio/developer-reference/use-qwen-by-calling-api?spm=a2c4g.11186623.0.0.2c082562wEtpNJ"
            target="_blank">阿里百炼文档</a>
        </p>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../../store/useSettingsStore';
const settingsStore = useSettingsStore();
</script>

<style scoped>
.settings-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.settings-card {
  width: 100%;
  max-width: 600px;
  background: var(--card-color);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

label {
  font-size: 14px;
  font-weight: 500;
}

.tips {
  font-size: 12px;
}
</style>
