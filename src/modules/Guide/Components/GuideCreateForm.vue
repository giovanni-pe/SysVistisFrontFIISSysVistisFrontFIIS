<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Guía</h2>
      <label class="block">Nombre Completo
        <input v-model="form.fullName" class="input input-bordered w-full" required />
      </label>
      <label class="block">Email
        <input v-model="form.email" type="email" class="input input-bordered w-full" required />
      </label>
      <label class="block">Teléfono
        <input v-model="form.phone" class="input input-bordered w-full" required maxlength="15" />
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
import { useGuideStore } from '../Store/guideStore';
export default defineComponent({
  setup() {
    const store = useGuideStore();
    const form = reactive({
      fullName: '',
      email: '',
      phone: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { fullName: '', email: '', phone: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
