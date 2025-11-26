import Typography from '@mui/material/Typography';

export default function HeaderUI() {
    return (
        <Typography
            variant="h2"
            component="h1" //html semantic tag
            sx={{fontWeight: 'bold'}}>
            Dashboard del Clima
        </Typography>
    )
}
export { HeaderUI }