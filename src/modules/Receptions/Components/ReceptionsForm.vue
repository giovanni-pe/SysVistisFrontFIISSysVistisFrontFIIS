<template>
  <div v-if="store.showEdit && store.selected" class="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-lg p-6 z-50 overflow-auto">
    <h2 class="text-xl font-bold mb-4">Editar Recepción</h2>
    <form @submit.prevent="onSubmit">
      <label class="block mb-2">Solicitud asociada (ID)
        <input v-model.number="store.selected.requestId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block mb-2">Hora inicio
        <input v-model="store.selected.startTime" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Hora fin
        <input v-model="store.selected.endTime" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Estado
        <input v-model="store.selected.status" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Notas
        <textarea v-model="store.selected.notes" class="textarea textarea-bordered w-full" />
      </label>
      <label class="block mb-2">Responsable check-in
        <input v-model="store.selected.checkinResponsible" class="input input-bordered w-full" required />
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
import { useReceptionsStore } from '../Store/receptionsStore';
export default defineComponent({
  setup() {
    const store = useReceptionsStore();
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
