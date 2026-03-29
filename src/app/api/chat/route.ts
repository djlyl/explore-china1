import { NextRequest, NextResponse } from 'next/server'

const API_KEY = 'sk-SNzkLK46ELzH0EdIWuJl5YWISV5XUfEh3VIDTYPSEk9ROQCg'
const API_URL = 'https://api.moonshot.cn/v1/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const { message, cultureContext } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    const systemPrompt = `你是"探索中国"网站的文化助手，专门帮助用户了解中国传统文化。

你的职责：
1. 回答用户关于中国传统文化的问题
2. 提供深入的文化解读和历史背景
3. 推荐相关的文化内容和学习资源
4. 以友好、专业的态度与用户交流

回答风格：
- 语言简洁明了，通俗易懂
- 内容准确可靠，有据可查
- 适当引用经典文献和历史故事
- 鼓励用户深入了解中国文化

${cultureContext ? `当前用户正在浏览：${cultureContext}` : ''}`

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.1,
        max_tokens: 256,
        top_p: 0.95,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        stream: false
      }),
    })

    const data = await response.json()
    console.log('Kimi API Response:', JSON.stringify(data, null, 2))

    if (!response.ok) {
      console.error('Kimi API Error:', data)
      return NextResponse.json(
        { error: data.error?.message || 'AI服务暂时不可用' },
        { status: 500 }
      )
    }

    const aiResponse = data.choices?.[0]?.message?.content || '抱歉，我暂时无法回答这个问题。请稍后再试。'

    return NextResponse.json({
      response: aiResponse
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: '服务出现错误，请稍后再试: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    )
  }
}