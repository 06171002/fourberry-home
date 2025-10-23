<template>
  <BaseSection
      class="panel h-dvh bg-white"
      text-color="#111827" >
    <div class="text-center h-full flex flex-col justify-center">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 section-title about-us-title">ABOUT US</h2>
      <p class="text-lg md:text-xl text-gray-700 mb-12 md:mb-16 leading-relaxed section-description">
        포베리는 사람 중심의 IT 기술 발전을 위해
        AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의 사업에 매진하고 있습니다.
      </p>
      <div
          ref="businessAreas"
          class="business-areas
                   flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-4 md:py-0 px-4 md:px-0
                   md:grid md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:overflow-x-visible md:p-0"
      >
        <div class="text-center p-5 md:p-8 area-card rounded-lg border border-gray-200 shadow-sm
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.si_sm" alt="시스템 통합 및 유지보수 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">시스템 통합 및 유지보수</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">비즈니스 환경에 최적화된 시스템을 구축하고 안정적으로 운영합니다.</p>
        </div>

        <div class="text-center p-5 md:p-8 area-card rounded-lg border border-gray-200 shadow-sm
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.solution" alt="자체 솔루션 개발 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">자체 솔루션 개발</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">SSO, 웹 자동화 등 고객의 비즈니스에 새로운 가치를 더하는 기술을 개발합니다.</p>
        </div>
        <div class="text-center p-5 md:p-8 area-card rounded-lg border border-gray-200 shadow-sm
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.rnd" alt="AI/빅데이터 R&D 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">AI/빅데이터 R&D</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">AI, 빅데이터 기술을 활용한 산학협력을 통해 혁신적인 솔루션을 연구합니다.</p>
        </div>
        <div class="text-center p-5 md:p-8 area-card rounded-lg border border-gray-200 shadow-sm
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.consulting" alt="IT 컨설팅 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">IT 컨설팅</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">비즈니스 목표 달성을 위한 최적의 IT 전략과 방향성을 제시합니다.</p>
        </div>

      </div>
    </div>
  </BaseSection>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// 1. index.vue에 있던 areaImages를 여기로 가져옵니다.
const areaImages = ref({
  si_sm: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop',
  solution: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop',
  rnd: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop',
  consulting: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop'
});

// 2. businessAreas ref를 생성합니다.
const businessAreas = ref<HTMLElement | null>(null);

// 3. 부모(index.vue)가 이 ref에 접근할 수 있도록 노출(expose)합니다.
defineExpose({
  businessAreas
})
</script>

<style scoped>
.about-us-title {
  font-family: "Roman", Pretendard, sans-serif; /* 폰트 적용 및 대체 폰트 지정 */
}

/* ========== ✨ ABOUT US 섹션 스타일 수정 ========== */
/* 흰색 배경이므로 파란색 포인트를 제목에 적용했던 것 제거 */
/* .business-areas .area-card h3 {
  color: #111827; /* Tailwind gray-900 */
/* } */

/* area-card 이미지 스타일 추가 */
.area-card-image {
  width: 100%;
  height: 150px; /* 이미지 높이 고정 (필요시 조절) */
  object-fit: cover; /* 이미지가 영역을 채우도록 */
  border-radius: 0.5rem; /* 약간 둥근 모서리 */
  margin-bottom: 1.5rem; /* 이미지와 텍스트 사이 간격 */
}
/* ========== ✨ ABOUT US 섹션 스타일 수정 끝 ========== */

/* ❗ 모바일 슬라이더 스크롤바 숨기기 */
.business-areas {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.business-areas::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>