import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'resume',
    component: () => import('@/views/resume/index.vue')
  },
  {
    path: '/resumeDesign',
    name: 'resumeDesign',
    component: () => import('@/views/resumeDesign/index.vue')
  },
  {
    path: '/template',
    name: 'template',
    component: () => import('@/views/template/index.vue')
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 历史模式
  routes
});

export default router;
