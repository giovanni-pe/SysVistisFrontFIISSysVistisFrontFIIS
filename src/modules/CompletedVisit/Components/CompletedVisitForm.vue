<template>
  <div v-if="store.showEdit && store.selected" class="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-lg p-6 z-50 overflow-auto">
    <h2 class="text-xl font-bold mb-4">Editar Visita Completada</h2>
    <form @submit.prevent="onSubmit">
      <label class="block mb-2">ID Recepción
        <input v-model.number="store.selected.receptionId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block mb-2">Resumen
        <input v-model="store.selected.summary" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Fecha de registro
        <input v-model="store.selected.registrationDate" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Observaciones
        <textarea v-model="store.selected.observations" class="textarea textarea-bordered w-full" />
      </label>
      <div class="mt-4 flex gap-2">
        <button type="submit" class="btn btn-primary">Actualizar</button>
        <button type="button" class="btn btn-secondary" @click="store.showEdit = false; store.clearSelected()">Cerrar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCompletedVisitStore } from '../Store/completedVisitStore';
export default defineComponent({
  setup() {
    const store = useCompletedVisitStore();
    async function onSubmit() {
      if (store.selected?.id) {
        await store.update(store.selected.id, store.selected);
        store.showEdit = false;
        store.clearSelected();
      }
    }
    return { store, onSubmit };
  }
});
</script>
