<script setup>
useSeoMeta({
  title: 'Home',
  description: 'Nuxt 3 + Tailwind 시작 페이지',
  ogImage: '/og/cover.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section>
    <div class="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 class="text-4xl md:text-6xl font-bold text-primary">Hello Tailwind!</h1>
        <p class="mt-4 text-gray-600">
          Vue3 + Nuxt3 + SSG + Tailwind 최소 골격
        </p>
        <div class="mt-8 flex gap-3">
          <NuxtLink to="#start" class="btn-primary">시작하기</NuxtLink>
          <a href="https://nuxt.com" target="_blank" class="underline text-gray-600">Nuxt 문서</a>
        </div>
      </div>

      <!-- 이미지 최적화 -->
<!--      <img src="~/assets/image/feature_1.svg" alt="이미지" class="rounded-2xl shadow-md" />-->
    </div>
  </section>

  <section id="start" class="py-16">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="text-2xl font-bold">세팅 완료 ✅</h2>
      <ul class="mt-4 list-disc pl-5 text-gray-700 space-y-1">
        <li>Tailwind 반응형 동작</li>
        <li>이미지 최적화(&lt;NuxtImg&gt;) 가능</li>
        <li>SEO 메타(`useSeoMeta`) 적용</li>
        <li>SSG 프리렌더 준비됨</li>
      </ul>
    </div>
  </section>
</template>
