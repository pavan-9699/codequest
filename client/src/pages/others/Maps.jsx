import React, { useState } from "react";
import axios from "axios";

const GOOGLE_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [weather, setWeather] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        // Fetch address using Google Geocoding API
        try {
          const geoRes = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
          );
          const results = geoRes.data.results;
          if (results && results.length > 0) {
            const components = results[0].address_components;
            const city = components.find((c) =>
              c.types.includes("locality")
            )?.long_name || "";
            const state = components.find((c) =>
              c.types.includes("administrative_area_level_1")
            )?.long_name || "";
            const country = components.find((c) =>
              c.types.includes("country")
            )?.long_name || "";
            setAddress(`${city}, ${state}, ${country}`);
          } else {
            setAddress("Location not found");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress("Failed to fetch address");
        }

        // Fetch weather using OpenWeatherMap API
        try {
          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${a8d9dea339a94d7c32cab0da713df50a}&units=metric`
          );
          setWeather(weatherRes.data);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div>
      <h2>User Location</h2>
      <button onClick={getLocation}>Obtain Location</button>

      {location && (
        <div>
          <p><strong>Address:</strong> {address}</p>
          <iframe
            title="Google Maps"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            allowFullScreen
          />
        </div>
      )}

      {weather && (
        <div>
          <h3>Weather:</h3>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Maps;
