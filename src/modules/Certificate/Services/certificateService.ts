import api from '@/libs/api';
import type { ICertificate } from '../Interfaces/ICertificate';

export async function fetchCertificates(page = 1, pageSize = 20) {
  const { data } = await api.get('/Certificate', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getCertificate(id: number) {
  const { data } = await api.get(`/Certificate/${id}`);
  return data;
}

export async function createCertificate(payload: Omit<ICertificate, 'id'>) {
  return api.post('/Certificate', payload);
}

export async function updateCertificate(id: number, payload: ICertificate) {
  return api.put(`/Certificate/${id}`, payload);
}

export async function deleteCertificate(id: number) {
  return api.delete(`/Certificate/${id}`);
}
