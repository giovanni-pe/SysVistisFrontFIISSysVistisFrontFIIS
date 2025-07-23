import api from '@/libs/api';
import type { IAttendance } from '../Interfaces/IAttendance';

export async function fetchAttendances(page = 1, pageSize = 20) {
  const { data } = await api.get('/Attendance', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getAttendance(id: number) {
  const { data } = await api.get(`/Attendance/${id}`);
  return data;
}

export async function createAttendance(payload: Omit<IAttendance, 'id'>) {
  return api.post('/Attendance', payload);
}

export async function updateAttendance(id: number, payload: IAttendance) {
  return api.put(`/Attendance/${id}`, payload);
}

export async function deleteAttendance(id: number) {
  return api.delete(`/Attendance/${id}`);
}
