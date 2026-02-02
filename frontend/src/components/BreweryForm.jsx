import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Alert } from '@mui/material';

const emptyValues = {
  name: '',
  breweryType: '',
  city: '',
  state: '',
  country: '',
  websiteUrl: '',
};

function BreweryForm({
  initialValues,
  mode = 'create',
  isWorking = false,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(emptyValues);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name || '',
        breweryType:
          initialValues.breweryType || initialValues.brewery_type || '',
        city: initialValues.city || '',
        state: initialValues.state || '',
        country: initialValues.country || '',
        websiteUrl:
          initialValues.websiteUrl ||
          initialValues.website_url ||
          initialValues.website ||
          '',
      });
    } else {
      setValues(emptyValues);
    }
    setError('');
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!values.name.trim()) {
      setError('Name is required.');
      return;
    }
    setError('');
    onSubmit({
      name: values.name.trim(),
      breweryType: values.breweryType.trim(),
      city: values.city.trim(),
      state: values.state.trim(),
      country: values.country.trim(),
      websiteUrl: values.websiteUrl.trim(),
    });
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        {error ? <Alert severity="warning">{error}</Alert> : null}
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Brewery name"
          required
          fullWidth
        />
        <TextField
          label="Type"
          name="breweryType"
          value={values.breweryType}
          onChange={handleChange}
          placeholder="micro, brewpub, etc."
          fullWidth
        />
        <TextField
          label="City"
          name="city"
          value={values.city}
          onChange={handleChange}
          placeholder="City"
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={values.state}
          onChange={handleChange}
          placeholder="State"
          fullWidth
        />
        <TextField
          label="Country"
          name="country"
          value={values.country}
          onChange={handleChange}
          placeholder="Country"
          fullWidth
        />
        <TextField
          label="Website"
          name="websiteUrl"
          value={values.websiteUrl}
          onChange={handleChange}
          placeholder="https://"
          fullWidth
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button variant="outlined" onClick={onCancel} disabled={isWorking}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isWorking}>
            {isWorking
              ? 'Saving...'
              : mode === 'edit'
              ? 'Save Changes'
              : 'Create Brewery'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default BreweryForm;
