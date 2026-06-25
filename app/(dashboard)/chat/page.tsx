'use client'

import { useState } from 'react'
import TopBar from '@/components/layout/TopBar'
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
    <div className="h-[calc(100vh-0px)] flex flex-col">
      <TopBar title="AI Assistant" />

      <div className="flex flex-1 overflow-hidden">
        {/* Chat History Sidebar */}
        <div className="w-64 border-r border-[#E5E5E5] flex flex-col bg-[#FAFAFA]">
          <div className="p-3 border-b border-[#E5E5E5]">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-[#0A0A0A] border border-[#E5E5E5] rounded-[2px] bg-white hover:bg-[#F4F4F5] transition-colors"
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
                className={`w-full text-left px-3 py-2.5 rounded-[2px] text-[12px] transition-colors ${
                  session.id === activeId
                    ? 'bg-[#0A0A0A] text-white'
                    : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F0F0F0]'
                }`}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare size={12} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium leading-tight">{session.title}</p>
                    <p className={`text-[10px] mt-0.5 ${session.id === activeId ? 'text-white/60' : 'text-[#A3A3A3]'}`}>
                      {session.messages.length} pesan · {session.createdAt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {activeSession.messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-[2px] bg-[#F4F4F5] border border-[#E5E5E5] flex items-center justify-center mb-4">
                  <MessageSquare size={20} strokeWidth={1.5} className="text-[#737373]" />
                </div>
                <h3 className="text-[14px] font-medium text-[#0A0A0A]">Tanya apa saja tentang bisnis Anda</h3>
                <p className="text-[12px] text-[#737373] mt-1.5 max-w-sm">
                  AI Assistant dapat membantu Anda menganalisis data penjualan, stok, pelanggan, dan lebih banyak lagi.
                </p>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 text-[12px] border border-[#E5E5E5] rounded-[2px] text-[#737373] hover:text-[#0A0A0A] hover:border-[#C0C0C0] hover:bg-[#FAFAFA] transition-colors"
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
            <div className="px-6 py-2 border-t border-[#F0F0F0] flex gap-2 overflow-x-auto">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="shrink-0 px-2.5 py-1 text-[11px] border border-[#E5E5E5] rounded-[2px] text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-6 py-4 border-t border-[#E5E5E5]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya tentang data bisnis Anda..."
                className="flex-1 px-4 py-2.5 text-[13px] border border-[#E5E5E5] rounded-[2px] bg-[#FAFAFA] text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="px-4 py-2.5 bg-[#0A0A0A] text-white rounded-[2px] hover:bg-[#262626] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={14} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
