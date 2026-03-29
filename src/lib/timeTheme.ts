export type TimePeriod = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'evening' | 'night' | 'midnight'

export interface TimeTheme {
  bg: string
  text: string
  accent: string
  cardBg: string
  cardBorder: string
  greeting?: string
}

export const getTimePeriod = (hour: number): TimePeriod => {
  if (hour >= 5 && hour < 7) return 'dawn'
  if (hour >= 7 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 13) return 'noon'
  if (hour >= 13 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 19) return 'dusk'
  if (hour >= 19 && hour < 21) return 'evening'
  if (hour >= 21 && hour < 23) return 'night'
  return 'midnight'
}

export const periodThemes: Record<TimePeriod, TimeTheme> = {
  dawn: {
    bg: 'from-sky-100 via-orange-50 to-rose-100',
    text: 'text-slate-800',
    accent: 'text-orange-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-orange-200',
    greeting: '早安，晨光熹微'
  },
  morning: {
    bg: 'from-blue-100 via-cyan-50 to-emerald-100',
    text: 'text-slate-800',
    accent: 'text-emerald-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-emerald-200',
    greeting: '上午好，活力满满'
  },
  noon: {
    bg: 'from-amber-100 via-yellow-50 to-orange-100',
    text: 'text-slate-900',
    accent: 'text-amber-600',
    cardBg: 'bg-white/90',
    cardBorder: 'border-amber-200',
    greeting: '中午好，阳光明媚'
  },
  afternoon: {
    bg: 'from-orange-100 via-amber-50 to-yellow-50',
    text: 'text-slate-800',
    accent: 'text-orange-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-orange-200',
    greeting: '下午好，茶香四溢'
  },
  dusk: {
    bg: 'from-rose-100 via-purple-50 to-indigo-100',
    text: 'text-slate-800',
    accent: 'text-purple-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-purple-200',
    greeting: '黄昏好，霞光万道'
  },
  evening: {
    bg: 'from-indigo-100 via-purple-100 to-pink-100',
    text: 'text-slate-800',
    accent: 'text-pink-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-pink-200',
    greeting: '傍晚好，华灯初上'
  },
  night: {
    bg: 'from-slate-900 via-slate-800 to-indigo-900',
    text: 'text-white',
    accent: 'text-indigo-400',
    cardBg: 'bg-slate-800/50',
    cardBorder: 'border-indigo-700',
    greeting: '夜色正浓'
  },
  midnight: {
    bg: 'from-slate-950 via-slate-900 to-black',
    text: 'text-white',
    accent: 'text-blue-400',
    cardBg: 'bg-slate-900/50',
    cardBorder: 'border-blue-800',
    greeting: '深夜安宁'
  }
}

export const timePeriodInfo: Record<TimePeriod, { name: string; description: string; icon: string }> = {
  dawn: {
    name: '黎明',
    description: '天色渐亮，晨光熹微',
    icon: '🌅'
  },
  morning: {
    name: '上午',
    description: '活力满满，朝气蓬勃',
    icon: '☀️'
  },
  noon: {
    name: '中午',
    description: '阳光明媚，正午时分',
    icon: '🌞'
  },
  afternoon: {
    name: '下午',
    description: '茶香四溢，悠然自得',
    icon: '🌤️'
  },
  dusk: {
    name: '黄昏',
    description: '霞光万道，夕阳西下',
    icon: '🌇'
  },
  evening: {
    name: '傍晚',
    description: '华灯初上，夜幕降临',
    icon: '🌆'
  },
  night: {
    name: '夜晚',
    description: '夜色正浓，宁静祥和',
    icon: '🌙'
  },
  midnight: {
    name: '深夜',
    description: '万籁俱寂，深夜安宁',
    icon: '🌃'
  }
}