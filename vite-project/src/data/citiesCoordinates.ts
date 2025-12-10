export interface CityCoordinates {
  name: string;
  latitude: number;
  longitude: number;
}

export const citiesData: Record<string, CityCoordinates> = {
  guayaquil: {
    name: 'Guayaquil',
    latitude: -2.1962,
    longitude: -79.8862,
  },
  quito: {
    name: 'Quito',
    latitude: -0.2299,
    longitude: -78.5099,
  },
  manta: {
    name: 'Manta',
    latitude: -0.9542,
    longitude: -80.7314,
  },
  cuenca: {
    name: 'Cuenca',
    latitude: -2.8976,
    longitude: -78.9854,
  },
};

export const getCityURL = (cityKey: string): string => {
  const city = citiesData[cityKey.toLowerCase()];
  
  if (!city) {
    throw new Error(`Ciudad no encontrada: ${cityKey}`);
  }

  return `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature`;
};
