<template>
  <div class="preview" ref="resumePreview" @mousedown="startDragging" @wheel.prevent="handleZoom">
    <div class="resume-content" :style="contentStyle">
      <!-- 替换为实际的简历内容 -->
      <templateA />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import templateA from "../../../template/templateA/index.vue";

// 获取预览容器的引用
const resumePreview = ref<HTMLElement | null>(null);

// 定义拖拽和缩放的状态
const state = reactive({
  scale: 0.55,           // 当前缩放比例
  translateX: 0,      // 当前水平位移
  translateY: 0,      // 当前垂直位移
  dragging: false,    // 是否正在拖拽
  startX: 0,          // 拖拽起始的鼠标X坐标
  startY: 0,          // 拖拽起始的鼠标Y坐标
  previewWidth: 0,    // 预览容器宽度
  previewHeight: 0,   // 预览容器高度
  contentWidth: 0,    // 内容宽度
  contentHeight: 0,   // 内容高度
});

// 初始化预览和内容尺寸
const updateBounds = async () => {
  await nextTick(); // 确保 DOM 已更新

  if (resumePreview.value) {
    const container = resumePreview.value;
    const content = container.querySelector(".resume-content") as HTMLElement;
    if (content) {
      state.previewWidth = container.clientWidth;
      state.previewHeight = container.clientHeight;
      state.contentWidth = content.offsetWidth;
      state.contentHeight = content.offsetHeight;

      limitTranslation();
    }
  }
};

// 缩放处理函数
const handleZoom = (event: WheelEvent) => {
  const zoomSpeed = 0.1; // 缩放速度
  const oldScale = state.scale; // 记录旧的缩放比例

  if (event.deltaY < 0) {
    // 放大，限制最大缩放比例为3倍
    state.scale = Math.min(state.scale + zoomSpeed, 3);
  } else {
    // 缩小，限制最小缩放比例为0.5倍
    state.scale = Math.max(state.scale - zoomSpeed, 0.2);
  }

  // 计算鼠标在容器中的位置偏移
  const rect = resumePreview.value?.getBoundingClientRect();
  if (rect) {
    const offsetX = event.clientX - rect.left - rect.width / 2 - state.translateX;
    const offsetY = event.clientY - rect.top - rect.height / 2 - state.translateY;

    // 根据新的缩放比例调整位移，保持缩放中心在鼠标位置
    state.translateX -= (offsetX / oldScale) * (state.scale - oldScale);
    state.translateY -= (offsetY / oldScale) * (state.scale - oldScale);
  }

  // 更新内容尺寸和预览尺寸
  updateBounds();
};

// 限制拖动范围，确保至少 30% 的内容在预览区域内
const limitTranslation = () => {
  // 计算缩放后的内容尺寸
  const scaledContentWidth = state.contentWidth * state.scale;
  const scaledContentHeight = state.contentHeight * state.scale;

  // 计算至少 30% 的内容需要保持可见
  const minVisibleX = scaledContentWidth * 0.3 / 2;
  const minVisibleY = scaledContentHeight * 0.3 / 2;

  // 计算预览容器的边界
  const previewLeft = -state.previewWidth / 2 + minVisibleX;
  const previewRight = state.previewWidth / 2 - minVisibleX;
  const previewTop = -state.previewHeight / 2 + minVisibleY;
  const previewBottom = state.previewHeight / 2 - minVisibleY;

  // 确保平移不会超过边界
  state.translateX = Math.min(previewRight, Math.max(state.translateX, previewLeft));
  state.translateY = Math.min(previewBottom, Math.max(state.translateY, previewTop));
};

// 开始拖拽
const startDragging = (event: MouseEvent) => {
  event.preventDefault(); // 防止选中文本等行为
  state.dragging = true;
  state.startX = event.pageX - state.translateX;
  state.startY = event.pageY - state.translateY;

  // 绑定全局的鼠标移动和松开事件
  document.addEventListener("mousemove", onDragging);
  document.addEventListener("mouseup", stopDragging);
};

// 拖拽中
const onDragging = (event: MouseEvent) => {
  if (state.dragging) {
    // 更新位移
    state.translateX = event.pageX - state.startX;
    state.translateY = event.pageY - state.startY;

    // 限制位移范围
    limitTranslation();
  }
};

// 停止拖拽
const stopDragging = () => {
  state.dragging = false;
  limitTranslation();
  // 移除全局的鼠标移动和松开事件
  document.removeEventListener("mousemove", onDragging);
  document.removeEventListener("mouseup", stopDragging);
};

// `.resume-content` 容器样式
const contentStyle = computed(() => ({
  // 应用平移和缩放
  transform: `translate(-50%, -50%) translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`,
  // 设置缩放中心为内容中心
  transformOrigin: "center center",
  // 拖拽时改变鼠标样式
  cursor: state.dragging ? "grabbing" : "grab",
  // 提升性能
  willChange: "transform",
  // 平滑过渡效果
  transition: state.dragging ? "none" : "transform 0.2s ease",
}));

// 初始化函数，在组件挂载时调用
onMounted(() => {
  updateBounds();
  window.addEventListener("resize", updateBounds);
});

// 组件销毁前移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateBounds);
});
</script>

<style scoped>
/* 预览区域的样式 */
.preview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 隐藏超出部分 */
  background-color: var(--color-7);
  /* 背景颜色 */
  cursor: grab;
  /* 拖拽手型光标 */
  user-select: none;
  /* 禁止文本选中 */
  /* border: 1px solid #000; */
  /* 边框以更明显地看到区域 */
}

/* 当预览区域被点击时更改光标 */
.preview:active {
  cursor: grabbing;
}

/* 简历内容的样式 */
.resume-content {
  position: absolute;
  top: 50%;
  /* 初始垂直居中 */
  left: 50%;
  /* 初始水平居中 */
  width: 794px;
  /* 内容宽度，可根据实际情况调整 */
  min-height: 1123px;
  /* border: 1px solid #000; */
  background-color: white;
  color: black;
  /* 模拟纸张阴影 */
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  /* 内容高度，可根据实际情况调整 */
  /* background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
