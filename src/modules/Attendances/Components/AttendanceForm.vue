<template>
  <div v-if="store.showEdit && store.selected" class="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-lg p-6 z-50 overflow-auto">
    <h2 class="text-xl font-bold mb-4">Editar Asistencia</h2>
    <form @submit.prevent="onSubmit">
      <label class="block mb-2">ID Recepción
        <input v-model.number="store.selected.receptionId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block mb-2">ID Persona
        <input v-model.number="store.selected.personId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="store.selected.attended" class="checkbox" />
        <span class="ml-2">¿Asistió?</span>
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="store.selected.viaQR" class="checkbox" />
        <span class="ml-2">¿Vía QR?</span>
      </label>
      <label class="block mb-2">Hora de Check-in
        <input v-model="store.selected.checkinTime" type="datetime-local" class="input input-bordered w-full" required />
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
import { useAttendanceStore } from '../Store/attendanceStore';
export default defineComponent({
  setup() {
    const store = useAttendanceStore();
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
