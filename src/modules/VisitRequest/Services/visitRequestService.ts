import api from '@/libs/api';
import type { IVisitRequest, IReception } from '../Interfaces/IVisitRequest';

// Obtener lista paginada de solicitudes
export async function fetchVisitRequests(page = 1, pageSize = 20) {
  const { data } = await api.get('/VisitRequest', { params: { Page: page, PageSize: pageSize } });
  return data;
}

// Obtener detalle de una solicitud
export async function getVisitRequest(id: number) {
  const { data } = await api.get(`/VisitRequest/${id}`);
  return data;
}

// Crear nueva solicitud
export async function createVisitRequest(payload: Omit<IVisitRequest, 'id' | 'status' | 'approvalDate'>) {
  return api.post('/VisitRequest', payload);
}

// Editar una solicitud
export async function updateVisitRequest(id: number, payload: Partial<IVisitRequest>) {
  return api.put(`/VisitRequest/${id}`, payload);
}

// Eliminar una solicitud
export async function deleteVisitRequest(id: number) {
  return api.delete(`/VisitRequest/${id}`);
}

// Crear recepción para una solicitud
export async function createReception(payload: Omit<IReception, 'id'>) {
  return api.post('/Receptions', payload);
}
