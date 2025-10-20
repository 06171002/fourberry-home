<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // --- Hero 섹션 타임라인 애니메이션 ---

  // 1. 애니메이션 시작 전 초기 상태 설정
  gsap.set('.hero-content h1, .hero-subtitle', { autoAlpha: 0, y: 40 });
  gsap.set('.hero-background-image', { opacity: 0 });
  gsap.set('.header', { autoAlpha: 0 }); // 헤더도 초기에 숨김

  // 2. 타임라인 생성
  const tl = gsap.timeline();

  // 3. 타임라인에 모든 애니메이션을 순차적으로 추가
  tl.to('.preloader', { // 1. 흰색 로딩 화면 사라지기
    duration: 0.8,
    opacity: 0,
    onComplete: () => {
      // 애니메이션이 끝나면 preloader를 DOM에서 제거하거나 숨깁니다.
      document.querySelector('.preloader')?.setAttribute('style', 'display: none');
    }
  })
      .to(".hero-content h1", { // 2. 슬로건 나타나기
        duration: 1.2,
        y: 0,
        autoAlpha: 1,
        ease: "power3.out"
      }, "-=0.3") // 로딩화면이 사라지기 시작하고 0.3초 후에 시작
      .to(".hero-subtitle", { // 3. 부제 나타나기
        duration: 1.2,
        y: 0,
        autoAlpha: 1,
        ease: "power3.out"
      }, "-=0.9")
      .to(".hero-background-image", { // 4. 배경 이미지 나타나기
        duration: 2.5,
        clipPath: 'ellipse(150% 150% at 50% 100%)',
        opacity: 1,
        ease: "power2.inOut"
      }, "<0.2")
      .to('.header', { // 5. 헤더 나타나기
        duration: 1.0,
        autoAlpha: 1,
      }, "-=1.5"); // 바로 앞 애니메이션(subtitle) 시작 0.2초 후에 시작


  // --- 이하 스크롤 트리거 애니메이션 (기존과 동일) ---
  gsap.utils.toArray('.section-title, .content-section h2, .cta-section h2').forEach(elem => {
    // ... (이하 스크롤 애니메이션 코드는 그대로 유지)
    const el = elem as HTMLElement;
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });
  });

  gsap.utils.toArray('.area-card').forEach((card, index) => {
    const el = card as HTMLElement;
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
      delay: index * 0.1
    });
  });

  gsap.utils.toArray('.content-section .section-description, .solution-cards, .details-button, .cta-section .contact-button').forEach(elem => {
    const el = elem as HTMLElement;
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      }
    });
  });
});
</script>

<template>
  <div class="homepage">
    <section class="hero-section">
      <div class="hero-background-image"></div>

      <div class="hero-content">
        <h1>
          한 발 앞선 IT 서비스로<br />
          고객의 경험과 가치를 우선합니다.
        </h1>
        <p class="hero-subtitle">making sweet and sour software</p>
      </div>
      <div class="scroll-indicator">
        <span>Scroll Down</span>
      </div>
    </section>

    <section class="about-us-section">
      <div class="content-wrapper">
        <h2 class="section-title">ABOUT US</h2>
        <p class="section-description">
          포베리는 사람 중심의 IT 기술 발전을 위해<br />
          AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의 사업에 매진하고 있습니다.
        </p>
        <div class="business-areas">
          <div class="area-card">
            <h3>시스템 통합 및 유지보수</h3>
            <p>비즈니스 환경에 최적화된 시스템을 구축하고 안정적으로 운영합니다.</p>
          </div>
          <div class="area-card">
            <h3>자체 솔루션 개발</h3>
            <p>SSO, 웹 자동화 등 고객의 비즈니스에 새로운 가치를 더하는 기술을 개발합니다.</p>
          </div>
          <div class="area-card">
            <h3>AI/빅데이터 R&D</h3>
            <p>AI, 빅데이터 기술을 활용한 산학협력을 통해 혁신적인 솔루션을 연구합니다.</p>
          </div>
          <div class="area-card">
            <h3>IT 컨설팅</h3>
            <p>비즈니스 목표 달성을 위한 최적의 IT 전략과 방향성을 제시합니다.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section full-screen">
      <div class="content-wrapper">
        <h2>시스템 통합 및 유지보수 (SI/SM)</h2>
        <p class="section-description large">
          다년간 축적된 경험과 기술력을 바탕으로 고객의 비즈니스 환경에 최적화된 시스템을<br />
          설계, 구축하고 안정적으로 운영하여 업무 효율을 극대화합니다.
        </p>
        <NuxtLink to="/projects" class="details-button">자세히 보기</NuxtLink>
      </div>
    </section>

    <section class="content-section solutions-section full-screen">
      <div class="content-wrapper">
        <h2>자체 개발 솔루션</h2>
        <p class="section-description large">
          고객의 비즈니스에 새로운 가치를 더하는 포베리만의 기술력을 만나보세요.
        </p>
        <div class="solution-cards">
          <div class="card">
            <h3>베리패스 (Berry-Pass)</h3>
            <p>다양한 소셜 인증을 통한 통합 회원 관리(SSO) 솔루션</p>
          </div>
          <div class="card">
            <h3>베리마인 (Berry-Mine)</h3>
            <p>웹 정보 자동 수집 및 상호 작용을 위한 웹 자동화 솔루션</p>
          </div>
        </div>
        <NuxtLink to="/services" class="details-button">자세히 보기</NuxtLink>
      </div>
    </section>

    <section class="cta-section">
      <div class="content-wrapper">
        <h2>포베리와 함께<br />새로운 가치를 만들어보세요.</h2>
        <NuxtLink to="/contact" class="contact-button">프로젝트 문의하기</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============== 전체 스타일 ============== */
.homepage {
  width: 100%;
}

.content-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

/* ============== Hero 섹션 스타일 (수정) ============== */
.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  /* background-color를 제거합니다. 초기 화면은 preloader가 담당합니다. */
}

/* 1. 배경 이미지를 위한 스타일 추가 */
.hero-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  /* GSAP에서 제어할 것이므로 초기 상태는 스크립트에서 설정 */
  clip-path: ellipse(0% 0% at 50% 100%);
}

/* 2. 기존 hero-overlay 스타일은 삭제 */

/* 3. hero-content에 z-index 추가 */
.hero-content {
  position: relative;
  z-index: 1; /* 텍스트가 배경 이미지보다 위에 오도록 설정 */
  color: #000000;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* ============== About Us 섹션 스타일 ============== */
.about-us-section {
  padding: 6rem 2rem;
  background-color: #fff;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #333;
}

.section-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 4rem;
  line-height: 1.7;
}

.business-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.area-card {
  text-align: center;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 12px;
  background-color: #f8f9fa;
}

.area-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.area-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

/* ============== 공통 콘텐츠 섹션 스타일 ============== */
.content-section {
  padding: 6rem 0;
}

.content-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-description.large {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2.5rem;
}

.details-button {
  display: inline-block;
  background-color: transparent;
  color: #007aff;
  border: 1px solid #007aff;
  border-radius: 8px;
  padding: 0.8rem 1.8rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

.details-button:hover {
  background-color: #007aff;
  color: white;
}

.full-screen {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ============== 솔루션 섹션 스타일 ============== */
.solutions-section {
  background-color: #f8f9fa;
}

.solution-cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 300px;
}

.card h3 {
  margin-bottom: 0.5rem;
}

/* ============== CTA 섹션 스타일 ============== */
.cta-section {
  background-color: #007aff;
  color: white;
  padding: 6rem 0;
}

.cta-section h2 {
  font-size: 2.2rem;
}

.contact-button {
  display: inline-block;
  background-color: white;
  color: #007aff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2.5rem;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 1.5rem;
  transition: transform 0.2s ease;
}

.contact-button:hover {
  transform: scale(1.05);
}

/* ============== 반응형 스타일 ============== */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.2rem;
  }
  .solution-cards {
    flex-direction: column;
    align-items: center;
  }
  .full-screen {
    min-height: auto;
    padding: 6rem 2rem;
  }
}
</style>
