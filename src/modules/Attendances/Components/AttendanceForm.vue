<template>
  <div
    v-if="store.showEdit && store.selected"
    class="fixed right-0 top-0 w-full max-w-md h-full glass-modal shadow-strong p-6 z-50 overflow-auto animate-slide-in-right"
    role="dialog"
    aria-modal="true"
    aria-labelledby="editAttendanceTitle"
  >
    <div class="flex-between mb-4">
      <h2 id="editAttendanceTitle" class="heading-secondary flex items-center gap-2">
        <Icon icon="mdi:account-check-outline" width="26" class="text-institutional" aria-hidden="true" />
        Editar Asistencia
      </h2>
      <button
        type="button"
        class="btn-secondary-unas flex items-center gap-1"
        @click="close"
        aria-label="Cerrar edición"
      >
        <Icon icon="mdi:close" width="18" aria-hidden="true" />
        Cerrar
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:domain" width="16" aria-hidden="true" />
          ID Recepción
        </span>
        <input v-model.number="store.selected.receptionId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:account-outline" width="16" aria-hidden="true" />
          ID Persona
        </span>
        <input v-model.number="store.selected.personId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <div class="flex gap-4">
        <label class="inline-flex items-center mt-2 mb-4 cursor-pointer">
          <input type="checkbox" v-model="store.selected.attended" class="form-checkbox accent-[var(--unas-emerald-600)]" />
          <span class="ml-2 font-medium flex items-center gap-1">
            <Icon :icon="store.selected.attended ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'" width="17" :class="store.selected.attended ? 'text-green-700' : 'text-red-700'" aria-hidden="true" />
            ¿Asistió?
          </span>
        </label>
        <label class="inline-flex items-center mt-2 mb-4 cursor-pointer">
          <input type="checkbox" v-model="store.selected.viaQR" class="form-checkbox accent-[var(--unas-blue-600)]" />
          <span class="ml-2 font-medium flex items-center gap-1">
            <Icon :icon="store.selected.viaQR ? 'mdi:qrcode-scan' : 'mdi:pencil-outline'" width="17" :class="store.selected.viaQR ? 'text-blue-700' : 'text-muted'" aria-hidden="true" />
            ¿Vía QR?
          </span>
        </label>
      </div>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:clock-outline" width="16" aria-hidden="true" />
          Hora de Check-in
        </span>
        <input v-model="store.selected.checkinTime" type="datetime-local" class="input-unas mt-1" required />
      </label>
      <div class="mt-4 flex gap-2">
        <button type="submit" class="btn-primary-unas flex items-center gap-2 hover-lift">
          <Icon icon="mdi:content-save-outline" width="18" aria-hidden="true" />
          Actualizar
        </button>
        <button type="button" class="btn-secondary-unas flex items-center gap-2" @click="close">
          <Icon icon="mdi:close" width="18" aria-hidden="true" />
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAttendanceStore } from '../Store/attendanceStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useAttendanceStore();
    function close() {
      store.showEdit = false;
      store.clearSelected();
    }
    async function onSubmit() {
      if (store.selected?.id) {
        await store.update(store.selected.id, store.selected);
        close();
      }
    }
    return { store, onSubmit, close };
  }
});
</script>
