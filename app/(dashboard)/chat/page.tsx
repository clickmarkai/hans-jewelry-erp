'use client'

import { useState } from 'react'
import ChatMessageComponent from '@/components/chat/ChatMessage'
import { chatSessions, ChatSession, ChatMessage } from '@/lib/mock-data'
import { Send, Plus, MessageSquare } from 'lucide-react'

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

  const activeSession = sessions.find((s) => s.id === activeId)!

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
      content: 'Ini adalah demo mode. Untuk mengaktifkan AI nyata, hubungkan Hans Jewelry ERP dengan API key Claude. Saat ini, data mock ditampilkan sebagai contoh.',
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
      title: 'Chat Baru',
      messages: [],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveId(newSession.id)
  }

  return (
    <div className="flex overflow-hidden rounded-md border bg-card -mt-4 md:-mt-6 -mx-4 md:-mx-6" style={{ height: 'calc(100svh - 4rem)' }}>
      {/* Chat History Sidebar */}
      <div className="w-64 border-r flex flex-col bg-muted/20">
        <div className="p-3 border-b">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-foreground rounded-md border bg-card hover:bg-muted/50 transition-colors"
          >
            <Plus size={13} strokeWidth={2} />
            Chat Baru
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveId(session.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-[12px] transition-colors ${
                session.id === activeId
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare size={12} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium leading-tight">{session.title}</p>
                  <p className={`text-[10px] mt-0.5 ${session.id === activeId ? 'opacity-60' : 'text-muted-foreground'}`}>
                    {session.messages.length} pesan · {session.createdAt}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {activeSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center mb-4">
                <MessageSquare size={20} strokeWidth={1.5} className="text-muted-foreground" />
              </div>
              <h3 className="text-[14px] font-medium text-foreground">Tanya apa saja tentang bisnis Anda</h3>
              <p className="text-[12px] text-muted-foreground mt-1.5 max-w-sm">
                AI Assistant dapat membantu Anda menganalisis data penjualan, stok, pelanggan, dan lebih banyak lagi.
              </p>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-3 py-1.5 text-[12px] border rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
            </>
          )}
        </div>

        {/* Suggested prompts bar */}
        {activeSession.messages.length > 0 && (
          <div className="px-6 py-2 border-t flex gap-2 overflow-x-auto">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="shrink-0 px-2.5 py-1 text-[11px] border rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya tentang data bisnis Anda..."
              className="flex-1 px-4 py-2.5 text-[13px] border rounded-md bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              <Send size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
