<template>
  <div v-if="store.showEdit && store.selected" class="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-lg p-6 z-50 overflow-auto">
    <h2 class="text-xl font-bold mb-4">Editar Solicitud #{{ store.selected.id }}</h2>
    <form @submit.prevent="onSubmit">
      <label class="block mb-2">Fecha
        <input v-model="store.selected.requestDate" type="date" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Institución
        <input v-model="store.selected.requestingInstitution" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Personas estimadas
        <input v-model.number="store.selected.estimatedPeople" type="number" min="1" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Tipo de visita
        <input v-model="store.selected.visitType" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Comentarios
        <textarea v-model="store.selected.comments" class="textarea textarea-bordered w-full" />
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
import { useVisitRequestStore } from '../Store/visitRequestStore';
export default defineComponent({
  setup() {
    const store = useVisitRequestStore();
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
