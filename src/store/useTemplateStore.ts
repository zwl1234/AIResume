import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Template } from "../types/template";


export const useTemplateStore = defineStore('templateStore', () => {
  const currentTemplate = ref<Template | null>(null)
  const themeColor = ref<string>('#203CCB')
  function setThemeColor(color: string) {
    themeColor.value = color
  }
  function setTemplate(template: Template) {
    currentTemplate.value = template
  }
  return { currentTemplate, setTemplate, themeColor, setThemeColor }
}, {
  persist: true // 开启持久化存储
})
