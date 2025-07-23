<template>
  <div>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="bg-white rounded shadow p-4 w-80 cursor-pointer hover:shadow-lg"
        @click="store.select(item.id); store.showEdit = true"
      >
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs text-gray-400">#{{ item.id }}</span>
          <span class="px-2 py-0.5 rounded text-xs"
            :class="{
              'bg-yellow-200 text-yellow-700': item.status === 'Pending',
              'bg-green-200 text-green-700': item.status === 'Approved',
              'bg-red-200 text-red-700': item.status === 'Rejected'
            }">
            {{ item.status || 'Pending' }}
          </span>
        </div>
        <div class="font-semibold mb-1 truncate">{{ item.requestingInstitution }}</div>
        <div class="text-gray-500 text-sm">Fecha: {{ item.requestDate.split('T')[0] }}</div>
        <div class="text-gray-500 text-sm">Personas: {{ item.estimatedPeople }}</div>
        <div class="text-xs text-gray-400 truncate mt-2">{{ item.comments }}</div>
        <div class="flex gap-2 mt-3">
          <button class="btn btn-xs btn-primary" @click.stop="store.select(item.id); store.showEdit = true">Editar</button>
          <button class="btn btn-xs btn-error" @click.stop="store.remove(item.id)">Eliminar</button>
          <button class="btn btn-xs btn-secondary" @click.stop="store.receptionRequest = item; store.showReception = true">Recepción</button>
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
import { useVisitRequestStore } from '../Store/visitRequestStore';
export default defineComponent({
  setup() {
    const store = useVisitRequestStore();
    return { store };
  }
});
</script>
