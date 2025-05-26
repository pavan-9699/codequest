import React, { useState } from 'react';
import axios from 'axios';
import './Userprofile.css';
import { useTranslation } from 'react-i18next';

const Userprofile = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [weather, setWeather] = useState(null);
  const { t } = useTranslation();

  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'a8d9dea339a94d7c32cab0da713df50a';

  const getLocation = () => {
    if (!navigator.geolocation) {
      // alert(t('userprofile.geolocation_unsupported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });

          const geoRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const { address } = geoRes.data;
          const city = address.city || address.town || address.village || t('userprofile.unknown_city');
          const state = address.state || t('userprofile.unknown_state');
          const country = address.country || t('userprofile.unknown_country');
          setAddress(`${city}, ${state}, ${country}`);

          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const description = weatherRes.data.weather[0].description;
          const temp = weatherRes.data.main.temp;
          setWeather(`${temp}°C, ${description}`);
        } catch (error) {
          console.error('Error fetching location or weather:', error);
          // alert(t('userprofile.fetch_error'));
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        // alert(t('userprofile.location_error'));
      }
    );
  };

  return (
    <div className="profile-container">
      <h2>{t('userprofile.title')}</h2>
      <button onClick={getLocation} className="btn-location">
        {t('userprofile.obtain_location')}
      </button>

      {location && (
        <div className="location-box">
          <p>
            <strong>{t('userprofile.location')}:</strong> {address}
          </p>
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
      {weather && (
        <p>
          <strong>{t('userprofile.weather')}:</strong> {weather}
        </p>
      )}
    </div>
  );
};

export default Userprofile;