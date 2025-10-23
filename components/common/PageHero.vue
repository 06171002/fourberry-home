<script setup lang="ts">
// Props 정의: 제목, 부제목, (선택적) 배경 이미지 URL
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false, // 부제목은 없을 수도 있으므로 false
    default: '',
  },
  backgroundImageUrl: {
    type: String,
    required: false,
    default: '', // 배경 이미지가 없을 수도 있음
  },
  // index.vue 에서만 사용되는 특별한 스타일/구조를 위한 prop (선택적)
  isHome: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <section
      class="page-hero-section"
      :class="{ 'home-hero': isHome, 'has-background': backgroundImageUrl }"
  >
    <div
        v-if="backgroundImageUrl || isHome"
        class="hero-background-image"
        :style="{ backgroundImage: backgroundImageUrl ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${backgroundImageUrl}')` : '' }"
    ></div>

    <div class="hero-content">
      <h1 v-if="title" v-html="title"></h1>
      <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="isHome" class="scroll-indicator">
      <span>Scroll Down</span>
    </div>
  </section>
</template>

<style scoped>
.page-hero-section {
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa; /* 기본 배경색 */
  color: #333; /* 기본 텍스트 색 */
  min-height: 30vh; /* 기본 최소 높이 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* --- 배경 이미지가 있는 경우의 스타일 --- */
.page-hero-section.has-background {
  min-height: 100vh; /* 높이를 100vh로 */
  color: #ffffff; /* 텍스트 색상을 밝게 */
  background-color: #222; /* 이미지 로딩 전 배경색 */
}

.page-hero-section.has-background .hero-subtitle {
  color: #f0f0f0; /* 부제목 색상 */
}



/* 홈 페이지 히어로에 대한 특별 스타일 */
.page-hero-section.home-hero {
  height: 100vh;
  min-height: 100vh;
  color: #000000; /* 초기 텍스트 색 (애니메이션 시작 전) */
  background-color: transparent; /* 홈은 초기 배경색 없음 */
}

.home-hero .hero-subtitle {
  color: inherit; /* 홈에서는 부모 색상 따름 */
}
.home-hero .hero-background-image {
  background-attachment: initial; /* 홈에서는 패럴랙스 효과 제거 */
}

.hero-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  /* 홈 히어로 초기 상태는 index.vue 스크립트에서 제어 */
  opacity: 1; /* 기본적으로 보이도록 설정 */
  z-index: 0; /* 내용 뒤로 */
}

/* 홈 히어로 배경 이미지 초기 상태 (스크립트 제어용) */
.home-hero .hero-background-image {
  clip-path: ellipse(0% 0% at 50% 100%);
  opacity: 0; /* 초기엔 안보임 */
  /* 홈 히어로 기본 배경 이미지 (index.vue 에서 사용하던 것) */
  background-image: url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop');
}

.hero-content {
  position: relative;
  z-index: 1;
}

.page-hero-section h1 {
  font-size: 2.8rem; /* 기본 크기 조정 */
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 1rem;
}

/* 홈 히어로 h1만 더 크게 */
.home-hero h1 {
  font-size: 3rem;
}

.hero-subtitle {
  font-size: 1.1rem; /* 기본 크기 조정 */
  opacity: 0.8;
  color: #555; /* 기본 부제목 색상 */
}

.home-hero .hero-subtitle {
  font-size: 1.2rem;
  color: inherit; /* 홈에서는 부모 색상 따름 (애니메이션 위해) */
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  font-size: 0.9rem;
  opacity: 0.7;
  color: #ffffff; /* 홈 배경 이미지 위에 보이도록 */
  z-index: 1;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .page-hero-section h1 {
    font-size: 2.2rem;
  }
  .home-hero h1 {
    font-size: 2.2rem; /* 모바일에서는 홈도 동일하게 */
  }
}
</style>