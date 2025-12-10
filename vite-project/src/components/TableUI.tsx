import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Hourly, HourlyUnits } from '../types/DashboardTypes';

interface TableUIProps {
   hourly?: Hourly;
   hourlyUnits?: HourlyUnits;
}

function formatDateTime(dateTimeString: string): string {
   const date = new Date(dateTimeString);
   return date.toLocaleString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
   });
}

function prepareTableData(hourly: Hourly) {
   return hourly.time.map((time, index) => ({
      id: index,
      time: formatDateTime(time),
      temperature: hourly.temperature_2m[index],
      windSpeed: hourly.wind_speed_10m[index]
   }));
}

export default function TableUI({ hourly, hourlyUnits }: TableUIProps) {

   const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      {
         field: 'time',
         headerName: 'Fecha/Hora',
         width: 150,
      },
      {
         field: 'temperature',
         headerName: `Temperatura (${hourlyUnits?.temperature_2m || '°C'})`,
         width: 150,
         type: 'number',
      },
      {
         field: 'windSpeed',
         headerName: `Viento (${hourlyUnits?.wind_speed_10m || 'km/h'})`,
         width: 140,
         type: 'number',
      },
   ];

   const rows = hourly ? prepareTableData(hourly) : [];

   return (
      <Box sx={{ height: 400, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}