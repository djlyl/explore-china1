'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import TimeDisplay from '@/components/TimeDisplay'
import CultureStats from '@/components/CultureStats'
import { cultureData } from '@/data/culture'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Clock, BookOpen, Heart, Users, TrendingUp } from 'lucide-react'
import AIChat from '@/components/AIChat'
import { motion } from 'framer-motion'
import { TimePeriod, getTimePeriod, periodThemes, timePeriodInfo } from '@/lib/timeTheme'

export default function Home() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(getTimePeriod(new Date().getHours()))
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePeriod(getTimePeriod(new Date().getHours()))
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const theme = periodThemes[timePeriod]
  const categories = ['all', ...Array.from(new Set(cultureData.map(item => item.category)))]

  const filteredData = selectedCategory === 'all' 
    ? cultureData 
    : cultureData.filter(item => item.category === selectedCategory)

  const features = [
    {
      icon: Clock,
      title: '时辰智慧',
      description: '根据时间自动切换主题，感受古人"日出而作，日落而息"的生活智慧',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Sparkles,
      title: '文化宝库',
      description: '精选中国传统文化精华，涵盖艺术、医学、哲学等多个领域',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: BookOpen,
      title: '深度解读',
      description: '每个文化主题都有详细介绍、历史背景、经典案例和相关著作',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  const highlights = [
    {
      icon: TrendingUp,
      title: '持续更新',
      description: '不断丰富文化内容，定期添加新的文化主题',
      value: '持续'
    },
    {
      icon: Heart,
      title: '用心制作',
      description: '精心策划每个文化主题，确保内容质量',
      value: '精品'
    },
    {
      icon: Users,
      title: '文化传承',
      description: '致力于传播中华优秀传统文化',
      value: '传承'
    }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} transition-all duration-1000`}>
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* 头部区域 */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{timePeriodInfo[timePeriod].icon}</span>
                <h1 className={`text-4xl md:text-5xl font-bold ${theme.text}`}>
                  {theme.greeting}
                </h1>
              </div>
              <p className={`text-lg ${theme.text} opacity-80`}>
                探索中国文华的深厚底蕴与独特魅力
              </p>
            </div>
            <TimeDisplay />
          </div>
        </header>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <CultureStats />
        </motion.div>

        {/* 功能介绍区 */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className={`${theme.cardBg} ${theme.cardBorder} border hover:shadow-lg transition-all h-full`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <CardTitle className={`text-lg ${theme.text}`}>
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${theme.text} opacity-70`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 时辰主题展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
                <Clock className="w-5 h-5" />
                八时辰主题
              </CardTitle>
              <CardDescription className={`${theme.text} opacity-70`}>
                根据中国传统时辰概念，页面主题随时间自动切换
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(timePeriodInfo).map(([key, info]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border ${
                      timePeriod === key 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                        : `${theme.cardBorder}`
                    } transition-all`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{info.icon}</span>
                      <span className={`font-medium ${theme.text}`}>{info.name}</span>
                    </div>
                    <p className={`text-xs ${theme.text} opacity-60`}>{info.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 特色亮点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className={`${theme.cardBg} ${theme.cardBorder} border text-center`}>
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-3 rounded-full ${theme.cardBg.replace('bg-', 'bg-').replace('/80', '/30')} mb-3`}>
                      <highlight.icon className={`w-6 h-6 ${theme.accent}`} />
                    </div>
                    <div className={`text-2xl font-bold ${theme.accent} mb-1`}>
                      {highlight.value}
                    </div>
                    <h3 className={`font-semibold ${theme.text} mb-1`}>
                      {highlight.title}
                    </h3>
                    <p className={`text-sm ${theme.text} opacity-60`}>
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 分类筛选 */}
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>文化主题</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-purple-600 hover:bg-purple-700"
                    : `${theme.cardBg} ${theme.text} hover:bg-white/60`
                }
              >
                {category === 'all' ? '全部' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* 文化卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/culture/${item.id}`}>
                <Card className={`${theme.cardBg} ${theme.cardBorder} border hover:shadow-xl transition-all h-full hover:scale-105 cursor-pointer`}>
                  <CardHeader>
                    <div className="text-5xl mb-3">{item.image}</div>
                    <CardTitle className={`${theme.text}`}>{item.title}</CardTitle>
                    <CardDescription className={`${theme.text} opacity-70`}>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 底部信息 */}
        <footer className="mt-16 text-center">
          <div className={`${theme.cardBg} ${theme.cardBorder} border rounded-lg p-6 inline-block`}>
            <p className={`${theme.text} opacity-80 mb-2`}>
              探索中国文华 · 传承华夏文明
            </p>
            <p className={`text-sm ${theme.text} opacity-60`}>
              中华五千年文明的数字化传承
            </p>
          </div>
        </footer>
      </div>

      <AIChat theme={theme} />
    </div>
  )
}