import { useState } from 'react'
import './Sidebar.css'

function Sidebar({ contacts, selectedContact, onSelectContact, searchTerm, onSearchChange }) {
  const [activeTab, setActiveTab] = useState('chats')

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Messages</h1>
        <button className="new-chat-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      </div>

      <div className="search-container">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search conversations..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          Chats
        </button>
        <button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
      </div>

      <div className="contacts-list">
        {contacts.length === 0 ? (
          <div className="no-contacts">
            <p>No conversations found</p>
          </div>
        ) : (
          contacts.map(contact => (
            <div 
              key={contact.id}
              className={`contact-item ${selectedContact?.id === contact.id ? 'selected' : ''}`}
              onClick={() => onSelectContact(contact)}
            >
              <div className="avatar-container">
                <img src={contact.avatar} alt={contact.name} className="avatar" />
                {contact.online && <span className="online-indicator"></span>}
              </div>
              <div className="contact-info">
                <div className="contact-header">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <div className="contact-preview">
                  <p className="last-message">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="unread-badge">{contact.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
            alt="Your profile" 
            className="avatar" 
          />
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-status">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
