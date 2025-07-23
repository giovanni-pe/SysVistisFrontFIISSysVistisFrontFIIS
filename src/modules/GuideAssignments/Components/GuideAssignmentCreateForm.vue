<template>
  <div
    v-if="store.showCreate"
    class="fixed inset-0 modal-overlay flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="newAssignmentTitle"
  >
    <form
      @submit.prevent="onSubmit"
      class="glass-modal p-6 rounded shadow-strong w-full max-w-md space-y-4 animate-fade-in-up"
    >
      <div class="flex-between mb-2">
        <h2 id="newAssignmentTitle" class="heading-secondary flex items-center gap-2">
          <Icon icon="mdi:link-plus" width="26" class="text-institutional" aria-hidden="true" />
          Nueva Asignación
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
          <Icon icon="mdi:file-document-outline" width="16" aria-hidden="true" />
          ID Solicitud
        </span>
        <input v-model.number="form.requestId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:account-outline" width="16" aria-hidden="true" />
          ID Guía
        </span>
        <input v-model.number="form.guideId" type="number" class="input-unas mt-1" required min="1" />
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
import { useGuideAssignmentStore } from '../Store/guideAssignmentStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useGuideAssignmentStore();
    const form = reactive({
      requestId: 0,
      guideId: 0,
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { requestId: 0, guideId: 0 });
    }
    return { store, form, onSubmit };
  }
});
</script>
