<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
// ❗ ScrollTrigger와 함께 Observer를 import 합니다.
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'

// import bgImage1 from '../assets/image/1.jpg' // 더 이상 사용하지 않음
import bgImage2 from '../assets/image/2.jpg'
import bgImage3 from '../assets/image/3.jpg'
import bgImage4 from '../assets/image/4.jpg'

// 페이지 메타 정의: home 레이아웃 사용
definePageMeta({
  layout: 'home',
})

const mainContainer = ref<HTMLElement | null>(null);
const businessAreas = ref<HTMLElement | null>(null);

// ❗ unmount 시 정리할 타임라인과 옵저버 인스턴스를 저장할 변수
let heroTl: gsap.core.Timeline | null = null;
let panelTls: (gsap.core.Timeline | null)[] = [];
let observer: Observer | null = null;
let panels: HTMLElement[] = []; // 패널 배열

// 각 area-card에 사용할 이미지 URL (추천)
const areaImages = ref({
  si_sm: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop', // 시스템 통합/유지보수: 팀 협업 이미지
  solution: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop', // 솔루션 개발: 데이터 분석/대시보드 이미지
  rnd: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop', // R&D: 회로/기술 이미지
  consulting: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop' // 컨설팅: 회의/프레젠테이션 이미지
});

// ❗ 2. 옵저버 토글 함수 정의 (리스너 제거를 위해)
const disableObserver = () => observer?.disable();
const enableObserver = () => observer?.enable();

onMounted(() => {
  // ❗ Observer 플러그인 등록
  gsap.registerPlugin(ScrollTrigger, Observer)

  panels = gsap.utils.toArray<HTMLElement>('.panel');
  if (!mainContainer.value || panels.length === 0) return;

  // --- 1. Hero 섹션 초기 로드 애니메이션 (기존 코드 유지) ---
  gsap.set('.home-hero h1, .home-hero .hero-subtitle', { autoAlpha: 0, y: 40 });

  heroTl = gsap.timeline(); // ❗ 변수에 할당

  heroTl.to(".home-hero h1", {
    duration: 1.2,
    y: 0,
    autoAlpha: 1,
    ease: "power3.out"
  }, "-=0.3")
      .to(".home-hero .hero-subtitle", {
        duration: 1.2,
        y: 0,
        autoAlpha: 1,
        ease: "power3.out"
      }, "-=0.9")
      .to(".home-hero .hero-background-image", {
        duration: 2.5,
        clipPath: 'ellipse(150% 150% at 50% 100%)',
        opacity: 1,
        ease: "power2.inOut"
      }, "<0.2")
      .to(".home-hero .hero-content", {
        duration: 2.0,
        color: '#ffffff',
        ease: 'power2.inOut'
      }, "-=2.5")


  // ❗❗❗ [수정] --- 2. Observer 방식 섹션 전환 로직 --- ❗❗❗

  // --- 2a. 패널 스타일 및 위치 초기화 ---
  gsap.set(mainContainer.value, { position: 'relative', height: '100dvh', overflow: 'hidden' });
  gsap.set(panels, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });
  gsap.set(panels.slice(1), { yPercent: 100, autoAlpha: 0 });
  gsap.set(panels[0], { yPercent: 0, autoAlpha: 1 });


  // --- 2b. 각 패널 내부 콘텐츠 애니메이션 타임라인 생성 (ScrollTrigger 제거) ---
  panelTls = panels.map((panel, i) => {
    if (i === 0) {
      return null;
    }

    const title = panel.querySelector('h2');
    const description = panel.querySelector('.section-description');
    const cards = gsap.utils.toArray(panel.querySelectorAll('.area-card, .card'));
    const buttons = panel.querySelector('.details-button, .contact-button');

    // ❗ paused: true 로 생성
    const contentTl = gsap.timeline({ paused: true });

    const elementsToSet = [title, description, ...cards, buttons].filter(Boolean);
    if (elementsToSet.length > 0) {
      gsap.set(elementsToSet, { autoAlpha: 0, y: 30 });
    }

    if (title) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1);
    if (description) contentTl.to(description, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.1');
    if (cards.length > 0) contentTl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, '<0.2');
    if (buttons) contentTl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.4 }, '<0.1');

    return contentTl; // 생성된 타임라인 반환
  });


  // --- 2c. 섹션 전환 함수 (gotoSection) 정의 ---
  let currentIndex = 0;
  let animating = false;
  const numPanels = panels.length;

  const gotoSection = (toIndex: number, direction: number) => {
    if (animating) return;

    const fromIndex = currentIndex;

    if (toIndex < 0 || toIndex >= numPanels) {
      return;
    }

    animating = true;
    currentIndex = toIndex;
    const dFactor = direction;

    panelTls[fromIndex]?.seek(0).pause();

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => {
        animating = false;
        panelTls[toIndex]?.play();
      }
    });

    gsap.set(panels[toIndex], { yPercent: 100 * dFactor, autoAlpha: 1 });
    tl.to(panels[fromIndex], { yPercent: -100 * dFactor })
        .to(panels[toIndex], { yPercent: 0 }, 0);

    if (observer) {
      observer.vars.preventDefault = (currentIndex !== numPanels - 1);
    }
  };


  // --- 2d. Observer 생성 ---
  observer = Observer.create({
    target: mainContainer.value,
    type: 'wheel,touch,pointer',
    onDown: () => {
      if (currentIndex < numPanels - 1) {
        if (!animating) gotoSection(currentIndex + 1, 1);
      }
    },
    onUp: () => {
      if (currentIndex > 0) {
        if (!animating) gotoSection(currentIndex - 1, -1);
      }
      if(currentIndex === 0 && observer) {
        observer.vars.preventDefault = true;
      }
    },
    tolerance: 10,
    preventDefault: true
  });

  // ❗ 3. ABOUT US 슬라이드 영역 터치 시 Observer 토글
  if (businessAreas.value) {
    businessAreas.value.addEventListener('touchstart', disableObserver, { passive: true });
    businessAreas.value.addEventListener('touchend', enableObserver, { passive: true });
  }

  if (currentIndex === numPanels - 1 && observer) {
    observer.vars.preventDefault = false;
  }
});

onUnmounted(() => {
  // ❗ 4. 이벤트 리스너 정리
  if (businessAreas.value) {
    businessAreas.value.removeEventListener('touchstart', disableObserver);
    businessAreas.value.removeEventListener('touchend', enableObserver);
  }
  observer?.kill();
  heroTl?.kill();
  panelTls.forEach(tl => tl?.kill());

  if (mainContainer.value) {
    gsap.set(mainContainer.value, { clearProps: 'position,height,overflow' });
  }
  gsap.set(panels, { clearProps: 'position,top,left,width,height,yPercent,autoAlpha' });

  const contentSelectors = '.home-hero h1, .home-hero .hero-subtitle, h2, .section-description, .area-card, .card, .details-button, .contact-button';
  gsap.set(contentSelectors, { clearProps: 'autoAlpha,y,clipPath,opacity,color' });
});
</script>

<template>
  <div class="w-full overflow-hidden" ref="mainContainer">

    <CommonPageHero
        class="panel h-dvh text-white" title="한 발 앞선 IT 서비스로<br />고객의 경험과 가치를 우선합니다."
        subtitle="making sweet and sour software"
        :is-home="true"
    />

    <BaseSection
        class="panel h-dvh bg-white"
        text-color="#111827" >
      <div class="text-center h-full flex flex-col justify-center">
        <h2 class="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 section-title">ABOUT US</h2>
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
    <BaseSection
        class="panel h-dvh" :background-image-url="bgImage2"
        text-color="#ffffff" > <div class="text-center h-full flex flex-col justify-center">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 section-title">시스템 통합 및 유지보수 (SI/SM)</h2>
      <p class="text-lg md:text-xl text-gray-300 mb-10 md:mb-12 leading-relaxed section-description large">
        다년간 축적된 경험과 기술력을 바탕으로 고객의 비즈니스 환경에 최적화된 시스템을
        설계, 구축하고 안정적으로 운영하여 업무 효율을 극대화합니다.
      </p>
      <NuxtLink to="/projects" class="inline-block bg-blue-600 text-white rounded-lg py-3 px-8 md:py-4 md:px-10 no-underline font-bold transition-all duration-200 ease-in-out hover:bg-blue-700 hover:scale-105 details-button">자세히 보기</NuxtLink>
    </div>
    </BaseSection>

    <BaseSection
        class="panel h-dvh" :background-image-url="bgImage3"
        text-color="#ffffff" > <div class="text-center h-full flex flex-col justify-center">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 section-title">자체 개발 솔루션</h2>
      <p class="text-lg md:text-xl text-gray-700 mb-10 md:mb-12 leading-relaxed section-description large">
        고객의 비즈니스에 새로운 가치를 더하는 포베리만의 기술력을 만나보세요.
      </p>
      <div class="flex flex-col items-center gap-6 md:gap-8 mb-10 md:mb-12 md:flex-row md:justify-center solution-cards">
        <div class="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[350px] card border border-gray-100">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">베리패스 (Berry-Pass)</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal">SSO 솔루션: 다양한 인증 통합 관리</p> </div>
        <div class="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[350px] card border border-gray-100">
          <h3 class="text-xl md:text-2xl font-semibold mb-3 text-gray-800">베리마인 (Berry-Mine)</h3>
          <p class="text-base md:text-lg text-gray-600 leading-normal">웹 자동화 솔루션: 정보 수집 및 RPA</p> </div>
      </div>
      <NuxtLink to="/services" class="inline-block bg-transparent text-blue-600 border-2 border-blue-600 rounded-lg py-3 px-8 md:py-4 md:px-10 no-underline font-bold transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white hover:border-blue-600 details-button">자세히 보기</NuxtLink>
    </div>
    </BaseSection>

    <BaseSection
        class="panel h-dvh" :background-image-url="bgImage4"
        text-color="#ffffff" > <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center cta-section">
      <div class="strengths text-left"> <h3 class="text-3xl md:text-4xl font-bold mb-6">FOURBERRY STRENGTHS</h3>
        <ul class="space-y-4">
          <li>
            <strong class="text-blue-400">✓ 사람 중심 철학:</strong><br>
            <span class="text-gray-300 text-sm md:text-base">사용자를 최우선으로 생각하는 시스템을 구축합니다. </span>
          </li>
          <li>
            <strong class="text-blue-400">✓ 미래 기술 선도:</strong><br>
            <span class="text-gray-300 text-sm md:text-base">AICBM 기반 기술과 R&D 투자로 혁신을 추구합니다. </span>
          </li>
          <li>
            <strong class="text-blue-400">✓ 자체 솔루션 보유:</strong><br>
            <span class="text-gray-300 text-sm md:text-base">Berry-Pass(SSO), Berry-Mine(웹 자동화) 등 검증된 솔루션을 제공합니다.</span>
          </li>
          <li>
            <strong class="text-blue-400">✓ 풍부한 프로젝트 경험:</strong><br>
            <span class="text-gray-300 text-sm md:text-base">다양한 산업 분야의 SI/SM 프로젝트 성공 경험을 보유하고 있습니다. (e.g., 동행복권, 쿠쿠, 농협 등)</span>
          </li>
          <li>
            <strong class="text-blue-400">✓ 최고의 팀워크:</strong><br>
            <span class="text-gray-300 text-sm md:text-base">검증된 역량과 뛰어난 팀워크로 최상의 결과물을 만듭니다. </span>
          </li>
        </ul>
      </div>

      <div class="inquiry text-center md:text-left"> <h2 class="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
        함께 성장할<br class="hidden sm:block" />
        프로젝트를<br class="hidden sm:block" />
        기다립니다.
      </h2>
        <NuxtLink to="/contact" class="inline-block bg-blue-600 text-white rounded-lg py-3 px-8 md:py-4 md:px-10 no-underline text-lg md:text-xl font-bold transition-transform duration-200 ease-in-out hover:scale-105 contact-button">
          프로젝트 문의하기
        </NuxtLink>
      </div>
    </div>
    </BaseSection>

    <AppFooter class="panel h-dvh bg-black text-gray-400 flex flex-col justify-center"/>
  </div>
</template>

<style scoped>
/* 히어로 섹션 텍스트 그림자 (배경 이미지 위에 잘 보이도록) */
.home-hero h1, .home-hero .hero-subtitle {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
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

/* 솔루션 카드 추가 스타일 (그림자 등은 템플릿에서 처리) */
.solution-cards .card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.solution-cards .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); /* 호버 시 그림자 강조 */
}
</style>