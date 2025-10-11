import React, { useState, useEffect, useContext, useRef } from 'react'
import { getGlobalMessages, postGlobalMessage } from '../../../utils/api.js'
import { AuthContext } from '../../../context/AuthContext.jsx'
import { v4 as uuidv4 } from 'uuid'

export default function GlobalChatSection() {
  const { userData } = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)
  const endRef = useRef(null)
  const POLL_INTERVAL = 5000
  const CHAR_LIMIT = 1000

  const myId = userData?._id ?? userData?.id ?? userData?.email

  // load + poll
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const msgs = await getGlobalMessages()
        if (!mounted) return
        setMessages(Array.isArray(msgs) ? msgs : (msgs.messages ?? []))
      } catch {
        setError('Unable to load messages')
      }
    }
    load()
    const t = setInterval(load, POLL_INTERVAL)
    return () => { mounted = false; clearInterval(t) }
  }, [])

  // scroll to bottom when new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const sendMessage = async (e) => {
    e?.preventDefault()
    if (!text.trim() || text.length > CHAR_LIMIT) return

    const tempId = uuidv4()
    const now = new Date().toISOString()
    const newMsg = {
      id: tempId,
      _id: tempId,
      text: text.trim(),
      createdAt: now,
      user: {
        _id: myId,
        username: userData?.username ?? 'You',
        profileimgurl: userData?.profileimgurl ?? null
      }
    }

    // optimistic add
    setMessages(prev => [...prev, newMsg])
    setText('')
    setSending(true)
    setError(null)

    try {
      const res = await postGlobalMessage({ text: newMsg.text })
      if (res?.message) {
        setMessages(prev => prev.map(m => (m._id === tempId ? res.message : m)))
      } else if (res?.id || res?._id) {
        setMessages(prev => prev.map(m => (m._id === tempId ? { ...m, _id: res._id ?? res.id } : m)))
      }
    } catch {
      setMessages(prev => prev.filter(m => m._id !== tempId))
      setError('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const isMine = (msg) => {
    const uid = msg?.user?._id ?? msg?.user?.id ?? msg?.user?.email
    return uid && myId && uid.toString() === myId.toString()
  }

  // Sort messages chronologically
  const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return (
    <div
      className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden relative"
      style={{ height: 'calc(100vh - 115px)' }}
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />
        <div className="px-4 py-3 backdrop-blur-sm bg-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src={userData?.profileimgurl || '/icons/pucc.png'} alt="me" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Global Chat</div>
              <div className="text-xs text-gray-500">A place for everyone — be respectful</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">{messages.length} messages</div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-scroll flex flex-col justify-end bg-[linear-gradient(180deg,#f8fbff,white)]"
        style={{ minHeight: 0 }}
        aria-live="polite"
      >
        <div className="flex flex-col gap-4 px-4 py-4">
          {sortedMessages.map((m) => {
            const mine = isMine(m)
            const name = m?.user?.username || 'Unknown'
            const avatar = m?.user?.profileimgurl || '/icons/pucc.png'
            return (
              <div key={m._id || m.id || Math.random()} className={`flex items-start gap-3 ${mine ? 'justify-end' : 'justify-start'}`}>
                {!mine && (
                  <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover shadow-sm" />
                )}
                <div className={`max-w-[80%] ${mine ? 'text-right' : 'text-left'}`}>
                  <div className="text-xs text-gray-500 mb-1 flex items-center justify-between gap-2">
                    <span className="font-medium text-gray-700">{name}</span>
                    <time className="text-[11px] text-gray-400">
                      {new Date(m.createdAt || Date.now()).toLocaleTimeString()}
                    </time>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-xl break-words ${
                      mine
                        ? 'bg-[#0067b6] text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
                {mine && (
                  <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover shadow-sm" />
                )}
              </div>
            )
          })}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="px-4 py-3 border-t bg-white flex items-end gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, CHAR_LIMIT))}
          placeholder="Write a message..."
          maxLength={CHAR_LIMIT}
          className="flex-1 resize-none h-16 md:h-20 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00aae4]"
          aria-label="Message"
        />
        <div className="flex flex-col items-end gap-2">
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="px-4 py-2 bg-[#0067b6] text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
          <div className="text-xs text-gray-400">{text.length}/{CHAR_LIMIT}</div>
        </div>
      </form>

      {error && (
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded shadow">
          {error}
        </div>
      )}
    </div>
  )
}