<template>
  <div v-if="store.showReception && store.receptionRequest" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4">
      <h2 class="text-xl font-bold">Registrar Recepción</h2>
      <div class="mb-2 text-sm text-gray-500">
        Solicitud #{{ store.receptionRequest.id }} | {{ store.receptionRequest.requestingInstitution }}
      </div>
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
        <button type="button" class="btn" @click="store.showReception = false; store.receptionRequest = null">Cancelar</button>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';
export default defineComponent({
  setup() {
    const store = useVisitRequestStore();
    const form = reactive({
      requestId: 0,
      startTime: '',
      endTime: '',
      status: '',
      notes: '',
      checkinResponsible: ''
    });
    watch(
      () => store.receptionRequest,
      (val) => {
        if (val) form.requestId = val.id;
      },
      { immediate: true }
    );
    async function onSubmit() {
      await store.createReception(form);
      store.showReception = false;
      store.receptionRequest = null;
      // Opcional: limpiar form
      Object.assign(form, { requestId: 0, startTime: '', endTime: '', status: '', notes: '', checkinResponsible: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
