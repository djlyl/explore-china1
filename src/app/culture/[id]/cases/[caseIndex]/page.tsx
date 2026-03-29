import { cultureData } from '@/data/culture'
import type { Metadata } from 'next'

export function generateStaticParams() {
  const params: { id: string; caseIndex: string }[] = []
  
  cultureData.forEach((item) => {
    if (item.cases) {
      item.cases.forEach((_, index) => {
        params.push({
          id: item.id,
          caseIndex: index.toString(),
        })
      })
    }
  })
  
  return params
}

export async function generateMetadata({ params }: { params: { id: string; caseIndex: string } }): Promise<Metadata> {
  const { id, caseIndex } = params
  const item = cultureData.find((item) => item.id === id)
  if (!item || !item.cases) {
    return {
      title: '未找到',
    }
  }

  const index = parseInt(caseIndex, 10)
  const caseData = item.cases[index]
  
  if (!caseData) {
    return {
      title: '未找到',
    }
  }

  return {
    title: `${caseData.title} | ${item.title} | 探索中国`,
    description: caseData.description,
  }
}

export default async function CaseDetail({ params }: { params: { id: string; caseIndex: string } }) {
  const { id, caseIndex } = params
  const item = cultureData.find((item) => item.id === id)
  const index = parseInt(caseIndex, 10)

  if (!item || !item.cases || !item.cases[index]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">未找到相关内容</h1>
          <p className="text-gray-600">请返回首页重新选择</p>
        </div>
      </div>
    )
  }

  const caseData = item.cases[index]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{caseData.title}</h1>
      <p className="text-gray-600 mb-6">{caseData.description}</p>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {caseData.details}
        </p>
        {caseData.period && (
          <div className="mt-4 text-sm text-gray-500">
            <strong>时期：</strong>{caseData.period}
          </div>
        )}
        {caseData.significance && (
          <div className="mt-4 text-sm text-gray-500">
            <strong>历史意义：</strong>{caseData.significance}
          </div>
        )}
      </div>
    </div>
  )
}