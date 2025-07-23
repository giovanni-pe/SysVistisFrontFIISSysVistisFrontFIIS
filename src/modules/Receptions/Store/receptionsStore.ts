import { defineStore } from 'pinia';
import type { IReception, IReceptionState } from '../Interfaces/IReception';
import {
  fetchReceptions,
  getReception,
  createReception,
  updateReception,
  deleteReception
} from '../Services/receptionsService';

export const useReceptionsStore = defineStore('receptions', {
  state: (): IReceptionState => ({
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
        const res = await fetchReceptions(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar recepciones';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getReception(id);
    },
    async create(payload: Omit<IReception, 'id'>) {
      await createReception(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: IReception) {
      await updateReception(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteReception(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
