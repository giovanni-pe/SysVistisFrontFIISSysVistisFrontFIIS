<template>
  <div>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="bg-white rounded shadow p-4 w-80 cursor-pointer hover:shadow-lg"
        @click="store.select(item.id); store.showEdit = true"
      >
        <div class="font-semibold text-gray-700 mb-1">
          Asistencia #{{ item.id }}
        </div>
        <div class="text-gray-500 text-xs">Recepción: {{ item.receptionId }}</div>
        <div class="text-gray-500 text-xs">Persona: {{ item.personId }}</div>
        <div class="text-xs" :class="item.attended ? 'text-green-700' : 'text-red-700'">
          {{ item.attended ? 'Asistió' : 'No asistió' }}
        </div>
        <div class="text-xs" :class="item.viaQR ? 'text-blue-700' : 'text-gray-700'">
          {{ item.viaQR ? 'Vía QR' : 'Manual' }}
        </div>
        <div class="text-gray-400 text-xs">Check-in: {{ item.checkinTime?.replace('T', ' ').slice(0, 16) }}</div>
        <div class="flex gap-2 mt-2">
          <button class="btn btn-xs btn-primary" @click.stop="store.select(item.id); store.showEdit = true">Editar</button>
          <button class="btn btn-xs btn-error" @click.stop="store.remove(item.id)">Eliminar</button>
        </div>
      </div>
    </div>
    <!-- Paginación -->
    <div class="mt-6 flex gap-2">
      <button :disabled="store.page === 1" @click="store.page--; store.fetchAll()" class="btn btn-sm">Anterior</button>
      <span>Página {{ store.page }}</span>
      <button :disabled="store.items.length < store.pageSize" @click="store.page++; store.fetchAll()" class="btn btn-sm">Siguiente</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAttendanceStore } from '../Store/attendanceStore';
export default defineComponent({
  setup() {
    const store = useAttendanceStore();
    return { store };
  }
});
</script>
