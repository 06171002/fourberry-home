<script setup lang="ts">
defineProps({
  backgroundImageUrl: {
    type: String,
    required: false,
    default: '',
  },
  // 텍스트 색상을 위한 prop 추가 (선택 사항)
  textColor: {
    type: String,
    default: 'inherit', // 기본값은 부모 요소 색상 상속
  }
})
</script>

<template>
  <section
      class="relative py-12 px-4 md:py-24 md:px-8 section-container"
      :style="{ color: textColor }"
  >
    <div
        v-if="backgroundImageUrl"
        class="background-image"
        :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImageUrl}')` }"
    ></div>
    <div class="relative z-10 max-w-[1100px] mx-auto px-4 md:px-8 h-full">
      <slot />
    </div>
  </section>
</template>

<style scoped>
/* 배경 이미지 스타일 추가 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0; /* 콘텐츠 뒤로 보내기 */
}

/* BaseSection 자체에만 적용할 스타일이 있다면 여기에 추가합니다. */
/* .section-container { overflow: hidden; } /* 필요하다면 */
</style>