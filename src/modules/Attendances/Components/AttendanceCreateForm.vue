<template>
  <div
    v-if="store.showCreate"
    class="fixed inset-0 modal-overlay flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="newAttendanceTitle"
  >
    <form
      @submit.prevent="onSubmit"
      class="glass-modal p-6 rounded shadow-strong w-full max-w-md space-y-4 animate-fade-in-up"
    >
      <div class="flex-between mb-2">
        <h2 id="newAttendanceTitle" class="heading-secondary flex items-center gap-2">
          <Icon icon="mdi:account-check-outline" width="26" class="text-institutional" aria-hidden="true" />
          Nueva Asistencia
        </h2>
        <button
          type="button"
          class="btn-secondary-unas flex items-center gap-1"
          @click="store.showCreate = false"
          aria-label="Cancelar"
        >
          <Icon icon="mdi:close" width="18" aria-hidden="true" />
        </button>
      </div>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:domain" width="16" aria-hidden="true" />
          ID Recepción
        </span>
        <input v-model.number="form.receptionId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:account-outline" width="16" aria-hidden="true" />
          ID Persona
        </span>
        <input v-model.number="form.personId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <div class="flex gap-4">
        <label class="inline-flex items-center mt-2 mb-4 cursor-pointer">
          <input type="checkbox" v-model="form.attended" class="form-checkbox accent-[var(--unas-emerald-600)]" />
          <span class="ml-2 font-medium flex items-center gap-1">
            <Icon :icon="form.attended ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'" width="17" :class="form.attended ? 'text-green-700' : 'text-red-700'" aria-hidden="true" />
            ¿Asistió?
          </span>
        </label>
        <label class="inline-flex items-center mt-2 mb-4 cursor-pointer">
          <input type="checkbox" v-model="form.viaQR" class="form-checkbox accent-[var(--unas-blue-600)]" />
          <span class="ml-2 font-medium flex items-center gap-1">
            <Icon :icon="form.viaQR ? 'mdi:qrcode-scan' : 'mdi:pencil-outline'" width="17" :class="form.viaQR ? 'text-blue-700' : 'text-muted'" aria-hidden="true" />
            ¿Vía QR?
          </span>
        </label>
      </div>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:clock-outline" width="16" aria-hidden="true" />
          Hora de Check-in
        </span>
        <input v-model="form.checkinTime" type="datetime-local" class="input-unas mt-1" required />
      </label>
      <div class="flex gap-2 justify-end mt-4">
        <button
          type="button"
          class="btn-secondary-unas flex items-center gap-2"
          @click="store.showCreate = false"
        >
          <Icon icon="mdi:close" width="18" aria-hidden="true" />
          Cancelar
        </button>
        <button
          type="submit"
          class="btn-primary-unas flex items-center gap-2 hover-lift"
        >
          <Icon icon="mdi:content-save-outline" width="18" aria-hidden="true" />
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useAttendanceStore } from '../Store/attendanceStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useAttendanceStore();
    const form = reactive({
      receptionId: 0,
      personId: 0,
      attended: true,
      viaQR: true,
      checkinTime: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { receptionId: 0, personId: 0, attended: true, viaQR: true, checkinTime: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
