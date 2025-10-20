<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.utils.toArray('.solution-section').forEach((section) => {
    const el = section as HTMLElement
    const image = el.querySelector('.solution-image')
    const text = el.querySelector('.solution-text')

    gsap.from(image, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    })

    gsap.from(text, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    })
  })
})
</script>

<template>
  <div class="solutions-page">
    <section class="intro-section">
      <div class="content-wrapper">
        <h2>Our Solutions</h2>
        <p>고객의 비즈니스에 새로운 가치를 더하는 포베리만의 기술력을 만나보세요.</p>
      </div>
    </section>

    <section class="solution-section layout-left">
      <div class="solution-image">
        <img src="" alt="Berry-Pass UI" />
      </div>
      <div class="solution-text">
        <h3>베리패스 (Berry-Pass)</h3>
        <div class="hashtag-container">
          <span class="hashtag">#SSO</span>
          <span class="hashtag">#통합인증</span>
          <span class="hashtag">#간편로그인</span>
          <span class="hashtag">#회원통합</span>
        </div>
        <p class="description">
          [cite_start]SSO(Single Sign-On) 솔루션으로, 휴대폰 번호 및 다양한 소셜 인증(본인인증 포함)을 통해 여러 사이트의 회원을 통합 관리할 수 있습니다. [cite: 86]
        </p>
        <ul class="features">
          [cite_start]<li>✓ 다양한 소셜 인증 지원 (카카오, 네이버, 애플 등) [cite: 87]</li>
          [cite_start]<li>✓ CI 기반의 통합 회원 관리 기능 지원 [cite: 88]</li>
          [cite_start]<li>✓ 사이트 환경에 구애받지 않는 손쉬운 연동 방식 [cite: 89]</li>
          [cite_start]<li>✓ PC와 모바일에 최적화된 반응형 화면 제공 [cite: 92]</li>
        </ul>
      </div>
    </section>

    <section class="solution-section layout-right">
      <div class="solution-text">
        <h3>베리마인 (Berry-Mine)</h3>
        <div class="hashtag-container">
          <span class="hashtag">#WebAutomation</span>
          <span class="hashtag">#RPA</span>
          <span class="hashtag">#웹스크래핑</span>
          <span class="hashtag">#데이터수집</span>
        </div>
        <p class="description">
          [cite_start]웹 정보를 자동으로 수집하고 추가 액션을 통해 사이트와 상호 작용을 할 수 있는 '웹 자동화 솔루션' 입니다. [cite: 121]
        </p>
        <ul class="features">
          [cite_start]<li>✓ 자체 개발 스크래핑 엔진(FBScript)으로 복잡한 작업 자동화 [cite: 122]</li>
          [cite_start]<li>✓ 검색 결과, 엑셀 다운로드 등 다양한 정보 수집 가능 [cite: 124]</li>
          [cite_start]<li>✓ 현재 약 80개 사이트의 '통합쇼핑몰관리' 기능으로 활용 중 [cite: 125]</li>
          [cite_start]<li>✓ RPA 기능(Typing, Click 등)을 통한 고도화된 자동화 지원 [cite: 136]</li>
        </ul>
      </div>
      <div class="solution-image">
        <img src="" alt="Berry-Mine UI" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.solutions-page {
  overflow-x: hidden;
}

.intro-section {
  padding: 6rem 2rem;
  text-align: center;
  background-color: #f8f9fa;
}

.intro-section h2 {
  font-size: 2.8rem;
}

.intro-section p {
  font-size: 1.1rem;
  color: #555;
  margin-top: 0.5rem;
}

.solution-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 2rem;
}

.layout-right {
  grid-template-areas: 'text image';
}
.layout-left {
  grid-template-areas: 'image text';
}

.layout-right .solution-text { grid-area: text; }
.layout-right .solution-image { grid-area: image; }
.layout-left .solution-text { grid-area: text; }
.layout-left .solution-image { grid-area: image; }

.solution-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.solution-text h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

/* ============== 해시태그 스타일 (신규) ============== */
.hashtag-container {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hashtag {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  background-color: #e9ecef;
  color: #007aff;
  font-size: 0.85rem;
  font-weight: 500;
}
/* ================================================= */

.solution-text .description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 2rem;
}

.features {
  list-style: none;
  padding: 0;
}

.features li {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: #555;
}

@media (max-width: 992px) {
  .solution-section {
    grid-template-columns: 1fr;
    grid-template-areas: 'image' 'text';
    margin: 4rem auto;
  }
}
</style>
