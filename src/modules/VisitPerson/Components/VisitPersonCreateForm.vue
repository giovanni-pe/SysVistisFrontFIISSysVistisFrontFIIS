<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Persona</h2>
      <label class="block">Solicitud asociada (ID)
        <input v-model.number="form.requestId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">Nombre Completo
        <input v-model="form.fullName" class="input input-bordered w-full" required />
      </label>
      <label class="block">DNI
        <input v-model="form.dni" class="input input-bordered w-full" required maxlength="12" />
      </label>
      <label class="block">Email
        <input v-model="form.email" type="email" class="input input-bordered w-full" required />
      </label>
      <label class="block">Teléfono
        <input v-model="form.phone" class="input input-bordered w-full" required maxlength="15" />
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="form.isRepresentative" class="checkbox" />
        <span class="ml-2">¿Representante?</span>
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
import { useVisitPersonStore } from '../Store/visitPersonStore';

export default defineComponent({
  setup() {
    const store = useVisitPersonStore();
    const form = reactive({
      requestId: 0,         // Debes establecer este valor antes de guardar (puede venir de la UI principal)
      fullName: '',
      dni: '',
      email: '',
      phone: '',
      isRepresentative: false,
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { requestId: 0, fullName: '', dni: '', email: '', phone: '', isRepresentative: false });
    }
    return { store, form, onSubmit };
  }
});
</script>
