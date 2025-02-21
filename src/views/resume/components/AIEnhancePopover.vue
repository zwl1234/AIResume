<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { sendToQwenAI } from "../../../api/qwenAPI";
import { useResumeStore } from '../../../store';
import { defineEmits } from "vue";

const resumeStore = useResumeStore();
const personalInfo = computed(() => resumeStore.personalInfo);
const props = defineProps({
  description: String,
});

const emit = defineEmits<{
  update: [content: string]
}>();

const AIReply = ref("");
const loading = ref(false);

const showTitle = computed(() => {
  if (!props.description || props.description.length < 5) {
    return "请输入更多信息后可使用 AI 润色功能";
  }
  return "AI 润色";
});

// 构建 AI 提示语
const buildPrompt = (text: string) => {
  return `我现在求职的是${personalInfo.value.applicationPosition}岗位，
  ${text}`;
};

const handleAiEnhance = async () => {
  if (!props.description || props.description.length < 5) return;

  loading.value = true;
  AIReply.value = ""; // 清空上一次的结果

  try {
    await sendToQwenAI(
      buildPrompt(props.description),
      (text, isComplete) => {
        AIReply.value = text;
        if (isComplete) {
          loading.value = false;
        }
      }
    );
  } catch (error) {
    console.error("AI 处理失败:", error);
    AIReply.value = "AI 处理失败，请稍后再试。";
    loading.value = false;
  }
};

const handleApply = () => {
  if (AIReply.value) {
    emit('update', AIReply.value);
  }
};
</script>

<template>
  <a-popover :title="showTitle" trigger="click" placement="right" arrowPointAtCenter="true">
    <template #content v-if="description && description.length > 4">
      <div class="ai-controls">
        <a-button type="primary" @click="handleAiEnhance" :loading="loading">
          AI 润色
        </a-button>
        <a-button type="primary">扩展方向</a-button>
      </div>

      <div class="ai-content">
        <a-spin :spinning="loading">
          <div v-if="AIReply" class="ai-reply">
            {{ AIReply }}
            <div class="apply-button">
              <a-button type="link" size="small" @click="handleApply">
                <template #icon>
                  <check-outlined />
                </template>
                应用
              </a-button>
            </div>
          </div>
        </a-spin>
      </div>
    </template>

    <slot />
  </a-popover>
</template>

<style scoped>
.ai-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.ai-content {
  min-width: 300px;
  max-width: 500px;
}

.ai-reply {
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  font-size: 14px;
  padding: 12px;
  background-color: #f5f5f500;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}

.apply-button {
  position: absolute;
  right: 8px;
  top: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 2px;
}
</style>
