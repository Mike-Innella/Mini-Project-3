import { useEffect, useState } from 'react';

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
          initialValues.websiteUrl || initialValues.website_url || initialValues.website || '',
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
    <form className="brewery-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      <label>
        Name *
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Brewery name"
          required
        />
      </label>
      <label>
        Type
        <input
          type="text"
          name="breweryType"
          value={values.breweryType}
          onChange={handleChange}
          placeholder="micro, brewpub, etc."
        />
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
          placeholder="City"
        />
      </label>
      <label>
        State
        <input
          type="text"
          name="state"
          value={values.state}
          onChange={handleChange}
          placeholder="State"
        />
      </label>
      <label>
        Country
        <input
          type="text"
          name="country"
          value={values.country}
          onChange={handleChange}
          placeholder="Country"
        />
      </label>
      <label>
        Website
        <input
          type="text"
          name="websiteUrl"
          value={values.websiteUrl}
          onChange={handleChange}
          placeholder="https://"
        />
      </label>
      <div className="form-actions">
        <button
          className="button ghost"
          type="button"
          onClick={onCancel}
          disabled={isWorking}
        >
          Cancel
        </button>
        <button className="button" type="submit" disabled={isWorking}>
          {isWorking
            ? 'Saving...'
            : mode === 'edit'
            ? 'Save Changes'
            : 'Create Brewery'}
        </button>
      </div>
    </form>
  );
}

export default BreweryForm;
