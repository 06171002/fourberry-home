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
        <div class="text-center p-5 md:p-8 area-card rounded-lg
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.si_sm" alt="시스템 통합 및 유지보수 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">시스템 통합 및 유지보수</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">비즈니스 환경에 최적화된 시스템을 구축하고 안정적으로 운영합니다.</p>
        </div>

        <div class="text-center p-5 md:p-8 area-card rounded-lg
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.solution" alt="자체 솔루션 개발 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">자체 솔루션 개발</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">SSO, 웹 자동화 등 고객의 비즈니스에 새로운 가치를 더하는 기술을 개발합니다.</p>
        </div>
        <div class="text-center p-5 md:p-8 area-card rounded-lg
                      w-[85%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.rnd" alt="AI/빅데이터 R&D 이미지" class="area-card-image">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">AI/빅데이터 R&D</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">AI, 빅데이터 기술을 활용한 산학협력을 통해 혁신적인 솔루션을 연구합니다.</p>
        </div>
        <div class="text-center p-5 md:p-8 area-card rounded-lg
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue' // nextTick 추가

// 기존 코드
const areaImages = ref({
  si_sm: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop',
  solution: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop',
  rnd: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop',
  consulting: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop'
});
const businessAreas = ref<HTMLElement | null>(null);

// --- ✨ 자동 스크롤 로직 추가 ---
let intervalId: ReturnType<typeof setInterval> | null = null; // setInterval ID 저장용
let interactionTimeoutId: ReturnType<typeof setTimeout> | null = null; // 사용자 인터랙션 후 재개를 위한 setTimeout ID
const autoplayDelay = 1000; // 자동 넘김 간격 (3초)
const interactionDebounce = 1000; // 사용자가 터치/스크롤 후 자동 넘김 재개까지 대기 시간 (5초)
let isMobileLayout = false; // 모바일 레이아웃 여부 플래그
let mediaQueryList: MediaQueryList | null = null; // MediaQueryList 인스턴스

// 다음 카드로 스크롤하는 함수
const scrollToNextCard = () => {
  if (!businessAreas.value) return;

  const container = businessAreas.value;
  const cards = container.querySelectorAll('.area-card');
  if (!cards.length) return;

  // 현재 스크롤 위치에서 가장 가까운 카드 찾기 (중앙 기준)
  let currentScroll = container.scrollLeft;
  let containerCenter = currentScroll + container.clientWidth / 2;
  let closestCardIndex = 0;
  let minDistance = Infinity;

  cards.forEach((card, index) => {
    const cardElement = card as HTMLElement;
    const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestCardIndex = index;
    }
  });

  // 다음 카드 인덱스 계산 (마지막 카드면 처음으로)
  const nextCardIndex = (closestCardIndex + 1) % cards.length;
  const nextCard = cards[nextCardIndex] as HTMLElement;

  // 다음 카드의 중앙 또는 시작 위치로 스크롤
  // snap-center를 사용하므로 중앙 정렬을 위해 계산하거나, 간단히 offsetLeft 사용 가능
  const scrollTo = nextCard.offsetLeft - (container.clientWidth - nextCard.offsetWidth) / 2; // 중앙 정렬
  // const scrollTo = nextCard.offsetLeft; // 시작 위치 정렬 (snap-start와 더 잘 맞음)

  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });
};

// 자동 스크롤 시작 함수
const startAutoplay = () => {
  stopAutoplay(); // 기존 타이머 중지
  if (!isMobileLayout) return; // 모바일 레이아웃일 때만 실행
  intervalId = setInterval(scrollToNextCard, autoplayDelay);
};

// 자동 스크롤 중지 함수
const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// 사용자 인터랙션 감지 시 호출될 함수
const handleInteraction = () => {
  stopAutoplay(); // 자동 넘김 중지
  if (interactionTimeoutId) {
    clearTimeout(interactionTimeoutId); // 기존 재개 타이머 취소
  }
  // 일정 시간 후 자동 넘김 재개 설정
  interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce);
};

// 미디어 쿼리 변경 감지 핸들러
const handleResize = () => {
  if (!mediaQueryList) return;
  isMobileLayout = mediaQueryList.matches; // 768px 미만이면 true
  if (isMobileLayout) {
    // 모바일 뷰가 되면 자동 스크롤 시작 (딜레이 후)
    if (interactionTimeoutId) clearTimeout(interactionTimeoutId);
    interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce);
  } else {
    // 데스크탑 뷰가 되면 자동 스크롤 중지
    stopAutoplay();
    if (interactionTimeoutId) clearTimeout(interactionTimeoutId);
  }
};


onMounted(async () => {
  // nextTick을 사용하여 DOM 업데이트 및 렌더링 완료 후 실행 보장
  await nextTick();

  if (businessAreas.value && window.matchMedia) {
    mediaQueryList = window.matchMedia('(max-width: 767px)'); // md 브레이크포인트 미만 감지
    isMobileLayout = mediaQueryList.matches; // 초기 상태 설정

    if (isMobileLayout) {
      // 초기 로드 시 자동 스크롤 시작 (첫 인터랙션 딜레이 적용)
      interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce);
    }

    // 사용자 인터랙션(터치 시작, 스크롤) 감지 리스너 추가
    businessAreas.value.addEventListener('touchstart', handleInteraction, { passive: true });
    businessAreas.value.addEventListener('scroll', handleInteraction, { passive: true });

    // 화면 크기 변경 감지 리스너 추가
    mediaQueryList.addEventListener('change', handleResize);
  }
});

onUnmounted(() => {
  stopAutoplay(); // 컴포넌트 제거 시 타이머 중지
  if (interactionTimeoutId) {
    clearTimeout(interactionTimeoutId); // 재개 타이머도 제거
  }
  // 이벤트 리스너 제거
  if (businessAreas.value) {
    businessAreas.value.removeEventListener('touchstart', handleInteraction);
    businessAreas.value.removeEventListener('scroll', handleInteraction);
  }
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', handleResize);
  }
});
// --- ✨ 자동 스크롤 로직 끝 ---

// 기존 expose 코드
defineExpose({
  businessAreas
})
</script>

<style scoped>
/* 기존 스타일 유지 */
.about-us-title {
  font-family: "Roman";
}
.area-card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  /* ✨ 이미지 드래그 방지 (선택 사항) */
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  margin-bottom: 1.5rem;
}
.business-areas {
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* ✨ 터치 스크롤 성능 향상 (선택 사항) */
  -webkit-overflow-scrolling: touch;
}
.business-areas::-webkit-scrollbar {
  display: none;
}
</style>