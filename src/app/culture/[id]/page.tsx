'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cultureData } from '@/data/culture'
import CultureRecommend from '@/components/CultureRecommend'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Quote, Calendar, BookOpen, Heart, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { TimePeriod, getTimePeriod, periodThemes } from '@/lib/timeTheme'
import AIChat from '@/components/AIChat'

export default function CultureDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(getTimePeriod(new Date().getHours()))
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePeriod(getTimePeriod(new Date().getHours()))
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    params.then(setResolvedParams).catch(console.error)
  }, [params])

  const item = useMemo(() => {
    if (resolvedParams) {
      return cultureData.find(i => i.id === resolvedParams.id) || null
    }
    return null
  }, [resolvedParams])

  if (!item) {
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

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className={`${theme.text} hover:bg-white/20`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setLiked(!liked)}
              className={`${liked ? 'text-red-500' : theme.text} hover:bg-white/20`}
            >
              <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
              {liked ? '已收藏' : '收藏'}
            </Button>
            <Button
              variant="ghost"
              className={`${theme.text} hover:bg-white/20`}
            >
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
          </div>
        </div>

        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
            <CardHeader>
              <div className="flex items-start gap-6">
                <div className="text-8xl">{item.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <Badge variant="outline" className={theme.text}>
                      {item.tags.length} 个标签
                    </Badge>
                  </div>
                  <CardTitle className={`text-4xl mb-3 ${theme.text}`}>{item.title}</CardTitle>
                  <p className={`text-lg ${theme.text} opacity-80`}>{item.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* 内容概览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className={`${theme.cardBg} ${theme.cardBorder} border text-center`}>
              <CardContent className="pt-4">
                <div className={`text-2xl font-bold ${theme.accent}`}>{item.content.length}</div>
                <div className={`text-sm ${theme.text} opacity-70`}>详细介绍</div>
              </CardContent>
            </Card>
            <Card className={`${theme.cardBg} ${theme.cardBorder} border text-center`}>
              <CardContent className="pt-4">
                <div className={`text-2xl font-bold ${theme.accent}`}>{item.highlights?.length || 0}</div>
                <div className={`text-sm ${theme.text} opacity-70`}>文化亮点</div>
              </CardContent>
            </Card>
            <Card className={`${theme.cardBg} ${theme.cardBorder} border text-center`}>
              <CardContent className="pt-4">
                <div className={`text-2xl font-bold ${theme.accent}`}>{item.cases?.length || 0}</div>
                <div className={`text-sm ${theme.text} opacity-70`}>经典案例</div>
              </CardContent>
            </Card>
            <Card className={`${theme.cardBg} ${theme.cardBorder} border text-center`}>
              <CardContent className="pt-4">
                <div className={`text-2xl font-bold ${theme.accent}`}>{item.books?.length || 0}</div>
                <div className={`text-sm ${theme.text} opacity-70`}>经典著作</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* 详细内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
            <CardHeader>
              <CardTitle className={`${theme.text} flex items-center gap-2`}>
                <Sparkles className="w-5 h-5" />
                详细介绍
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {item.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-lg leading-relaxed ${theme.text} opacity-90`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
            <CardHeader>
              <CardTitle className={`${theme.text}`}>相关标签</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-base px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 文化亮点 */}
        {item.highlights && item.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} flex items-center gap-2`}>
                  <Sparkles className="w-5 h-5" />
                  文化亮点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-2 p-3 rounded-lg ${theme.cardBg} border ${theme.cardBorder}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                      <span className={`${theme.text} opacity-90`}>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 相关引用 */}
        {item.relatedQuotes && item.relatedQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-8"
          >
            <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} flex items-center gap-2`}>
                  <Quote className="w-5 h-5" />
                  经典名言
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {item.relatedQuotes.map((quote, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-l-4 border-purple-500 pl-4 py-2 ${theme.text} opacity-90`}
                    >
                      <p className="italic text-lg leading-relaxed">&quot;{quote}&quot;</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 历史里程碑 */}
        {item.milestones && item.milestones.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} flex items-center gap-2`}>
                  <Calendar className="w-5 h-5" />
                  发展历程
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {item.milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex gap-4 pb-6 ${index !== item.milestones!.length - 1 ? 'border-l-2 border-purple-300 dark:border-purple-700' : ''} pl-6 relative`}
                    >
                      <div className={`absolute left-0 top-0 w-4 h-4 rounded-full bg-purple-500 -translate-x-[9px] border-4 ${theme.cardBg.replace('bg-', 'border-')}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">{milestone.year}</Badge>
                        </div>
                        <p className={`text-sm ${theme.text} opacity-90`}>{milestone.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 经典案例 */}
        {item.cases && item.cases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-8"
          >
            <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} flex items-center gap-2`}>
                  <BookOpen className="w-5 h-5" />
                  经典案例
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {item.cases.map((caseItem, index) => (
                    <Link
                      key={index}
                      href={`/culture/${item.id}/cases/${index}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-2 ${theme.cardBorder} rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className={`text-xl font-bold ${theme.text} flex-1`}>
                            {caseItem.title}
                          </h3>
                          {caseItem.period && (
                            <Badge variant="secondary" className="ml-3">
                              {caseItem.period}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-base ${theme.accent} mb-3 font-medium`}>
                          {caseItem.description}
                        </p>
                        <p className={`text-base leading-relaxed ${theme.text} opacity-90 line-clamp-3`}>
                          {caseItem.details}
                        </p>
                        {caseItem.significance && (
                          <div className="mt-4 pt-4 border-t border-purple-300/30">
                            <p className="text-sm text-slate-800 font-medium">
                              历史意义：{caseItem.significance}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 经典著作 */}
        {item.books && item.books.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className={`${theme.cardBg} ${theme.cardBorder} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} flex items-center gap-2`}>
                  <BookOpen className="w-5 h-5" />
                  经典著作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {item.books.map((book, index) => (
                    <Link
                      key={index}
                      href={`/culture/${item.id}/books/${index}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className={`border-2 ${theme.cardBorder} rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-bold ${theme.text} flex-1`}>
                            {book.title}
                          </h3>
                          {book.period && (
                            <Badge variant="secondary" className="ml-3">
                              {book.period}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-800 mb-2">
                          作者：{book.author}
                        </p>
                        <p className={`text-sm leading-relaxed ${theme.text} opacity-90 line-clamp-2`}>
                          {book.description}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 相关推荐 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mb-8"
        >
          <CultureRecommend currentItem={item} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Button
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页探索更多
          </Button>
        </motion.div>
      </div>

      <AIChat 
        theme={theme} 
        cultureContext={`用户正在浏览"${item.title}"（${item.category}类别）。描述：${item.description}`}
      />
    </div>
  )
}