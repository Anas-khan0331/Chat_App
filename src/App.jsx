import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import './App.css'

const initialContacts = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'See you tomorrow! 🎉',
    time: '2:30 PM',
    unread: 2,
    online: true,
    typing: false
  },
  {
    id: 2,
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Thanks for the help!',
    time: '1:15 PM',
    unread: 0,
    online: true,
    typing: false
  },
  {
    id: 3,
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'The project looks great',
    time: '11:45 AM',
    unread: 0,
    online: false,
    typing: false
  },
  {
    id: 4,
    name: 'Alex Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    lastMessage: 'Can we reschedule?',
    time: 'Yesterday',
    unread: 1,
    online: false,
    typing: false
  },
  {
    id: 5,
    name: 'Lisa Garcia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    lastMessage: 'Loved the presentation!',
    time: 'Yesterday',
    unread: 0,
    online: true,
    typing: false
  }
]

const initialMessages = {
  1: [
    { id: 1, text: 'Hey! How are you doing?', sender: 'them', time: '2:25 PM', status: 'read', reactions: [] },
    { id: 2, text: "I'm great! Just finished the project documentation 📄", sender: 'me', time: '2:27 PM', status: 'read', reactions: ['❤️'] },
    { id: 3, text: 'Amazing work! Can we go over it tomorrow?', sender: 'them', time: '2:28 PM', status: 'read', reactions: [] },
    { id: 4, text: 'Sure! How about 10 AM?', sender: 'me', time: '2:29 PM', status: 'read', reactions: [] },
    { id: 5, text: 'See you tomorrow! 🎉', sender: 'them', time: '2:30 PM', status: 'read', reactions: ['👍'] }
  ],
  2: [
    { id: 1, text: 'Hey, need help with the code review', sender: 'me', time: '1:10 PM', status: 'read', reactions: [] },
    { id: 2, text: 'Of course! What do you need?', sender: 'them', time: '1:12 PM', status: 'read', reactions: [] },
    { id: 3, text: 'Thanks for the help!', sender: 'me', time: '1:15 PM', status: 'delivered', reactions: [] }
  ],
  3: [
    { id: 1, text: 'Just uploaded the new designs', sender: 'them', time: '11:40 AM', status: 'read', reactions: ['🔥'] },
    { id: 2, text: 'The project looks great', sender: 'me', time: '11:45 AM', status: 'read', reactions: [] }
  ],
  4: [
    { id: 1, text: 'Our meeting is at 3 PM today', sender: 'them', time: 'Yesterday', status: 'read', reactions: [] },
    { id: 2, text: 'Can we reschedule?', sender: 'them', time: 'Yesterday', status: 'read', reactions: [] }
  ],
  5: [
    { id: 1, text: 'Presented the quarterly results today', sender: 'me', time: 'Yesterday', status: 'read', reactions: ['🎉', '👏'] },
    { id: 2, text: 'Loved the presentation!', sender: 'them', time: 'Yesterday', status: 'read', reactions: [] }
  ]
}

const autoReplies = [
  "That's awesome! 😊",
  "Let me think about it...",
  "Great point! 👍",
  "I'll get back to you shortly",
  "Sounds good to me!",
  "Thanks for letting me know!",
  "I appreciate your help! 🙏",
  "Let me check and get back to you",
  "Perfect! 🎉",
  "That works for me!"
]

function App() {
  const [contacts, setContacts] = useState(initialContacts)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)
  const audioRef = useRef(null)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Play notification sound
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  // Show notification popup
  const showNotification = (contactName, message) => {
    setNotification({ contactName, message, id: Date.now() })
    setTimeout(() => setNotification(null), 3000)
  }

  // Simulate receiving messages
  useEffect(() => {
    const interval = setInterval(() => {
      const onlineContacts = contacts.filter(c => c.online && c.id !== selectedContact?.id && Math.random() > 0.7)
      if (onlineContacts.length > 0) {
        const randomContact = onlineContacts[Math.floor(Math.random() * onlineContacts.length)]
        
        // Show typing indicator
        setContacts(prev => prev.map(c => 
          c.id === randomContact.id ? { ...c, typing: true } : c
        ))

        // Stop typing after 2 seconds and send message
        setTimeout(() => {
          const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
          const newMessage = {
            id: Date.now(),
            text: reply,
            sender: 'them',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'delivered',
            reactions: []
          }

          setMessages(prev => ({
            ...prev,
            [randomContact.id]: [...(prev[randomContact.id] || []), newMessage]
          }))

          setContacts(prev => prev.map(c => 
            c.id === randomContact.id 
              ? { ...c, typing: false, lastMessage: reply, time: newMessage.time, unread: c.unread + 1 }
              : c
          ))

          playNotificationSound()
          showNotification(randomContact.name, reply)
        }, 2000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [contacts, selectedContact])

  const handleSendMessage = (text, replyTo = null) => {
    if (!selectedContact) return

    const newMessage = {
      id: Date.now(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      reactions: [],
      replyTo
    }

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }))

    // Update last message in contacts
    setContacts(prev => prev.map(contact => 
      contact.id === selectedContact.id 
        ? { ...contact, lastMessage: text, time: newMessage.time }
        : contact
    ))

    // Simulate message delivery and read
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }))
    }, 1000)

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      }))
    }, 3000)
  }

  const handleSelectContact = (contact) => {
    setSelectedContact(contact)
    // Clear unread count
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    ))
  }

  const handleReactToMessage = (messageId, emoji) => {
    if (!selectedContact) return
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: prev[selectedContact.id].map(msg => 
        msg.id === messageId ? { ...msg, reactions: [...msg.reactions, emoji] } : msg
      )
    }))
  }

  const handleDeleteMessage = (messageId) => {
    if (!selectedContact) return
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: prev[selectedContact.id].filter(msg => msg.id !== messageId)
    }))
  }

  return (
    <div className="app">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVk7bqLS4qtqIhNessTX2qxiIhA5m8Xj0LJvKRE1lMne4bN0KRYxkcbc5LiBKxgxlMfd6cWWKxgvj8Xe7s6vfy0YN5LI4/O/ozYbN5TJ4fO/qkgaOJrI4/O/rEsWOJ3I4/O/sE8YOp7I4/O/slMaPJ/I4/O/tFYdPqDI4/O/t1keP6HI4/O/uVwfQKLI4/O/u2IfxaLI4/O/vGQgRqPI4/O/vWciU6PI4/O/v20kVqPI4/O/wIEkWqTI4/O/wZUlaqXI4/O/wqkmeqjI4/O/xOkq+qnI4/O/xikreqpI4/O/yGlsOusI4/O/y6ou+ysI4/O/z2yvu2tI4/O/0Kywu6uI4/O/1K6yu6tI4/O/2K+xvKqI4/O/3LCxvKqI4/O/4LOyvKiI4/O/5LSzvKeI4/O/6ba0vKaI4/O/7rm1vKWI4/O/8L63vKSI4/O/9L+4vKKI4/O/+MC5vKKI4/O//MO6vKGI4/O//8W8u6CH4/O//8e+u6CH4/O//8q/u6CH4/O//8yiu6CG4/O//82ju6CE4/O//8+lu6CE4/O//9GnvKCD4/O//9OpvKCD4/O//9WsvKCC4/O//9esu6CB4/O//9ivvKCB4/O//9mxu6CA4/O//9uwu6B/4/O//92yvaB+4/O//96zvJ994/O//9+0vaB74/O" />
      
      <Sidebar 
        contacts={filteredContacts}
        selectedContact={selectedContact}
        onSelectContact={handleSelectContact}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ChatArea 
        contact={selectedContact}
        messages={selectedContact ? messages[selectedContact.id] || [] : []}
        onSendMessage={handleSendMessage}
        onReactToMessage={handleReactToMessage}
        onDeleteMessage={handleDeleteMessage}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="notification-toast" key={notification.id}>
          <div className="toast-content">
            <strong>{notification.contactName}</strong>
            <p>{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
