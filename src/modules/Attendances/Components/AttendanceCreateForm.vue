<template>
  <div v-if="store.showCreate" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <form @submit.prevent="onSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">Nueva Asistencia</h2>
      <label class="block">ID Recepción
        <input v-model.number="form.receptionId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="block">ID Persona
        <input v-model.number="form.personId" type="number" class="input input-bordered w-full" required min="1" />
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="form.attended" class="checkbox" />
        <span class="ml-2">¿Asistió?</span>
      </label>
      <label class="inline-flex items-center mt-2 mb-4">
        <input type="checkbox" v-model="form.viaQR" class="checkbox" />
        <span class="ml-2">¿Vía QR?</span>
      </label>
      <label class="block">Hora de Check-in
        <input v-model="form.checkinTime" type="datetime-local" class="input input-bordered w-full" required />
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
import { useAttendanceStore } from '../Store/attendanceStore';
export default defineComponent({
  setup() {
    const store = useAttendanceStore();
    const form = reactive({
      receptionId: 0,
      personId: 0,
      attended: true,
      viaQR: true,
      checkinTime: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { receptionId: 0, personId: 0, attended: true, viaQR: true, checkinTime: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
