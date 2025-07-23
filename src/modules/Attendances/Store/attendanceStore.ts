import { defineStore } from 'pinia';
import type { IAttendance, IAttendanceState } from '../Interfaces/IAttendance';
import {
  fetchAttendances,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from '../Services/attendanceService';

export const useAttendanceStore = defineStore('attendance', {
  state: (): IAttendanceState => ({
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
        const res = await fetchAttendances(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar asistencias';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getAttendance(id);
    },
    async create(payload: Omit<IAttendance, 'id'>) {
      await createAttendance(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: IAttendance) {
      await updateAttendance(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteAttendance(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
