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

gsap.registerPlugin(ScrollTrigger)

// --- 상태 로직 ---
const isScrolled = ref(false)
const route = useRoute()
// const isHeaderHidden = useHeaderVisibility() // 더 이상 사용하지 않음
const isHomePage = computed(() => route.path === '/')

let scrollTriggerInstance: ScrollTrigger | null = null;

// ❗ 2. 헤더 테마 상태 가져오기
const headerTheme = useHeaderTheme()

// 스크롤되었거나, 홈이 아니면 true (스타일 변경 기준)
// ❗ (이 변수는 이제 배경색/위치 결정에만 사용)
const shouldApplyScrolledClass = computed(() => isScrolled.value || !isHomePage.value)

// ❗ 3. 최종 테마 결정 (스크롤 상태 + 홈화면 패널 상태)
const effectiveTheme = computed(() => {
  if (!isHomePage.value) {
    return 'dark'; // 홈이 아닌 페이지는 무조건 'dark' (흰 배경, 검은 글씨)
  }
  if (isScrolled.value) {
    return 'dark'; // 홈이지만 10px 이상 스크롤되면 'dark' (GSAP Observer에서는 거의 발생 안함)
  }
  return headerTheme.value; // 홈이고 스크롤 안됐으면, index.vue가 정해준 테마 사용
});

// --- 모바일 메뉴 로직 ---
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// --- Tailwind 클래스 바인딩 로직 ---

// ❗ headerClasses 로직 수정 (구분선 색상 포함)
const headerClasses = computed(() => {
  // 홈 페이지이고, 스크롤되지 않은 초기 상태인지 확인 (Observer 환경에서는 거의 false)
  // Observer 방식에서는 isScrolled 보다는 headerTheme을 신뢰하는 것이 좋습니다.
  // 홈 페이지의 초기 상태 (Hero 섹션)는 투명 배경
  const isInitialTransparentState = isHomePage.value && headerTheme.value === 'light';

  const theme = effectiveTheme.value; // 현재 유효한 테마 ('light' or 'dark')

  // 배경/위치: 초기 투명 상태일 때만 absolute + 투명, 나머지는 fixed + 흰색 배경
  const backgroundAndPosition = isInitialTransparentState
      ? 'absolute bg-transparent'
      : 'fixed bg-white shadow-md';

  // 글자색: 테마에 따라 결정
  const textColor = theme === 'dark' ? 'text-gray-800' : 'text-white';

  // 구분선 색상:
  let borderColor;
  if (isInitialTransparentState) {
    // 초기 투명 상태: 흰색 구분선 (반투명)
    borderColor = 'border-b border-white/20';
  } else if (theme === 'dark' && isHomePage.value) {
    // ✨ 홈 페이지이고 다크 테마(ABOUT US 섹션 등): 검은색 구분선
    borderColor = 'border-b border-gray-800'; // 또는 border-black
  } else {
    // 스크롤되었거나 홈 아닌 페이지 (흰색 배경): 회색 구분선
    borderColor = 'border-b border-gray-200';
  }

  return [
    'top-0', 'left-0', 'w-full', 'z-50',
    'transition-all', 'duration-300', 'ease-in-out',
    backgroundAndPosition,
    textColor,
    borderColor // 결정된 구분선 클래스 적용
  ];
});

// ❗ 5. 햄버거 버튼 클래스 수정
// 햄버거 버튼 링 색상도 effectiveTheme을 따르도록 변경
const hamburgerButtonClasses = computed(() => [
  'p-2', 'rounded-md', 'focus:outline-none', 'focus:ring-2', 'focus:ring-inset',
  effectiveTheme.value === 'dark'
      ? 'focus:ring-gray-800'
      : 'focus:ring-white'
]);

// ❗ 6. 스크롤 트리거 설정 함수 (중복 제거용)
const setupScrollTrigger = () => {
  scrollTriggerInstance?.kill(); // 기존 인스턴스 제거
  if (isHomePage.value) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '+=10',
      onUpdate: self => {
        isScrolled.value = self.scroll() > 10;
        // 스크롤이 발생하면(e.g., 사용자가 강제로) 테마도 업데이트
        if (isHomePage.value) {
          headerTheme.value = isScrolled.value ? 'dark' : 'light';
        }
      },
    });
  }
};

// --- 생명주기 로직 ---
onMounted(() => {
  if (isHomePage.value) {
    // ❗ 홈 페이지: 초기 스크롤 상태 확인 및 테마 설정, 트리거 생성
    isScrolled.value = window.scrollY > 10;
    headerTheme.value = isScrolled.value ? 'dark' : 'light'; // (index.vue의 onMounted가 덮어쓰지만 안전장치)
    setupScrollTrigger();
  } else {
    // ❗ 홈 아님: 스크롤된 상태(흰색 배경)로 강제
    isScrolled.value = true;
    headerTheme.value = 'dark'; // (effectiveTheme이 어차피 'dark'로 함)
  }

  // 라우트 변경 감지
  watch(() => route.path, (newPath) => {
    isMobileMenuOpen.value = false; // 페이지 이동 시 모바일 메뉴 닫기

    if (newPath === '/') {
      // ❗ 메인 페이지로 복귀
      isScrolled.value = window.scrollY > 10;
      headerTheme.value = isScrolled.value ? 'dark' : 'light'; // 현재 스크롤에 맞춰 테마 리셋
      setupScrollTrigger(); // 스크롤 트리거 (재)활성화
    } else {
      // ❗ 다른 페이지로 이동
      isScrolled.value = true;
      headerTheme.value = 'dark'; // 다른 페이지는 무조건 'dark'
      scrollTriggerInstance?.disable(); // 홈이 아니면 트리거 비활성화
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