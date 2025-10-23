<script setup lang="ts">
// ✨ 배경 이미지 import 제거
// import bgImage3 from '../public/images/3.jpg'

// ✨ 아이콘 이미지 경로 (실제 파일 경로로 변경 필요)
const ssoIconUrl = '/images/sso.svg' // '../public/' 제거하고 '/' 로 시작
const scrapingIconUrl = '/images/web_scraper.svg'
</script>

<template>
  <BaseSection
      class="panel h-dvh bg-white font-roman-section" text-color="#111827">
  <div class="text-center h-full flex flex-col justify-center">
    <h2 class="text-5xl md:text-7xl font-extrabold mb-6 section-title text-gray-900">SOLUTION PROGRAM</h2>
    <p class="text-lg md:text-xl text-gray-700 mb-10 md:mb-12 leading-relaxed section-description large">
      고객의 비즈니스에 새로운 가치를 더하는 포베리만의 기술력을 만나보세요.
    </p>
    <div class="flex flex-col items-center gap-6 md:gap-8 mb-10 md:mb-12 md:flex-row md:justify-center solution-cards">
      <div class="bg-white p-6 md:p-8  w-full max-w-[350px]  flex flex-col items-center text-center">
        <img :src="ssoIconUrl" alt="SSO 아이콘" class="h-24 w-24 mb-4 text-primary">
        <h3 class="text-xl md:text-2xl font-semibold mb-2 text-gray-800">베리패스 (Berry-Pass)</h3>
<!--        <p class="text-base md:text-lg text-gray-600 leading-normal">SSO 솔루션: 다양한 인증 통합 관리</p>-->
      </div>
      <div class="bg-white p-6 md:p-8  w-full max-w-[350px]  flex flex-col items-center text-center">
        <img :src="scrapingIconUrl" alt="웹 자동화 아이콘" class="h-24 w-24 mb-4 text-primary">
        <h3 class="text-xl md:text-2xl font-semibold mb-2 text-gray-800">베리마인 (Berry-Mine)</h3>
<!--        <p class="text-base md:text-lg text-gray-600 leading-normal">웹 자동화 솔루션: 정보 수집 및 RPA</p>-->
      </div>
    </div>
    <NuxtLink to="/services" class="inline-block text-primary border border-primary rounded-lg py-3 px-8 md:py-4 md:px-10 no-underline font-bold transition-all duration-200 ease-in-out hover:bg-blue-700 hover:scale-105 details-button">
      SEE ALL PRODUCT
    </NuxtLink>
  </div>
  </BaseSection>
</template>

<style scoped>
.font-roman-section {
  font-family: "Roman";
}
/* 카드 호버 효과는 유지 */
.solution-cards .card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.solution-cards .card:hover {
  transform: translateY(-5px);
  /* ✨ tailwind.config.js 에 정의된 shadow-card-hover 같은 것을 사용하거나 직접 정의 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* ✨ 아이콘 색상 적용 (SVG 파일 자체에 색이 없다면) */
/* .card img {
  filter: invert(15%) sepia(99%) saturate(4511%) hue-rotate(211deg) brightness(96%) contrast(101%);
} */
/* 또는 Tailwind의 text-primary 클래스를 SVG 내부 path에 직접 적용하는 방법도 있습니다. */
</style>