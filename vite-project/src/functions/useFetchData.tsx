import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Interfaz para tipar el retorno del hook
export interface UseFetchDataResult {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function useFetchData(url?: string): UseFetchDataResult { 
    const defaultURL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature';
    const URL = url || defaultURL;

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const jsonData: OpenMeteoResponse = await response.json();
                setData(jsonData);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar los datos';
                setError(errorMessage);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [URL]); // Dependencia de URL para re-ejecutar si cambia

    return { data, loading, error };
}