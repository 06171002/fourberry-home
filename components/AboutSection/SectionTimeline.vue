<template>
  <section class="py-20 bg-surface">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-primary text-center">History</h2>

      <ol class="mt-10 relative border-l border-gray-200">
        <li v-for="(event,i) in events" :key="i" class="ml-6 mb-10">
          <span class="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-primary"></span>
          <h3 class="font-semibold">{{ event.date }}</h3>
          <p class="text-gray-600 mt-1">{{ event.title }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const events = [
  { date: '2023.10', title: '포베리 주식회사 설립' },
  { date: '2024.03', title: 'BerryPass 솔루션 고도화' },
  { date: '2024.09', title: 'BerryMine 스크래핑 엔진 출시' },
  { date: '2025.03', title: '핵심 파트너십 체결 및 프로젝트 확장' },
]
</script>
