// src/stores/templateStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Template {
  id?: string
  name: string
  description: string
  folderPath: string
}

export const useTemplateStore = defineStore('templateStore', () => {
  // 定义当前选中的模板
  const currentTemplate = ref<Template | null>(null)

  // 设置模板
  function setTemplate(template: Template) {
    currentTemplate.value = template
  }

  return { currentTemplate, setTemplate }
}, {
  persist: true // 开启持久化存储
})
