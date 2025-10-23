<template>
  <section class="py-20 bg-accent">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-white text-center">핵심 가치</h2>
      <ul class="mt-10 grid sm:grid-cols-1 md:grid-cols-3 gap-6"> 
        <li v-for="(item,i) in coreValues" :key="i" 
            class="p-6 rounded-2xl bg-white border shadow-sm transition duration-300 hover:shadow-lg hover:scale-[1.02]" 
            v-motion :initial="{opacity:0, y:20}" :visible="{opacity:1, y:0}">
          <h3 class="font-bold text-xl mb-2 text-primary">{{ item.title }}</h3>
          <p class="text-gray-600 text-base leading-relaxed">{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const coreValues = [
 { 
    title: '사람 중심 (People-Centric)', 
    desc: '모든 기술 발전의 최우선 가치이자 고객 경험의 출발점입니다.' 
  },
  { 
    title: '기술 역량과 품질 (Tech & Quality)', 
    desc: 'R&D 집중 투자로 실용적 혁신과 최상의 품질을 제공합니다.' 
  },
  { 
    title: '신뢰 기반 성장 (Trust & Growth)', 
    desc: '투명한 소통과 협력을 통해 고객과 함께 지속적으로 성장합니다.' 
  },
]
</script>