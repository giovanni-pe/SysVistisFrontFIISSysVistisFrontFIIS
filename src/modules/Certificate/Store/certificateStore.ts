import { defineStore } from 'pinia';
import type { ICertificate, ICertificateState } from '../Interfaces/ICertificate';
import {
  fetchCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../Services/certificateService';

export const useCertificateStore = defineStore('certificate', {
  state: (): ICertificateState => ({
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
        const res = await fetchCertificates(this.page, this.pageSize);
        this.items = res.items;
        this.totalItems = res.totalItems;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar certificados';
      } finally {
        this.loading = false;
      }
    },
    async select(id: number) {
      this.selected = await getCertificate(id);
    },
    async create(payload: Omit<ICertificate, 'id'>) {
      await createCertificate(payload);
      await this.fetchAll();
    },
    async update(id: number, payload: ICertificate) {
      await updateCertificate(id, payload);
      await this.fetchAll();
    },
    async remove(id: number) {
      await deleteCertificate(id);
      await this.fetchAll();
    },
    clearSelected() {
      this.selected = null;
    }
  }
});
