import { apiFetch } from './client';

export function getBreweries({ limit, page, q } = {}) {
  const params = new URLSearchParams();
  if (limit) params.set('limit', limit);
  if (page) params.set('page', page);
  if (q) params.set('q', q);
  const query = params.toString() ? `?${params.toString()}` : '';
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
