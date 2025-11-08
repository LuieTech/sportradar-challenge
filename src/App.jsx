import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Calendar from './components/Calendar'
import EventDetail from './components/EventDetail'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
