<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
main {
  min-height: 80vh; /* 푸터가 항상 아래에 있도록 최소 높이 설정 */
}
</style>