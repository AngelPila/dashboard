// import { useState } from 'react'
import { useState } from 'react';
import useFetchData from './functions/useFetchData';
import HeaderUI from './components/HeaderUI'; //Desestructuración de HeaderUI
import { Grid, CircularProgress, Alert, Typography } from '@mui/material';
import AlertUI from './components/AlertUI';
import './App.css'
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { getCityURL } from './data/citiesCoordinates';

function App() {
  const [selectedCity, setSelectedCity] = useState<string>('guayaquil');

  // Construir URL basada en la ciudad seleccionada
  const cityURL = selectedCity ? getCityURL(selectedCity) : '';
  
  const { data: dataFetcherOutput, loading, error } = useFetchData(cityURL);

  return (
    <div>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

        {/* Estado de carga */}
        {loading && (
          <Grid size={{ xs: 12 }} container justifyContent="center" alignItems="center" sx={{ py: 4 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Cargando datos meteorológicos...</Typography>
          </Grid>
        )}

        {/* Estado de error */}
        {error && (
          <Grid size={{ xs: 12 }} container justifyContent="center" alignItems="center">
            <Alert severity="error" sx={{ width: '100%' }}>
              <Typography variant="body1">Error al cargar los datos: {error}</Typography>
            </Alert>
          </Grid>
        )}

        {/* Alertas */}
        {!loading && !error && (
          <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center"><AlertUI description="No se preveen lluvias" /></Grid>
        )}

        {/* Selector */}
        {!loading && !error && (
          <Grid size={{ xs: 12, md: 3 }}>
            <SelectorUI selectedCity={selectedCity} onCityChange={setSelectedCity} />
          </Grid>
        )}

        {/* Indicadores */}
        {!loading && !error && (
        <Grid container size={{ xs: 12, md: 9 }} >

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
            }          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {/* IndicatorUI con la Temperatura aparente en °C' */}
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura aparente'
                description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
            }
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {/* IndicatorUI con la Velocidad del viento en km/h' */}
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
            }          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {/* IndicatorUI con la Humedad relativa en %' */}
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />)
            }          </Grid>

        </Grid>
        )}

        {/* Gráfico */}
        {!loading && !error && (
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }} >
            <ChartUI hourly={dataFetcherOutput?.hourly} hourlyUnits={dataFetcherOutput?.hourly_units} />
          </Grid>
        )}

        {/* Tabla */}
        {!loading && !error && (
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <TableUI hourly={dataFetcherOutput?.hourly} hourlyUnits={dataFetcherOutput?.hourly_units} />
          </Grid>
        )}

        {/* Información adicional */}
        {!loading && !error && (
          <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
        )}

      </Grid>
    </div>

  )
}

export default App
