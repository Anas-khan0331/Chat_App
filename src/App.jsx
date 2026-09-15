import { useState } from 'react'
import ProgressBar from './components/ProgressBar.jsx'
import Header from './components/Header.jsx'
import CurtainHero from './components/CurtainHero.jsx'
import Celebration from './components/Celebration.jsx'
import DressCode from './components/DressCode.jsx'
import Invitation from './components/Invitation.jsx'
import Venue from './components/Venue.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [opened, setOpened] = useState(false)

  return (
    <div className="bg-ink text-ivory">
      <ProgressBar />
      <Header visible={opened} />
      <CurtainHero onOpened={() => setOpened(true)} />
      <Celebration />
      <DressCode />
      <Invitation />
      <Venue />
      <Footer />
    </div>
  )
}
