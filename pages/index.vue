<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { useHeaderTheme } from '~/composables/useHeaderTheme'
import type SectionAbout from "~/components/HomeSection/SectionAbout.vue";

// 페이지 메타 정의: home 레이아웃 사용
definePageMeta({
  layout: 'home',
})

const mainContainer = ref<HTMLElement | null>(null);

interface SectionAboutExposed {
  businessAreas: Ref<HTMLElement | null>;
}
// 2. SectionAbout 컴포넌트 자체를 참조할 ref를 생성합니다.
const sectionAboutRef = ref<InstanceType<typeof SectionAbout> & SectionAboutExposed | null>(null);

// 3. businessAreas ref를 자식 컴포넌트에서 가져오도록 computed로 변경합니다.
const businessAreas = computed(() => sectionAboutRef.value?.businessAreas);
// ❗ 2. 헤더 테마 상태 변수 선언
const headerTheme = useHeaderTheme()

// ❗ unmount 시 정리할 타임라인과 옵저버 인스턴스를 저장할 변수
let heroTl: gsap.core.Timeline | null = null;
let panelTls: (gsap.core.Timeline | null)[] = [];
let observer: Observer | null = null;
let panels: HTMLElement[] = []; // 패널 배열

// ❗ 2. 옵저버 토글 함수 정의 (리스너 제거를 위해)
const disableObserver = () => observer?.disable();
const enableObserver = () => observer?.enable();

onMounted(() => {
  // ❗ Observer 플러그인 등록
  gsap.registerPlugin(ScrollTrigger, Observer)

  headerTheme.value = 'light'

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
    const logos = panel.querySelector('.client-logos');

    // ❗ paused: true 로 생성
    const contentTl = gsap.timeline({ paused: true });

    const elementsToSet = [title, description, ...cards, buttons, logos].filter(Boolean);
    if (elementsToSet.length > 0) {
      gsap.set(elementsToSet, { autoAlpha: 0, y: 30 });
    }

    if (title) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1);
    if (description) contentTl.to(description, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.1');
    if (cards.length > 0) contentTl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, '<0.2');
    if (logos) contentTl.to(logos, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1');
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

    // ❗ 4. 패널 인덱스에 따라 헤더 테마 변경
    // index 1이 'ABOUT US' 섹션입니다.
    if (toIndex === 1 || toIndex === 2 || toIndex === 3) {
      headerTheme.value = 'dark'; // 검은색 텍스트
    } else {
      headerTheme.value = 'light'; // 흰색 텍스트
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
    <HomeSectionHero />
    <HomeSectionAbout ref="sectionAboutRef" />
    <HomeSectionSiSm />
    <HomeSectionSolutions />
    <HomeSectionCta />
    <HomeSectionFooter />
  </div>
</template>

<style scoped>
</style>