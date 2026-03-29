'use client'

import { useState, useEffect } from 'react'

type TimePeriod = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'evening' | 'night' | 'midnight'

// 时辰映射
const timePeriods: Record<TimePeriod, {
  hours: [number, number]
  name: string
  description: string
  background: string
  text: string
  accent: string
  accentText: string
}> = {
  dawn: {
    hours: [5, 7],
    name: '晨曦',
    description: '日出东方，晨光熹微',
    background: 'from-sky-300 via-orange-200 to-rose-300',
    text: 'text-slate-800',
    accent: 'bg-orange-500',
    accentText: 'bg-orange-100 text-orange-800'
  },
  morning: {
    hours: [7, 11],
    name: '清晨',
    description: '朝阳初升，朝气蓬勃',
    background: 'from-blue-400 via-cyan-300 to-emerald-300',
    text: 'text-slate-800',
    accent: 'bg-emerald-500',
    accentText: 'bg-emerald-100 text-emerald-800'
  },
  noon: {
    hours: [11, 13],
    name: '正午',
    description: '艳阳高照，生机勃勃',
    background: 'from-amber-400 via-yellow-300 to-orange-300',
    text: 'text-slate-900',
    accent: 'bg-amber-600',
    accentText: 'bg-amber-100 text-amber-800'
  },
  afternoon: {
    hours: [13, 17],
    name: '午后',
    description: '阳光和煦，茶香四溢',
    background: 'from-orange-400 via-amber-300 to-yellow-200',
    text: 'text-slate-800',
    accent: 'bg-orange-500',
    accentText: 'bg-orange-100 text-orange-800'
  },
  dusk: {
    hours: [17, 19],
    name: '黄昏',
    description: '霞光万道，归鸟投林',
    background: 'from-rose-500 via-purple-400 to-indigo-400',
    text: 'text-white',
    accent: 'bg-purple-600',
    accentText: 'bg-purple-100 text-purple-800'
  },
  evening: {
    hours: [19, 21],
    name: '傍晚',
    description: '华灯初上，万家灯火',
    background: 'from-indigo-500 via-purple-600 to-pink-400',
    text: 'text-white',
    accent: 'bg-pink-500',
    accentText: 'bg-pink-100 text-pink-800'
  },
  night: {
    hours: [21, 23],
    name: '夜晚',
    description: '星河璀璨，夜色阑珊',
    background: 'from-slate-800 via-slate-700 to-indigo-900',
    text: 'text-white',
    accent: 'bg-indigo-600',
    accentText: 'bg-indigo-100 text-indigo-800'
  },
  midnight: {
    hours: [23, 5],
    name: '深夜',
    description: '月明星稀，万籁俱寂',
    background: 'from-slate-900 via-slate-800 to-black',
    text: 'text-white',
    accent: 'bg-blue-600',
    accentText: 'bg-blue-100 text-blue-800'
  }
}

// 格式化日期
function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${year}年${month}月${day}日 星期${weekdays[date.getDay()]}`
}

// 格式化时间
function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>('morning')
  const mounted = true

  useEffect(() => {
    // 初始设置时间
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now)

      // 更新时辰
      const hour = now.getHours()
      for (const [key, value] of Object.entries(timePeriods)) {
        const [start, end] = value.hours
        if (start <= end) {
          if (hour >= start && hour < end) {
            setCurrentPeriod(key as TimePeriod)
            break
          }
        } else {
          // 跨午夜的情况
          if (hour >= start || hour < end) {
            setCurrentPeriod(key as TimePeriod)
            break
          }
        }
      }
    }

    // 立即执行一次
    updateTime()

    // 设置定时器
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  // 避免服务端渲染和客户端渲染不一致
  if (!mounted || !currentTime) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-300 p-6 shadow-2xl">
        <div className="relative z-10">
          <div className="text-5xl font-bold text-slate-800 mb-2 font-mono">
            --:--:--
          </div>
          <div className="text-xl text-slate-800 opacity-90 mb-4">
            加载中...
          </div>
        </div>
      </div>
    )
  }

  const style = timePeriods[currentPeriod]

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.background} p-6 shadow-2xl transition-all duration-1000`}>
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10">
        {/* 主时间显示 */}
        <div className={`text-5xl font-bold ${style.text} mb-3 font-mono tracking-wider`}>
          {formatTime(currentTime)}
        </div>

        {/* 日期和星期 */}
        <div className={`text-lg ${style.text} opacity-90 mb-4`}>
          {formatDate(currentTime)}
        </div>

        {/* 时辰信息 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-4 py-1.5 rounded-full text-white text-sm font-bold ${style.accent} shadow-lg`}>
              {style.name}
            </span>
            <span className={`text-sm ${style.text} opacity-80`}>
              {style.description}
            </span>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className={`mt-4 pt-3 border-t ${style.text} border-opacity-20`}>
          <div className={`text-xs ${style.text} opacity-60 text-center`}>
            根据时间自动切换主题 · 感受古人智慧
          </div>
        </div>
      </div>
    </div>
  )
}
