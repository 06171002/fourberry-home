<template>
  <header :class="headerClasses">

    <div class="max-w-screen-xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

      <NuxtLink to="/" class="font-bold text-2xl no-underline">FOURBERRY</NuxtLink>

      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink to="/about" class="text-base no-underline hover:opacity-80 transition-opacity">회사소개</NuxtLink>
        <NuxtLink to="/projects" class="text-base no-underline hover:opacity-80 transition-opacity">SI/SM</NuxtLink>
        <NuxtLink to="/services" class="text-base no-underline hover:opacity-80 transition-opacity">솔루션</NuxtLink>
        <NuxtLink to="/contact" class="text-base no-underline hover:opacity-80 transition-opacity">문의하기</NuxtLink>
      </nav>

      <div class="md:hidden">
        <button @click="toggleMobileMenu" :class="hamburgerButtonClasses" aria-label="메뉴 열기/닫기">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <transition name="slide-down">
      <nav
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col border-t border-gray-200"
      >
        <NuxtLink @click="isMobileMenuOpen = false" to="/about" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">회사소개</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/projects" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">SI/SM</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/services" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">솔루션</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/contact" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">문의하기</NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useHeaderVisibility } from '~/composables/useHeaderState' // 더 이상 사용하지 않음

gsap.registerPlugin(ScrollTrigger)

// --- 상태 로직 ---
const isScrolled = ref(false)
const route = useRoute()
// const isHeaderHidden = useHeaderVisibility() // 더 이상 사용하지 않음
const isHomePage = computed(() => route.path === '/')
// 스크롤되었거나, 홈이 아니면 true (스타일 변경 기준)
const shouldApplyScrolledClass = computed(() => isScrolled.value || !isHomePage.value)
let scrollTriggerInstance: ScrollTrigger | null = null;

// --- 모바일 메뉴 로직 ---
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// --- Tailwind 클래스 바인딩 로직 ---

// 헤더의 동적 클래스를 계산합니다. (숨김 관련 translate 제거)
const headerClasses = computed(() => [
  'top-0', 'left-0', 'w-full', 'z-50',
  'transition-all', 'duration-300', 'ease-in-out', // transform 관련 transition 제거
  // isHeaderHidden.value ? '-translate-y-full' : 'translate-y-0', // 숨김/표시 로직 제거

  // 'scrolled' 상태 (흰색 배경) 또는 'initial' 상태 (투명 배경)
  shouldApplyScrolledClass.value
      ? 'fixed bg-white border-b border-gray-200 shadow-md text-gray-800' // 스크롤됨
      : 'absolute bg-transparent border-b border-white/20 text-white' // 초기 상태
]);

// 모바일 햄버거 버튼 클래스 (변경 없음)
const hamburgerButtonClasses = computed(() => [
  'p-2', 'rounded-md', 'focus:outline-none', 'focus:ring-2', 'focus:ring-inset',
  shouldApplyScrolledClass.value ? 'focus:ring-gray-800' : 'focus:ring-white'
]);


// --- 생명주기 로직 ---
onMounted(() => {
  // 메인 페이지에서만 스크롤 상태 감지 트리거 생성
  if (isHomePage.value) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '+=10',
      onUpdate: self => {
        isScrolled.value = self.scroll() > 10;
      },
    });
    // 초기 로드 시 스크롤 상태 확인
    isScrolled.value = window.scrollY > 10;
  } else {
    // 메인 페이지가 아니면 기본적으로 스크롤된 상태(흰색 배경)로 시작
    isScrolled.value = true;
  }

  // 라우트 변경 감지
  watch(() => route.path, (newPath) => {
    // isHeaderHidden.value = false; // 헤더 표시 상태 관리 제거
    isMobileMenuOpen.value = false; // 페이지 이동 시 모바일 메뉴 닫기

    if (newPath === '/') {
      // 메인 페이지로 오면 현재 스크롤 위치 반영 및 트리거 (재)활성화
      isScrolled.value = window.scrollY > 10;
      if (!scrollTriggerInstance) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: '+=10',
          onUpdate: self => {
            isScrolled.value = self.scroll() > 10;
          },
        });
      } else {
        scrollTriggerInstance.enable();
      }
    } else {
      // 다른 페이지로 가면 항상 스크롤된 상태(흰색 배경)로 설정하고 트리거 비활성화
      isScrolled.value = true;
      scrollTriggerInstance?.disable();
    }
  });

})

onUnmounted(() => {
  scrollTriggerInstance?.kill();
})
</script>

<style scoped>
/* 모바일 메뉴 드롭다운 트랜지션 (변경 없음) */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Tailwind 클래스로 스타일을 관리하므로 추가적인 CSS는 거의 필요 없을 수 있습니다. */
/* 필요한 경우 여기에 추가 스타일을 정의하세요. */
</style>