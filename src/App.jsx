import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Calendar from './components/Calendar/Calendar'
import EventDetail from './components/EventDetail/EventDetail'
import AddEvent from './components/AddEvent/AddEvent'
import eventsData from './data/fe-task.json'

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem('sportsEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else if (eventsData && eventsData.data) {
      setEvents(eventsData.data);
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('sportsEvents', JSON.stringify(events));
    }
  }, [events]);

  const handleAddEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Calendar events={events} />} />
          <Route path="/event/:eventId" element={<EventDetail events={events} />} />
          <Route path="/add-event" element={<AddEvent onAddEvent={handleAddEvent} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
