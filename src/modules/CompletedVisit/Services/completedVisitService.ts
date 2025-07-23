
import api from '@/libs/api';
import type { ICompletedVisit } from '../Interfaces/ICompletedVisit';

export async function fetchCompletedVisits(page = 1, pageSize = 20) {
  const { data } = await api.get('/CompletedVisit', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getCompletedVisit(id: number) {
  const { data } = await api.get(`/CompletedVisit/${id}`);
  return data;
}

export async function createCompletedVisit(payload: Omit<ICompletedVisit, 'id'>) {
  return api.post('/CompletedVisit', payload);
}

export async function updateCompletedVisit(id: number, payload: ICompletedVisit) {
  return api.put(`/CompletedVisit/${id}`, payload);
}

export async function deleteCompletedVisit(id: number) {
  return api.delete(`/CompletedVisit/${id}`);
}
