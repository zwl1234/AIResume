<!-- 初始化 -->
<template>
  <div class="resume">
    <!-- 左侧简历内容编辑组件 -->
    <div class="left">

      <resumeEdit />

    </div>
    <!-- 右侧简历展示组件 -->
    <div class="right">222</div>
  </div>
</template>
<script setup lang="ts">
import resumeEdit from './components/resumeEdit.vue';
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
  background-color: #06ec85;
}
</style>