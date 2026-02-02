import { Alert, Snackbar } from '@mui/material';

function Toast({ toast, onClose }) {
  return (
    <Snackbar
      open={Boolean(toast)}
      autoHideDuration={2500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {toast ? (
        <Alert
          onClose={onClose}
          severity={toast.type || 'info'}
          variant="filled"
          sx={{ fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      ) : null}
    </Snackbar>
  );
}

export default Toast;
