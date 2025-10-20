<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // .horizontal-container 요소를 HTMLElement 타입으로 찾아서 변수에 저장합니다.
  const horizontalContainer = document.querySelector('.horizontal-container') as HTMLElement

  // 만약 요소를 찾지 못했다면, 애니메이션을 실행하지 않고 함수를 종료합니다.
  if (!horizontalContainer) {
    return
  }

  const panels = gsap.utils.toArray('.project-panel')

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: horizontalContainer, // 변수를 사용합니다.
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      // 👇 더 안전하고 명확하게 offsetWidth를 사용합니다.
      end: () => '+=' + horizontalContainer.offsetWidth,
    },
  })
})
</script>

<template>
  <div class="projects-page">
    <section class="intro-section">
      <h1>SI / SM Projects</h1>
      <p>포베리가 성공적으로 수행한 시스템 통합 및 유지보수 프로젝트들입니다.</p>
    </section>

    <div class="horizontal-container">
      <div class="project-panel project-cuckoo">
        <div class="panel-content">
          <h2>쿠쿠 통합 시스템 구축</h2>
          <p>78개 영업채널의 주문, 배송, 재고를 관리하는 차세대 시스템</p>
        </div>
      </div>
      <div class="project-panel project-nonghyup">
        <div class="panel-content">
          <h2>영등포농협 브랜드몰 & SSO</h2>
          <p>온라인 브랜드몰과 통합 인증(SSO) 시스템</p>
        </div>
      </div>
      <div class="project-panel project-autocrypt">
        <div class="panel-content">
          <h2>아우토크립트 자동차 보안 시스템</h2>
          <p>자동차 보안 취약점 정보 제공을 위한 K-CSMS 커뮤니티</p>
        </div>
      </div>
      <div class="project-panel project-dhlottery">
        <div class="panel-content">
          <h2>동행복권 인쇄복권 시스템</h2>
          <p>이원화된 인쇄복권 시스템 통합 및 DB 전환</p>
        </div>
      </div>
    </div>

    <section class="outro-section">
      <h2>더 많은 프로젝트가 궁금하신가요?</h2>
      <button>문의하기</button>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
  background-color: #007aff;
  color: #fff;
}

.intro-section,
.outro-section {
  padding: 8rem 2rem;
  text-align: center;
}

/* 가로 스크롤 전체를 감싸는 컨테이너 */
.horizontal-container {
  display: flex;
  flex-wrap: nowrap; /* 절대 줄바꿈되지 않도록 설정 */
  width: 400%; /* 패널 4개의 너비만큼 설정 */
}

/* 각 프로젝트 패널(카드) 스타일 */
.project-panel {
  width: 100vw; /* 화면 너비만큼 꽉 채움 */
  height: 100vh; /* 화면 높이만큼 꽉 채움 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  position: relative;
}

.panel-content {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 12px;
}

/* 각 패널에 다른 배경 이미지 설정 */
.project-cuckoo {
  background-color: #eaeaea;
}
.project-nonghyup {
  background-image: url('@/assets/image/feature_1.svg');
}
.project-autocrypt {
  background-image: url('@/assets/image/feature_1.svg');
}
.project-dhlottery {
  background-image: url('@/assets/image/feature_1.svg'); /* 이 이미지는 추가로 준비해야 합니다. */
}
</style>
