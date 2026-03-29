'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cultureData } from '@/data/culture'
import { Book, Calendar, Palette, Globe, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CultureStats() {
  const stats = [
    {
      icon: Book,
      label: '文化主题',
      value: cultureData.length.toString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: Palette,
      label: '艺术类别',
      value: [...new Set(cultureData.map(item => item.category))].length.toString(),
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30'
    },
    {
      icon: Calendar,
      label: '历史跨度',
      value: '5000+',
      unit: '年',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Globe,
      label: '文化影响',
      value: '全球',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    }
  ]

  const totalContent = cultureData.reduce((sum, item) => sum + item.content.length, 0)
  const totalHighlights = cultureData.reduce((sum, item) => sum + (item.highlights?.length || 0), 0)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {stat.unit && (
                  <span className={`text-xs font-semibold ${stat.color}`}>{stat.unit}</span>
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      {/* 额外统计卡片 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="col-span-2 md:col-span-4"
      >
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">内容规模</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {totalContent} 篇详细介绍 · {totalHighlights} 个文化亮点
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600 dark:text-slate-400">持续更新</div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  传承千年文化智慧
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
