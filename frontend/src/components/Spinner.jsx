import { Box, CircularProgress, Typography } from '@mui/material';

function Spinner({ label = 'Loading...', size = 'md' }) {
  const diameter = size === 'lg' ? 32 : size === 'sm' ? 18 : 24;

  return (
    <Box display="inline-flex" alignItems="center" gap={1.5} color="text.secondary">
      <CircularProgress size={diameter} thickness={4} />
      <Typography variant="body2" fontWeight={600} color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

export default Spinner;
