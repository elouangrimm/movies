# movies

A minimal, free, and ad-free movie watching application.

## Project Structure

```
movies/
├── index.html              # Main search page
├── player.html             # Video player page
├── config.js               # Configuration (API keys)
├── js/                     # Modular JavaScript code
│   ├── analytics/          # Analytics modules
│   │   └── posthog.js      # PostHog initialization and tracking
│   ├── api/                # API service modules
│   │   └── omdb.js         # OMDb API service
│   ├── ui/                 # UI component modules
│   │   ├── search.js       # Search interface
│   │   ├── recently-watched.js  # Recently watched display
│   │   └── player.js       # Video player controls
│   └── utils/              # Utility modules
│       ├── common.js       # Common utilities (debounce, URL helpers)
│       ├── storage.js      # LocalStorage service
│       └── video-sources.js  # Video source configuration
├── index.js                # Main page initialization
├── player.js               # Player page initialization
├── sw.js                   # Service worker for PWA
└── manifest.json           # PWA manifest

## Features

- **Modular Architecture**: Clean separation of concerns with organized modules
- **Search Functionality**: Search for movies and TV shows using OMDb API
- **Multiple Video Sources**: Support for 9 different streaming sources
- **TV Show Support**: Season and episode selection for TV series
- **Recently Watched**: Track last 3 watched items
- **Analytics**: PostHog integration for usage tracking
- **PWA Support**: Progressive Web App with offline caching
- **Responsive Design**: Works on desktop and mobile devices

## Code Organization

### Analytics (`js/analytics/`)
- PostHog initialization with proper error handling
- Version tracking from manifest.json

### API Services (`js/api/`)
- `OMDbService`: Centralized API calls to OMDb
  - Search movies/TV shows
  - Get details, seasons, episodes
  - Get titles

### UI Components (`js/ui/`)
- `SearchUI`: Movie/TV show search interface with autocomplete
- `RecentlyWatchedUI`: Display recently watched items
- `PlayerUI`: Video player with source selection and TV controls

### Utilities (`js/utils/`)
- `Utils.debounce()`: Debounce function calls
- `Utils.getUrlParam()`: Extract URL parameters
- `Utils.buildUrl()`: Build URLs with parameters
- `StorageService`: LocalStorage management
- `VIDEO_SOURCES`: Video source configuration

## Development

1. Configure your OMDb API key in `config.js`
2. Serve the files with any HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

## Version

Current version: 2.0.0