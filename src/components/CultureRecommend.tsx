'use client'

import { cultureData, CultureItem } from '@/data/culture'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CultureRecommendProps {
  currentItem: CultureItem
  limit?: number
}

export default function CultureRecommend({ currentItem, limit = 3 }: CultureRecommendProps) {
  // 获取相同类别的推荐
  const sameCategoryItems = cultureData
    .filter(item => item.category === currentItem.category && item.id !== currentItem.id)
    .slice(0, limit)

  // 获取相同标签的推荐
  const getRelatedByTags = (item: CultureItem, excludeIds: string[]) => {
    return cultureData
      .filter(other => 
        other.id !== item.id &&
        !excludeIds.includes(other.id) &&
        other.tags.some(tag => item.tags.includes(tag))
      )
      .slice(0, limit)
  }

  const relatedByTags = getRelatedByTags(currentItem, sameCategoryItems.map(i => i.id))

  return (
    <div className="space-y-6">
      {/* 同类推荐 */}
      {sameCategoryItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              同类文化探索
            </h3>
            <Badge variant="secondary">{currentItem.category}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sameCategoryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/culture/${item.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl group-hover:scale-110 transition-transform">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 flex-wrap">
                          {item.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 标签相关推荐 */}
      {relatedByTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              相关推荐
            </h3>
            <Badge variant="outline">根据标签</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedByTags.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/culture/${item.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer group bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-3xl">{item.image}</div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 transition-colors">
                            {item.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-xs text-purple-600">
                        <span>了解更多</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
