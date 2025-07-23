import api from '@/libs/api';
import type { IReception } from '../Interfaces/IReception';

export async function fetchReceptions(page = 1, pageSize = 20) {
  const { data } = await api.get('/Receptions', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getReception(id: number) {
  const { data } = await api.get(`/Receptions/${id}`);
  return data;
}

export async function createReception(payload: Omit<IReception, 'id'>) {
  return api.post('/Receptions', payload);
}

export async function updateReception(id: number, payload: IReception) {
  return api.put(`/Receptions/${id}`, payload);
}

export async function deleteReception(id: number) {
  return api.delete(`/Receptions/${id}`);
}
