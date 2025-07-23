import { defineStore } from 'pinia';
import type { ICompletedVisit, ICompletedVisitState } from '../Interfaces/ICompletedVisit';
import {
  fetchCompletedVisits,
  getCompletedVisit,
  createCompletedVisit,
  updateCompletedVisit,
  deleteCompletedVisit
} from '../Services/completedVisitService';

export const useCompletedVisitStore = defineStore('completedVisit', {
  state: (): ICompletedVisitState => ({
    items: [],
    totalItems: 0,
    loading: false,
    error: null,
    selected: null,
    page: 1,
    pageSize: 20,
    showCreate: false,
    showEdit: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const res = await fetchCompletedVisits(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar visitas completadas';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getCompletedVisit(id);
    },
    async create(payload: Omit<ICompletedVisit, 'id'>) {
      await createCompletedVisit(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: ICompletedVisit) {
      await updateCompletedVisit(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteCompletedVisit(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
