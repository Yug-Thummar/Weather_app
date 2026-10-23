# Weather Dashboard

A production-quality student mini project that shows current weather conditions and upcoming forecasts for cities worldwide. The application uses live Open-Meteo APIs, a responsive dashboard layout, local favorites, and shareable location links.

This project is educational and informational. Forecasts are estimates from weather models. The application does not replace official emergency weather warnings.

## Project overview

People often need a quick, readable answer before they travel, exercise, or plan outdoor activities: what is the temperature now, does it feel warmer or cooler than the measured value, is rain likely in the next few hours, and what is the seven-day outlook?

Weather Dashboard answers those questions with a single-page React application. Users search for a city, optionally use the browser location permission, save favorite places on the current device, and switch between Celsius and Fahrenheit.

## Real-world problem statement

Public weather information is available, but many student-facing examples either hard-code fake data or stop at a single current-temperature card. A useful dashboard should:

- resolve an ambiguous city name to a specific place
- fetch current, hourly, and daily values from a real API
- present missing measurements honestly
- remain usable on phones
- explain its data source and limitations

## Objectives

- Build a working weather dashboard with React, TypeScript, and Vite.
- Integrate Open-Meteo geocoding and forecast APIs over HTTPS.
- Display current conditions, hourly forecast, a temperature chart, and a seven-day forecast.
- Support unit conversion, favorite cities, optional geolocation, and shareable URL state.
- Include tests, linting, typechecking, and deployment instructions for Vercel.

## Features

- City search with debounce, keyboard navigation, and stale-response protection
- Current temperature, feels-like temperature, condition, humidity, wind, precipitation, cloud cover, UV index, visibility, sunrise, and sunset
- Next 24 hours in a horizontally scrollable row
- Recharts temperature trend based on actual hourly API data
- Seven-day forecast labeled by each day's local date
- Celsius/Fahrenheit toggle persisted in `localStorage`
- Favorite cities persisted in `localStorage` on the current browser only
- Optional "Use my location" button that requests permission only after a click
- Shareable `lat`, `lon`, and city name query parameters
- Manual refresh, last-update time, and a short in-memory cache
- Loading skeletons, empty states, API errors, offline detection, and geolocation denial handling
- Visible Open-Meteo attribution

## Technology stack and purpose

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| TypeScript (strict) | Typed application data and safer refactoring |
| Vite | Development server and production bundler |
| Tailwind CSS | Utility-first styling and responsive layout |
| shadcn-style UI primitives | Reusable Button, Card, Input, and Skeleton components |
| Lucide React | Consistent weather and interface icons |
| Recharts | Hourly temperature chart |
| date-fns | Date and time formatting |
| Open-Meteo Geocoding API | City search and optional reverse geocoding |
| Open-Meteo Forecast API | Current, hourly, and daily weather values |
| Vitest and React Testing Library | Unit and component tests with mocked network calls |
| ESLint and TypeScript | Code quality checks |
| Git, GitHub, and Vercel | Version control and static deployment |

No backend, database, or API key is required for this educational non-commercial version.

## Application architecture

The UI is a single dashboard page. Presentation components do not call `fetch` directly.

- `src/pages/DashboardPage.tsx` coordinates selected location, weather, units, favorites, and URL state.
- `src/hooks/` wrap reusable client behavior.
- `src/services/` talk to Open-Meteo and normalize responses.
- `src/utils/` format temperatures, dates, wind, and WMO weather codes.
- `src/components/` render layout, search, weather, forecast, charts, and favorites.

## Folder structure

```text
src/
  components/
    layout/
    search/
    weather/
    forecast/
    charts/
    favorites/
    states/
    ui/
  hooks/
  lib/
  pages/
  services/
  test/
  types/
  utils/
  App.tsx
  main.tsx
  index.css
docs/
  PROJECT_REPORT.md
  USER_GUIDE.md
  VIVA_QUESTIONS.md
```

## Data flow

1. The user types a city name.
2. After a short debounce, the geocoding service requests matching places.
3. Weather is fetched only after the user selects one result.
4. The forecast service requests current, hourly, and daily variables and stores Celsius values.
5. Display components convert temperatures if the user prefers Fahrenheit.
6. The selected city is written to the URL so a refresh can restore it.
7. Favorites and the unit preference are stored in `localStorage`.

## Weather API endpoints and variables

Geocoding:

`https://geocoding-api.open-meteo.com/v1/search`

Reverse geocoding, used after a successful browser location request:

`https://geocoding-api.open-meteo.com/v1/reverse`

Forecast:

`https://api.open-meteo.com/v1/forecast`

Requested current variables include temperature, apparent temperature, humidity, precipitation, weather code, cloud cover, wind speed, wind direction, UV index, visibility, and day/night flag.

Requested hourly variables include temperature, precipitation probability, precipitation, weather code, wind speed, UV index, visibility, and day/night flag.

Requested daily variables include weather code, maximum and minimum temperature, sunrise, sunset, maximum UV index, precipitation sum, precipitation probability, and rainfall sum.

The forecast request uses `timezone=auto`, metric units, and seven forecast days. Temperature conversion for the UI is performed locally so the application never double-converts API values.

## Installation

Requirements:

- Node.js 20 or later
- npm 10 or later

```bash
git clone <your-github-repository-url>
cd Weather_Dashboard
npm install
```

## Local development commands

```bash
npm run dev
```

Open the printed local URL, usually `http://localhost:5173`.

Other commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run preview
```

## Testing instructions

Tests mock network requests and do not call the live Open-Meteo APIs.

```bash
npm run test
```

Covered areas include temperature conversion, weather-code mapping, API normalization, missing values, loading and error states, search selection, favorites, the unit toggle, and forecast rendering.

## Production build

```bash
npm run build
```

Vite writes static files to `dist/`. `npm run preview` serves that folder locally.

## GitHub setup

1. Create a GitHub repository.
2. In this project folder, initialize git if needed: `git init`.
3. Add the remote: `git remote add origin <your-github-repository-url>`.
4. Commit the project files. Do not commit `node_modules`, `dist`, or secrets.
5. Push the default branch: `git push -u origin main`.

This README does not include a live repository URL because that depends on your GitHub account.

## Vercel deployment instructions

1. Push the project to GitHub.
2. Sign in at [https://vercel.com](https://vercel.com) and import the repository.
3. Keep the framework preset as Vite.
4. Use the build command `npm run build` and the output directory `dist`.
5. Deploy. No environment variables are required.
6. After the first deployment, open the Vercel URL and search for a city to confirm live API calls work.

SPA fallback is configured in `vercel.json` so unknown paths still load `index.html`.

Custom domain:

1. Open the Vercel project, then Settings, then Domains.
2. Add your domain and follow Vercel’s DNS instructions.
3. Wait for HTTPS to become active.

Inspecting logs and failed builds:

1. Open the Vercel deployment.
2. Read the build logs for TypeScript or Vite errors.
3. Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` locally.
4. Fix the reported project files, commit, and push to trigger a new deployment.

This README does not claim that a production URL already exists.

## Troubleshooting

- **No search results:** Try a longer name or add a country/region, for example `Springfield, Illinois`.
- **Weather does not load:** Check your network, then use Refresh. The footer attribution link should still be visible.
- **Location button fails:** The browser may have denied permission. Search by city name instead.
- **Favorites disappeared:** They are stored only in this browser. Clearing site data removes them.
- **Build fails on Vercel:** Confirm Node.js is recent and that `npm run build` succeeds locally.

## API attribution and licensing notes

Weather data by [Open-Meteo.com](https://open-meteo.com/).

Open-Meteo’s free public API is intended for non-commercial use under its applicable terms. Review:

- [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)
- [https://open-meteo.com/en/docs/geocoding-api](https://open-meteo.com/en/docs/geocoding-api)
- [https://open-meteo.com/en/terms](https://open-meteo.com/en/terms)

If this application is later used commercially, select an appropriately licensed API plan. No API key is embedded in the client because the educational public endpoints used here do not require one.

## Limitations

- Forecasts are model estimates and can be wrong.
- The app does not provide severe-weather alerts.
- Favorites and unit preference stay on one browser.
- Precise location is requested only on demand and is not kept as a history, but the current city can be stored if the user saves it as a favorite.
- Some optional values, such as UV index or visibility, may be unavailable for a location or model.
- Rate limits may apply if too many requests are sent.

## Future enhancements

- Additional units such as mph or inches
- Multi-city comparison
- Official warning feeds from a licensed provider
- Account-based favorite sync
- PWA offline snapshot of the last successful forecast

## Learning outcomes

Students can use this project to explain React component structure, TypeScript interfaces, HTTP JSON APIs, asynchronous requests, AbortController cancellation, localStorage, responsive layout, testing with mocks, and static deployment on Vercel.
