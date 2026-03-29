import { MetadataRoute } from 'next'
import { cultureData } from '@/data/culture'

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  // 基础路由
  const baseRoutes = [
    {
      url: 'https://explore-china1.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  // 文化主题路由
  const cultureRoutes = cultureData.map((item) => ({
    url: `https://explore-china1.vercel.app/culture/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 案例路由
  const caseRoutes = cultureData.flatMap((item) => {
    if (!item.cases) return []
    return item.cases.map((_, index) => ({
      url: `https://explore-china1.vercel.app/culture/${item.id}/cases/${index}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  })

  // 书籍路由
  const bookRoutes = cultureData.flatMap((item) => {
    if (!item.books) return []
    return item.books.map((_, index) => ({
      url: `https://explore-china1.vercel.app/culture/${item.id}/books/${index}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  })

  return [...baseRoutes, ...cultureRoutes, ...caseRoutes, ...bookRoutes]
}