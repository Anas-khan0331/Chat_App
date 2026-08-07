import { useState } from 'react'
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
    online: true
  },
  {
    id: 2,
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Thanks for the help!',
    time: '1:15 PM',
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'The project looks great',
    time: '11:45 AM',
    unread: 0,
    online: false
  },
  {
    id: 4,
    name: 'Alex Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    lastMessage: 'Can we reschedule?',
    time: 'Yesterday',
    unread: 1,
    online: false
  },
  {
    id: 5,
    name: 'Lisa Garcia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    lastMessage: 'Loved the presentation!',
    time: 'Yesterday',
    unread: 0,
    online: true
  }
]

const initialMessages = {
  1: [
    { id: 1, text: 'Hey! How are you doing?', sender: 'them', time: '2:25 PM' },
    { id: 2, text: "I'm great! Just finished the project documentation 📄", sender: 'me', time: '2:27 PM' },
    { id: 3, text: 'Amazing work! Can we go over it tomorrow?', sender: 'them', time: '2:28 PM' },
    { id: 4, text: 'Sure! How about 10 AM?', sender: 'me', time: '2:29 PM' },
    { id: 5, text: 'See you tomorrow! 🎉', sender: 'them', time: '2:30 PM' }
  ],
  2: [
    { id: 1, text: 'Hey, need help with the code review', sender: 'me', time: '1:10 PM' },
    { id: 2, text: 'Of course! What do you need?', sender: 'them', time: '1:12 PM' },
    { id: 3, text: 'Thanks for the help!', sender: 'me', time: '1:15 PM' }
  ],
  3: [
    { id: 1, text: 'Just uploaded the new designs', sender: 'them', time: '11:40 AM' },
    { id: 2, text: 'The project looks great', sender: 'me', time: '11:45 AM' }
  ],
  4: [
    { id: 1, text: 'Our meeting is at 3 PM today', sender: 'them', time: 'Yesterday' },
    { id: 2, text: 'Can we reschedule?', sender: 'them', time: 'Yesterday' }
  ],
  5: [
    { id: 1, text: 'Presented the quarterly results today', sender: 'me', time: 'Yesterday' },
    { id: 2, text: 'Loved the presentation!', sender: 'them', time: 'Yesterday' }
  ]
}

function App() {
  const [contacts, setContacts] = useState(initialContacts)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = (text) => {
    if (!selectedContact) return

    const newMessage = {
      id: Date.now(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
  }

  const handleSelectContact = (contact) => {
    setSelectedContact(contact)
    // Clear unread count
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    ))
  }

  return (
    <div className="app">
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
      />
    </div>
  )
}

export default App
