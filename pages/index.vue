<script setup lang="ts">
</script>

<template>
  <div class="homepage">
    <section class="hero-section">
      <div class="hero-overlay"></div>
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

/* ============== Hero 섹션 스타일 ============== */
.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  background-color: #333; /* 배경 이미지가 없을 경우 대비 */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #007aff;
}

.hero-content {
  position: relative;
  z-index: 1;
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
