# Weather Dashboard User Guide

This guide explains how to use the Weather Dashboard as an end user. The application is a student mini project. It shows estimated weather conditions from Open-Meteo and is not an official warning service.

## 1. Open the dashboard

After the application is running locally or deployed, open it in a modern browser such as Chrome, Edge, Firefox, or Safari.

You should see:

- the Weather Dashboard title
- a city search field
- Celsius/Fahrenheit controls
- a Use my location button
- a Refresh button
- an empty state inviting you to search for a city
- Open-Meteo attribution in the footer

## 2. Search for a city

1. Click the search field near the top of the page.
2. Type a city name, for example `Mumbai` or `London`.
3. You can add a country or region when the name is common, for example `Paris, France` or `Springfield, Illinois`.
4. Wait a moment. The application waits briefly before sending a search request so it does not query the API on every keystroke.
5. Review the matching places. Each result shows the city, region or state when available, and country.
6. Click a result, or use the arrow keys and press Enter.

Weather is fetched only after you choose a result. Typing an ambiguous name does not load a random city.

If no place matches, the search list explains that nothing was found. Try a different spelling or add a country name.

## 3. Read the current weather

The large card shows:

- city name, region, and country
- current local time for that place
- temperature
- weather condition and icon
- feels-like temperature
- sunrise and sunset

If a value is missing from the API, the dashboard shows `Unavailable` instead of a misleading zero.

## 4. Review hourly and seven-day forecasts

- The hourly row shows the next 24 hours, or as many upcoming hours as the API returned.
- On a phone, swipe the hourly row sideways. The page itself should not overflow horizontally.
- The temperature chart uses the same hourly values.
- The seven-day list labels each row by its actual local date. The first row is not assumed to be tomorrow.

Each daily row includes condition, minimum and maximum temperature, precipitation probability, and rainfall when available.

## 5. Understand the metric cards

The metrics grid includes feels-like temperature, humidity, wind speed, wind direction, precipitation, cloud cover, UV index, and visibility.

These cards are based on Open-Meteo variables. Visibility is requested from the forecast API and shown only from returned data. If UV index or visibility is absent, the card says `Unavailable`.

Planning notes, when shown, are short observations derived from those values, such as rain in the next few hours. They are not official alerts.

## 6. Switch temperature units

Celsius is the default.

Use the °C and °F buttons to change the unit. The selected button is highlighted. All temperatures, including the chart, update together. The preference is stored in this browser and restored the next time you open the dashboard.

Wind remains in km/h and precipitation remains in millimeters in this version.

## 7. Save favorite cities

1. Load a city.
2. Click **Save city**.
3. The city appears in the Favorite cities section.

Click a saved city to load it again. Click the remove button to delete it from the list. The same city is not added twice.

Favorites are stored in this browser only. They do not create an account and they do not appear automatically on another phone or computer.

## 8. Use your current location

1. Click **Use my location**.
2. Read the on-screen explanation. The application asks for location only after this click so it can fetch weather for your coordinates.
3. Allow or deny the browser permission prompt.

If you allow it, the dashboard reverse-geocodes the coordinates when the API can provide a place name. If a name is not available, it still loads weather for those coordinates as `Current location`.

If you deny permission, the dashboard says so and remains fully usable through city search. The application does not claim that location worked.

## 9. Share or refresh a location

When a city is selected, the address bar includes query parameters such as `lat`, `lon`, and `name`. Copying the URL lets another person open the same place, provided the values are valid.

Refresh the page to restore a valid location from the URL. Invalid coordinates are ignored.

Click **Refresh** to request a new forecast for the selected city. The last successful update time is shown. If a recent in-memory cache is used, the dashboard says it is showing cached data.

## 10. Understand errors and empty states

| Situation | What you should see |
| --- | --- |
| First visit | Search prompt, no fake weather |
| City not found | Helpful no-results message |
| Network or API failure | Error banner with Try again |
| Browser offline | Offline message |
| Location denied | Permission message, search still works |
| No favorites | Empty favorites explanation |
| Missing measurement | `Unavailable` |

## 11. Accessibility notes

- The search field has a visible label for assistive technologies.
- Icon-only buttons have accessible names.
- Keyboard users can move through search results.
- A skip link moves focus to the main content.
- Motion is reduced when the operating system requests reduced motion.

## 12. Data source

Weather data by [Open-Meteo.com](https://open-meteo.com/).

Use this dashboard for learning and everyday planning only. For travel safety, storms, or emergencies, follow official meteorological and government warnings.
