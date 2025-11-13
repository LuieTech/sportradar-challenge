# Sports Event Calendar

A simple sports event calendar application built with React and Vite.

## Overview

This project is a sports event calendar that allows users to:
- View events in a monthly calendar format
- Click on events to see full details
- Add new events through a form
- Filter events by sport
- Store events in local storage to persist between sessions

## Features

- **Calendar View**: Displays events for the current month with event markers
- **Event Details**: Click on any event to view full information including teams, time, sport, and competition
- **Add Events**: Form to add new events with date, time, sport, and team information
- **Filters**: Filter events by sport type
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Local Storage**: Events are saved in browser storage and persist between sessions

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Technology Stack

- React
- React Router DOM
- Vite
- CSS

## Project Structure

- `/src/components/Calendar` - Calendar view component
- `/src/components/EventDetail` - Event detail page
- `/src/components/AddEvent` - Form to add new events
- `/src/components/Navigation` - Navigation bar
- `/src/data/fe-task.json` - Initial sports events data

## Assumptions and Decisions

1. **Data Structure**: Used the provided JSON structure with fields like homeTeam, awayTeam, sport, dateVenue, and timeVenueUTC
2. **Event ID**: Generated unique IDs for new events using timestamps
3. **Storage**: Used localStorage to persist events between sessions
4. **Filters**: Implemented simple sport-based filtering
5. **Navigation**: Used React Router for page navigation
6. **Responsive Design**: Used CSS media queries for mobile/tablet/desktop views
7. **Date Handling**: Events are displayed based on their dateVenue field

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.
