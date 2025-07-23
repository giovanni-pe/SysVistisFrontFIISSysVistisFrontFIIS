<template>
  <div class="container-unas py-6">
    <!-- Lista de recepciones -->
    <div class="grid-cards">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="card-unas hover-lift group cursor-pointer"
        @click="store.select(item.id); store.showEdit = true"
      >
        <div class="flex-between items-start mb-3">
          <span class="text-institutional font-bold">ID #{{ item.id }}</span>
          <span :class="statusBadgeClass(item.status)" class="text-xs font-semibold py-1 px-2 rounded-full">
            {{ formatStatus(item.status) }}
          </span>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center text-muted">
            <Icon icon="mdi:file-document-outline" class="mr-2 text-unas-emerald-500" />
            <span>Solicitud: {{ item.requestId }}</span>
          </div>
          
          <div class="flex items-center text-muted">
            <Icon icon="mdi:calendar-start" class="mr-2 text-unas-emerald-500" />
            <span>Inicio: {{ formatDate(item.startTime) }}</span>
          </div>
          
          <div class="flex items-center text-muted">
            <Icon icon="mdi:calendar-end" class="mr-2 text-unas-emerald-500" />
            <span>Fin: {{ formatDate(item.endTime) }}</span>
          </div>
          
          <div v-if="item.notes" class="mt-3 text-xs text-gray-500 line-clamp-2">
            <Icon icon="mdi:note-text-outline" class="mr-2 text-unas-emerald-500" />
            {{ item.notes }}
          </div>
        </div>
        
        <div class="flex gap-2 mt-4 pt-3 border-t border-gray-100">
          <button 
            class="btn-secondary-unas text-xs py-1 px-3 flex items-center"
            @click.stop="store.select(item.id); store.showEdit = true"
          >
            <Icon icon="mdi:pencil-outline" class="mr-1" />
            Editar
          </button>
          <button 
            class="btn-danger-unas text-xs py-1 px-3 flex items-center"
            @click.stop="store.remove(item.id)"
          >
            <Icon icon="mdi:trash-can-outline" class="mr-1" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Paginación -->
    <div class="flex-center gap-4 mt-8">
      <button 
        :disabled="store.page === 1" 
        @click="store.page--; store.fetchAll()" 
        class="btn-secondary-unas py-2 px-4 flex items-center"
        :class="{ 'opacity-50 cursor-not-allowed': store.page === 1 }"
      >
        <Icon icon="mdi:chevron-left" class="mr-1" />
        Anterior
      </button>
      
      <span class="text-muted font-medium">Página {{ store.page }}</span>
      
      <button 
        :disabled="store.items.length < store.pageSize" 
        @click="store.page++; store.fetchAll()" 
        class="btn-secondary-unas py-2 px-4 flex items-center"
        :class="{ 'opacity-50 cursor-not-allowed': store.items.length < store.pageSize }"
      >
        Siguiente
        <Icon icon="mdi:chevron-right" class="ml-1" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useReceptionsStore } from '../Store/receptionsStore';
import { Icon } from '@iconify/vue';
export default defineComponent({
  components: { Icon },
  setup() {
    const store = useReceptionsStore();
    
    const formatDate = (dateString: string) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    };
    
    const formatStatus = (status: string) => {
      const statusMap: Record<string, string> = {
        pending: 'Pendiente',
        completed: 'Completado',
        cancelled: 'Cancelado'
      };
      return statusMap[status] || status;
    };
    
    const statusBadgeClass = (status: string) => {
      const base = 'text-xs font-semibold py-1 px-2 rounded-full';
      switch (status) {
        case 'pending':
          return `${base} bg-amber-100 text-amber-800`;
        case 'completed':
          return `${base} bg-green-100 text-green-800`;
        case 'cancelled':
          return `${base} bg-red-100 text-red-800`;
        default:
          return `${base} bg-blue-100 text-blue-800`;
      }
    };
    
    return { 
      store,
      formatDate,
      formatStatus,
      statusBadgeClass
    };
  }
});
</script>
