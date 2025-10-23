import { useState } from '#app'

// 'light' = 흰색 텍스트 (기본)
// 'dark' = 검은색 텍스트 (흰색 배경용)
export const useHeaderTheme = () => {
    return useState<'light' | 'dark'>('headerTheme', () => 'light')
}