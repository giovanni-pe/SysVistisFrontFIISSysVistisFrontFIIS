<template>
  <div
    v-if="store.showCreate"
    class="fixed inset-0 modal-overlay flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="newCompletedVisitTitle"
  >
    <form
      @submit.prevent="onSubmit"
      class="glass-modal p-6 rounded shadow-strong w-full max-w-md space-y-4 animate-fade-in-up"
    >
      <div class="flex-between mb-2">
        <h2 id="newCompletedVisitTitle" class="heading-secondary flex items-center gap-2">
          <Icon icon="mdi:map-marker-check-outline" width="26" class="text-institutional" aria-hidden="true" />
          Nueva Visita Completada
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
          <Icon icon="mdi:note-outline" width="16" aria-hidden="true" />
          Resumen
        </span>
        <input v-model="form.summary" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:calendar-clock" width="16" aria-hidden="true" />
          Fecha de registro
        </span>
        <input v-model="form.registrationDate" type="datetime-local" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:comment-text-outline" width="15" aria-hidden="true" />
          Observaciones
        </span>
        <textarea v-model="form.observations" class="textarea-unas mt-1" />
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
import { useCompletedVisitStore } from '../Store/completedVisitStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useCompletedVisitStore();
    const form = reactive({
      receptionId: 0,
      summary: '',
      registrationDate: '',
      observations: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { receptionId: 0, summary: '', registrationDate: '', observations: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
