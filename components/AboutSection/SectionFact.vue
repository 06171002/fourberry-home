<template>
  <!-- Company Fact Section -->
  <section class="bg-accent">
    <div class="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <h2 class="sr-only">회사 기본 정보</h2>

      <dl class="divide-y divide-gray-700/60">
        <!-- 회사명 -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 py-6 md:py-8">
          <dt class="md:col-span-2 text-sm md:text-base text-gray-300">회사명</dt>
          <dd class="md:col-span-4 text-base md:text-lg text-gray-100 md:pl-16 lg:pl-20">
            포베리주식회사
          </dd>
        </div>

        <!-- 설립일 -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 py-6 md:py-8">
          <dt class="md:col-span-2 text-sm md:text-base text-gray-300">설립일</dt>
          <dd class="md:col-span-4 text-base md:text-lg text-gray-100 md:pl-16 lg:pl-20">
            2023년 10월 30일
          </dd>
        </div>

        <!-- 주요 사업 -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 py-6 md:py-8">
          <dt class="md:col-span-2 text-sm md:text-base text-gray-300">주요 사업</dt>
          <dd class="md:col-span-4 text-base md:text-lg text-gray-100 leading-relaxed md:pl-16 lg:pl-20">
            시스템 자동화 및 통합<br>
            시스템 솔루션 개발<br>
            AI/빅데이터 산학협력 R&D<br>
            IT 컨설팅
          </dd>
        </div>

        <!-- 임직원수 -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 py-6 md:py-8">
          <dt class="md:col-span-2 text-sm md:text-base text-gray-300">임직원수</dt>
          <dd class="md:col-span-4 text-base md:text-lg text-gray-100 md:pl-16 lg:pl-20">
            8명
          </dd>
        </div>

        <!-- Contact -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 py-6 md:py-8">
          <dt class="md:col-span-2 text-sm md:text-base text-gray-300">Contact</dt>
          <dd class="md:col-span-4 text-base md:text-lg text-gray-100 md:pl-16 lg:pl-20">
            <div class="space-y-3">
              <div class="flex">
                <span class="w-16 text-gray-400">HP</span>
                <span>010-2755-6550</span>
              </div>
              <div class="flex">
                <span class="w-16 text-gray-400">Addr</span>
                <span>서울특별시 영등포구 양평로 22길 21 코오롱디지털타워 1409호</span>
              </div>
              <div class="flex">
                <span class="w-16 text-gray-400">Email</span>
                <span>damon@fourberry.co.kr</span>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
// 없음
</script>
