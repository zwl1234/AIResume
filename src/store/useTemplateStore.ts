// src/stores/templateStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Template } from "../types/template";


export const useTemplateStore = defineStore('templateStore', () => {
  // 定义当前选中的模板
  const currentTemplate = ref<Template | null>(null)
  // 简历主题色
  const themeColor = ref<string>('#4084B2')

  // 设置简历主题色
  function setThemeColor(color: string) {
    themeColor.value = color
  }
  // 设置模板
  function setTemplate(template: Template) {
    currentTemplate.value = template
  }

  return { currentTemplate, setTemplate, themeColor, setThemeColor }
}, {
  persist: true // 开启持久化存储
})
