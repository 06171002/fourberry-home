<script setup lang="ts">
// 이 페이지에 필요한 스크립트 로직을 추가할 수 있습니다.
</script>

<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="hero-content">
        <h2>사람 중심의 IT, 더 나은 가치를 만듭니다.</h2>
        <p>포베리는 IT 분야의 기본을 지키며 고객과 함께 성장합니다.</p>
      </div>
    </section>

    <div class="page-content">
      <section class="intro-section">
        <h3>대표 소개</h3>
        <div class="ceo-profile">
          <div class="message">
            <p>
              "시스템은 사람이 중심이 되어야 하고 사람을 위해서 존재해야 한다는 것이 저희 포베리가 IT 산업을 바라보는 철학이자 기업의 경영 방침입니다."
            </p>
            <p>
              사람 중심의 기술 발전을 위해 AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의 사업에 매진함과 동시에 R&D 역량 향상에도 집중적으로 투자하고 있습니다.
              고객과 함께 노력하며 사람 중심의 IT 기업을 완성해 나가겠습니다.
            </p>
            <span class="ceo-name">포베리 주식회사 대표이사 <strong>우대식</strong></span>
          </div>
        </div>
      </section>

      <section class="history-section">
        <h3>회사 연혁</h3>
        <ul class="timeline">
          <li class="timeline-item">
            <div class="timeline-date">2023. 10.</div>
            <div class="timeline-content">
              <h4>포베리 주식회사 설립</h4>
              <p>사람 중심의 IT 서비스를 목표로 회사를 설립했습니다.</p>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-date">2024. 01.</div>
            <div class="timeline-content">
              <h4>영등포농협 온라인 쇼핑몰 구축</h4>
              <p>자체 브랜드몰 'Always withFresh' 개발 및 론칭</p>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-date">2024. 10.</div>
            <div class="timeline-content">
              <h4>동행복권 DB 전환 사업 착수</h4>
              <p>인쇄복권 시스템 통합 및 DB 전환 프로젝트를 시작했습니다.</p>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-date">2025. 01.</div>
            <div class="timeline-content">
              <h4>쿠쿠 통합 쇼핑몰 고도화</h4>
              <p>차세대 영업관리 시스템 운영 및 고도화를 진행했습니다.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ============== Hero 섹션 스타일 ============== */
.hero-section {
  padding: 6rem 2rem;
  text-align: center;
  background-color: #f8f9fa;
}

.hero-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.1rem;
  color: #555;
}

/* ============== 페이지 콘텐츠 레이아웃 ============== */
.page-content {
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 2rem;
}

/* ============== 대표 소개 섹션 스타일 ============== */
.intro-section {
  margin-bottom: 5rem;
}

.intro-section h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
}

.ceo-profile .message p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1.5rem;
}

.ceo-name {
  display: block;
  text-align: right;
  margin-top: 2rem;
  font-size: 1.1rem;
}

/* ============== 회사 연혁 섹션 스타일 ============== */
.history-section h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.timeline {
  list-style: none;
  padding: 0;
  position: relative;
}

/* 타임라인 중앙선 */
.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 100px;
  height: 100%;
  width: 2px;
  background: #e9ecef;
}

.timeline-item {
  display: flex;
  margin-bottom: 2.5rem;
  position: relative;
}

.timeline-date {
  flex-shrink: 0;
  width: 100px;
  padding-right: 2rem;
  font-weight: 600;
  color: #007aff;
  text-align: right;
}

/* 타임라인 점 */
.timeline-item::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 92px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid #007aff;
}

.timeline-content {
  padding-left: 2rem;
}

.timeline-content h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  font-size: 0.95rem;
  color: #666;
}
</style>
