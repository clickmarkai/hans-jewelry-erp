'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessageComponent from '@/components/chat/ChatMessage'
import { chatSessions, ChatSession, ChatMessage } from '@/lib/mock-data'
import { Send, Plus, MessageSquare, Sparkles } from 'lucide-react'

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
  const messageIdRef = useRef(0)

  const activeSession = sessions.find((s) => s.id === activeId)!

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSession.messages])

  function handleSend(text?: string) {
    const message = text || input.trim()
    if (!message) return
    messageIdRef.current += 1
    const id = messageIdRef.current

    const userMsg: ChatMessage = {
      id: `m-${id}-user`,
      role: 'user',
      content: message,
    }
    const aiMsg: ChatMessage = {
      id: `m-${id}-assistant`,
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
    messageIdRef.current += 1
    const newSession: ChatSession = {
      id: `chat-${messageIdRef.current}`,
      title: 'New Chat',
      messages: [],
      createdAt: 'Today',
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveId(newSession.id)
  }

  return (
    <div
      className="-mx-3 -mt-3 flex overflow-hidden rounded-lg border bg-card sm:-mx-4 sm:-mt-4 md:-mx-5 md:-mt-5"
      style={{ height: 'calc(100svh - 4rem)' }}
    >
      {/* Sidebar */}
      <div className="w-60 border-r flex flex-col bg-sidebar hidden sm:flex">
        {/* Header */}
        <div className="p-3 border-b space-y-2">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
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
                  ? 'bg-primary/10 text-primary'
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
        <div className="flex items-center gap-3 border-b bg-card/60 px-6 py-3 backdrop-blur-sm">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary">
            <Sparkles size={14} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <p className="font-serif text-xl font-semibold leading-tight text-foreground">{activeSession.title}</p>
            <p className="text-[11px] text-muted-foreground">Hans Jewelry AI · Powered by Claude</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {activeSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/15">
                <Sparkles size={24} strokeWidth={1.75} className="text-white" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">Ask anything about your business</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
                Analyze sales, inventory, customers, revenue trends, and more with AI-powered insights.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-sm">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-md border px-3 py-2.5 text-left text-xs leading-snug text-muted-foreground transition-all hover:border-primary/30 hover:bg-accent hover:text-foreground"
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
                className="shrink-0 whitespace-nowrap rounded-md border px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:bg-accent hover:text-primary"
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
                className="w-full rounded-md border bg-card px-4 py-3 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="flex size-10 items-center justify-center rounded-md bg-primary text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
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
