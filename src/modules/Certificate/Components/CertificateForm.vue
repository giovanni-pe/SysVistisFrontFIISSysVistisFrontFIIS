<template>
  <div v-if="store.showEdit && store.selected" class="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-lg p-6 z-50 overflow-auto">
    <h2 class="text-xl font-bold mb-4">Editar Certificado</h2>
    <form @submit.prevent="onSubmit">
      <label class="block mb-2">ID Persona
        <input v-model.number="store.selected.personId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block mb-2">ID Visita
        <input v-model.number="store.selected.visitId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block mb-2">Código Certificado
        <input v-model="store.selected.certificateCode" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Fecha de emisión
        <input v-model="store.selected.issueDate" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="store.selected.delivered" class="checkbox" />
        <span class="ml-2">¿Entregado?</span>
      </label>
      <label class="block mb-2">Descripción
        <textarea v-model="store.selected.description" class="textarea textarea-bordered w-full" />
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
import { useCertificateStore } from '../Store/certificateStore';
export default defineComponent({
  setup() {
    const store = useCertificateStore();
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
