import { cultureData } from '@/data/culture'
import type { Metadata } from 'next'

export function generateStaticParams() {
  const params: { id: string; bookIndex: string }[] = []
  
  cultureData.forEach((item) => {
    if (item.books) {
      item.books.forEach((_, index) => {
        params.push({
          id: item.id,
          bookIndex: index.toString(),
        })
      })
    }
  })
  
  return params
}

export async function generateMetadata({ params }: { params: { id: string; bookIndex: string } }): Promise<Metadata> {
  const { id, bookIndex } = params
  const item = cultureData.find((item) => item.id === id)
  if (!item || !item.books) {
    return {
      title: '未找到',
    }
  }

  const index = parseInt(bookIndex, 10)
  const bookData = item.books[index]
  
  if (!bookData) {
    return {
      title: '未找到',
    }
  }

  return {
    title: `${bookData.title} | ${item.title} | 探索中国`,
    description: bookData.description,
  }
}

export default async function BookDetail({ params }: { params: { id: string; bookIndex: string } }) {
  const { id, bookIndex } = params
  const item = cultureData.find((item) => item.id === id)
  const index = parseInt(bookIndex, 10)

  if (!item || !item.books || !item.books[index]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">未找到相关内容</h1>
          <p className="text-gray-600">请返回首页重新选择</p>
        </div>
      </div>
    )
  }

  const bookData = item.books[index]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{bookData.title}</h1>
      <div className="mb-4">
        <p className="text-gray-600"><strong>作者：</strong>{bookData.author}</p>
        {bookData.period && (
          <p className="text-gray-600"><strong>时期：</strong>{bookData.period}</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 leading-relaxed">
          {bookData.description}
        </p>
      </div>
    </div>
  )
}