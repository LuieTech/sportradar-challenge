import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

function Calendar ({ events = [] }) {
  const [currentDate] = useState(new Date(2025, 10, 1)); 
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Filter events based on selected criteria
  const filterEvents = (eventList) => {
    let filtered = eventList;
    
    // Filter by sport
    if (selectedSport !== 'all') {
      filtered = filtered.filter(event => event.sport === selectedSport);
    }
    
    // Filter by date range
    if (dateFilter === 'week1') {
      filtered = filtered.filter(event => {
        const day = new Date(event.dateVenue).getDate();
        return day >= 1 && day <= 7;
      });
    } else if (dateFilter === 'week2') {
      filtered = filtered.filter(event => {
        const day = new Date(event.dateVenue).getDate();
        return day >= 8 && day <= 14;
      });
    } else if (dateFilter === 'week3') {
      filtered = filtered.filter(event => {
        const day = new Date(event.dateVenue).getDate();
        return day >= 15 && day <= 21;
      });
    } else if (dateFilter === 'week4') {
      filtered = filtered.filter(event => {
        const day = new Date(event.dateVenue).getDate();
        return day >= 22;
      });
    }
    
    return filtered;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]; 
    const dayEvents = events.filter(event => event.dateVenue === dateString);
    return filterEvents(dayEvents);
  };

  // Get unique sports for filter dropdown
  const getUniqueSports = () => {
    const sports = events.map(event => event.sport).filter(Boolean);
    return [...new Set(sports)];
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
      
      <div className="filters">
        <div className="filter-group">
          <label>Sport:</label>
          <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
            <option value="all">All Sports</option>
            {getUniqueSports().map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Date Range:</label>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">All Dates</option>
            <option value="week1">Week 1 (1-7)</option>
            <option value="week2">Week 2 (8-14)</option>
            <option value="week3">Week 3 (15-21)</option>
            <option value="week4">Week 4 (22+)</option>
          </select>
        </div>
        
        {(selectedSport !== 'all' || dateFilter !== 'all') && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSelectedSport('all');
              setDateFilter('all');
            }}
          >
            Clear Filters
          </button>
        )}
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

