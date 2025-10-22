<template>
  <div>
    <!-- <div class="preloader"></div> -->

    <!-- <AppHeader /> -->
    <main>
      <slot />
    </main>
    <!-- <AppFooter /> -->
  </div>
</template>

<style> /* scoped가 아닌 일반 style 태그를 사용합니다. */

</style>

<style scoped>
main {
  min-height: 80vh;
}
</style>