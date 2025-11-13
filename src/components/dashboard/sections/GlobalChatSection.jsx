import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import { getGlobalMessages, postGlobalMessage, deleteGlobalMessage, getUsers } from '../../../utils/api.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';
import { v4 as uuidv4 } from 'uuid';

export default function GlobalChatSection() {
  const { userData } = useContext(AuthContext);
  const { theme } = useTheme();
  const isExecutive = ['executive', 'admin'].includes((userData?.role || '').toLowerCase());
  const [messages, setMessages] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const containerRef = useRef(null);
  const isAtBottomRef = useRef(true); // Use a ref to track scroll position without re-renders

  const POLL_INTERVAL = 5000;
  const CHAR_LIMIT = 1000;
  const myId = userData?._id ?? userData?.id ?? userData?.email;

  // Fetch initial data and poll for new messages
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [msgs, users] = await Promise.all([getGlobalMessages(), getUsers()]);
        if (!mounted) return;

        setMessages(Array.isArray(msgs) ? msgs : (msgs.messages ?? []));

        const usersMap = users.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsersData(usersMap);

      } catch {
        setError('Unable to load messages or users');
        setTimeout(() => setError(null), 3000);
      }
    };
    load();
    const t = setInterval(load, POLL_INTERVAL);
    return () => { mounted = false; clearInterval(t) };
  }, []);

  // Set up scroll listener to update the isAtBottomRef
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Check if user is near the bottom
      isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 150;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Use useLayoutEffect to handle scrolling after DOM updates
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container && isAtBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!text.trim() || text.length > CHAR_LIMIT) return;

    const tempId = uuidv4();
    const now = new Date().toISOString();
    const newMsg = {
      id: tempId,
      _id: tempId,
      text: text.trim(),
      createdAt: now,
      user: {
        _id: myId,
        username: userData?.username ?? 'You'
      }
    };
    
    isAtBottomRef.current = true; // Ensure we scroll down when sending a new message
    setMessages(prev => [...prev, newMsg]);
    setText('');
    setSending(true);
    setError(null);

    try {
      const res = await postGlobalMessage({ text: newMsg.text });
      setMessages(prev => prev.map(m => (m._id === tempId ? (res.message || { ...m, _id: res._id ?? res.id }) : m)));
    } catch {
      setMessages(prev => prev.filter(m => m._id !== tempId));
      setError('Failed to send message');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = async (msgId) => {
    try {
      await deleteGlobalMessage(msgId);
      setMessages(prev => prev.filter(m => m._id !== msgId));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Failed to delete message:", err);
      setError('Failed to delete message');
      setTimeout(() => setError(null), 3000);
    }
  };

  const isMine = (msg) => {
    const uid = msg?.user?._id ?? msg?.user?.id ?? msg?.user?.email;
    return uid && myId && uid.toString() === myId.toString();
  };

  const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const groupedByDate = sortedMessages.reduce((acc, msg) => {
    const date = new Date(msg.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div
      className={`flex flex-col rounded-lg shadow-lg overflow-hidden relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
      style={{ height: 'calc(100vh - 130px)' }}
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />
        <div className={`px-4 py-3 backdrop-blur-sm flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800/20' : 'bg-gray-100/20'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <img src={userData?.profileimgurl || '/icons/pucc.png'} alt="me" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Global Chat</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>A place for everyone — be respectful</div>
            </div>
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{messages.length} messages</div>
        </div>
      </div>

      {/* Message Container */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={{ minHeight: 0 }}
      >
        <div className="flex flex-col gap-6 px-4 py-4 mt-auto">
          {Object.keys(groupedByDate).map(date => (
            <div key={date}>
              <div className="flex justify-center mb-2">
                <span className={`text-xs px-3 py-1 rounded-full shadow-sm ${theme === 'dark' ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-200'}`}>{date}</span>
              </div>
              <div className="flex flex-col gap-4">
                {groupedByDate[date].map((m) => {
                  const mine = isMine(m);
                  const name = m?.user?.username || 'Unknown';
                  const avatar = usersData[m?.user?._id]?.profileimgurl || '/icons/pucc.png';
                  return (
                    <div key={m._id || m.id || Math.random()} className={`group flex items-end gap-3 ${mine ? 'justify-end' : 'justify-start'} relative`}>
                      {!mine && <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover shadow-sm" />}
                      <div className={`flex flex-col max-w-[80%] ${mine ? 'items-end' : 'items-start'}`}>
                        <div className={`inline-block px-4 py-2 rounded-xl break-words ${mine ? 'bg-[#0067b6] text-white rounded-br-none' : `${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'} rounded-bl-none`}`} title={name}>
                          {m.text}
                        </div>
                        <div className={`text-xs mt-1 w-full flex ${mine ? 'justify-end' : 'justify-start gap-3'}`}>
                          <time className={`text-[11px] ${mine ? 'order-2' : ''} ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                          <span className={`font-medium ${mine ? 'order-1 mr-2' : ''} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{name}</span>
                        </div>
                      </div>
                      {mine && <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover shadow-sm" />}
                      {(isExecutive || mine) && (
                        <button onClick={() => setConfirmDelete(m)} className={`p-1 bg-red-100 text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200 ${mine ? 'order-first mr-2' : 'ml-2'}`} title="Delete message">
                          <i className="bi bi-trash text-base"></i>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input Form */}
      <form onSubmit={sendMessage} className={`px-4 py-3 border-t flex items-end gap-3 ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, CHAR_LIMIT))}
          placeholder="Write a message..."
          maxLength={CHAR_LIMIT}
          className={`flex-1 resize-none h-16 md:h-20 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#00aae4] ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-200 bg-gray-50 text-gray-900'}`}
        />
        <div className="flex flex-col items-end gap-2">
          <button type="submit" disabled={!text.trim() || sending} className="px-4 py-2 bg-[#0067b6] text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed">
            {sending ? 'Sending...' : 'Send'}
          </button>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{text.length}/{CHAR_LIMIT}</div>
        </div>
      </form>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg shadow-lg p-6 w-[90%] max-w-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Are you sure you want to delete this message?</div>
            <div className="flex justify-end gap-3">
              <button className={`px-3 py-1 text-sm rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-50 hover:bg-gray-200 text-gray-800'}`} onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600" onClick={() => deleteMessage(confirmDelete._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded shadow">
          {error}
        </div>
      )}
    </div>
  );
}
