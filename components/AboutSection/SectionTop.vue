<template>
  <section
    class="relative min-h-[560px] overflow-hidden
           mt-[var(--header-h,70px)]
           h-[calc(100vh-var(--header-h,80px))]"
  >
<img
  src="/images/aboutMain.jpg"
  alt="FOURBERRY background"
  class="absolute inset-0 w-full h-full object-cover object-[50%_40%]"
/>

    <div class="absolute inset-0 bg-black/45"></div>
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

    <div class="absolute inset-0 flex items-end justify-start">
      <div class="text-white px-4 pb-16 md:px-16 md:pb-28 text-left">
        <h1
          class="font-black tracking-[-0.04em] leading-[0.95]
                 text-[clamp(45px,10vw,150px)] h1-custom-font"
        >
          WE’RE<br />
          <span ref="fourberry" class="inline-block min-w-[10ch] text-white"></span>
        </h1>

        <p class="mt-4 text-gray-400 text-[clamp(16px,2.2vw,28px)] font-semibold">
          고객 만족을 넘어 고객 감동을 제공하는 IT 최고의 기업이 되겠습니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const fourberry = ref(null)
const text = 'FOURBERRY.'

function typeAndDelete(el, text, speed = 250, delay = 3000) {
  let i = 0
  let isDeleting = false
  function typing() {
    if (!isDeleting && i < text.length) {
      el.innerHTML += text.charAt(i)
      i++
      setTimeout(typing, speed)
    } else if (!isDeleting && i === text.length) {
      isDeleting = true
      setTimeout(typing, delay)
    } else if (isDeleting && i > 0) {
      el.innerHTML = text.substring(0, i - 1)
      i--
      setTimeout(typing, speed / 1.5)
    } else if (isDeleting && i === 0) {
      isDeleting = false
      setTimeout(typing, 1000)
    }
  }
  typing()
}

onMounted(() => {
  const el = fourberry.value
  typeAndDelete(el, text, 250, 3000)
})
</script>

<style scoped>
:root { /* 헤더 높이 한번에 관리 */
  --header-h: 80px; /* 실제 헤더 높이에 맞춰 수정 */
}

/* 제목 강조 */
.h1-custom-font{
  font-family: 'Pretendard','Noto Sans KR','system-ui',sans-serif;
  -webkit-text-stroke: 1.7px white;
  text-stroke: 1.7px white;
  color: white;
}

/* 커서 효과 */
span::after{
  content:'';
  display:inline-block;
  margin-left:0.05em;
  width:0.12em; height:0.95em;
  background-color:white;
  vertical-align:middle;
  animation:blink .8s steps(1) infinite;
}
@keyframes blink{50%{opacity:0}}
</style>
