import { cultureData } from '@/data/culture'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return cultureData.map((item) => ({
    id: item.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params
  const item = cultureData.find((item) => item.id === id)
  if (!item) {
    return {
      title: '未找到',
    }
  }

  return {
    title: `${item.title} | 探索中国`,
    description: item.description,
  }
}

export default async function CulturePage({ params }: { params: { id: string } }) {
  const { id } = params
  const item = cultureData.find((item) => item.id === id)

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">未找到该文化主题</h1>
          <p className="text-gray-600">请返回首页重新选择</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-600 mb-6">{item.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">详细介绍</h2>
          <div className="space-y-4">
            {item.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">相关标签</h2>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}