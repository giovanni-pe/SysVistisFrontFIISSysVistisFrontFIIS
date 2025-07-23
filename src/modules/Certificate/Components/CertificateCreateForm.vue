<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nuevo Certificado</h2>
      <label class="block">ID Persona
        <input v-model.number="form.personId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">ID Visita
        <input v-model.number="form.visitId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">Código Certificado
        <input v-model="form.certificateCode" class="input input-bordered w-full" required />
      </label>
      <label class="block">Fecha de emisión
        <input v-model="form.issueDate" type="datetime-local" class="input input-bordered w-full" required />
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="form.delivered" class="checkbox" />
        <span class="ml-2">¿Entregado?</span>
      </label>
      <label class="block">Descripción
        <textarea v-model="form.description" class="textarea textarea-bordered w-full" />
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
import { useCertificateStore } from '../Store/certificateStore';
export default defineComponent({
  setup() {
    const store = useCertificateStore();
    const form = reactive({
      personId: 0,
      visitId: 0,
      certificateCode: '',
      issueDate: '',
      delivered: true,
      description: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { personId: 0, visitId: 0, certificateCode: '', issueDate: '', delivered: true, description: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
