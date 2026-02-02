import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  async function loadBreweries() {
    setLoading(true);
    setError(null);
    try {
      const data = await getBreweries({
        limit: pageSize,
        page,
        q: search.trim() || undefined,
      });
      const list = Array.isArray(data)
        ? data
        : data?.breweries || data?.data || [];
      setBreweries(list);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    loadBreweries();
  }, [page, search]);

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

  const filteredBreweries = useMemo(() => breweries, [breweries]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography className="eyebrow">Breweries Admin</Typography>
              <Typography variant="h1">East Coast Breweries</Typography>
              <Typography color="text.secondary">
                US East Coast breweries (up to 10,000 synced)
              </Typography>
            </Box>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1.5}
                justifyContent="flex-end"
                alignItems={{ xs: 'stretch', md: 'center' }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setSearchInput('')}
                  disabled={!searchInput}
                  sx={{ minWidth: 160 }}
                >
                  Clear Search
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSync}
                  disabled={isWorking}
                  sx={{ minWidth: 160 }}
                >
                  {isWorking ? 'Syncing...' : 'Sync from API'}
                </Button>
                <Button
                  variant="contained"
                  onClick={openCreateModal}
                  disabled={isWorking}
                  sx={{ minWidth: 160 }}
                >
                  {isWorking ? 'Please wait...' : 'New Brewery'}
                </Button>
                {isWorking ? <Spinner label="Working..." size="sm" /> : null}
              </Stack>
              <TextField
                label="Search"
                placeholder="Search breweries"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Click to search">
                        <span>
                          <IconButton
                            edge="end"
                            onClick={() => setSearch(searchInput)}
                            aria-label="Click to search"
                          >
                            <SearchIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
        </Paper>

        {loading ? (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Spinner label="Loading breweries..." size="lg" />
          </Paper>
        ) : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        {!loading ? (
          <Stack spacing={2}>
            <Suspense fallback={<Spinner label="Loading table..." />}>
              <BreweryTable
                items={filteredBreweries}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            </Suspense>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              justifyContent="space-between"
            >
              <Typography color="text.secondary">
                Page {page} of {totalPages}
              </Typography>
              <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => setPage(1)}
                  disabled={page <= 1}
                >
                  First
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setPage(totalPages)}
                  disabled={page >= totalPages}
                >
                  Last
                </Button>
              </Stack>
            </Stack>
          </Stack>
        ) : null}
      </Stack>

      {isModalOpen ? (
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
      ) : null}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </Container>
  );
}

export default BreweriesPage;
