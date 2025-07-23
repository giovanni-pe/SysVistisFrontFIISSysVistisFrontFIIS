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
          <span class="font-semibold text-gray-700 truncate">{{ item.fullName }}</span>
          <span class="text-xs rounded px-2 py-0.5"
            :class="item.isRepresentative ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'">
            {{ item.isRepresentative ? 'Representante' : 'Miembro' }}
          </span>
        </div>
        <div class="text-gray-500 text-xs">DNI: {{ item.dni }}</div>
        <div class="text-gray-500 text-xs">Email: {{ item.email }}</div>
        <div class="text-gray-500 text-xs">Tel: {{ item.phone }}</div>
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
import { useVisitPersonStore } from '../Store/visitPersonStore';
export default defineComponent({
  setup() {
    const store = useVisitPersonStore();
    return { store };
  }
});
</script>
