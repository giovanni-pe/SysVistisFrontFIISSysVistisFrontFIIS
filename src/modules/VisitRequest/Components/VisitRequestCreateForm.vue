<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Solicitud</h2>
      <label class="block">Fecha
        <input v-model="form.requestDate" type="date" class="input input-bordered w-full" required />
      </label>
      <label class="block">Institución
        <input v-model="form.requestingInstitution" class="input input-bordered w-full" required />
      </label>
      <label class="block">Personas estimadas
        <input v-model.number="form.estimatedPeople" type="number" min="1" class="input input-bordered w-full" required />
      </label>
      <label class="block">Tipo de visita
        <input v-model="form.visitType" class="input input-bordered w-full" required />
      </label>
      <label class="block">Comentarios
        <textarea v-model="form.comments" class="textarea textarea-bordered w-full" />
      </label>
      <div class="flex gap-2 justify-end">
        <button type="button" class="btn" @click="store.showCreate = false">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';
export default defineComponent({
  setup() {
    const store = useVisitRequestStore();
    const form = reactive({
      requestDate: '',
      requestingInstitution: '',
      estimatedPeople: 1,
      visitType: '',
      comments: ''
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      // Opcional: limpiar el form
      Object.assign(form, { requestDate: '', requestingInstitution: '', estimatedPeople: 1, visitType: '', comments: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
