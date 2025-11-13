import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';

function AddEvent({ onAddEvent }) {
  const navigate = useNavigate();
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sport, setSport] = useState('football');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!date || !time || !homeTeam || !awayTeam) {
      alert('Please fill in all required fields!');
      return;
    }

    const newEvent = {
      season: 2025,
      status: 'scheduled',
      timeVenueUTC: time + ':00',
      dateVenue: date,
      stadium: null,
      homeTeam: {
        name: homeTeam,
        officialName: homeTeam,
        slug: homeTeam.toLowerCase().replace(/\s+/g, '-'),
        abbreviation: homeTeam.substring(0, 3).toUpperCase(),
        teamCountryCode: 'N/A',
        stagePosition: null
      },
      awayTeam: {
        name: awayTeam,
        officialName: awayTeam,
        slug: awayTeam.toLowerCase().replace(/\s+/g, '-'),
        abbreviation: awayTeam.substring(0, 3).toUpperCase(),
        teamCountryCode: 'N/A',
        stagePosition: null
      },
      result: {
        homeGoals: 0,
        awayGoals: 0,
        winner: null,
        winnerId: null,
        message: null,
        goals: [],
        yellowCards: [],
        secondYellowCards: [],
        directRedCards: [],
        scoreByPeriods: null
      },
      stage: {
        id: 'REGULAR',
        name: 'Regular Season',
        ordering: 1
      },
      group: null,
      originCompetitionId: 'user-event',
      originCompetitionName: 'User Added Event',
      sport: sport
    };

    onAddEvent(newEvent);
    alert('Event added!');
    navigate('/');
  };

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Time:</label>
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Sport:</label>
          <select value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="ice-hockey">Ice Hockey</option>
            <option value="tennis">Tennis</option>
            <option value="volleyball">Volleyball</option>
          </select>
        </div>

        <div>
          <label>Home Team:</label>
          <input 
            type="text" 
            value={homeTeam} 
            onChange={(e) => setHomeTeam(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Away Team:</label>
          <input 
            type="text" 
            value={awayTeam} 
            onChange={(e) => setAwayTeam(e.target.value)}
            required
          />
        </div>

        <div className="buttons">
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;

