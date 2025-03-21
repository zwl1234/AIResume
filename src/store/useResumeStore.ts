// src/store/useResumeStore.ts
import { defineStore } from 'pinia';
import { resumeTemplate } from '../data/resumeDataTemplate.ts';
import { message } from 'ant-design-vue';
// 定义类型
export interface PersonalInfo {
  name: string;
  gender: string;
  phone: string;
  email: string;
  university: string;
  politicalStatus: string;
  website: string;
  avatar: string;
  major: string;
  applicationPosition: string;
  age: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string | null;
  endDate: string | null;
  description: string;
}

export interface Skill {
  id: number;
  skillName: string;
}

export interface Project {
  id: number;
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  // 项目简介
  briefIntroduction: string;
  description: string;

}

export interface Honor {
  id: number;
  honorName: string;
  date: string;
  description: string;
}

export interface ResumeState {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  honors: Honor[];
  summary: string;
  currentId: number;
  isFirstVisit: boolean;
}

export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => {
    // 从 localStorage 获取保存的数据
    const savedResumeData = localStorage.getItem('resumeData');
    const savedCurrentId = localStorage.getItem('currentId');
    const isFirstVisit = localStorage.getItem('isFirstVisit') === null; // 检查是否首次访问

    const currentId = savedCurrentId && !isNaN(Number(savedCurrentId))
      ? Number(savedCurrentId)
      : 1;
    const resumeData = savedResumeData ? JSON.parse(savedResumeData) : resumeTemplate;

    // 如果是首次访问，标记并自动填充数据
    if (isFirstVisit) {
      localStorage.setItem('isFirstVisit', 'false');
    }

    return {
      ...resumeData,
      currentId,
      isFirstVisit, // 添加到state中
    };
  },
  actions: {
    // 初始化时检查最大 id，后面新增的时候，id是递增的
    initializeCurrentId() {
      const allIds = [
        ...this.education.map(item => item.id),
        ...this.workExperience.map(item => item.id),
        ...this.skills.map(item => item.id),
        ...this.projects.map(item => item.id),
        ...this.honors.map(item => item.id)
      ];
      this.currentId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
      localStorage.setItem('currentId', JSON.stringify(this.currentId));
    },
    // 导出数据
    exportData() {
      const dataStr = JSON.stringify(this.$state, null, 2); // 格式化 JSON 以便可读
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume_data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    // 导入数据
    importData(file: File) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          this.$state = jsonData; // 直接覆盖 Pinia 状态
          this.saveToLocalStorage(); // 保存到 localStorage
          message.success('数据导入成功！');
        } catch (error) {
          message.error('数据解析失败，请检查文件格式！');
        }
      };
      reader.readAsText(file);
    },
    // 清空
    clearData() {
      // 重置数据
      Object.assign(this.$state, JSON.parse(JSON.stringify(resumeTemplate))); // 彻底重置数据
      this.currentId = 1; // 重置 ID 计数
      this.saveToLocalStorage(); // 更新 localStorage
      message.success('数据已清空');
    },
    // 自动填充数据
    async autoFillData() {
      try {
        const response = await fetch('/resumeData.json');
        const data = await response.json();
        this.$state = { ...data, isFirstVisit: false }; // 保持 isFirstVisit
        this.saveToLocalStorage();
        message.success('数据已自动填充');
      } catch (error) {
        message.error('加载数据失败');
      }
    },
    // 保存到 localStorage
    saveToLocalStorage() {
      localStorage.setItem('resumeData', JSON.stringify(this.$state));
      localStorage.setItem('currentId', JSON.stringify(this.currentId));
    },

    // 通用新增方法
    addItem<T extends { id: number }>(list: T[], newItem: Omit<T, 'id'>) {
      const newEntry = { ...newItem, id: this.currentId++ } as T;
      list.push(newEntry);
      this.saveToLocalStorage();
    },

    // 通用删除方法
    deleteItem<T extends { id: number }>(list: T[], id: number) {
      const index = list.findIndex(item => item.id === id);
      if (index !== -1) {
        list.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    // 通用更新方法
    updateItem<T extends { id: number }>(list: T[], updatedItem: T) {
      const index = list.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        list[index] = updatedItem;
        this.saveToLocalStorage();
      }
    },

    // 更新个人信息
    updatePersonalInfo(updatedInfo: Partial<PersonalInfo>) {
      this.personalInfo = { ...this.personalInfo, ...updatedInfo };
      this.saveToLocalStorage();
    },

    // 更新自我评价
    updateSummary(updatedSummary: string) {
      this.summary = updatedSummary;
      this.saveToLocalStorage();
    },

    // 新增教育经历
    addEducation(newItem: Omit<Education, 'id'>) {
      this.addItem(this.education, newItem);
    },

    // 删除教育经历
    deleteEducation(id: number) {
      this.deleteItem(this.education, id);
    },

    // 更新教育经历
    updateEducation(updatedItem: Education) {
      this.updateItem(this.education, updatedItem);
    },

    // 新增工作经验
    addWorkExperience(newItem: Omit<WorkExperience, 'id'>) {
      this.addItem(this.workExperience, newItem);
    },

    // 删除工作经验
    deleteWorkExperience(id: number) {
      this.deleteItem(this.workExperience, id);
    },

    // 更新工作经验
    updateWorkExperience(updatedItem: WorkExperience) {
      this.updateItem(this.workExperience, updatedItem);
    },

    // 新增技能
    addSkill(newItem: Omit<Skill, 'id'>) {
      this.addItem(this.skills, newItem);
    },

    // 删除技能
    deleteSkill(id: number) {
      this.deleteItem(this.skills, id);
    },

    // 更新技能
    updateSkill(updatedItem: Skill) {
      this.updateItem(this.skills, updatedItem);
    },

    // 新增项目经验
    addProject(newItem: Omit<Project, 'id'>) {
      this.addItem(this.projects, newItem);
    },

    // 删除项目经验
    deleteProject(id: number) {
      this.deleteItem(this.projects, id);
    },

    // 更新项目经验
    updateProject(updatedItem: Project) {
      this.updateItem(this.projects, updatedItem);
    },

    // 新增荣誉奖项
    addHonor(newItem: Omit<Honor, 'id'>) {
      this.addItem(this.honors, newItem);
    },

    // 删除荣誉奖项
    deleteHonor(id: number) {
      this.deleteItem(this.honors, id);
    },

    // 更新荣誉奖项
    updateHonor(updatedItem: Honor) {
      this.updateItem(this.honors, updatedItem);
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem('resumeStore');
      if (stored) {
        this.$state = JSON.parse(stored);
      }
    },

    // 初始化检查
    async initCheck() {
      if (this.isFirstVisit) {
        await this.autoFillData();
      }
    }
  }
});


