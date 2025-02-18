<template>
  <a-collapse class="honors-collapse">
    <a-collapse-panel key="1" header="荣誉奖项">
      <a-space direction="vertical" style="width: 100%">
        <!-- 荣誉列表 -->
        <div v-for="(honor, index) in honors" :key="index" class="honor-item">
          <div class="item-header">
            <h4>荣誉 #{{ index + 1 }}</h4>
            <a-button type="link" danger @click="removeHonor(honor.id)">删除</a-button>
          </div>

          <a-form layout="vertical">
            <a-row gutter="24">
              <a-col :span="12">
                <a-input v-model:value="honor.honorName" placeholder="请输入奖项名称" addonBefore="奖项" />
              </a-col>
              <a-col :span="12">
                <a-date-picker v-model:value="honor.date" placeholder="获奖时间" style="width: 100%" format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD" />
              </a-col>
            </a-row>

            <a-textarea v-model:value="honor.description" placeholder="请输入奖项描述" :auto-size="{ minRows: 2, maxRows: 5 }"
              style="margin-top: 16px" />
          </a-form>
          <a-divider v-if="index !== honors.length - 1" />
        </div>

        <!-- 添加按钮 -->
        <a-button type="dashed" block @click="addHonor" style="margin-top: 16px">
          <plus-outlined /> 添加荣誉奖项
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
const honors = computed(() => resumeStore.honors);
console.log(honors.value)
// 添加荣誉
const addHonor = () => {
  resumeStore.addHonor({
    honorName: '',
    date: '',
    description: ''
  });
};

// 删除荣誉 - 修正删除方法
const removeHonor = (id: number) => {

  // resumeStore.honors.splice(id, 1)
  resumeStore.deleteHonor(id)
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
.honors-collapse {
  margin: 20px auto 0;
  max-width: 800px;
  font-family: 'zql';
  background-color: var(--color-7);
}

.honor-item {
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