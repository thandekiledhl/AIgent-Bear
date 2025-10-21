import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [conversation]);

  const send = async () => {
    if (!message) return;

    // Add user message
    setConversation(c => [...c, { sender: 'user', text: message }]);
    const payload = { query: message }; // Updated to match FastAPI
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Add AI response
      setConversation(c => [
        ...c,
        {
          sender: 'ai',
          text: data.response || 'No response',
          flagged: false,
          reason: null,
        },
      ]);
    } catch (e) {
      setConversation(c => [
        ...c,
        { sender: 'ai', text: 'Error: backend unreachable', flagged: true, reason: 'backend' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#121212',
      padding: '0 10%'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        maxWidth: '800px',
        height: '90vh',
        fontFamily: 'sans-serif',
        color: '#fff',
        backgroundColor: '#1e1e1e',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: '1px solid #333'
        }}>
          <div style={{
            width: 70, height: 70,
            background: '#2a2a2a',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            fontSize: 32,
            marginBottom: 12
          }}>🤖</div>
          <h2 style={{ margin: 0 }}>ZAUN</h2>
        </div>

        {/* Chat Area */}
        <div ref={ref} style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {conversation.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: m.sender === 'user' ? '#4f9aff' : '#333',
              padding: '10px 14px',
              borderRadius: 12,
              maxWidth: '70%',
              wordBreak: 'break-word',
              boxShadow: m.sender === 'user'
                ? '2px 2px 6px rgba(0,0,0,0.3)'
                : '-2px 2px 6px rgba(0,0,0,0.3)'
            }}>
              <div>{m.text}</div>
              {m.flagged && (
                <div style={{ color: '#ffb3b3', fontSize: 12, marginTop: 4 }}>
                  ⚠️ {m.reason}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{
              alignSelf: 'flex-start',
              backgroundColor: '#555',
              padding: '10px 14px',
              borderRadius: 12,
              maxWidth: '70%',
              fontStyle: 'italic'
            }}>
              Loading...
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #333',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); }}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 20,
              border: 'none',
              outline: 'none',
              fontSize: 14,
              backgroundColor: '#2a2a2a',
              color: '#fff'
            }}
          />
          <button
            onClick={send}
            style={{
              padding: '10px 16px',
              borderRadius: 20,
              border: 'none',
              backgroundColor: '#4f9aff',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
