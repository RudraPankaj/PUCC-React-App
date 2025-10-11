import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { getGlobalMessages, postGlobalMessage } from '../../../utils/api.js';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;
const WS_PROTOCOL = import.meta.env.VITE_WS_PROTOCOL || 'ws';
const MAX_MESSAGES = 50;
const RECONNECT_INTERVAL = 5000;

function GlobalChatSection() {
    const { userData } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const ws = useRef(null);
    const messagesEndRef = useRef(null);
    const [isWsConnected, setIsWsConnected] = useState(false);
    const reconnectTimeout = useRef(null);

    // Fetch initial messages
    useEffect(() => {
        getGlobalMessages()
            .then((msgs) => setMessages((Array.isArray(msgs) ? msgs : msgs || []).slice(-MAX_MESSAGES)))
            .catch(() => toast.error('Failed to load messages', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 }));
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Build WS URL at connect time and append token if available
    const buildWsUrl = () => {
        const host = (WS_BASE_URL || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
        const base = `${WS_PROTOCOL}://${host}/ws/global-chat`;
        const token = localStorage.getItem('token');
        return token ? `${base}?token=${encodeURIComponent(token)}` : base;
    };

    // WebSocket connection
    const connectWebSocket = () => {
        if (ws.current) {
            try { ws.current.close(); } catch {
                // ignore
            }
            ws.current = null;
        }

        const url = buildWsUrl();
        try {
            ws.current = new WebSocket(url);
        } catch {
            // fallback: schedule reconnect
            setIsWsConnected(false);
            reconnectTimeout.current = setTimeout(connectWebSocket, RECONNECT_INTERVAL);
            return;
        }

        ws.current.onopen = () => {
            setIsWsConnected(true);
            toast.success('Connected to global chat', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 });
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
                reconnectTimeout.current = null;
            }
        };
        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'message' && data.message) {
                    setMessages((prev) => {
                        const updated = [...prev, data.message];
                        return updated.slice(-MAX_MESSAGES);
                    });
                }
            } catch {
                // ignore malformed messages
            }
        };
        ws.current.onclose = () => {
            setIsWsConnected(false);
            toast.error('Disconnected from global chat', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 });
            reconnectTimeout.current = setTimeout(connectWebSocket, RECONNECT_INTERVAL);
        };
        ws.current.onerror = () => {
            // network or protocol error - close to trigger reconnect logic
            try { ws.current.close(); } catch {
                // ignore
            }
        };
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            if (ws.current) ws.current.close();
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
        };
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const message = {
            id: uuidv4(),
            text: newMessage,
            user: userData,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, message].slice(-MAX_MESSAGES));
        setNewMessage('');
        try {
            await postGlobalMessage(message);
        } catch {
            toast.error('Error sending message', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 });
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-indigo-700 to-indigo-500 text-white">
                <i className="bi bi-chat-dots text-2xl mr-2" />
                <span className="font-semibold text-lg">Global Chat</span>
                <span className="ml-auto flex items-center gap-2">
                    {isWsConnected ? (
                        <span className="flex items-center gap-1 text-green-300">
                            <i className="bi bi-circle-fill text-xs" /> Online
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-yellow-300 animate-pulse">
                            <i className="bi bi-circle-half text-xs" /> Reconnecting...
                        </span>
                    )}
                </span>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-transparent">
                {messages.map((msg) => {
                    const isOwn = msg.user?.id === userData?.id;
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-xs w-fit px-4 py-2 rounded-lg shadow
                                ${isOwn
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-800 border border-gray-200'
                                } flex flex-col`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <i className={`bi bi-person-circle ${isOwn ? 'text-white' : 'text-indigo-500'} text-lg`} />
                                    <span className={`font-semibold text-sm ${isOwn ? 'text-white' : 'text-indigo-700'}`}>
                                        {msg.user?.name || 'Unknown'}
                                    </span>
                                </div>
                                <span className="text-base break-words">{msg.text}</span>
                                <span className="text-xs text-gray-400 mt-1 self-end">
                                    {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="flex items-center px-4 py-3 bg-white border-t border-gray-200"
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300 text-gray-800"
                    disabled={!isWsConnected}
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1 disabled:opacity-50"
                    disabled={!isWsConnected || !newMessage.trim()}
                >
                    <i className="bi bi-send" />
                    Send
                </button>
            </form>
        </div>
    );
}

export default GlobalChatSection;