import { defineStore } from 'pinia';
import type { IGuide, IGuideState } from '../Interfaces/IGuide';
import {
  fetchGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide
} from '../Services/guideService';

export const useGuideStore = defineStore('guide', {
  state: (): IGuideState => ({
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
        const res = await fetchGuides(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar guías';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getGuide(id);
    },
    async create(payload: Omit<IGuide, 'id'>) {
      await createGuide(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: IGuide) {
      await updateGuide(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteGuide(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
