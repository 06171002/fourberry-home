// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ✅ 사용 모듈들 (nuxt/image 옵션 인라인)
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxt/image', { format: ['webp', 'avif'] }],
    '@vueuse/nuxt',
    'unplugin-icons/nuxt',
    '@vueuse/motion/nuxt',
  ],

  // ✅ 전역 CSS 등록 (Tailwind + 공통 SCSS)
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/scss/common.scss',
  ],

  // ✅ SSG (Static Site Generation)
  routeRules: {
    '/**': { prerender: true },
  },

  // ✅ 전역 head/SEO
  app: {
    head: {
      titleTemplate: '%s · Company',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '회사 소개 웹사이트' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og/cover.png' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
})
