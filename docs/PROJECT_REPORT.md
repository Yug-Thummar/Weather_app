# Weather Dashboard

## A Web-Based Current Weather and Forecast Application

**College Mini Project Report**

---

### Title page template

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

Weather Dashboard is a single-page web application that displays current weather conditions and upcoming forecasts for user-selected cities. Users search worldwide place names through the Open-Meteo Geocoding API and then load current, hourly, and daily variables from the Open-Meteo Forecast API. The interface presents temperature, apparent temperature, humidity, wind, precipitation, cloud cover, UV index, visibility, sunrise, sunset, a 24-hour forecast, a temperature chart, and a seven-day outlook.

The software is implemented with React, TypeScript, Vite, and Tailwind CSS. Browser `localStorage` stores the temperature unit and favorite cities. Optional geolocation is requested only after the user clicks a button. The selected city can be restored from validated URL query parameters. The project includes unit and component tests, documentation, and instructions for static deployment on Vercel.

The application is informational. It does not guarantee forecast accuracy and does not replace official meteorological warnings.

**Keywords:** weather dashboard, React, TypeScript, Open-Meteo, geocoding, forecast API, Vercel

---

## 1. Introduction

Accurate, readable weather information helps people decide whether to travel, exercise outdoors, or carry rain protection. Many student projects either display a single temperature or invent sample JSON. This mini project instead integrates public HTTPS APIs, normalizes incomplete responses, and presents the result in a responsive dashboard.

The system is a front-end application. It does not require a custom backend or database in the current version because weather data is supplied by Open-Meteo and user preferences remain on the local device.

---

## 2. Problem statement

Users need answers to practical questions:

- What is the current temperature in a chosen city?
- Does it feel hotter or colder than the measured temperature?
- Is rain expected in the next few hours?
- What is the seven-day outlook?
- What are humidity, wind, precipitation probability, and UV index?

Existing student examples often fail when a city name is ambiguous, when an API field is missing, or when the layout is used on a phone. The problem addressed here is to design and implement a complete, explainable dashboard that uses real weather data and handles those cases honestly.

---

## 3. Existing system and proposed system

### 3.1 Existing system

People currently check weather through mobile OS widgets, commercial websites, or simple tutorial apps. Commercial products are feature-rich but are not suitable as a student implementation to explain in a viva. Tutorial apps frequently hard-code one city or skip error handling.

### 3.2 Proposed system

The proposed system is a browser-based Weather Dashboard that:

- searches cities with Open-Meteo geocoding
- fetches live forecast data for the selected coordinates
- shows current, hourly, and daily weather
- supports Celsius and Fahrenheit
- stores favorites locally
- remains usable if geolocation is denied
- documents APIs, tests, and deployment

---

## 4. Objectives and scope

### 4.1 Objectives

1. Design a maintainable front-end architecture with typed models and a dedicated API layer.
2. Implement city search, current weather, hourly forecast, charting, and seven-day forecast.
3. Handle loading, empty, error, offline, and missing-value states.
4. Persist unit preference and favorites in the browser.
5. Prepare the project for GitHub hosting and Vercel deployment.

### 4.2 Scope

**In scope:** one dashboard page, Open-Meteo integration, local favorites, optional geolocation, URL state, tests, and documentation.

**Out of scope:** user accounts, a server database, paid commercial weather plans, severe-weather alert ingestion, and native mobile applications.

---

## 5. Functional requirements

| ID | Requirement | Status in this version |
| --- | --- | --- |
| FR-01 | Search cities by name using geocoding | Implemented |
| FR-02 | Select a search result before fetching weather | Implemented |
| FR-03 | Display current conditions from the forecast API | Implemented |
| FR-04 | Display hourly forecast and temperature chart | Implemented |
| FR-05 | Display seven-day forecast with local dates | Implemented |
| FR-06 | Toggle Celsius and Fahrenheit | Implemented |
| FR-07 | Save and remove favorite cities | Implemented |
| FR-08 | Optional current-location weather | Implemented |
| FR-09 | Restore a valid city from the URL | Implemented |
| FR-10 | Manual refresh and last-update time | Implemented |
| FR-11 | Show attribution to Open-Meteo | Implemented |

---

## 6. Non-functional requirements

| ID | Requirement | Approach |
| --- | --- | --- |
| NFR-01 | Responsiveness | Desktop sidebar layout and stacked mobile layout |
| NFR-02 | Accessibility | Labels, keyboard search, focus styles, reduced motion |
| NFR-03 | Reliability | Timeout, abort, `response.ok` checks, user-facing errors |
| NFR-04 | Performance | Debounced search, in-memory cache, lazy-loaded chart |
| NFR-05 | Privacy | No location history; geolocation only on click |
| NFR-06 | Maintainability | TypeScript strict mode, services separated from UI |

---

## 7. Hardware and software requirements

### 7.1 Hardware (development and demonstration)

- A computer capable of running Node.js and a modern browser
- Internet access for Open-Meteo requests
- Optional: a smartphone or browser device-emulation tools to show the mobile layout

Exact laboratory PC specifications should be filled by the student if the college requires a measured configuration:

- Processor: `[Processor]`
- RAM: `[RAM]`
- Storage: `[Storage]`

### 7.2 Software

- Node.js 20 or later
- npm
- Git
- A modern browser
- Visual Studio Code or Cursor for development
- Optional: a GitHub account and a Vercel account for hosting

---

## 8. Technology selection and justification

React is used because the dashboard is a tree of reusable cards and lists. TypeScript is used so Open-Meteo payloads can be normalized into explicit interfaces. Vite provides a fast local server and a static production build suitable for Vercel. Tailwind CSS implements spacing, typography, and breakpoints without a large custom CSS codebase. Lucide React supplies a consistent icon set so emojis are not the primary weather symbols. Recharts draws the hourly temperature line from actual API values. date-fns formats dates. Vitest and React Testing Library verify conversion, mapping, and UI behavior without live network calls.

Open-Meteo was selected because it exposes HTTPS geocoding and forecast endpoints that can be used for non-commercial educational work without embedding a secret API key in the browser. If the project is later used commercially, a licensed plan must be chosen.

---

## 9. System architecture

The architecture is a client-side layered design:

1. **Presentation layer:** layout, search, weather cards, forecast lists, chart, favorites.
2. **State layer:** React hooks for location, weather, units, favorites, geolocation, URL, and online status.
3. **Service layer:** `apiClient`, geocoding, and weather modules.
4. **Utility layer:** temperature conversion, WMO codes, date/time, wind, and storage helpers.
5. **External services:** Open-Meteo Geocoding API and Forecast API.

There is no application server in the current version. The browser talks to Open-Meteo directly.

---

## 10. Module descriptions

| Module | Responsibility |
| --- | --- |
| `CitySearch` | Debounced search, result list, keyboard selection |
| `CurrentWeatherCard` | City heading, temperature, condition, sunrise/sunset |
| `WeatherMetrics` | Reusable metric cards |
| `HourlyForecast` | Next 24 hours |
| `TemperatureChart` | Recharts line chart |
| `DailyForecast` | Seven-day list |
| `FavoriteList` | Local saved cities |
| `useWeather` | Fetch, cache awareness, refresh, stale-request protection |
| `geocoding.ts` | Forward and reverse geocoding |
| `weather.ts` | Forecast request and normalization |

---

## 11. Data flow

1. User input enters the search field.
2. After debounce, geocoding JSON is requested.
3. User selects one result.
4. Coordinates are stored in React state and written to the URL.
5. Forecast JSON is requested.
6. The service validates the payload and produces `NormalizedWeather`.
7. Components format values for the selected unit.
8. Optional favorite changes are written to `localStorage`.

If the request fails, the UI shows an error and a retry action. Previous weather for a newly selected city is not kept on screen as if it belonged to the new city.

---

## 12. API integration

### 12.1 Geocoding

Endpoint: `https://geocoding-api.open-meteo.com/v1/search`

Important parameters: `name`, `count`, `language`, `format`.

### 12.2 Forecast

Endpoint: `https://api.open-meteo.com/v1/forecast`

Important parameters: `latitude`, `longitude`, `current`, `hourly`, `daily`, `timezone=auto`, `forecast_days=7`, metric units.

### 12.3 Error handling

The client handles network failure, timeout, non-OK HTTP status, rate limiting (`429`), malformed JSON, and API `error` payloads. Messages shown to users are plain language.

---

## 13. Database design

A relational or NoSQL database is **not required** in the current version.

| Data | Storage | Reason |
| --- | --- | --- |
| Weather observations and forecasts | Open-Meteo, fetched on demand | Avoid duplicating a meteorological database |
| Favorite cities | `localStorage` | Mini-project scope; no accounts |
| Temperature unit | `localStorage` | Preference only |
| Selected city | URL query parameters | Share and refresh |

A future database would be justified only for registered users, cloud-synced favorites, or stored alert subscriptions.

---

## 14. Algorithms and pseudocode

### 14.1 Search debounce and stale-response ignore

```text
onQueryChange(query):
  wait 400 ms without further typing
  increment requestId
  results = geocodingSearch(query)
  if requestId is still current:
    show results
```

### 14.2 Temperature display

```text
displayTemperature(celsius, unit):
  if celsius is missing:
    return "Unavailable"
  if unit is Fahrenheit:
    return format((celsius * 9 / 5) + 32)
  return format(celsius)
```

### 14.3 Weather code mapping

```text
interpret(code):
  if code is not an integer:
    return unknown / unavailable
  if code exists in WMO table:
    return official description and icon
  return unrecognized condition
```

### 14.4 Upcoming hourly slice

```text
upcomingHours(hourly, currentTime):
  find first hourly time >= currentTime
  return the next 24 items from that index
```

---

## 15. Implementation details

The dashboard is a React function-component application. TypeScript interfaces describe both raw Open-Meteo payloads and normalized application models. Tailwind CSS provides the dark navy visual design, card layout, and breakpoints. shadcn-style primitives (`Button`, `Card`, `Input`, `Skeleton`) keep repeated controls consistent.

Favorites compare coordinates so the same place is not stored twice. URL parameters are validated for numeric latitude and longitude ranges before use. The chart is lazy-loaded because Recharts is a heavier dependency than the rest of the page.

---

## 16. Testing strategy and test cases

Testing uses Vitest and React Testing Library. Live APIs are not called.

| Test case | Expected result | Automated? |
| --- | --- | --- |
| 0°C converts to 32°F | Pass | Yes |
| Missing weather code is not shown as clear | Pass if `npm run test` succeeds | Yes |
| Valid forecast JSON normalizes to typed objects | Pass if tests succeed | Yes |
| Missing UV/visibility become null | Pass if tests succeed | Yes |
| Error banner offers retry | Pass if tests succeed | Yes |
| Search requires selecting a result | Pass if tests succeed | Yes |
| Favorites add once and remove | Pass if tests succeed | Yes |
| Unit toggle updates displayed temperature | Pass if tests succeed | Yes |
| Daily forecast renders API dates | Pass if tests succeed | Yes |

**Actual test results:** the commands below were executed in the project folder during development. They do not include a live Vercel deployment or a user survey.

| Command | Date run | Result | Notes |
| --- | --- | --- | --- |
| `npm run test` | 23 Oct 2026 | Pass | 9 test files, 17 tests passed (Vitest) |
| `npm run typecheck` | 23 Oct 2026 | Pass | `tsc -b` completed with no errors |
| `npm run lint` | 23 Oct 2026 | Pass | ESLint completed with no errors |
| `npm run build` | 23 Oct 2026 | Pass | Vite wrote production files to `dist/` |

Manual demonstration checklist for the viva:

- Search a unique city and a duplicated name.
- Switch °C / °F.
- Save and remove a favorite, then refresh the browser.
- Deny geolocation and confirm search still works.
- Disconnect the network if possible and observe the offline message.

Screenshots should be captured by the student during demonstration. This report does not include fabricated screenshots or user-survey results.

---

## 17. Security and privacy considerations

- External requests use HTTPS.
- No secret credentials are committed.
- User input is not executed as code.
- Search strings are sent only as geocoding query parameters.
- Geolocation is opt-in.
- Precise location history is not stored.
- Favorites may include a city the user saved; that is intentional and local.

---

## 18. Deployment procedure

1. Confirm `npm run build` produces `dist/`.
2. Push the source to GitHub.
3. Import the repository in Vercel as a Vite project.
4. Use build command `npm run build` and output directory `dist`.
5. Deploy and test city search on the live URL.
6. Optional: attach a custom domain in Vercel domain settings.

A live production URL should be written here only after deployment actually succeeds:

- Deployed URL: `[Vercel URL]`
- GitHub URL: `[GitHub Repository URL]`

---

## 19. Limitations

- Forecast skill varies by region and model.
- The product is not an emergency warning system.
- Open-Meteo free public use is non-commercial under applicable terms.
- Favorites do not synchronize across devices.
- Some variables can be unavailable.

---

## 20. Future scope

- Wind and precipitation unit options
- Comparison of two saved cities
- Licensed alert data
- Authenticated favorite sync
- Progressive Web App caching of the last successful forecast

---

## 21. Conclusion

Weather Dashboard demonstrates a complete student web application: real API integration, typed data normalization, responsive UI, persistence, testing, and deployment documentation. The work is suitable for laboratory demonstration and viva explanation, provided the student fills institutional details and records locally verified test and deployment outcomes.

---

## 22. References

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

---

## 23. Viva questions and answers

A longer question set is maintained in `docs/VIVA_QUESTIONS.md`. A short sample is included here.

**Q. Why is there no backend?**
A. Weather is read from Open-Meteo, and preferences are local. A backend is unnecessary for the current educational scope.

**Q. How do you avoid showing the previous city’s weather as the new city?**
A. Changing the selected location clears the previous weather object and shows a loading skeleton until the new request succeeds.

**Q. How are missing API values shown?**
A. Normalization stores `null`, and formatters return `Unavailable` instead of `0`.
