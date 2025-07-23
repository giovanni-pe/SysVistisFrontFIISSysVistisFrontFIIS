<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Recepción</h2>
      <label class="block">Solicitud asociada (ID)
        <input v-model.number="form.requestId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">Hora inicio
        <input v-model="form.startTime" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="block">Hora fin
        <input v-model="form.endTime" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="block">Estado
        <input v-model="form.status" class="input input-bordered w-full" required />
      </label>
      <label class="block">Notas
        <textarea v-model="form.notes" class="textarea textarea-bordered w-full" />
      </label>
      <label class="block">Responsable check-in
        <input v-model="form.checkinResponsible" class="input input-bordered w-full" required />
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
import { useReceptionsStore } from '../Store/receptionsStore';
export default defineComponent({
  setup() {
    const store = useReceptionsStore();
    const form = reactive({
      requestId: 0,
      startTime: '',
      endTime: '',
      status: '',
      notes: '',
      checkinResponsible: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { requestId: 0, startTime: '', endTime: '', status: '', notes: '', checkinResponsible: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
