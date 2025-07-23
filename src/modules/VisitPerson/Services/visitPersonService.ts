import api from '@/libs/api';
import type { IVisitPerson } from '../Interfaces/IVisitPerson';

export async function fetchVisitPersons(page = 1, pageSize = 20) {
  const { data } = await api.get('/VisitPerson', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getVisitPerson(id: number) {
  const { data } = await api.get(`/VisitPerson/${id}`);
  return data;
}

export async function createVisitPerson(payload: Omit<IVisitPerson, 'id'>) {
  return api.post('/VisitPerson', payload);
}

export async function updateVisitPerson(id: number, payload: IVisitPerson) {
  return api.put(`/VisitPerson/${id}`, payload);
}

export async function deleteVisitPerson(id: number) {
  return api.delete(`/VisitPerson/${id}`);
}
