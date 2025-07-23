import api from '@/libs/api';
import type { IGuide } from '../Interfaces/IGuide';

export async function fetchGuides(page = 1, pageSize = 20) {
  const { data } = await api.get('/Guide', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getGuide(id: number) {
  const { data } = await api.get(`/Guide/${id}`);
  return data;
}

export async function createGuide(payload: Omit<IGuide, 'id'>) {
  return api.post('/Guide', payload);
}

export async function updateGuide(id: number, payload: IGuide) {
  return api.put(`/Guide/${id}`, payload);
}

export async function deleteGuide(id: number) {
  return api.delete(`/Guide/${id}`);
}
