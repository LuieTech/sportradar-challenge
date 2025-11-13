import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Sports Calendar</h2>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Calendar
          </Link>
          <Link 
            to="/add-event" 
            className={`nav-link ${location.pathname === '/add-event' ? 'active' : ''}`}
          >
            Add Event
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

