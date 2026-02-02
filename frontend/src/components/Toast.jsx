import { useEffect } from 'react';

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type || 'info'}`}>
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close toast">
        x
      </button>
    </div>
  );
}

export default Toast;
