'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { cultureData } from '@/data/culture'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Calendar, User, FileText, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

type TimePeriod = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'evening' | 'night' | 'midnight'

const getTimePeriod = (hour: number): TimePeriod => {
  if (hour >= 5 && hour < 7) return 'dawn'
  if (hour >= 7 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 13) return 'noon'
  if (hour >= 13 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 19) return 'dusk'
  if (hour >= 19 && hour < 21) return 'evening'
  if (hour >= 21 && hour < 23) return 'night'
  return 'midnight'
}

const periodThemes: Record<TimePeriod, {
  bg: string
  text: string
  accent: string
  cardBg: string
  cardBorder: string
}> = {
  dawn: {
    bg: 'from-sky-100 via-orange-50 to-rose-100',
    text: 'text-slate-800',
    accent: 'text-orange-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-orange-200'
  },
  morning: {
    bg: 'from-blue-100 via-cyan-50 to-emerald-100',
    text: 'text-slate-800',
    accent: 'text-emerald-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-emerald-200'
  },
  noon: {
    bg: 'from-amber-100 via-yellow-50 to-orange-100',
    text: 'text-slate-900',
    accent: 'text-amber-600',
    cardBg: 'bg-white/90',
    cardBorder: 'border-amber-200'
  },
  afternoon: {
    bg: 'from-orange-100 via-amber-50 to-yellow-50',
    text: 'text-slate-800',
    accent: 'text-orange-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-orange-200'
  },
  dusk: {
    bg: 'from-rose-100 via-purple-50 to-indigo-100',
    text: 'text-slate-800',
    accent: 'text-purple-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-purple-200'
  },
  evening: {
    bg: 'from-indigo-100 via-purple-100 to-pink-100',
    text: 'text-slate-800',
    accent: 'text-pink-600',
    cardBg: 'bg-white/80',
    cardBorder: 'border-pink-200'
  },
  night: {
    bg: 'from-slate-900 via-slate-800 to-indigo-900',
    text: 'text-white',
    accent: 'text-indigo-400',
    cardBg: 'bg-slate-800/50',
    cardBorder: 'border-indigo-700'
  },
  midnight: {
    bg: 'from-slate-950 via-slate-900 to-black',
    text: 'text-white',
    accent: 'text-blue-400',
    cardBg: 'bg-slate-900/50',
    cardBorder: 'border-blue-800'
  }
}

export default function BookDetail() {
  const router = useRouter()
  const params = useParams()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(getTimePeriod(new Date().getHours()))
  
  const { cultureItem, bookIndex, bookData } = useMemo(() => {
    const cultureId = params.id as string
    const indexStr = params.bookIndex as string
    const index = parseInt(indexStr, 10)
    
    if (cultureId && !isNaN(index)) {
      const item = cultureData.find(i => i.id === cultureId)
      if (item && item.books && item.books[index]) {
        return {
          cultureItem: item,
          bookIndex: index,
          bookData: item.books[index]
        }
      }
    }
    
    return {
      cultureItem: null,
      bookIndex: 0,
      bookData: null
    }
  }, [params])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePeriod(getTimePeriod(new Date().getHours()))
    }, 60000)

    return () => clearInterval(timer)
  }, [])



  if (!bookData || !cultureItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">未找到相关内容</h2>
          <Button onClick={() => router.push('/')}>返回首页</Button>
        </div>
      </div>
    )
  }

  const theme = periodThemes[timePeriod]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} transition-all duration-1000`}>
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* 返回按钮 */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push(`/culture/${cultureItem.id}`)}
            className={`${theme.text} hover:bg-white/20`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回 {cultureItem.title}
          </Button>
        </div>

        {/* 书籍标题卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className={`${theme.cardBg} ${theme.cardBorder} border-2`}>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="text-sm">
                      {cultureItem.category}
                    </Badge>
                    {bookData.period && (
                      <Badge variant="outline" className="text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {bookData.period}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className={`text-4xl mb-4 ${theme.text}`}>
                    {bookData.title}
                  </CardTitle>
                  <div className="flex items-center gap-6 text-lg">
                    <div className={`flex items-center gap-2 ${theme.accent}`}>
                      <User className="w-5 h-5" />
                      <span className="font-medium">{bookData.author}</span>
                    </div>
                  </div>
                </div>
                <div className="text-8xl ml-6">
                  📚
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* 书籍简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className={`bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400 border-2`}>
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                书籍简介
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-slate-800 leading-relaxed">
                {bookData.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 阅读指南 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className={`${theme.cardBg} ${theme.cardBorder} border-2`}>
            <CardHeader>
              <CardTitle className={`${theme.text} flex items-center gap-2`}>
                <Sparkles className="w-5 h-5" />
                阅读建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`space-y-4 ${theme.text} opacity-90`}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">适合读者</p>
                    <p className="text-base opacity-90">
                      对{cultureItem.title}感兴趣的学者、研究者和爱好者，以及希望深入了解中国传统文化的读者。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">阅读方式</p>
                    <p className="text-base opacity-90">
                      建议结合实践阅读，可以在学习相关理论知识的同时，参考具体案例加深理解。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">延伸阅读</p>
                    <p className="text-base opacity-90">
                      本书是{cultureItem.title}领域的经典著作，阅读后可继续探索该领域的其他相关文献。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 相关案例 */}
        {cultureItem.cases && cultureItem.cases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className={`${theme.cardBg} ${theme.cardBorder} border-2`}>
              <CardHeader>
                <CardTitle className={`${theme.text} flex items-center gap-2`}>
                  <BookOpen className="w-5 h-5" />
                  相关案例
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {cultureItem.cases.slice(0, 2).map((caseItem, index) => (
                    <Link
                      key={index}
                      href={`/culture/${cultureItem.id}/cases/${index}`}
                    >
                      <div className={`p-4 rounded-lg border-2 ${theme.cardBorder} hover:shadow-lg transition-all cursor-pointer`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-bold ${theme.text}`}>
                            {caseItem.title}
                          </h3>
                          {caseItem.period && (
                            <Badge variant="secondary" className="text-xs">
                              {caseItem.period}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm ${theme.text} opacity-90`}>
                          {caseItem.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 导航按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between"
        >
          {bookIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => router.push(`/culture/${cultureItem.id}/books/${bookIndex - 1}`)}
              className={`${theme.text} ${theme.cardBorder}`}
            >
              ← 上一本著作
            </Button>
          )}
          {cultureItem.books && bookIndex < cultureItem.books.length - 1 && (
            <Button
              variant="outline"
              onClick={() => router.push(`/culture/${cultureItem.id}/books/${bookIndex + 1}`)}
              className={`${theme.text} ${theme.cardBorder}`}
            >
              下一本著作 →
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
