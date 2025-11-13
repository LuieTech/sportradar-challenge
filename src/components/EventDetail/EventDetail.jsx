import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './EventDetail.css';

function EventDetail ({ events = [] }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const eventIndex = parseInt(eventId);
    if (events && events[eventIndex]) {
      setEvent(events[eventIndex]);
    }
  }, [eventId, events]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'TBA';
    return timeString.substring(0, 5);
  };

  if (!event) {
    return (
      <div className="event-detail-container">
        <div className="event-not-found">
          <h2>Event not found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Calendar
          </button>
        </div>
      </div>
    );
  }

  const hasResult = event.result && (event.result.homeGoals !== undefined || event.result.awayGoals !== undefined);
  const isPlayed = event.status === 'played';

  return (
    <div className="event-detail-container">
      <button onClick={() => navigate('/')} className="back-button">
        Back to Calendar
      </button>

      <div className="event-detail-card">
        <h2>{event.originCompetitionName}</h2>
        <span className={`status-badge ${event.status}`}>
          Status: {event.status === 'played' ? 'Finished' : 'Scheduled'}
        </span>
        <div className="sport-badge">Sport: {event.sport}</div>

        <div className="date-time-info">
          <p><strong>Date:</strong> {formatDate(event.dateVenue)}</p>
          <p><strong>Time:</strong> {formatTime(event.timeVenueUTC)} UTC</p>
        </div>

        <div className="teams-section">
          <div className="team">
            <div className="team-name">
              {event.homeTeam ? event.homeTeam.name : 'TBD'}
            </div>
            <div className="team-details">
              ({event.homeTeam?.abbreviation}) - {event.homeTeam?.teamCountryCode}
            </div>
          </div>

          {hasResult && isPlayed ? (
            <div className="score-section">
              <div className="score">
                <span className={`team-score ${event.result.winner === event.homeTeam?.name ? 'winner' : ''}`}>
                  {event.result.homeGoals ?? '-'}
                </span>
                :
                <span className={`team-score ${event.result.winner === event.awayTeam?.name ? 'winner' : ''}`}>
                  {event.result.awayGoals ?? '-'}
                </span>
              </div>
              {event.result.winner && (
                <p>Winner: {event.result.winner}</p>
              )}
            </div>
          ) : (
            <div className="vs-section">VS</div>
          )}

          <div className="team">
            <div className="team-name">
              {event.awayTeam ? event.awayTeam.name : 'TBD'}
            </div>
            <div className="team-details">
              ({event.awayTeam?.abbreviation}) - {event.awayTeam?.teamCountryCode}
            </div>
          </div>
        </div>

        {event.stadium && (
          <div className="venue-info">
            <h4>Venue:</h4>
            <p>{event.stadium}</p>
          </div>
        )}

        <div className="additional-info">
          <p><strong>Season:</strong> {event.season}</p>
          <p><strong>Stage:</strong> {event.stage?.name || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

