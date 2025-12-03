import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() : OpenMeteoResponse | null { 
    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);

    useEffect(() => {
        (async() => {
            const response = await fetch(URL);
            const jsonData = await response.json();
            setData(jsonData);
        })();
     }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;
 }