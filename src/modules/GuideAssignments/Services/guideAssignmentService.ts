import api from '@/libs/api';
import type { IGuideAssignment } from '../Interfaces/IGuideAssignment';

export async function fetchGuideAssignments(page = 1, pageSize = 20) {
  const { data } = await api.get('/GuideAssignments', { params: { Page: page, PageSize: pageSize } });
  return data;
}

export async function getGuideAssignment(id: number) {
  const { data } = await api.get(`/GuideAssignments/${id}`);
  return data;
}

export async function createGuideAssignment(payload: Omit<IGuideAssignment, 'id'>) {
  return api.post('/GuideAssignments', payload);
}

export async function updateGuideAssignment(id: number, payload: IGuideAssignment) {
  return api.put(`/GuideAssignments/${id}`, payload);
}

export async function deleteGuideAssignment(id: number) {
  return api.delete(`/GuideAssignments/${id}`);
}
