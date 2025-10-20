<template>
  <div>
    <div class="preloader"></div>

    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style> /* scoped가 아닌 일반 style 태그를 사용합니다. */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 9999; /* 모든 요소 중 가장 위에 있도록 설정 */
}
</style>

<style scoped>
main {
  min-height: 80vh;
}
</style>