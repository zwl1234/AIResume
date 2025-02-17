<template>
  <header class="navbar">
    <nav>
      <ul>
        <!-- logo -->
        <!-- <li class="logo-li">
          <img src="../../assets/imgs/logo.png" alt="logo" class="logo" />
          <span class="logo-text">轨迹——全能简历平台</span>
        </li> -->
        <!-- vuerouter路由跳转 -->
        <li><router-link to="/">简历制作</router-link></li>
        <li><router-link to="/resumeDesign">简历模板设计</router-link></li>
        <li><router-link to="/template">模板市场</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style scoped>
.navbar {
  /* 渐变背景色 */
  background: linear-gradient(to right, var(--color-5), var(--color-6), var(--color-5));
  overflow: hidden;
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar nav ul li {
  float: left;
}

.logo-li {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-li img {
  height: 50px;
  width: 50px;
}

.logo-text {
  font-size: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.navbar nav ul li a {
  display: block;
  color: white;
  text-align: center;
  font-size: 17px;
  padding: 17px 16px;
  text-decoration: none;
  transition: all 0.22s;
}

.navbar nav ul li a:hover {
  background-color: #ffffff;
  color: black;
}
</style>