<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Asignación</h2>
      <label class="block">ID Solicitud
        <input v-model.number="form.requestId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">ID Guía
        <input v-model.number="form.guideId" type="number" class="input input-bordered w-full" required min="1" />
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
import { useGuideAssignmentStore } from '../Store/guideAssignmentStore';
export default defineComponent({
  setup() {
    const store = useGuideAssignmentStore();
    const form = reactive({
      requestId: 0,
      guideId: 0,
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { requestId: 0, guideId: 0 });
    }
    return { store, form, onSubmit };
  }
});
</script>
