import ProgressBar from './components/ProgressBar.jsx'
import CurtainHero from './components/CurtainHero.jsx'
import Celebration from './components/Celebration.jsx'
import DressCode from './components/DressCode.jsx'
import Invitation from './components/Invitation.jsx'
import Venue from './components/Venue.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="bg-ink text-ivory overflow-x-hidden max-w-[100vw]">
      <ProgressBar />
      <CurtainHero />
      <Celebration />
      <DressCode />
      <Invitation />
      <Venue />
      <Footer />
    </div>
  )
}
