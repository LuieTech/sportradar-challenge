import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import eventsData from '../data/fe-task.json';
import './EventDetail.css';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Find the event by matching date and teams
    const eventIndex = parseInt(eventId);
    if (eventsData && eventsData.data && eventsData.data[eventIndex]) {
      setEvent(eventsData.data[eventIndex]);
    }
  }, [eventId]);

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
      <div className="event-detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Calendar
        </button>
        <span className={`status-badge ${event.status}`}>
          {event.status === 'played' ? 'Finished' : 'Scheduled'}
        </span>
      </div>

      <div className="event-detail-card">
        <div className="event-detail-header-info">
          <div className="competition-info">
            <h3>{event.originCompetitionName}</h3>
            <p className="stage-info">{event.stage?.name || 'N/A'}</p>
          </div>
          <div className="sport-badge">{event.sport}</div>
        </div>

        <div className="match-info">
          <div className="date-time-info">
            <div className="date">{formatDate(event.dateVenue)}</div>
            <div className="time">
              {formatTime(event.timeVenueUTC)} UTC
            </div>
          </div>

          <div className="teams-section">
            <div className="team home-team">
              <div className="team-name">
                {event.homeTeam ? event.homeTeam.name : 'TBD'}
              </div>
              {event.homeTeam && (
                <div className="team-details">
                  <span className="team-abbr">{event.homeTeam.abbreviation}</span>
                  <span className="team-country">{event.homeTeam.teamCountryCode}</span>
                </div>
              )}
            </div>

            {hasResult && isPlayed ? (
              <div className="score-section">
                <div className="score">
                  <span className={`team-score ${event.result.winner === event.homeTeam?.name ? 'winner' : ''}`}>
                    {event.result.homeGoals ?? '-'}
                  </span>
                  <span className="score-separator">:</span>
                  <span className={`team-score ${event.result.winner === event.awayTeam?.name ? 'winner' : ''}`}>
                    {event.result.awayGoals ?? '-'}
                  </span>
                </div>
                {event.result.winner && (
                  <div className="winner-text">
                    Winner: {event.result.winner}
                  </div>
                )}
              </div>
            ) : (
              <div className="vs-section">VS</div>
            )}

            <div className="team away-team">
              <div className="team-name">
                {event.awayTeam ? event.awayTeam.name : 'TBD'}
              </div>
              {event.awayTeam && (
                <div className="team-details">
                  <span className="team-abbr">{event.awayTeam.abbreviation}</span>
                  <span className="team-country">{event.awayTeam.teamCountryCode}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {event.stadium && (
          <div className="venue-info">
            <h4>Venue</h4>
            <p>{event.stadium}</p>
          </div>
        )}

        <div className="additional-info">
          <div className="info-item">
            <span className="info-label">Season:</span>
            <span className="info-value">{event.season}</span>
          </div>
          {event.group && (
            <div className="info-item">
              <span className="info-label">Group:</span>
              <span className="info-value">{event.group}</span>
            </div>
          )}
          {event.homeTeam?.officialName && (
            <div className="info-item">
              <span className="info-label">Home (Official):</span>
              <span className="info-value">{event.homeTeam.officialName}</span>
            </div>
          )}
          {event.awayTeam?.officialName && (
            <div className="info-item">
              <span className="info-label">Away (Official):</span>
              <span className="info-value">{event.awayTeam.officialName}</span>
            </div>
          )}
        </div>

        {hasResult && event.result.message && (
          <div className="result-message">
            <p>{event.result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;

