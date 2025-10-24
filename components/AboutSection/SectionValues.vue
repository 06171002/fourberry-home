<template>
  <section class="py-32 md:py-40 bg-background">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-accent text-center mb-16">
        핵심 가치
      </h2>
      
      <ul class="grid sm:grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24 mt-16"> 
        <li
          v-for="(item, i) in coreValuesWithIcons"
          :key="i"
          
          class="pt-0 text-center relative" 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ 
            opacity: 1, 
            y: 0, 
            transition: { duration: 500 }
          }"
          
          :delay="i * 200"
          :once="true"
          :threshold="0.5"
        >
          <div
            class="w-72 h-72 mx-auto mb-8 flex items-center justify-center rounded-full 
                   bg-white/30 backdrop-blur-sm border border-gray-50 shadow-xl"
          >
            <img 
              :src="item.iconUrl" 
              :alt="item.title + ' 아이콘'" 
              
              class="w-full h-full object-cover rounded-full p-0" 
              loading="lazy"
            />
          </div>
          
          <h3 class="font-bold text-xl mb-4 text-gray-900">{{ item.title }}</h3>
          <p class="text-gray-600 text-base leading-relaxed">{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const coreValuesWithIcons = [
  { 
    title: '사람 중심', 
    desc: '모든 기술 발전의 최우선 가치이자 고객 경험의 출발점입니다.',
    iconUrl: '/images/people.png' 
  },
  { 
    title: '기술 역량과 품질', 
    desc: 'R&D 집중 투자로 실용적 혁신과 최상의 품질을 제공합니다.',
    iconUrl: '/images/tech.png'
  },
  { 
    title: '신뢰 기반 성장', 
    desc: '투명한 소통과 협력을 통해 고객과 함께 지속적으로 성장합니다.',
    iconUrl: '/images/growth.png'
  },
]
</script>