<template>
  <section
    class="py-20 bg-background relative overflow-hidden"
    :style="{ height: sectionHeight + 'px' }"
  >
    <div class="max-w-6xl mx-auto px-6 relative">
      <h2 class="text-2xl md:text-3xl font-bold text-center">포베리 연혁</h2>

      <div
        ref="timelineContainer"
        class="mt-12 grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-10 relative"
      >
        <!-- ✅ 세로 라인: 길이 고정 70vh, 섹션 안에서만 -->
        <div
          class="hidden md:block absolute left-[7.3rem] top-1/2 -translate-y-1/2 w-px h-[70vh] bg-black/10 dark:bg-white/10"
        ></div>

        <!-- 좌측: 연도 리스트 -->
        <aside class="md:pr-4">
          <ul class="space-y-14 relative">
            <li
              v-for="y in yearsDesc"
              :key="y"
              class="relative flex items-center gap-3 py-3"
            >
              <!-- 연도 버튼 -->
              <button
                class="w-[5.5rem] text-right font-semibold transition-colors"
                :class="selectedYear === y ? 'text-black dark:text-white' : 'text-black/60 dark:text-white/60'"
                @click="selectYear(y)"
              >
                {{ y }}
              </button>

              <!-- ✅ 점/원 (라인 중앙보다 살짝 위로 정렬) -->
              <span class="relative -translate-y-[3px]">
                <span
                  class="block w-2.5 h-2.5 rounded-full"
                  :class="selectedYear === y
                    ? 'bg-transparent border-2 border-black/60 dark:border-white/70'
                    : 'bg-black/30 dark:bg-white/30'"
                ></span>
                <span
                  v-if="selectedYear === y"
                  class="absolute -inset-1 rounded-full border-2 border-black/60 dark:border-white/70"
                ></span>
              </span>
            </li>
          </ul>
        </aside>

        <!-- 우측: 선택 연도 상세 -->
        <main class="md:pl-8">
          <div v-if="yearBlocks[selectedYear]" class="space-y-12">
            <div
              v-for="(monthBlock, idx) in yearBlocks[selectedYear]"
              :key="idx"
              class="space-y-3"
            >
              <p class="text-black/60 dark:text-white/60 font-semibold">
                {{ selectedYear }}.<span>{{ monthBlock.month }}</span>
              </p>

              <ul class="space-y-3">
                <li
                  v-for="(text, j) in monthBlock.titles"
                  :key="j"
                  class="text-base leading-relaxed"
                >
                  <span
                    class="font-semibold text-black dark:text-white"
                    v-html="bold(text)"
                  ></span>
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="text-black/50 dark:text-white/50">
            기록이 없습니다.
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'

type RawEvent = { date: string; titles: string[] }

const raw: RawEvent[] = [
  { date: '2023.10', titles: ['포베리 주식회사 설립', '영등포농협 온라인 쇼핑몰 구축 컨설팅 착수'] },
  { date: '2024.01', titles: ['영등포농협 온라인 브랜드 쇼핑몰 구축 사업 착수'] },
  { date: '2024.06', titles: ['아우토크립트 K-CSMS 1차 구축 완료', 'TAD 홈페이지 구축 완료'] },
  { date: '2024.08', titles: ['자체 솔루션 **베리패스(Berry-Pass) 개발 착수**', '영등포농협 SSO 구축 완료'] },
  { date: '2024.10', titles: ['동행복권 인쇄복권 시스템 DB 전환 사업 착수', '한국해양공사 게이미피케이션 캠페인 구축 완료'] },
  { date: '2025.01', titles: ['자체 솔루션 **베리마인(Berry-Mine) 개발 착수** (웹 자동화)', '쿠쿠홀딩스 시스템 운영 및 고도화 착수'] },
  { date: '2025.03', titles: ['영등포농협 온라인 브랜드 쇼핑몰 구축 완료'] },
  { date: '2025.06', titles: ['아우토크립트 K-CSMS 2차 구축 완료'] },
]

/* ✅ 연/월 그룹핑 */
const yearBlocks = computed<Record<string, { month: string; titles: string[] }[]>>(() => {
  const map: Record<string, Record<string, string[]>> = {}
  for (const ev of raw) {
    const [y, m] = ev.date.split('.') // 'YYYY', 'MM'
    if (!map[y]) map[y] = {}
    if (!map[y][m]) map[y][m] = []
    map[y][m].push(...ev.titles)
  }
  const res: Record<string, { month: string; titles: string[] }[]> = {}
  Object.keys(map).forEach((y) => {
    const months = Object.keys(map[y]).sort((a, b) => Number(a) - Number(b))
    res[y] = months.map((m) => ({ month: m, titles: map[y][m] }))
  })
  return res
})

/* ✅ 표시 연도 */
const yearsDesc = computed<string[]>(() => ['2025', '2024', '2023'])

/* ✅ 선택된 연도 */
const selectedYear = ref<string>(yearsDesc.value[0])

const selectYear = (y: string) => {
  selectedYear.value = y
}

/* ✅ bold 처리 */
const bold = (s: string) => s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

/* ✅ 섹션 높이를 가장 많은 내용 기준으로 자동 고정 */
const timelineContainer = ref<HTMLElement | null>(null)
const sectionHeight = ref(0)

onMounted(async () => {
  await nextTick()
  if (!timelineContainer.value) return

  // 각 연도별 블록 높이 측정
  const yearHeights: number[] = []
  for (const y of yearsDesc.value) {
    const temp = document.createElement('div')
    temp.className = 'absolute opacity-0 pointer-events-none w-[600px]'
    temp.innerHTML = yearBlocks.value[y]
      ?.map(
        (m) => `<p>${y}.${m.month}</p><ul>${m.titles.map((t) => `<li>${t}</li>`).join('')}</ul>`
      )
      .join('') || ''
    document.body.appendChild(temp)
    yearHeights.push(temp.scrollHeight)
    temp.remove()
  }

  sectionHeight.value = Math.max(...yearHeights) + 300 // 여백 조금 더
})
</script>

<style scoped>
.bg-background {
  background-color: #f9fafb;
}
</style>
