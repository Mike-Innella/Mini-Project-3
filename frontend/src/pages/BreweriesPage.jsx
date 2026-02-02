import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
  createBrewery,
  deleteBrewery,
  getBreweries,
  syncBreweries,
  updateBrewery,
} from '../api/breweries';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

const BreweryForm = lazy(() => import('../components/BreweryForm'));
const BreweryTable = lazy(() => import('../components/BreweryTable'));
const Modal = lazy(() => import('../components/Modal'));

function BreweriesPage() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isWorking, setIsWorking] = useState(false);

  async function loadBreweries() {
    setLoading(true);
    setError(null);
    try {
      const data = await getBreweries();
      const list = Array.isArray(data)
        ? data
        : data?.breweries || data?.data || [];
      setBreweries(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBreweries();
  }, []);

  function openCreateModal() {
    setSelected(null);
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setSelected(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleSync() {
    setIsWorking(true);
    setError(null);
    try {
      await syncBreweries();
      setToast({ type: 'success', message: 'Sync complete.' });
      await loadBreweries();
    } catch (err) {
      setError(err.message);
      setToast({ type: 'error', message: err.message });
    } finally {
      setIsWorking(false);
    }
  }

  async function handleCreate(payload) {
    setIsWorking(true);
    setError(null);
    try {
      await createBrewery(payload);
      setToast({ type: 'success', message: 'Brewery created.' });
      setIsModalOpen(false);
      await loadBreweries();
    } catch (err) {
      setError(err.message);
      setToast({ type: 'error', message: err.message });
    } finally {
      setIsWorking(false);
    }
  }

  async function handleUpdate(id, payload) {
    setIsWorking(true);
    setError(null);
    try {
      await updateBrewery(id, payload);
      setToast({ type: 'success', message: 'Brewery updated.' });
      setIsModalOpen(false);
      await loadBreweries();
    } catch (err) {
      setError(err.message);
      setToast({ type: 'error', message: err.message });
    } finally {
      setIsWorking(false);
    }
  }

  async function handleDelete(id) {
    if (!id) return;
    const confirmed = window.confirm('Delete this brewery?');
    if (!confirmed) return;

    setIsWorking(true);
    setError(null);
    try {
      await deleteBrewery(id);
      setToast({ type: 'success', message: 'Brewery deleted.' });
      await loadBreweries();
    } catch (err) {
      setError(err.message);
      setToast({ type: 'error', message: err.message });
    } finally {
      setIsWorking(false);
    }
  }

  const filteredBreweries = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return breweries;
    return breweries.filter((brewery) => {
      const fields = [
        brewery.name,
        brewery.city,
        brewery.state,
        brewery.country,
        brewery.breweryType || brewery.brewery_type,
      ];
      return fields.some((field) =>
        field ? field.toString().toLowerCase().includes(term) : false
      );
    });
  }, [breweries, search]);

  return (
    <div className="page">
      <div className="topbar">
        <div>
          <p className="eyebrow">Breweries Admin</p>
          <h1>Manage breweries</h1>
        </div>
        <div className="topbar-actions">
          <input
            type="text"
            placeholder="Search breweries"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            className="button ghost"
            type="button"
            onClick={handleSync}
            disabled={isWorking}
          >
            {isWorking ? 'Syncing...' : 'Sync from API'}
          </button>
          <button
            className="button"
            type="button"
            onClick={openCreateModal}
            disabled={isWorking}
          >
            {isWorking ? 'Please wait...' : 'New Brewery'}
          </button>
          {isWorking && <Spinner label="Working..." size="sm" />}
        </div>
      </div>

      {loading && (
        <div className="loading">
          <Spinner label="Loading breweries..." size="lg" />
        </div>
      )}
      {error && <div className="error-banner">{error}</div>}

      {!loading && (
        <Suspense fallback={<Spinner label="Loading table..." />}>
          <BreweryTable
            items={filteredBreweries}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </Suspense>
      )}

      {isModalOpen && (
        <Suspense fallback={<Spinner label="Loading form..." />}>
          <Modal
            title={selected ? 'Edit Brewery' : 'New Brewery'}
            onClose={closeModal}
          >
            <BreweryForm
              initialValues={selected}
              mode={selected ? 'edit' : 'create'}
              isWorking={isWorking}
              onSubmit={(payload) =>
                selected
                  ? handleUpdate(selected.id || selected._id, payload)
                  : handleCreate(payload)
              }
              onCancel={closeModal}
            />
          </Modal>
        </Suspense>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default BreweriesPage;
