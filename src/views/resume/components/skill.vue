<template>
  <a-collapse class="skills-collapse">
    <a-collapse-panel key="1" header="专业技能">
      <a-space direction="vertical" style="width: 100%">
        <!-- 技能列表 -->
        <div v-for="(skill, index) in skills" :key="index" class="skill-item">
          <div class="item-header">
            <h4>技能 #{{ index + 1 }}</h4>
            <a-button type="link" danger @click="removeSkill(skill.id)">删除</a-button>
          </div>

          <a-form layout="vertical">
            <a-input v-model:value="skill.skillName" placeholder="请输入技能名称" addonBefore="技能" />
          </a-form>
          <a-divider v-if="index !== skills.length - 1" />
        </div>

        <!-- 添加按钮 -->
        <a-button type="dashed" block @click="addSkill" style="margin-top: 16px">
          <plus-outlined /> 添加技能
        </a-button>
      </a-space>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useResumeStore } from '../../../store';

const resumeStore = useResumeStore();
const skills = computed(() => resumeStore.skills);

// 添加技能
const addSkill = () => {
  resumeStore.addSkill({
    skillName: ''
  });
};

// 删除技能
const removeSkill = (id: number) => {
  // resumeStore.skills.splice(index, 1);
  resumeStore.deleteSkill(id)
};

// 监听变化并保存到 localStorage
watch(
  () => resumeStore.$state,
  () => {
    resumeStore.saveToLocalStorage();
  },
  { deep: true }
);
</script>

<style scoped>
.skills-collapse {
  margin: 20px auto 0;
  max-width: 800px;
  font-family: 'zql';
  background-color: var(--color-7);
}

.skill-item {
  width: 100%;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.item-header h4 {
  margin: 0;
}
</style>