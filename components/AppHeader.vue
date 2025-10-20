<script setup lang="ts">
// 스크립트 로직 (아직은 비워둡니다)
</script>

<template>
  <header class="header">
    <div class="container">
      <a href="/" class="logo">FOURBERRY</a>
      <nav class="navigation">
        <a href="/about">회사소개</a>
        <a href="/projects">SI/SM</a>
        <a href="/services">솔루션</a>
        <a href="/contact">문의하기</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #ffffff;
  padding: 1rem 0;
  border-bottom: 1px solid #eaeaea;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  color: #2c3e50;
}
.navigation a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #2c3e50;
}
</style>
