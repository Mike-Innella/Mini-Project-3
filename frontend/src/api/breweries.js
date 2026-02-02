import { apiFetch } from './client';

export function getBreweries({ limit } = {}) {
  const query = limit ? `?limit=${encodeURIComponent(limit)}` : '';
  return apiFetch(`/breweries${query}`);
}

export function createBrewery(payload) {
  return apiFetch('/breweries', {
    method: 'POST',
    body: payload,
  });
}

export function updateBrewery(id, payload) {
  return apiFetch(`/breweries/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export function deleteBrewery(id) {
  return apiFetch(`/breweries/${id}`, {
    method: 'DELETE',
  });
}

export function syncBreweries() {
  return apiFetch('/sync', {
    method: 'POST',
  });
}
