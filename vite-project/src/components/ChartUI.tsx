import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { Hourly, HourlyUnits } from '../types/DashboardTypes';

interface ChartUIProps {
   hourly?: Hourly;
   hourlyUnits?: HourlyUnits;
}

function formatTimeLabel(dateTimeString: string): string {
   const date = new Date(dateTimeString);
   return date.toLocaleString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit' 
   });
}

export default function ChartUI({ hourly, hourlyUnits }: ChartUIProps) {
   
   if (!hourly) {
      return (
         <Typography variant="body1" color="text.secondary">
            No hay datos disponibles para mostrar
         </Typography>
      );
   }

   const timeLabels = hourly.time.map(formatTimeLabel);

   return (
      <>
         <Typography variant="h6" component="div" gutterBottom>
            Pronóstico por Hora
         </Typography>
         <LineChart
            height={350}
            series={[
               { 
                  data: hourly.temperature_2m, 
                  label: `Temperatura (${hourlyUnits?.temperature_2m || '°C'})`,
                  color: '#ff6b6b'
               },
               { 
                  data: hourly.wind_speed_10m, 
                  label: `Viento (${hourlyUnits?.wind_speed_10m || 'km/h'})`,
                  color: '#4ecdc4'
               },
            ]}
            xAxis={[{ 
               scaleType: 'point', 
               data: timeLabels,
               tickLabelStyle: {
                  angle: 45,
                  textAnchor: 'start',
                  fontSize: 10,
               }
            }]}
         />
      </>
   );
}