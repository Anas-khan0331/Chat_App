import { useState, useRef, useEffect } from 'react'
import './ChatArea.css'

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉', '🔥', '👏', '💯']

function ChatArea({ contact, messages, onSendMessage, onReactToMessage, onDeleteMessage }) {
  const [inputText, setInputText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showMessageMenu, setShowMessageMenu] = useState(null)
  const [replyTo, setReplyTo] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (replyTo && inputRef.current) {
      inputRef.current.focus()
    }
  }, [replyTo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim()) {
      onSendMessage(inputText.trim(), replyTo)
      setInputText('')
      setReplyTo(null)
      setShowEmojiPicker(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const addEmoji = (emoji) => {
    setInputText(prev => prev + emoji)
    inputRef.current?.focus()
  }

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text)
    setShowMessageMenu(null)
  }

  const handleReply = (message) => {
    setReplyTo(message)
    setShowMessageMenu(null)
    inputRef.current?.focus()
  }

  const cancelReply = () => {
    setReplyTo(null)
  }

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = []
    let lastDate = null

    messages.forEach(message => {
      const messageDate = message.time.split(' ')[0]
      if (messageDate !== lastDate) {
        groups.push({ type: 'date', label: messageDate === 'Yesterday' ? 'Yesterday' : 'Today', id: `date-${message.id}` })
        lastDate = messageDate
      }
      groups.push({ type: 'message', data: message })
    })

    return groups
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
      case 'delivered':
        return <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/><polyline points="20 12 9 23 4 18"/></svg>
      case 'read':
        return <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="#53bdeb" strokeWidth="2"><polyline points="20 6 9 17 4 12"/><polyline points="20 12 9 23 4 18"/></svg>
      default:
        return null
    }
  }

  const groupedMessages = groupMessagesByDate()

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
            <span className="user-status">
              {contact.typing ? (
                <span className="typing-status">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  typing...
                </span>
              ) : (
                contact.online ? 'Online' : 'Offline'
              )}
            </span>
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
          <button className="action-btn" title="Search messages">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages">
          {groupedMessages.map((item) => {
            if (item.type === 'date') {
              return (
                <div key={item.id} className="date-separator">
                  <span>{item.label}</span>
                </div>
              )
            }

            const message = item.data
            return (
              <div 
                key={message.id}
                className={`message ${message.sender === 'me' ? 'sent' : 'received'} ${message.status === 'read' ? 'read' : ''}`}
              >
                {message.sender === 'received' && (
                  <img src={contact.avatar} alt={contact.name} className="message-avatar" />
                )}
                <div className="message-content">
                  {message.replyTo && (
                    <div className="reply-preview">
                      <span className="reply-author">{message.sender === 'me' ? 'You' : contact.name}</span>
                      <span className="reply-text">{message.replyTo.text}</span>
                    </div>
                  )}
                  <div 
                    className="message-bubble"
                    onClick={() => setShowMessageMenu(showMessageMenu === message.id ? null : message.id)}
                  >
                    <p className="message-text">{message.text}</p>
                    
                    {/* Message Menu */}
                    {showMessageMenu === message.id && (
                      <div className="message-menu" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleReply(message)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 17 4 12 9 7"/>
                            <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                          </svg>
                          Reply
                        </button>
                        <button onClick={() => handleCopyMessage(message.text)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                          Copy
                        </button>
                        {message.sender === 'me' && (
                          <button onClick={() => { onDeleteMessage(message.id); setShowMessageMenu(null); }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="message-reactions">
                      {message.reactions.map((emoji, idx) => (
                        <span key={idx} className="reaction">{emoji}</span>
                      ))}
                    </div>
                  )}

                  {/* Reaction picker */}
                  {showMessageMenu === message.id && (
                    <div className="reaction-picker">
                      {EMOJIS.map((emoji) => (
                        <button 
                          key={emoji} 
                          onClick={() => { onReactToMessage(message.id, emoji); setShowMessageMenu(null); }}
                          className="emoji-btn"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="message-footer">
                    <span className="message-time">{message.time}</span>
                    {message.sender === 'me' && (
                      <span className="message-status">{getStatusIcon(message.status)}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply preview bar */}
      {replyTo && (
        <div className="reply-bar">
          <div className="reply-info">
            <span className="reply-label">Reply to {replyTo.sender === 'me' ? 'yourself' : contact.name}</span>
            <span className="reply-text-preview">{replyTo.text.length > 50 ? replyTo.text.substring(0, 50) + '...' : replyTo.text}</span>
          </div>
          <button className="cancel-reply" onClick={cancelReply}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      <form className="message-input-container" onSubmit={handleSubmit}>
        <button type="button" className="attach-btn" title="Attach file">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
        
        <div className="emoji-container">
          <button type="button" className="emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Add emoji">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </button>
          
          {showEmojiPicker && (
            <div className="emoji-picker">
              <div className="emoji-grid">
                {EMOJIS.map((emoji) => (
                  <button 
                    key={emoji} 
                    type="button"
                    className="emoji-option"
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <button 
          type="button" 
          className={`mic-btn ${isRecording ? 'recording' : ''}`}
          onClick={() => setIsRecording(!isRecording)}
          title={isRecording ? 'Stop recording' : 'Voice message'}
        >
          {isRecording ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="6" width="12" height="12"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          )}
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
