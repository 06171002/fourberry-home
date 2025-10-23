<template>
  <!-- 배경은 전체 폭 -->
  <section >
    <!-- 내용만 max-w로 제한 -->
    <div class="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-24">
        <!-- 왼쪽 정보 패널 (데스크탑 전용) -->
        <aside class="hidden md:block md:col-span-5 lg:col-span-4">
          <div class="lg:sticky lg:top-24 space-y-8">
            <div>
              <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">인사말</h1>
              <p class="mt-2 text-xl lg:text-2xl font-semibold text-gray-800">대표이사 우대식</p>
            </div>
          </div>
        </aside>

        <!-- 오른쪽 본문 -->
        <article class="md:col-span-7 lg:col-span-8">
          <!-- 📱 모바일 전용 헤더 -->
          <div class="block md:hidden mb-6">
            <p class="text-lg font-semibold text-gray-800">대표이사 우대식</p>
          </div>

          <header class="mb-4 md:mb-6">
            <h2 class="text-secondary text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
              사람중심의 기술, 신뢰를 쌓는 파트너
            </h2>
          </header>

          <!-- 모바일엔 막대 없음 -->
          <div class="border-l-0 md:border-l-4 lg:border-l-6 border-gray-200 pl-0 md:pl-5 lg:pl-7">
            <div class="prose prose-gray max-w-none text-gray-800 leading-relaxed">
              <p>
                주식회사 포베리는 2023년 창업 이래 IT 분야에서
                <span class="font-semibold text-accent">기본이 되자는 목적과 사명의식</span>을 가지고 사업을 추진하고 있습니다.
              </p>
              <p>
                시스템은 <span class="font-semibold text-accent">사람이 중심</span>이 되어야 하고 사람을 위해서 존재해야 한다는 것이
                저희 포베리가 IT 산업을 바라보는 철학이자 기업의 경영방침입니다.
              </p>
              <p>
                사람 중심의 기술 발전을 위해
                <span class="font-semibold text-accent">AICBM (AI · IoT · Cloud · Big Data · Mobile)</span> 중심의 사업 전개가
                필수적이라는 판단에서 관련 사업에 적극적으로 매진함과 동시에
                R&D 역량 향상에도 집중적으로 투자하고 있습니다.
              </p>
              <p>
                거시적 관점의 기술 개발에서 초미세화 관점으로 전이되고 있는 IT 기술의 시대 변화에 대응하고,
                사람 중심의 IT 기업을 완성할 수 있도록 고객과 함께 노력하는 기업이 되도록 하겠습니다.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 없음
</script>
