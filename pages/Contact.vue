<script setup lang="ts">
import { ref } from 'vue'

// 폼 데이터를 양방향으로 바인딩하기 위한 ref 변수들입니다.
const companyName = ref('')
const contactName = ref('')
const phone = ref('')
const email = ref('')
const message = ref('')
const agreeToPrivacy = ref(false)

// 폼 제출 시 실행될 함수입니다.
const handleSubmit = () => {
  if (!agreeToPrivacy.value) {
    alert('개인정보 수집 및 이용에 동의해주세요.')
    return
  }
  // 실제로는 이 곳에서 서버로 데이터를 전송하는 로직이 들어갑니다.
  console.log('폼 제출 데이터:', {
    company: companyName.value,
    name: contactName.value,
    phone: phone.value,
    email: email.value,
    message: message.value,
  })
  alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.')
}
</script>

<template>
  <div class="contact-page">
    <section class="hero-section">
      <div class="hero-content">
        <h2>Let's Create Together</h2>
        <p>포베리는 새로운 파트너를 언제나 환영합니다.</p>
      </div>
    </section>

    <div class="main-content">
      <div class="contact-info">
        <h3>Contact Info</h3>
        <ul>
          <li>
            <strong>Address</strong>
            <span>서울특별시 영등포구 양평로 22길 21<br>코오롱디지털타워 1409호</span>
          </li>
          <li>
            <strong>E-mail</strong>
            <span>damon@fourberry.co.kr</span>
          </li>
          <li>
            <strong>Phone</strong>
            <span>010-2755-6550</span>
          </li>
        </ul>
        <div class="map-placeholder">
          Map Area
        </div>
      </div>

      <div class="contact-form">
        <h3>프로젝트 문의</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="companyName">회사명</label>
            <input type="text" id="companyName" v-model="companyName" required />
          </div>
          <div class="form-group">
            <label for="contactName">담당자명</label>
            <input type="text" id="contactName" v-model="contactName" required />
          </div>
          <div class="form-group">
            <label for="phone">연락처</label>
            <input type="tel" id="phone" v-model="phone" required />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="message">문의 내용</label>
            <textarea id="message" v-model="message" rows="6" required></textarea>
          </div>
          <div class="privacy-agreement">
            <input type="checkbox" id="agree" v-model="agreeToPrivacy" />
            <label for="agree">개인정보 수집 및 이용에 동의합니다.</label>
          </div>
          <button type="submit" class="submit-button">문의 접수</button>
        </form>
      </div>
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
  font-size: 2.8rem;
  font-weight: 700;
}
.hero-content p {
  font-size: 1.1rem;
  color: #555;
  margin-top: 0.5rem;
}

/* ============== 메인 콘텐츠 레이아웃 ============== */
.main-content {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1.5fr; /* 왼쪽과 오른쪽 컬럼 비율 */
  gap: 4rem;
}

/* ============== 왼쪽 정보 영역 스타일 ============== */
.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}
.contact-info ul {
  list-style: none;
  padding: 0;
}
.contact-info li {
  margin-bottom: 1.5rem;
}
.contact-info strong {
  display: block;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.3rem;
}
.contact-info span {
  font-size: 1.1rem;
  color: #333;
}
.map-placeholder {
  width: 100%;
  height: 200px;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  border-radius: 8px;
  margin-top: 2rem;
}

/* ============== 오른쪽 폼 영역 스타일 ============== */
.contact-form h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.privacy-agreement {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.privacy-agreement input {
  margin-right: 0.5rem;
}
.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

/* ============== 반응형 스타일 ============== */
@media (max-width: 992px) {
  .main-content {
    grid-template-columns: 1fr; /* 모바일에서는 세로로 쌓이도록 변경 */
  }
}
</style>
