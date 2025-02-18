<template>
  <div class="resume-edit">
    <!-- 个人信息编辑组件 -->
    <personalInfo />

    <!-- 自我评价 -->
    <selfEvaluation />
  </div>
</template>

<script setup lang="ts">
import personalInfo from './personalInfo.vue';
import selfEvaluation from './selfEvaluation.vue';

</script>

<style scoped>
.resume-edit {
  padding: 12px;
}
</style>