import { useState, useRef, useEffect } from 'react'
import './ChatArea.css'

function ChatArea({ contact, messages, onSendMessage }) {
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim()) {
      onSendMessage(inputText.trim())
      setInputText('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const formatTime = (time) => {
    return time
  }

  if (!contact) {
    return (
      <div className="chat-area empty">
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M8 10h.01M12 10h.01M16 10h.01"/>
            </svg>
          </div>
          <h2>Welcome to Chat App</h2>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-user">
          <div className="avatar-container">
            <img src={contact.avatar} alt={contact.name} className="avatar" />
            {contact.online && <span className="online-indicator"></span>}
          </div>
          <div className="user-details">
            <span className="user-name">{contact.name}</span>
            <span className="user-status">{contact.online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn" title="Voice call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>
          <button className="action-btn" title="Video call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </button>
          <button className="action-btn" title="More options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div 
              key={message.id}
              className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
            >
              {message.sender === 'received' && (
                <img src={contact.avatar} alt={contact.name} className="message-avatar" />
              )}
              <div className="message-content">
                <div className="message-bubble">
                  <p className="message-text">{message.text}</p>
                </div>
                <span className="message-time">{formatTime(message.time)}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form className="message-input-container" onSubmit={handleSubmit}>
        <button type="button" className="attach-btn" title="Attach file">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
        <button type="button" className="emoji-btn" title="Add emoji">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </button>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="mic-btn" title="Voice message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <button type="submit" className="send-btn" disabled={!inputText.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default ChatArea
