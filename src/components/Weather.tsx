'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface WeatherData {
    temp: string | number; // Может быть и строкой и числом
    desc: string;
}

const Weather = () => {
    const t = useTranslations('Weather');
    const [weather, setWeather] = useState<WeatherData>({ temp: '--', desc: '' });
    const [loading, setLoading] = useState(true);
    const [apiIndex, setApiIndex] = useState(0);

    const apis = [
        {
            name: 'NWS',
            fetch: async () => {
                const pointsRes = await fetch('https://api.weather.gov/points/37.95,58.38');
                const points = await pointsRes.json();
                const forecastRes = await fetch(points.properties.forecast);
                const forecast = await forecastRes.json();
                const current = forecast.properties.periods[0];
                return {
                    temp: current.temperature, // Это число
                    desc: current.shortForecast
                };
            }
        },
        {
            name: '7Timer',
            fetch: async () => {
                const res = await fetch('http://www.7timer.info/bin/api.pl?lon=58.38&lat=37.95&product=astro&output=json');
                const data = await res.json();
                return {
                    temp: data.dataseries[0].temp2m, // Это число
                    desc: data.dataseries[0].weather
                };
            }
        },
        {
            name: 'MET Norway',
            fetch: async () => {
                const res = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=37.95&lon=58.38', {
                    headers: { 'User-Agent': 'YourApp/1.0' }
                });
                const data = await res.json();
                return {
                    temp: data.properties.timeseries[0].data.instant.details.air_temperature, // Это число
                    desc: 'Updated'
                };
            }
        }
    ];

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);

            for (let i = apiIndex; i < apis.length + apiIndex; i++) {
                const idx = i % apis.length;
                try {
                    const result = await apis[idx].fetch();
                    setWeather({
                        temp: Math.round(result.temp), // Math.round возвращает число
                        desc: result.desc
                    });
                    setApiIndex(idx);
                    setLoading(false);
                    return;
                } catch (err) {
                    console.log(`${apis[idx].name} failed, trying next...`);
                }
            }

            setWeather({ temp: '--', desc: t('unavailable') });
            setLoading(false);
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, [t]);

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">{t('title')}</h4>
                <div className="flex justify-center h-16 items-center">
                    <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">{t('title')}</h4>
            <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                    {typeof weather.temp === 'number' ? weather.temp : weather.temp}°C
                </span>
                <span className="text-sm opacity-80">{weather.desc}</span>
            </div>
        </div>
    );
};

export default Weather;