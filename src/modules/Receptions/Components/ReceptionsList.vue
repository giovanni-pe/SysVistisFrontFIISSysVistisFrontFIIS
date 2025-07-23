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
          <span class="font-semibold text-gray-700">ID #{{ item.id }}</span>
          <span class="text-xs rounded px-2 py-0.5 bg-blue-100 text-blue-700">{{ item.status }}</span>
        </div>
        <div class="text-gray-500 text-xs">Solicitud: {{ item.requestId }}</div>
        <div class="text-gray-500 text-xs">Inicio: {{ item.startTime?.split('T')[0] }}</div>
        <div class="text-gray-500 text-xs">Fin: {{ item.endTime?.split('T')[0] }}</div>
        <div class="text-xs text-gray-400 truncate mt-2">{{ item.notes }}</div>
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
import { useReceptionsStore } from '../Store/receptionsStore';
export default defineComponent({
  setup() {
    const store = useReceptionsStore();
    return { store };
  }
});
</script>
