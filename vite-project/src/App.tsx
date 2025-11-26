// import { useState } from 'react'
import HeaderUI from './components/HeaderUI'; //Desestructuración de HeaderUI
import { Grid } from '@mui/material';
import AlertUI from './components/AlertUI';
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center"><AlertUI description="No se preveen lluvias" /></Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector</Grid>

        {/* Indicadores */}
        <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }} >Elemento: Gráfico</Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
    </div>

  )
}

export default App
