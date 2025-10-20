<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 스크롤 상태를 저장할 ref 변수
const isScrolled = ref(false)

onMounted(() => {
  // 스크롤 트리거를 사용하여 스크롤 위치 감지
  ScrollTrigger.create({
    trigger: 'body', // 전체 페이지 스크롤을 감지
    start: 'top top', // 페이지 최상단에서 시작
    end: '+=1', // 1px만 스크롤 되어도 활성화
    // onToggle 콜백: 트리거 영역에 들어가거나 나갈 때 isScrolled 값을 변경
    onToggle: self => {
      isScrolled.value = self.isActive
    },
  });
})
</script>

<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <a href="/" class="logo">FOURBERRY</a>
      <nav class="navigation">
        <a href="/about">회사소개</a>
        <a href="/projects">SI/SM</a>
        <a href="/services">솔루션</a>
        <a href="/contact">문의하기</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* 헤더의 기본(초기) 스타일: 투명 배경, 절대 위치 */
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: transparent; /* 투명 배경 */
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* 연한 테두리 */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* 부드러운 전환 효과 */
}

/* 스크롤 내렸을 때 적용될 스타일: 흰색 배경, 상단 고정 */
.header.header-scrolled {
  position: fixed; /* 상단 고정 */
  background-color: #ffffff; /* 흰색 배경 */
  border-bottom: 1px solid #eaeaea; /* 기존 테두리 색상 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* 그림자 효과 */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem; /* 반응형을 위해 추가 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  color: #2c3e50;
}

/* 스크롤 시에도 글자색이 보이도록 수정 */
.header-scrolled .logo,
.header-scrolled .navigation a {
  color: #2c3e50;
}

/* 초기 상태에서 글자색 (배경 이미지에 따라 조정 필요) */
.header:not(.header-scrolled) .logo,
.header:not(.header-scrolled) .navigation a {
  color: #ffffff; /* 어두운 배경 이미지일 경우 흰색으로 */
}


.navigation a {
  margin-left: 1.5rem;
  text-decoration: none;
}
</style>