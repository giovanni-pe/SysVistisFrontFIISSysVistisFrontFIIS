<template>
  <div v-if="store.showEdit && store.selected" class="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-lg p-6 z-50 overflow-auto">
    <h2 class="text-xl font-bold mb-4">Editar Guía</h2>
    <form @submit.prevent="onSubmit">
      <label class="block mb-2">Nombre Completo
        <input v-model="store.selected.fullName" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Email
        <input v-model="store.selected.email" type="email" class="input input-bordered w-full" required />
      </label>
      <label class="block mb-2">Teléfono
        <input v-model="store.selected.phone" class="input input-bordered w-full" required maxlength="15" />
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
import { useGuideStore } from '../Store/guideStore';
export default defineComponent({
  setup() {
    const store = useGuideStore();
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
