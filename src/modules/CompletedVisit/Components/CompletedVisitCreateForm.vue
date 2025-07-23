<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Visita Completada</h2>
      <label class="block">ID Recepción
        <input v-model.number="form.receptionId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">Resumen
        <input v-model="form.summary" class="input input-bordered w-full" required />
      </label>
      <label class="block">Fecha de registro
        <input v-model="form.registrationDate" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="block">Observaciones
        <textarea v-model="form.observations" class="textarea textarea-bordered w-full" />
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
import { useCompletedVisitStore } from '../Store/completedVisitStore';
export default defineComponent({
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
