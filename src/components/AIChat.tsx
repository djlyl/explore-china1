'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, X, Bot, User, Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatProps {
  cultureContext?: string
  theme?: {
    bg: string
    text: string
    accent: string
    cardBg: string
    cardBorder: string
  }
}

export default function AIChat({ cultureContext, theme }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // 检查是否在静态模式下
      if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
        // 静态模式下的降级处理
        const staticResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '您好！我是文化助手。由于当前是静态部署环境，AI功能暂时不可用。请在本地开发环境中使用完整的AI功能。',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, staticResponse])
      } else {
        // 正常API调用
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage.content,
            conversationId,
            cultureContext
          }),
        })

        const data = await response.json()

        if (response.ok) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.response,
            timestamp: new Date()
          }

          setMessages(prev => [...prev, assistantMessage])
          if (data.conversationId) {
            setConversationId(data.conversationId)
          }
        } else {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.error || '抱歉，服务出现错误，请稍后再试。',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，网络连接出现问题，请稍后再试。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = [
    '什么是书法艺术？',
    '茶文化有哪些特点？',
    '中国功夫的起源？',
    '中医的基本理论？'
  ]

  const defaultTheme = {
    bg: 'bg-white',
    text: 'text-slate-800',
    accent: 'text-purple-600',
    cardBg: 'bg-white/90',
    cardBorder: 'border-purple-200'
  }

  const currentTheme = theme || defaultTheme

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg ${isOpen ? 'bg-slate-600' : 'bg-purple-600'} hover:opacity-90`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)]"
          >
            <Card className={`${currentTheme.cardBg} ${currentTheme.cardBorder} border-2 shadow-2xl`}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center gap-2 ${currentTheme.text}`}>
                  <Bot className="w-5 h-5" />
                  文化助手
                  <Badge variant="secondary" className="ml-auto text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-80 px-4" ref={scrollRef}>
                  {messages.length === 0 ? (
                    <div className="py-8 text-center">
                      <Bot className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent} opacity-50`} />
                      <p className={`${currentTheme.text} opacity-70 mb-4`}>
                        你好！我是文化助手，有什么可以帮你的吗？
                      </p>
                      <div className="space-y-2">
                        {quickQuestions.map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className={`w-full justify-start text-xs ${currentTheme.cardBorder}`}
                            onClick={() => {
                              setInput(question)
                              inputRef.current?.focus()
                            }}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 py-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.role === 'assistant' && (
                            <div className={`w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0`}>
                              <Bot className="w-4 h-4 text-purple-600" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                              message.role === 'user'
                                ? 'bg-purple-600 text-white'
                                : `${currentTheme.cardBg} border ${currentTheme.cardBorder} ${currentTheme.text}`
                            }`}
                          >
                            {message.content}
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-slate-600" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-2 justify-start"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className={`px-3 py-2 rounded-lg ${currentTheme.cardBg} border ${currentTheme.cardBorder}`}>
                            <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </ScrollArea>

                <div className="p-4 border-t border-purple-100">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="输入你的问题..."
                      disabled={isLoading}
                      className={`flex-1 ${currentTheme.cardBorder}`}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}