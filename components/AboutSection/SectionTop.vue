<template>
  <section class="relative h-[90vh] min-h-[640px] overflow-hidden">
    <img
      src="/images/aboutMain.jpg"
      alt="FOURBERRY background"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-0 bg-black/45"></div>
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

    <div class="absolute inset-0 flex items-end justify-start">
      <div class="text-white px-4 pb-16 md:px-16 md:pb-28 text-left">
        <h1
          class="font-black tracking-[-0.04em] leading-[0.95] 
          /* 폰트 크기 조정 */
          text-[clamp(50px,12vw,180px)]"
        >
          WE’RE<br />
          <span ref="fourberry" class="inline-block min-w-[10ch] text-white"></span>
        </h1>

        <p
          class="mt-4 text-gray-400 
          /* 폰트 크기 조정 */
          text-[clamp(16px,2.2vw,28px)] font-semibold"
        >
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

// ✅ 타이핑 + 삭제 + 반복
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
span::after {
  content: '|';
  display: inline-block;
  margin-left: 6px;
  animation: blink 0.8s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>