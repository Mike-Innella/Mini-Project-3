function Spinner({ label = 'Loading...', size = 'md' }) {
  return (
    <div className={`spinner ${size}`} role="status" aria-live="polite">
      <span className="spinner-circle" />
      <span className="spinner-label">{label}</span>
    </div>
  );
}

export default Spinner;
