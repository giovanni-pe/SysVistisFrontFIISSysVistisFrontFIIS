<template>
  <div
    v-if="store.showEdit && store.selected"
    class="fixed right-0 top-0 w-full max-w-md h-full glass-modal shadow-strong p-6 z-50 overflow-auto animate-slide-in-right"
    role="dialog"
    aria-modal="true"
    aria-labelledby="editCompletedVisitTitle"
  >
    <div class="flex-between mb-4">
      <h2 id="editCompletedVisitTitle" class="heading-secondary flex items-center gap-2">
        <Icon icon="mdi:map-marker-check-outline" width="26" class="text-institutional" aria-hidden="true" />
        Editar Visita Completada
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
          <Icon icon="mdi:note-outline" width="16" aria-hidden="true" />
          Resumen
        </span>
        <input v-model="store.selected.summary" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:calendar-clock" width="16" aria-hidden="true" />
          Fecha de registro
        </span>
        <input v-model="store.selected.registrationDate" type="datetime-local" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:comment-text-outline" width="15" aria-hidden="true" />
          Observaciones
        </span>
        <textarea v-model="store.selected.observations" class="textarea-unas mt-1" />
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
import { useCompletedVisitStore } from '../Store/completedVisitStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useCompletedVisitStore();
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
