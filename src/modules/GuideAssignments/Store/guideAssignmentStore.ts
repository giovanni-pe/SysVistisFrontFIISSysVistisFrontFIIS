import { defineStore } from 'pinia';
import type { IGuideAssignment, IGuideAssignmentState } from '../Interfaces/IGuideAssignment';
import {
  fetchGuideAssignments,
  getGuideAssignment,
  createGuideAssignment,
  updateGuideAssignment,
  deleteGuideAssignment
} from '../Services/guideAssignmentService';

export const useGuideAssignmentStore = defineStore('guideAssignment', {
  state: (): IGuideAssignmentState => ({
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
        const res = await fetchGuideAssignments(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar asignaciones';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getGuideAssignment(id);
    },
    async create(payload: Omit<IGuideAssignment, 'id'>) {
      await createGuideAssignment(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: IGuideAssignment) {
      await updateGuideAssignment(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteGuideAssignment(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
