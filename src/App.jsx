import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Calendar from './components/Calendar'
import EventDetail from './components/EventDetail'
import AddEvent from './components/AddEvent'
import eventsData from './data/fe-task.json'

function App() {
  const [events, setEvents] = useState([]);

  // Load initial events from JSON
  useEffect(() => {
    if (eventsData && eventsData.data) {
      setEvents(eventsData.data);
    }
  }, []);

  // Function to add a new event
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
