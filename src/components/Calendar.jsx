import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

function Calendar ({ events = [] }) {
  const [currentDate] = useState(new Date(2025, 10, 1)); 
  const navigate = useNavigate();

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]; 
    return events.filter(event => event.dateVenue === dateString);
  };

  // Handle event click to navigate to detail page
  const handleEventClick = (event) => {
    const eventIndex = events.findIndex(e => 
      e.dateVenue === event.dateVenue && 
      e.homeTeam?.name === event.homeTeam?.name &&
      e.awayTeam?.name === event.awayTeam?.name
    );
    navigate(`/event/${eventIndex}`);
  };

  
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
    const startingDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, date: null, events: [] });
    }
    
    // Add all days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      days.push({ day, date, events: dayEvents });
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Sports Event Calendar</h1>
        <h2>{monthName}</h2>
      </div>
      
      <div className="calendar">
        <div className="calendar-weekdays">
          <div className="weekday">Sun</div>
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
        </div>
        
        <div className="calendar-days">
          {days.map((dayInfo, index) => (
            <div
              key={index}
              className={`calendar-day ${!dayInfo.day ? 'empty' : ''} ${
                dayInfo.events.length > 0 ? 'has-events' : ''
              }`}
            >
              {dayInfo.day && (
                <>
                  <div className="day-number">{dayInfo.day}</div>
                  {dayInfo.events.length > 0 && (
                    <div>
                      <div className="event-indicator">
                        <span className="event-dot"></span>
                        <span className="event-count">{dayInfo.events.length} event(s)</span>
                      </div>
                      {dayInfo.events.map((event, eventIndex) => (
                        <div 
                          key={eventIndex} 
                          className="event-item"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="event-time">
                            {event.timeVenueUTC ? event.timeVenueUTC.substring(0, 5) : 'TBA'}
                          </div>
                          <div className="event-sport">{event.sport}</div>
                          <div className="event-teams">
                            {event.homeTeam?.name || 'TBD'} vs {event.awayTeam?.name || 'TBD'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

