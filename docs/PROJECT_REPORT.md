# Weather Dashboard — Current Weather and Forecast Application using React and Open-Meteo

**College Mini Project Report**

---

## Title page template

| Field | Fill before submission |
| --- | --- |
| Project title | Weather Dashboard |
| Student name | `[Student Name]` |
| Enrollment / roll number | `[Enrollment Number]` |
| Class / programme | `[Class / Programme]` |
| Semester | `[Semester]` |
| Department | `[Department Name]` |
| College / institute | `[College Name]` |
| Guide / supervisor | `[Guide Name]` |
| Academic year | `[Academic Year]` |
| Submission date | `[Submission Date]` |

Do not sign this file until the institution requires a printed certificate. No approval signature is included here.

---

## Certificate template

This is to certify that the project titled **Weather Dashboard**, submitted by `[Student Name]`, enrollment number `[Enrollment Number]`, of `[Class / Programme]`, `[Department Name]`, `[College Name]`, is a bona fide record of work completed during `[Semester]`, `[Academic Year]`, under the guidance of `[Guide Name]`.

This certificate is an editable template. Obtain the actual wording, date, and signatures from the department if the college requires a signed certificate.

Place for guide signature: `[Guide Signature]`

Place for head of department signature: `[HOD Signature]`

Place for college seal: `[College Seal]`

---

## Acknowledgement

I thank `[Guide Name]` for academic guidance during this mini project. I also thank the faculty of `[Department Name]`, `[College Name]`, for laboratory facilities and evaluation support.

Weather data used by the application is provided by Open-Meteo. The free public API is intended for non-commercial use under the provider’s terms. This project uses that data for educational demonstration only.

Any remaining errors are the student’s responsibility.

---

## Abstract

Weather Dashboard is a single-page web application that helps a user understand current weather and upcoming forecasts for cities worldwide. A student asks for a city name, the program finds matching places, the user selects one city, and live weather is loaded from Open-Meteo. The screen then shows temperature, feels-like temperature, humidity, wind, precipitation, cloud cover, UV index, visibility, sunrise, sunset, the next 24 hours, a temperature chart, and a seven-day forecast.

If this work is done with fake JSON, the demonstration is not honest. If it is done with a large paid weather company, the student may spend more time on keys and billing than on the dashboard logic. Weather Dashboard is the smaller, complete system. It looks like a modern dashboard. The user can search a city, save favorites, switch Celsius and Fahrenheit, refresh the forecast, and optionally use the browser location button.

The project is written so that a beginner can read the code. API calls live in a service layer. Screens only show cards, lists, and forms. Preferences such as the temperature unit and favorite cities are stored in the browser using LocalStorage. This report is the academic document for the project. It does not replace the running website.

**Keywords:** weather dashboard, React, TypeScript, Open-Meteo, geocoding, forecast API, LocalStorage, Vercel

---

## LIST OF TABLES

- Table 1: Existing system versus proposed system
- Table 2: Hardware and software requirements
- Table 3: Selected location fields
- Table 4: Current weather and forecast fields
- Table 5: Main modules and files
- Table 6: Manual test cases

## LIST OF FIGURES

- Figure 1: High-level architecture
- Figure 2: Data flow of the application
- Figure 3: City search and weather fetch workflow
- Figure 4: First-load, URL, and storage workflow
- Figure 5–11: Screenshot placeholders (to be pasted by the student)

---

## CHAPTER 1
## INTRODUCTION

Weather is not only a number on a phone widget. It is also a daily process: a person asks for a city, a system finds the correct place, current conditions are shown, and a forecast is given for the next hours and days. If this process is done only by guessing, or only with hard-coded sample data, three common problems appear.

First, the city may be wrong. A name such as Springfield exists in more than one country. Second, search is incomplete. A single temperature card does not answer “Will it rain this evening?” or “What is the seven-day outlook?” Third, missing values are easy to hide. If the API does not send UV index, showing `0` looks like a real measurement.

Computer software can help. Large weather products use paid APIs, mobile apps, and official warning systems. Those systems are powerful, but they need accounts, keys, and training. A college mini project does not need that size. It needs a complete, working, understandable application that shows the same idea on a smaller scale.

Weather Dashboard is that smaller system. It looks like a modern dashboard. At the top the user can search. On the left (or stacked on a phone) the user can open saved cities. The main area shows:

1. Current weather — city, local time, temperature, and condition
2. Weather metrics — humidity, wind, precipitation, UV, visibility
3. Hourly forecast — the next 24 hours and a temperature chart
4. Seven-day forecast — each day labeled by its real local date

The project is written so that a beginner can read the code. Business rules such as “do not fetch weather until the user selects a city” and “do not treat a missing weather code as clear sky” live in services and utilities. The screens only show cards and lists. This separation is important. If every card called the API itself, stale data and double conversion could appear.

This report is the academic document for the project. It does not replace the running website. After reading it, a student should be able to start the app, explain every feature, and answer viva questions about React, APIs, JSON, LocalStorage, validation, and deployment.

---

## CHAPTER 2
## PROBLEM STATEMENT

A student, a traveler, or a laboratory demo needs software that can answer these questions:

1. What is the current temperature in a chosen city?
2. Does it feel hotter or colder than the measured temperature?
3. Is rain expected during the next few hours?
4. What is the weather forecast for the next seven days?
5. What are the humidity, wind speed, precipitation, cloud cover, and UV index?
6. After a page refresh, is the selected city and the unit preference still there?

If these questions are answered only with invented numbers, the system is not reliable. If they are answered by a large commercial weather product, the student may spend more time on accounts than on the dashboard logic.

Therefore the problem of this project is:

Design and implement a complete Weather Dashboard as a web application that supports city search, current conditions, hourly and daily forecasts, unit conversion, favorite cities, optional geolocation, and persistence, without using a custom backend or a database server, and that a beginner can install, demonstrate, and deploy.

The solution must also refuse invalid work:

- weather cannot be fetched for an ambiguous city until the user selects a result
- a missing measurement cannot be shown as zero
- a missing weather code cannot be shown as clear sky
- invalid latitude or longitude in the URL cannot be trusted
- location permission cannot be requested automatically on page load
- a favorite city cannot be saved twice

---

## CHAPTER 3
## OBJECTIVES

The project was built to meet the following objectives.

**Primary objectives**

1. To study a real weather-information problem and convert it into software features.
2. To design a clean, responsive dashboard for desktop, tablet, and mobile screens.
3. To implement worldwide city search using the Open-Meteo Geocoding API.
4. To implement current, hourly, and seven-day weather using the Open-Meteo Forecast API.
5. To keep all stored temperatures in Celsius and convert to Fahrenheit only for display.
6. To store the unit preference and favorite cities in the browser using LocalStorage, with safe JSON reading.
7. To request browser location only after the user clicks Use my location.
8. To restore a valid selected city from the URL after refresh.
9. To document the project for submission and viva.
10. To deploy the production build as a static website on Vercel.

**Learning objectives**

- Understand component-based UI in React.
- Understand why TypeScript types reduce mistakes.
- Understand HTTP, JSON, Promises, and `async` / `await`.
- Understand geocoding versus weather forecast data.
- Understand the difference between LocalStorage and a real database.
- Understand validation, error states, and inventory-like rules for missing API values.

---

## CHAPTER 4
## SCOPE OF THE PROJECT

### 4.1 In scope

The following work is included and implemented:

- One dashboard application with search, favorites, current weather, metrics, hourly forecast, chart, and seven-day forecast
- City search by name, with optional country or region qualifier
- Selection of latitude and longitude from a geocoding result
- Current temperature, feels-like temperature, condition, humidity, wind, precipitation, cloud cover, UV index, visibility, sunrise, and sunset
- Next 24 hours with temperature, icon, precipitation probability, and wind
- Recharts temperature line chart using the same hourly values
- Seven-day forecast labeled by each day’s actual local date
- Celsius / Fahrenheit toggle, default Celsius
- Favorite cities with add, select, and remove
- Optional current-location button
- Shareable URL parameters for the selected city
- Manual refresh, last-update time, and a short in-memory cache
- Loading skeletons, empty states, API errors, offline detection, and geolocation denial handling
- Visible attribution: Weather data by Open-Meteo.com
- Vercel configuration for a Vite single-page app

### 4.2 Out of scope

The following items are not part of this mini project:

- Login, passwords, or user roles
- A shared database used by many computers at the same time
- Official severe-weather warnings or emergency alerts
- Email, SMS, or WhatsApp reminders
- A native Android or iOS application
- Paid commercial weather API keys
- Backend frameworks such as Express, and databases such as MongoDB, MySQL, Firebase, or Supabase

These items can be future work. They were left out so that the project stays complete instead of half-finished.

---

## CHAPTER 5
## EXISTING SYSTEM AND PROPOSED SYSTEM

### 5.1 Existing system

People currently check weather in one of these ways:

- A phone widget: fast for one city, but not a student implementation that can be explained in a viva.
- A commercial website or app: correct for daily use, but not suitable as the student’s own code.
- A tutorial app: often one hard-coded city, fake JSON, or only a current temperature.

Common weaknesses of the tutorial / paper method:

- no real geocoding, so an ambiguous city is guessed
- no hourly or seven-day forecast
- missing API fields shown as `0`
- no single screen that shows current, hourly, and daily weather together
- difficult to demonstrate as a complete lab project

### 5.2 Proposed system

Weather Dashboard proposes a browser dashboard that:

- searches real cities with Open-Meteo geocoding
- fetches live current, hourly, and daily values
- shows missing values as Unavailable
- stores favorites and the unit preference locally
- can be opened on a laptop or a phone
- can be hosted on Vercel without paying for a database

**Table 1: Existing system versus proposed system**

| Point | Existing / common practice | Proposed Weather Dashboard |
| --- | --- | --- |
| City list | One saved city or a notebook | Searchable worldwide geocoding |
| Weather values | Hard-coded or one temperature | Live Open-Meteo current, hourly, and daily data |
| Ambiguous names | Guessed | User must select a result |
| Missing fields | Shown as 0 | Shown as Unavailable |
| Units | Fixed, or a dummy toggle | Real °C / °F conversion, saved in the browser |
| Favorites | None, or a server account | LocalStorage on this browser only |
| Sharing | Screenshot | URL with validated coordinates |
| Demo in lab | Slow or incomplete | `npm run dev` or a Vercel link |
| Cost | Paid API / server | Free student tools + Open-Meteo educational use |

The proposed system is not a replacement for an official meteorological service. It is a teaching model of a weather desk.

---

## CHAPTER 6
## LITERATURE / TECHNOLOGY BACKGROUND

This chapter explains the tools, in simple language, so that they can be spoken in a viva.

### 6.1 React

React is a JavaScript library for building user interfaces. The screen is divided into components. A button, a card, a search box, and a whole page can each be a component. When data changes (for example, a city is selected), React updates only the parts that need to change.

In this project, `DashboardPage` is the main screen. Smaller parts such as `Button`, `Card`, `CitySearch`, and `MetricCard` are reused.

### 6.2 Vite

Vite is the tool that runs the project in development and builds it for production. In development it starts a local server (usually port 5173). For deployment it creates a `dist` folder of HTML, CSS, and JavaScript. Vercel then hosts that folder.

### 6.3 TypeScript

TypeScript adds types to JavaScript. A selected location must have a name, latitude, and longitude. Current weather fields may be a number or `null`. If the programmer forgets a field, the editor or `npm run build` can show an error. This is useful in a college project because the examiner can see that the data model is planned, not guessed.

### 6.4 Tailwind CSS

Tailwind is a utility CSS framework. Instead of writing a long CSS file for every page, the developer uses classes such as `rounded-2xl`, `text-sm`, and `lg:grid-cols-[270px_minmax(0,1fr)]`. This keeps spacing and colors consistent.

### 6.5 Open-Meteo APIs

Open-Meteo is a public weather data service. This project uses two HTTPS endpoints:

- Geocoding: convert a city name into coordinates
- Forecast: convert coordinates into current, hourly, and daily weather

No API key is placed in the client for this educational, non-commercial version. The footer shows the required attribution.

### 6.6 LocalStorage

LocalStorage is a feature of the web browser. The website can save a text string under a name (a key). After refresh, the same string can be read again. In this project the keys are:

- `weather-dashboard:units` — `"celsius"` or `"fahrenheit"`
- `weather-dashboard:favorites` — a JSON list of saved cities

LocalStorage is not a database. It cannot be shared easily with another computer. It can be deleted by the user. The sidebar and this report both state that limit clearly.

### 6.7 Recharts, date-fns, and Lucide React

Recharts draws the hourly temperature line from real API values. date-fns formats dates and hours. Lucide React supplies weather and interface icons, so emojis are not the primary icon system.

### 6.8 Vercel

Vercel is a hosting service that can publish a Vite project from GitHub. The student does not configure a Linux server. The build command is `npm run build` and the output folder is `dist`.

---

## CHAPTER 7
## SOFTWARE AND HARDWARE REQUIREMENTS

**Table 2: Hardware and software requirements**

| Type | Requirement |
| --- | --- |
| Hardware | Any normal laptop or desktop; 4 GB RAM is enough |
| Operating system | Windows, macOS, or Linux |
| Browser | Chrome, Edge, Firefox, or another modern browser |
| Internet | Required for Open-Meteo search and forecast requests |
| Software | Node.js 20 or newer, npm 10 or newer |
| Optional | Git, GitHub account, Vercel account |
| Display | Desktop, tablet, or mobile width; the layout adapts |

No paid API key is required. No database software is required.

Exact laboratory PC specifications may be filled if the college asks for them:

- Processor: `[Processor]`
- RAM: `[RAM]`
- Storage: `[Storage]`

---

## CHAPTER 8
## SYSTEM ANALYSIS

### 8.1 Users

This mini project has one user role: a person sitting at a computer or phone who wants weather information. There is no student login and no admin login. The same person searches cities, saves favorites, and switches units. This matches a classroom demo.

### 8.2 Functional requirements

FR1. The system shall search cities by name using the Open-Meteo Geocoding API.

FR2. The system shall display city, region or state when available, and country, and shall wait for a selection before fetching weather.

FR3. The system shall display current temperature, condition, feels-like temperature, humidity, wind, precipitation, cloud cover, UV index, visibility, sunrise, and sunset when the API provides those values.

FR4. The system shall display the next 24 hours, or the available upcoming hourly forecast.

FR5. The system shall display a temperature chart based on the same hourly values.

FR6. The system shall display a seven-day forecast labeled by each day’s local date.

FR7. The system shall convert Celsius to Fahrenheit with the formula °F = (°C × 9/5) + 32 and shall not convert twice.

FR8. The system shall save and remove favorite cities without duplicates.

FR9. The system shall request geolocation only after a button click and shall remain usable if permission is denied.

FR10. The system shall restore a selected city from valid URL parameters after refresh.

FR11. The system shall provide manual refresh and show the last successful update time.

FR12. The system shall show Unavailable for missing measurements and shall not treat a missing weather code as clear weather.

FR13. The system shall show Open-Meteo attribution.

### 8.3 Non-functional requirements

NFR1. The interface should be readable and consistent (dark navy background, rounded cards, large temperature).

NFR2. The hourly row should scroll horizontally on small screens. The page itself should not overflow sideways.

NFR3. Forms should have labels. Icon-only buttons should have accessible names.

NFR4. Network, timeout, rate-limit, and offline failures should show a message, not a stack trace.

NFR5. The production build should be static files suitable for Vercel.

### 8.4 Feasibility

- Technical feasibility: React, Vite, and Open-Meteo are standard and free for this educational use.
- Economic feasibility: No server rent and no paid API key in the current version.
- Operational feasibility: A student can run the app with two commands (`npm install`, `npm run dev`).
- Schedule feasibility: The feature set is small enough for a mini project timeline.

---

## CHAPTER 9
## SYSTEM DESIGN AND ARCHITECTURE

### 9.1 High-level architecture

Weather Dashboard is a single-page application (SPA). The browser downloads one website. React then shows the dashboard inside it.

```text
                    +-----------------------------+
                    |         Web Browser         |
                    |  (Chrome / Edge / Firefox)  |
                    +--------------+--------------+
                                   |
                    +--------------v--------------+
                    |     React user interface    |
                    |  Search / Current / Hourly  |
                    |  Daily / Chart / Favorites  |
                    +--------------+--------------+
                                   |
                    +--------------v--------------+
                    |     React hooks             |
                    |  weather / search / units   |
                    |  favorites / location / URL |
                    +--------------+--------------+
                                   |
                    +--------------v--------------+
                    |     Service layer           |
                    |  apiClient / geocoding      |
                    |  weather normalize + cache  |
                    +-------+--------------+------+
                            |              |
           +----------------v---+   +------v---------------+
           | Open-Meteo APIs    |   | Browser LocalStorage |
           | Geocoding +        |   | units + favorites    |
           | Forecast (HTTPS)   |   | (this browser only)  |
           +--------------------+   +----------------------+
```

**Figure 1: High-level architecture**

There is no custom backend. There is no environment-variable secret. The website talks to Open-Meteo directly over HTTPS.

### 9.2 Logical layers

1. Presentation layer — layout, cards, search, forecast lists, and the chart.
2. Application layer — hooks apply loading, refresh, URL, and favorite rules.
3. Service layer — `apiClient.ts`, `geocoding.ts`, and `weather.ts` read and normalize JSON.
4. Persistence layer — `storage.ts` reads and writes LocalStorage.

This is similar to a 3-tier design, but weather observations come from Open-Meteo, and the “database” for preferences is LocalStorage.

### 9.3 Folder design

The source code is split so that a beginner can find things:

- `src/pages` — the dashboard screen
- `src/components` — layout, search, weather, forecast, chart, favorites, states, UI
- `src/hooks` — search, weather, units, favorites, geolocation, URL, online status
- `src/services` — HTTPS client, geocoding, forecast
- `src/utils` — temperature, weather codes, dates, wind, storage
- `src/types` — location and weather shapes
- `src/test` — test setup and sample payloads

### 9.4 Routing design

This version is one dashboard page. It does not need React Router. The selected city is stored in the address bar as query parameters, for example:

`/?lat=52.5200&lon=13.4100&name=Berlin&admin1=Berlin&country=Germany`

On Vercel, `vercel.json` sends unknown paths to `index.html`, so a refresh still opens the React app.

**Table 5: Main modules and files**

| File / module | Purpose |
| --- | --- |
| `src/pages/DashboardPage.tsx` | Main screen and feature wiring |
| `src/components/search/CitySearch.tsx` | City search box |
| `src/components/weather/*` | Current weather, metrics, units, icons |
| `src/components/forecast/*` | Hourly and seven-day lists |
| `src/components/charts/TemperatureChart.tsx` | Hourly temperature chart |
| `src/components/favorites/FavoriteList.tsx` | Saved cities |
| `src/services/geocoding.ts` | City search and reverse geocoding |
| `src/services/weather.ts` | Forecast request and normalization |
| `src/hooks/useWeather.ts` | Loading, refresh, stale-request protection |
| `vercel.json` | SPA rewrite for hosting |

---

## CHAPTER 10
## FEATURES OF THE PROJECT (DETAILED)

This chapter is the heart of the report. It lists what the project contains and what the user can do.

### 10.1 Feature 1 — City search

The user types a city name, for example `Mumbai` or `Paris, France`. The app waits 400 ms so it does not call the API on every key. Matching places are shown with city, region or state, and country. Arrow keys, Enter, and Escape work. Weather is fetched only after a result is selected.

If nothing matches, a helpful message is shown. If the network fails, an error is shown. Old responses are ignored if the user has already typed something new.

### 10.2 Feature 2 — Current weather

The large card shows:

- city name, region, and country
- current local time for that place
- large temperature
- weather condition and icon
- feels-like temperature
- sunrise and sunset

This feature answers the first question: “What is the weather right now?”

### 10.3 Feature 3 — Weather metrics

Reusable metric cards show feels-like temperature, humidity, wind speed, wind direction, precipitation, cloud cover, UV index, and visibility. Each card has an icon, a value, a unit, and a label. If a value is missing, the card says Unavailable.

### 10.4 Feature 4 — Hourly forecast

The next 24 hours are shown as a row of small cards: local hour, icon, temperature, precipitation probability, and wind. On a phone the row scrolls sideways.

### 10.5 Feature 5 — Temperature chart

A Recharts line chart uses the same hourly temperatures. Labels, units, and tooltips match the selected °C or °F setting. The chart is lazy-loaded because the charting library is larger than the rest of the page.

### 10.6 Feature 6 — Seven-day forecast

Each day shows the weekday and date, condition, minimum and maximum temperature, precipitation probability, and rainfall when available. The first row is not assumed to be tomorrow. The label comes from the API date.

### 10.7 Feature 7 — Temperature units

Celsius is the default. The user can switch to Fahrenheit. All temperatures, including the chart, update together. The underlying API values stay in Celsius. The preference is stored in LocalStorage.

### 10.8 Feature 8 — Favorite cities

Save city stores the current place. The sidebar lists saved cities. Clicking a city loads it again. Remove deletes it. The same coordinates are not saved twice. Favorites stay on this browser only.

### 10.9 Feature 9 — Current location

Use my location asks for permission only after the click. The on-screen text explains that coordinates are used to fetch weather and are not stored as a history. If permission is denied, the dashboard says so and city search still works. If a place name can be found, reverse geocoding is used. If not, weather still loads as Current location.

### 10.10 Feature 10 — Shareable URL and refresh

The selected city is written to `lat`, `lon`, and `name`. Refreshing the page restores a valid location. Invalid coordinates are ignored. Refresh requests a new forecast. The last successful update time is shown. If a recent in-memory cache is used, the dashboard says so.

### 10.11 Feature 11 — Loading, empty, and error states

| Situation | What the user sees |
| --- | --- |
| First visit | Search prompt, no fake weather |
| City not found | No-results message |
| Weather loading | Skeleton cards |
| API or network failure | Error banner with Try again |
| Browser offline | Offline message |
| Location denied | Permission message |
| No favorites | Empty favorites text |
| Missing measurement | Unavailable |

### 10.12 Feature 12 — Ready for Vercel

The project builds to a `dist` folder. `vercel.json` makes the single-page app work after refresh on the live URL.

---

## CHAPTER 11
## HOW THE PROJECT WORKS

This chapter explains the working of the system from the moment the website opens.

### 11.1 Starting the application

The student runs `npm run dev`. Vite serves the React app. The browser opens `index.html`, which loads `src/main.tsx`. `main.tsx` renders `App`. `App` renders `DashboardPage`.

`DashboardPage` wraps the screen in `AppLayout` (header, sidebar, footer) and then shows either the empty state or the weather panel.

### 11.2 Loading data

When the page starts, it reads the URL and LocalStorage.

```text
Is there a valid lat, lon, and name in the URL?
        │
        ├── No  → show empty search state
        │
        └── Yes
              │
              Read favorites from weather-dashboard:favorites
              Read unit from weather-dashboard:units (default Celsius)
              Fetch forecast for those coordinates
              │
              ├── Success → show weather
              └── Failure → error banner and Try again
```

**Figure 4: First-load, URL, and storage workflow**

This is why a shared link can reopen the same city, and why favorites do not appear on another computer.

### 11.3 How a click becomes weather on the screen

Example: the user searches Berlin and selects Berlin, Germany.

1. After debounce, `searchCities` calls the geocoding API.
2. The user selects one result. Weather is not fetched before that click.
3. `DashboardPage` stores the location and writes it to the URL.
4. `useWeather` calls `fetchWeather`.
5. `weather.ts` requests current, hourly, and daily variables with `timezone=auto`.
6. The JSON is checked and turned into `NormalizedWeather`.
7. Cards format values for the selected unit.
8. If the user saves the city, LocalStorage is updated.

```text
User types “Berlin”
        → debounce 400 ms
        → Geocoding API
        → user selects one result
        → Forecast API
        → normalize JSON
        → React re-renders cards, lists, and chart
```

**Figure 2: Data flow of the application**

### 11.4 How search and weather stay consistent

The most important working rule is:

Weather is not fetched from a typed name alone. It is fetched from a selected latitude and longitude.

- Search: name → list of places
- Select: one place → coordinates
- Forecast: coordinates → weather
- Display: Celsius values → optional Fahrenheit

Because only the weather service is allowed to normalize the API payload, the current card and the chart cannot disagree about the source values.

### 11.5 How temperature conversion works

The forecast request always uses `temperature_unit=celsius`. Display uses:

```text
if value is missing → "Unavailable"
if unit is Fahrenheit → (celsius × 9 / 5) + 32
else → celsius
```

This avoids double conversion.

### 11.6 How weather codes work

Open-Meteo returns a WMO number, not an English sentence. `interpretWeatherCode` maps known codes to descriptions and icons. A missing or unknown code becomes Condition unavailable / unrecognized, never Clear sky.

### 11.7 How overdue-style planning notes work

The program does not invent extra weather. Planning notes are derived from real values, for example rain probability in the next hours, high UV, or a large gap between actual and feels-like temperature. They are labeled as notes, not official warnings.

---

## CHAPTER 12
## DATA MODELS

Two main records are used on the client. Weather observations themselves are not stored as a student database. They are fetched from Open-Meteo when a city is selected.

### 12.1 Selected location

**Table 3: Selected location fields**

| Field | Meaning | Required |
| --- | --- | --- |
| id | Place id or coordinate key | Yes |
| name | City or place name | Yes |
| latitude | WGS84 latitude, −90 to 90 | Yes |
| longitude | WGS84 longitude, −180 to 180 | Yes |
| admin1 | Region or state | No |
| country | Country name | No |
| countryCode | ISO country code | No |
| timezone | IANA time zone when known | No |

### 12.2 Current weather and forecast

**Table 4: Current weather and forecast fields**

| Field | Meaning | Source |
| --- | --- | --- |
| temperatureC | Air temperature in Celsius | Current |
| apparentTemperatureC | Feels-like temperature | Current |
| humidityPercent | Relative humidity | Current |
| precipitationMm | Current precipitation | Current |
| weatherCode | WMO condition code | Current / hourly / daily |
| cloudCoverPercent | Cloud cover | Current |
| windSpeedKmh | Wind speed | Current / hourly |
| windDirectionDeg | Wind direction | Current |
| uvIndex | Ultraviolet index | Current or matching hour |
| visibilityM | Visibility in meters | Current or matching hour |
| hourly[].time | Local hourly timestamp | Hourly |
| hourly[].precipitationProbability | Chance of precipitation | Hourly |
| daily[].date | Local calendar date | Daily |
| daily[].temperatureMinC / MaxC | Daily range | Daily |
| daily[].sunrise / sunset | Sun times | Daily |
| fetchedAt | Time of last successful fetch | Client |
| fromCache | Whether the in-memory cache was used | Client |

Missing optional numbers are stored as `null`, not `0`.

### 12.3 Stored documents

Unit preference:

```json
"celsius"
```

Favorites:

```json
[
  {
    "id": "2950159",
    "name": "Berlin",
    "latitude": 52.52,
    "longitude": 13.41,
    "admin1": "Berlin",
    "country": "Germany"
  }
]
```

Browser keys: `weather-dashboard:units` and `weather-dashboard:favorites`.

A database server is not required in the current version because weather comes from Open-Meteo and preferences stay on the local device.

---

## CHAPTER 13
## ALGORITHMS AND WORKFLOWS

### 13.1 Search city

1. Read the typed text.
2. If it has fewer than 2 characters, do not call the API.
3. Wait 400 ms without further typing.
4. Call `https://geocoding-api.open-meteo.com/v1/search`.
5. Keep a request id. If a newer search has started, ignore this response.
6. Show city, region, and country.
7. On select, convert the result to a `SelectedLocation`.

```text
Type city name
        →
Wait 400 ms
        →
Geocoding results
        →
User selects one place
        →
latitude + longitude known
        →
Forecast request
```

**Figure 3: City search and weather fetch workflow**

### 13.2 Fetch weather

1. Validate latitude and longitude.
2. If a cache entry younger than 10 minutes exists and refresh was not forced, return it and mark `fromCache`.
3. Build the forecast URL with current, hourly, and daily variables.
4. Check `response.ok` and parse JSON.
5. Normalize arrays into `current`, `hourly`, and `daily`.
6. If almost everything is missing, throw an invalid-response error.
7. Store the result in the memory cache.

### 13.3 Display temperature

1. If the Celsius value is missing → Unavailable.
2. If the unit is Fahrenheit → convert with (°C × 9/5) + 32.
3. Otherwise show Celsius.

### 13.4 Map a weather code

1. If the code is not an integer → Condition unavailable.
2. If the code is in the WMO table → official description and icon.
3. Otherwise → Unrecognized weather condition.

### 13.5 Upcoming hourly slice

1. Find the first hourly time that is greater than or equal to the current observation time.
2. Take the next 24 items from that index.
3. If the current time is missing, take the first 24 items.

### 13.6 Favorite add and remove

1. Compare cities by latitude and longitude, not only by name.
2. If the city is already saved, do not add it again.
3. Remove by the same coordinate match.
4. Write the list to LocalStorage. If writing fails, the app still remains usable.

### 13.7 URL restore

1. Read `lat`, `lon`, and `name`.
2. Reject non-numeric values and out-of-range coordinates.
3. Trim and shorten the name. Remove `<` and `>`.
4. If valid, load that location. If not, show the empty state.

---

## CHAPTER 14
## USER INTERFACE AND MODULES

### 14.1 Layout module

`AppLayout` draws the shell:

- brand name Weather Dashboard
- search field
- unit toggle, Use my location, and Refresh
- favorite cities on the left (stacked on a phone)
- skip-to-content link
- footer attribution to Open-Meteo

### 14.2 Dashboard module

File: `src/pages/DashboardPage.tsx`

Purpose: connect search, weather, favorites, units, URL, and geolocation. This is the only main page.

### 14.3 Search module

File: `src/components/search/CitySearch.tsx`

Purpose: find a city and force a clear selection.

### 14.4 Weather module

Files: `src/components/weather/*`

Purpose: current card, metric cards, unit toggle, and weather icons.

### 14.5 Forecast and chart modules

Files: `src/components/forecast/*` and `src/components/charts/TemperatureChart.tsx`

Purpose: hourly row, seven-day list, and temperature trend.

### 14.6 Favorites module

File: `src/components/favorites/FavoriteList.tsx`

Purpose: show saved cities, load one, or remove one.

### 14.7 Shared UI module

Reusable pieces:

- Button — primary, secondary, ghost
- Card — glass-style panel
- Input — search field
- Skeleton — loading placeholder
- EmptyState — first-visit message
- ErrorBanner — failure and retry

Using shared components keeps the look consistent and avoids copy-paste.

### 14.8 Visual design

The design is meant to feel like a calm weather desk, not a neon startup:

- dark navy / deep blue background
- a restrained blue-to-purple glow
- rounded cards with light borders
- large readable temperature
- DM Sans typography
- Lucide icons instead of emojis

There are no unused extra pages.

---

## CHAPTER 15
## IMPLEMENTATION DETAILS

### 15.1 Tools used in the actual project

- React 19
- Vite
- TypeScript (strict mode)
- Tailwind CSS 4
- Lucide React
- Recharts
- date-fns
- Vitest and React Testing Library
- ESLint
- npm

### 15.2 Important source files

| File | Responsibility |
| --- | --- |
| `src/types/weather.ts` | API and normalized weather types |
| `src/types/location.ts` | City and unit types |
| `src/services/apiClient.ts` | HTTPS fetch, timeout, HTTP errors |
| `src/services/geocoding.ts` | Search and reverse geocode |
| `src/services/weather.ts` | Forecast fetch, cache, normalize |
| `src/utils/temperature.ts` | Celsius to Fahrenheit |
| `src/utils/weatherCodes.ts` | WMO descriptions and icons |
| `src/utils/storage.ts` | Safe LocalStorage read and write |
| `src/hooks/useWeather.ts` | Load and refresh one city |
| `src/pages/DashboardPage.tsx` | Screen wiring |
| `vercel.json` | SPA rewrite for hosting |

### 15.3 Why API calls are not inside cards

A beginner might call `fetch` inside the temperature card and again inside the chart. That would be a mistake, because both views must show the same city and the same units. The service layer fetches once. Hooks keep the result. Cards only display it.

### 15.4 Why available measurements are not invented

If the user could see UV = 0 when the API sent no UV value, the stock of information would be a lie. Formatters return Unavailable. Weather code 0 means clear sky. A missing code means unknown.

### 15.5 Safe JSON parsing

`JSON.parse` can throw if LocalStorage text is broken. `storage.ts` wraps parsing in try/catch, checks the shape, and falls back to a default. The app does not crash the page.

### 15.6 Deployment implementation

`npm run build` runs TypeScript and Vite. The result is static files. Vercel does not need environment variables. `vercel.json` contains:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This is required so that a refreshed URL still opens the React app.

---

## CHAPTER 16
## INPUT VALIDATION AND ERROR HANDLING

Validation protects the dashboard from garbage data.

**City search**

- Fewer than 2 characters: no request
- No matches: friendly empty message
- Network or API error: message in the result list
- Stale response: ignored

**URL parameters**

- Latitude must be a finite number between −90 and 90
- Longitude must be a finite number between −180 and 180
- Name is required, trimmed, shortened, and stripped of `<` and `>`
- Invalid values do not start a weather request

**Weather payload**

- `response.ok` must be true
- HTTP 429 is shown as a rate-limit message
- Timeout, offline, and network errors have separate messages
- Missing fields become `null`
- A payload with no usable current, hourly, or daily data is rejected

**Favorites and units**

- A favorite needs a name and finite coordinates
- Broken LocalStorage is ignored and replaced by a safe default
- Units accept only `celsius` or `fahrenheit`

**Geolocation**

- Requested only after a click
- Denied, timeout, and unavailable positions show a clear message
- Search still works

The user always sees either a form / search message, a skeleton, or an error banner. There are no dummy buttons that do nothing.

---

## CHAPTER 17
## TESTING

Automated tests use Vitest and React Testing Library. Live Open-Meteo calls are mocked. The following commands were executed in the project folder during development. They do not include a live Vercel deployment or a user survey.

| Command | Date run | Result | Notes |
| --- | --- | --- | --- |
| `npm run test` | 23 Oct 2026 | Pass | 9 test files, 17 tests passed |
| `npm run typecheck` | 23 Oct 2026 | Pass | `tsc -b` completed with no errors |
| `npm run lint` | 23 Oct 2026 | Pass | ESLint completed with no errors |
| `npm run build` | 23 Oct 2026 | Pass | Vite wrote production files to `dist/` |

Covered automated cases include Celsius conversion, weather-code mapping, API normalization, missing values, error and loading states, search selection, favorites, the unit toggle, and forecast rendering.

The student should still click through the app before the viva.

**Table 6: Manual test cases**

| ID | Test case | Steps | Expected result | Result (fill) |
| --- | --- | --- | --- | --- |
| T01 | First visit | Open the app | Empty search state, no fake weather | |
| T02 | Search | Type Berlin and wait | A result list appears | |
| T03 | Select city | Click one result | Current weather and forecasts load | |
| T04 | Ambiguous name | Search Springfield | Several places; weather waits for a click | |
| T05 | No results | Search a nonsense name | No matching city message | |
| T06 | Unit toggle | Switch °C to °F | Temperatures and chart update | |
| T07 | Refresh page | Reload after a city is selected | Same city returns from the URL | |
| T08 | Favorite add | Save city, reload | City remains in the sidebar | |
| T09 | Favorite duplicate | Save the same city again | Still one entry | |
| T10 | Favorite remove | Remove the saved city | Empty favorites text | |
| T11 | Location deny | Use my location → Block | Error message; search still works | |
| T12 | Refresh button | Click Refresh | Last-update time changes or cache note appears | |
| T13 | Offline | Disconnect the network | Offline banner | |
| T14 | Mobile | Narrow the window | Search on top, hourly row scrolls, no page overflow | |
| T15 | Attribution | Scroll to the footer | Link to Open-Meteo.com | |

Do not write “Pass” in this table until you have performed the step.

---

## CHAPTER 18
## SNAPSHOTS / SCREENSHOTS

Paste your own screenshots in the empty boxes below. Do not use images copied from another project. Capture them from this Weather Dashboard while it is running.

**Figure 5 — Empty / first visit**

```
[ Paste screenshot here ]
```

Caption: Search field, empty state, and favorite-cities sidebar before any city is selected.

**Figure 6 — City search results**

```
[ Paste screenshot here ]
```

Caption: Matching cities with region and country. Weather has not loaded yet.

**Figure 7 — Current weather card**

```
[ Paste screenshot here ]
```

Caption: Selected city, local time, large temperature, condition, feels-like, sunrise, and sunset.

**Figure 8 — Weather metrics**

```
[ Paste screenshot here ]
```

Caption: Feels-like, humidity, wind, precipitation, cloud cover, UV index, and visibility.

**Figure 9 — Hourly forecast and temperature chart**

```
[ Paste screenshot here ]
```

Caption: Next 24 hours and the Recharts temperature trend using the same API values.

**Figure 10 — Seven-day forecast**

```
[ Paste screenshot here ]
```

Caption: Each day labeled by its real date, with min/max temperature and precipitation.

**Figure 11 — Mobile layout**

```
[ Paste screenshot here ]
```

Caption: Compact header, search near the top, stacked cards, and a horizontally scrollable hourly row.

---

## CHAPTER 19
## LIMITATIONS

A good report tells the examiner what the software cannot do.

1. Forecasts are model estimates. They can be wrong.
2. The app is not an official emergency warning system.
3. Open-Meteo’s free public API is for non-commercial use under its terms.
4. Favorites and the unit preference stay in one browser. A second PC has a different list.
5. There is no login. Anyone who opens the site on that browser can change favorites.
6. Data can be lost if the user clears site data or uses a private window.
7. Some optional values, such as UV index or visibility, may be unavailable.
8. Precise location is not a history, but a saved favorite can keep a city the user chose.
9. Rate limits may apply if too many requests are sent.
10. This is not a replacement for the India Meteorological Department or any national weather service.

These limits were accepted so that the project could be finished and explained.

---

## CHAPTER 20
## CONCLUSION

The project Weather Dashboard meets the aim of a college mini project: a complete, working weather application that a student can run and explain.

It provides city search, current conditions, hourly forecast, a temperature chart, a seven-day outlook, unit conversion, favorite cities, optional geolocation, URL restore, and persistence after refresh. API rules are centralized, so missing values stay honest and temperatures are not converted twice. The interface is usable on a phone. The system can be hosted on Vercel without a database.

The most important technical lesson is this: a weather program is not only a card that shows a number. It is a set of rules. Those rules — do not fetch an ambiguous city, do not invent a zero, do not treat a missing code as clear sky — are what make the software trustworthy.

The most important academic lesson is honesty about the data source. The project solves the weather-desk problem for one browser using Open-Meteo. It does not pretend to be a national warning service.

---

## CHAPTER 21
## FUTURE ENHANCEMENT

If more time is given, the same project can grow in these directions:

1. Additional units — mph or inches, implemented correctly, not as a dummy toggle.
2. Multi-city comparison — two saved cities on one screen.
3. Official warning feed — only with a licensed provider.
4. JSON export / import — a backup of favorites.
5. Progressive Web App — keep the last successful forecast offline.
6. Account sync — only after a real server exists; LocalStorage favorites are not a cloud account.
7. Optional backend — Express or another API, if the department wants a shared cache. The same weather types can be reused.
8. Login — only after a real server exists; a fake login in LocalStorage is not real security.

---

## REFERENCES

1. Open-Meteo. *Weather Forecast API documentation*. https://open-meteo.com/en/docs
2. Open-Meteo. *Geocoding API documentation*. https://open-meteo.com/en/docs/geocoding-api
3. Open-Meteo. *Terms*. https://open-meteo.com/en/terms
4. React. *React documentation*. https://react.dev
5. TypeScript. *TypeScript handbook*. https://www.typescriptlang.org/docs/
6. Vite. *Vite documentation*. https://vite.dev
7. Tailwind CSS. *Tailwind documentation*. https://tailwindcss.com/docs
8. Vitest. *Vitest documentation*. https://vitest.dev
9. Testing Library. *React Testing Library*. https://testing-library.com/docs/react-testing-library/intro/
10. Vercel. *Vercel documentation*. https://vercel.com/docs
11. World Meteorological Organization. Weather interpretation codes as used by Open-Meteo WMO WW mappings.

A longer viva question set is kept in `docs/VIVA_QUESTIONS.md`. The user guide is in `docs/USER_GUIDE.md`.

Live URLs should be written only after they exist:

- Deployed URL: `[Vercel URL]`
- GitHub URL: `[GitHub Repository URL]`
