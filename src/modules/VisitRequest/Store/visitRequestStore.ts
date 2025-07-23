import { defineStore } from 'pinia';
import type { IVisitRequest, IReception, IVisitRequestState } from '../Interfaces/IVisitRequest';
import {
  fetchVisitRequests,
  getVisitRequest,
  createVisitRequest,
  updateVisitRequest,
  deleteVisitRequest,
  createReception
} from '../Services/visitRequestService';

export const useVisitRequestStore = defineStore('visitRequest', {
  state: (): IVisitRequestState => ({
    items: [],
    totalItems: 0,
    loading: false,
    error: null,
    selected: null,
    page: 1,
    pageSize: 20,
     showCreate: false,
  showEdit: false,
  showReception: false,
  receptionRequest: null
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const res = await fetchVisitRequests(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar solicitudes';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getVisitRequest(id);
    },
    async create(payload: Omit<IVisitRequest, 'id' | 'status' | 'approvalDate'>) {
      await createVisitRequest(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: Partial<IVisitRequest>) {
      await updateVisitRequest(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteVisitRequest(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    },
    // Acción para crear recepción
    async createReception(payload: Omit<IReception, 'id'>) {
      await createReception(payload);
      // Puedes refrescar lista o dar feedback si lo deseas
    }
  }
});
