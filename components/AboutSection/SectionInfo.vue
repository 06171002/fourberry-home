<template>
  <section
    class="max-w-[1600px] mx-auto 
    /* 반응형 패딩: 모바일 px-6, 태블릿 md:px-12, 데스크톱 lg:px-20 */
    px-6 md:px-12 lg:px-20 py-24 md:py-32 
    
    /* 반응형 그리드: 태블릿까지 1단, 데스크톱(lg)부터 2단, 수직 중앙 정렬 */
    grid md:grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center"
  >
    <div>
      <h2
        class="text-3xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6"
      >
        포베리는<br />
        <span class="text-primary">사람 중심</span>의 기술로<br />
        <span class="text-primary">더 나은 IT 환경</span>을 만듭니다.
      </h2>
    </div>

    <div>
      <p
        class="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed"
      >
        AICBM(AI + IoT + Cloud + Big Data + Mobile)을 기반으로<br />
        변화하는 시대에 맞춘 IT 솔루션을 제공합니다.
      </p>

      <p 

        class="mt-6 text-gray-400 leading-relaxed text-base">
        포베리는 사람을 위한 기술, 신뢰를 쌓는 기술을 추구하는 IT 전문 기업입니다.<br />
        다양한 산업 분야의 시스템 자동화와 통합 솔루션, R&D, AI 빅데이터 기술을 통해<br />
        고객 중심의 가치를 실현하고 있습니다.
      </p>
    </div>
  </section>
</template>

<style scoped>
section {
  border-top: 1px solid #e5e7eb;
}
</style>