import { defineStore } from 'pinia';
import type { IVisitPerson, IVisitPersonState } from '../Interfaces/IVisitPerson';
import {
  fetchVisitPersons,
  getVisitPerson,
  createVisitPerson,
  updateVisitPerson,
  deleteVisitPerson
} from '../Services/visitPersonService';

export const useVisitPersonStore = defineStore('visitPerson', {
  state: (): IVisitPersonState => ({
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
        const res = await fetchVisitPersons(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar personas';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getVisitPerson(id);
    },
    async create(payload: Omit<IVisitPerson, 'id'>) {
      await createVisitPerson(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: IVisitPerson) {
      await updateVisitPerson(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteVisitPerson(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
