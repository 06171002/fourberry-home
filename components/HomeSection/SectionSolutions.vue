<script setup lang="ts">
// 해당 섹션 배경 이미지 import
import bgImage3 from '../public/images/3.jpg'
</script>

<template>
  <BaseSection
      class="panel h-dvh" :background-image-url="bgImage3"
      text-color="#ffffff" >
    <div class="text-center h-full flex flex-col justify-center">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 section-title">자체 개발 솔루션</h2>
      <p class="text-lg md:text-xl text-gray-700 mb-10 md:mb-12 leading-relaxed section-description large">
        고객의 비즈니스에 새로운 가치를 더하는 포베리만의 기술력을 만나보세요.
      </p>
      <div class="flex flex-col items-center gap-6 md:gap-8 mb-10 md:mb-12 md:flex-row md:justify-center solution-cards">
        <div class="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[350px] card border border-gray-100">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">베리패스 (Berry-Pass)</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal">SSO 솔루션: 다양한 인증 통합 관리</p>
        </div>
        <div class="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[350px] card border border-gray-100">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">베리마인 (Berry-Mine)</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal">웹 자동화 솔루션: 정보 수집 및 RPA</p>
        </div>
      </div>
      <NuxtLink to="/services" class="inline-block bg-transparent text-blue-600 border-2 border-blue-600 rounded-lg py-3 px-8 md:py-4 md:px-10 no-underline font-bold transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white hover:border-blue-600 details-button">자세히 보기</NuxtLink>
    </div>
  </BaseSection>
</template>

<style scoped>
/* 솔루션 카드 추가 스타일 (index.vue에서 가져옴) */
.solution-cards .card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.solution-cards .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); /* 호버 시 그림자 강조 */
}
</style>