<!-- 父组件代码 -->
<template>
  <div class="resume">

    <!-- 左侧简历内容编辑组件 -->
    <div class="left">
      <div class="btn-group">
        <!-- 预览填充 -->
        <a-popconfirm title="填充会覆盖当前数据，确定吗？" ok-text="确定" cancel-text="取消" @confirm="resumeStore.autoFillData">
          <template #icon><question-circle-outlined style="color: red" /></template>
          <a-button type="primary" ghost>
            <eye-outlined />
            预览填充
          </a-button>
        </a-popconfirm>

        <!-- 清空数据 -->
        <a-popconfirm title="确定要清空当前简历数据吗？" ok-text="清空" cancel-text="取消" @confirm="resumeStore.clearData">
          <template #icon><warning-outlined style="color: red" /></template>
          <a-button danger>
            <delete-outlined />
            清空数据
          </a-button>
        </a-popconfirm>

        <!-- 导出数据 -->
        <a-button type="default" @click="resumeStore.exportData">
          <download-outlined />
          导出数据
        </a-button>

        <!-- 导入按钮 -->
        <a-upload v-model:fileList="fileList" :beforeUpload="handleFileUpload" :showUploadList="false"
          accept="application/json">
          <a-button type="dashed">
            <upload-outlined />
            导入数据
          </a-button>
        </a-upload>
      </div>

      <resumeEdit />
    </div>
    <!-- 右侧简历展示组件 -->
    <div class="right">
      <resumePreview />
    </div>
  </div>
</template>

<script setup lang="ts">
import resumeEdit from './components/resumeEdit.vue';
import resumePreview from './components/resumePreview.vue';
import { useResumeStore } from "../../store/useResumeStore";
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";
import { ref } from 'vue';
const resumeStore = useResumeStore();
const fileList = ref<UploadProps["fileList"]>([]);

// 处理文件上传
const handleFileUpload = (file: File) => {
  if (file.type !== "application/json") {
    message.error("请上传 JSON 文件！");
    return false;
  }
  resumeStore.importData(file);
  // 清空 fileList，避免重复上传不触发事件
  fileList.value = [];
  return false;
};
</script>

<style scoped>
.resume {
  display: flex;
  justify-content: space-between;
}

.left {
  width: 38%;
  height: 100vh;
  background-color: var(--bg-color);
  transition: all 0.3s;
  min-width: 520px;
}

.right {
  width: 62%;
  height: 100vh;
  position: relative;
  /* 添加 */
  overflow: hidden;
  /* 添加 */
}

.btn-group {
  height: 50px;
  display: flex;
  justify-content: center;
  /* 中间间隔 */
  gap: 20px;
  align-items: center;
}
</style>
