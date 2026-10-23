# Weather Dashboard Viva Questions and Answers

These questions are written for a college viva. Answers match the implemented Weather Dashboard project.

## 1. What is the aim of this project?

The aim is to build a working weather dashboard that helps a user understand current conditions and upcoming forecasts for a selected city. The application uses real Open-Meteo APIs rather than hard-coded weather data.

## 2. Why did you choose React?

React is suitable for a dashboard made of reusable cards, lists, and form controls. Component state and hooks keep search, weather loading, favorites, and unit preference separate while still rendering one page.

## 3. What is the difference between a component and a page in this project?

`DashboardPage` is the screen that coordinates application state. Components such as `CurrentWeatherCard` and `HourlyForecast` receive data and render it. This keeps presentation components from calling the API directly.

## 4. What is TypeScript, and why is strict mode useful?

TypeScript adds static types to JavaScript. Strict mode, together with checks such as unused variables, reduces accidental `any` values and makes API response shapes explicit. The weather objects in this project are typed so a missing temperature is `number | null`, not a silent zero.

## 5. What is Vite, and how is it different from older bundlers?

Vite is the development tool and production bundler. In development it serves source files quickly using native ES modules. For production it bundles the app into static files in `dist/`.

## 6. What is JSX?

JSX is a syntax that looks like HTML inside JavaScript or TypeScript. The compiler turns it into React element creation calls. For example, the current weather card is written in JSX but still runs as JavaScript.

## 7. What is the difference between props and state?

Props are inputs passed into a component, such as the selected temperature unit. State is data a component owns and can update, such as the search text or the selected city. Changing state causes a re-render.

## 8. What is a React hook?

A hook is a function that lets a function component use React features. This project uses `useState`, `useEffect`, `useMemo`, `useCallback`, and custom hooks such as `useWeather` and `useFavorites`.

## 9. Why should API calls stay out of presentational components?

If a card component fetches data, it becomes harder to test, reuse, and reason about. The service layer performs HTTP requests. Hooks call those services. Cards receive already-normalized weather objects.

## 10. What is an API?

An API, or Application Programming Interface, is a contract for requesting data or behavior from another system. This project uses HTTP JSON APIs provided by Open-Meteo.

## 11. What is JSON?

JSON is a text format for structured data. Open-Meteo returns objects and arrays such as `"temperature_2m": 18.4` and `"hourly": { "time": [...] }`. The application parses JSON only after checking that the HTTP response is usable.

## 12. What is the difference between GET and POST?

GET retrieves data and should not change server state. POST submits data that may create or change a resource. Weather Dashboard only needs GET, because it reads geocoding and forecast data.

## 13. What does an HTTP status code tell you?

It tells you whether the request succeeded. `200` is success. `400` often means a bad parameter. `429` means too many requests. The client checks `response.ok` and shows a friendly message instead of a stack trace.

## 14. What is HTTPS, and why does it matter here?

HTTPS is HTTP over TLS. It encrypts data in transit. All Open-Meteo requests in this project use `https://` URLs.

## 15. What is asynchronous JavaScript?

Asynchronous code starts a task, such as a network request, and continues without freezing the UI. The weather request is asynchronous because the browser must wait for Open-Meteo without blocking search input.

## 16. What is a Promise?

A Promise represents a future result. `fetch` returns a Promise that later resolves with a Response or rejects on a network failure.

## 17. What are `async` and `await`?

They are syntax for working with Promises. `await fetchJson(...)` pauses that function until the request finishes, while the rest of the UI stays responsive. Errors are handled with `try/catch` or Promise `.catch`.

## 18. What is `AbortController`?

`AbortController` cancels an in-flight `fetch`. If the user selects a new city or types a new search, the previous request is aborted so an old response cannot overwrite newer state.

## 19. How does city search work?

The user types a name. After 400 ms of inactivity, the app calls the Open-Meteo Geocoding API. Matching cities are shown. Weather is requested only after a result is selected, using that result’s latitude and longitude.

## 20. What is geocoding?

Geocoding converts a place name into coordinates. Reverse geocoding converts coordinates into a place name. This project uses both: search uses forward geocoding, and the location button uses reverse geocoding when possible.

## 21. Why can two cities share the same name?

Names such as Springfield are not unique. The geocoding API returns region and country so the user can choose the correct place. The dashboard does not guess.

## 22. How is weather data fetched?

The forecast service builds a URL with `URLSearchParams`, including current, hourly, and daily variable lists, `timezone=auto`, and metric units. It sends a GET request to `https://api.open-meteo.com/v1/forecast`.

## 23. What are WMO weather codes?

They are numeric weather-condition codes. Open-Meteo returns numbers such as `0` for clear sky and `61` for slight rain. The project maps codes to descriptions and icons. A missing code is shown as unavailable, never assumed to be clear.

## 24. How do you convert Celsius to Fahrenheit?

The formula is `°F = (°C × 9/5) + 32`. The API is always requested in Celsius. The UI converts only for display, which avoids double conversion.

## 25. Why is `localStorage` used?

It stores non-sensitive preferences on the current device: temperature unit and favorite cities. No login or database is required for this mini project.

## 26. What are the limitations of `localStorage`?

It is per browser and origin, can be cleared by the user, is not shared across devices, and should not store secrets. This project stores only unit preference and saved city details.

## 27. How does the shareable URL work?

Selected latitude, longitude, and city name are written to query parameters. On reload, the app reads and validates them before fetching. Invalid coordinates are rejected.

## 28. How is responsive design implemented?

Tailwind CSS classes change the layout by screen size. The desktop view uses a sidebar and dashboard grid. The mobile view stacks content, keeps search near the top, and makes the hourly forecast scroll horizontally.

## 29. What accessibility features did you add?

Labeled search input, `aria-label` on icon-only buttons, keyboard support in search, visible focus styles, skip-to-content link, `role="alert"` for errors, and reduced-motion CSS.

## 30. How did you test the application?

Vitest and React Testing Library run unit and component tests. Network calls are mocked. Tests cover conversion, weather codes, normalization, missing values, error and loading states, search selection, favorites, the unit toggle, and forecast rendering.

## 31. What is the difference between unit tests and component tests?

A unit test checks a pure function, such as Celsius conversion. A component test renders UI, simulates clicks or typing, and asserts what the user would see.

## 32. Why mock API requests in tests?

Live APIs can be slow, rate-limited, or unavailable. Tests should be deterministic. Mocking lets us supply a known JSON payload, including invalid data.

## 33. What is Git, and what is GitHub?

Git records versions of the project locally. GitHub hosts a remote copy so the student, guide, and Vercel can access the same repository.

## 34. What is Vercel?

Vercel hosts the production static site. It builds `npm run build`, publishes `dist/`, and provides HTTPS. This project needs no serverless functions.

## 35. Why is there no database?

The current version is a client-side dashboard. Weather comes from Open-Meteo. Favorites stay in the browser. A database would be needed only for accounts or cross-device sync, which are future enhancements.

## 36. What security and privacy choices did you make?

No API secrets are stored in the client. There is no `eval` and no HTML injection of API strings as markup. Location is requested only after a button click. Precise location history is not stored. URL parameters contain only the selected public place.

## 37. What happens if the user is offline?

The application listens for browser online/offline events and shows a clear offline message. It does not pretend that a new forecast was fetched.

## 38. What are the project limitations?

Forecasts can be wrong. There are no official warnings. Some variables may be missing. Favorites do not sync. Open-Meteo’s free public API is for non-commercial use under its terms.

## 39. How would you extend the project?

Possible next steps are additional units, comparison of two cities, a licensed warning API, and account-based favorite sync. Those features are not claimed as complete.

## 40. What did you learn by building this dashboard?

The project connects frontend components, typed API responses, asynchronous HTTP, error handling, local persistence, responsive UI, testing, and deployment into one understandable student application.
