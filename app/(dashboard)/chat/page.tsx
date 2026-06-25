'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessageComponent from '@/components/chat/ChatMessage'
import { chatSessions, ChatSession, ChatMessage } from '@/lib/mock-data'
import { Send, Plus, MessageSquare, Sparkles, Search } from 'lucide-react'

const SUGGESTED = [
  'Produk terlaris minggu ini?',
  'Stok produk yang hampir habis',
  'Revenue forecast bulan depan',
  'Top VIP customers',
]

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(chatSessions)
  const [activeId, setActiveId] = useState(chatSessions[0].id)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeSession = sessions.find((s) => s.id === activeId)!

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSession.messages])

  function handleSend(text?: string) {
    const message = text || input.trim()
    if (!message) return

    const userMsg: ChatMessage = {
      id: `m${Date.now()}`,
      role: 'user',
      content: message,
    }
    const aiMsg: ChatMessage = {
      id: `m${Date.now() + 1}`,
      role: 'assistant',
      content: 'This is demo mode. To activate real AI, connect the Hans Jewelry ERP to a Claude API key. Currently showing mock data as an example of the assistant capabilities.',
    }

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeId
          ? { ...s, messages: [...s.messages, userMsg, aiMsg] }
          : s
      )
    )
    setInput('')
  }

  function handleNewChat() {
    const newSession: ChatSession = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveId(newSession.id)
  }

  return (
    <div
      className="flex overflow-hidden rounded-xl border bg-card -mt-3 sm:-mt-4 md:-mt-6 -mx-3 sm:-mx-4 md:-mx-6"
      style={{ height: 'calc(100svh - 4rem)' }}
    >
      {/* Sidebar */}
      <div className="w-60 border-r flex flex-col bg-sidebar hidden sm:flex">
        {/* Header */}
        <div className="p-3 border-b space-y-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <Plus size={13} strokeWidth={2.5} />
            New Chat
          </button>
        </div>

        {/* Sessions */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          <p className="px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Recent</p>
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveId(session.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors group ${
                session.id === activeId
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare size={11} strokeWidth={1.75} className="mt-0.5 shrink-0 opacity-70" />
                <div className="min-w-0">
                  <p className="font-medium leading-tight truncate">{session.title}</p>
                  <p className="text-[10px] mt-0.5 opacity-60">{session.messages.length} messages · {session.createdAt}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* AI badge */}
        <div className="p-3 border-t">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-muted-foreground font-medium">AI Assistant · Online</span>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background/50">
        {/* Chat header */}
        <div className="px-6 py-3 border-b flex items-center gap-3 bg-card/50 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Sparkles size={14} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{activeSession.title}</p>
            <p className="text-[11px] text-muted-foreground">Hans Jewelry AI · Powered by Claude</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {activeSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
                <Sparkles size={24} strokeWidth={1.75} className="text-white" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Ask anything about your business</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
                Analyze sales, inventory, customers, revenue trends, and more with AI-powered insights.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-sm">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-3 py-2.5 text-xs text-left border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-indigo-200 transition-all leading-snug"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {activeSession.messages.map((message) => (
                <ChatMessageComponent key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Suggested prompts */}
        {activeSession.messages.length > 0 && (
          <div className="px-4 sm:px-6 py-2 border-t flex gap-2 overflow-x-auto scrollbar-none">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="shrink-0 px-3 py-1.5 text-[11px] font-medium border rounded-full text-muted-foreground hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 transition-all whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 border-t bg-card/30">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your business data..."
                className="w-full px-4 py-3 text-sm border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 transition-all"
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-indigo-500/30"
            >
              <Send size={15} strokeWidth={2} />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-1.5 text-center">AI may make mistakes. Always verify critical business decisions.</p>
        </div>
      </div>
    </div>
  )
}
