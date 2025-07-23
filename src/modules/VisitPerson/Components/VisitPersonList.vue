<template>
  <div>
    <!-- Lista de Personas -->
    <div class="grid-cards">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="card-unas hover-lift cursor-pointer group animate-fade-in-up"
        @click="store.select(item.id); store.showEdit = true"
      >
        <!-- Header de la Card -->
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 gradient-emerald rounded-full flex-center">
              <iconify-icon 
                :icon="item.isRepresentative ? 'mdi:account-star' : 'mdi:account'" 
                class="text-white text-xl"
              ></iconify-icon>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-lg truncate">
                {{ item.fullName }}
              </h3>
              <div class="flex items-center gap-2 mt-1">
                <span 
                  class="text-xs font-semibold px-3 py-1 rounded-full"
                  :class="item.isRepresentative 
                    ? 'status-approved' 
                    : 'bg-slate-100 text-slate-600'"
                >
                  <iconify-icon 
                    :icon="item.isRepresentative ? 'mdi:star' : 'mdi:account-group'" 
                    class="mr-1"
                  ></iconify-icon>
                  {{ item.isRepresentative ? 'Representante' : 'Miembro' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Información de Contacto -->
        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-3 text-muted">
            <iconify-icon icon="mdi:card-account-details" class="w-4 h-4"></iconify-icon>
            <span class="font-medium">DNI:</span>
            <span>{{ item.dni }}</span>
          </div>
          
          <div class="flex items-center gap-3 text-muted">
            <iconify-icon icon="mdi:email" class="w-4 h-4"></iconify-icon>
            <span class="font-medium">Email:</span>
            <span class="truncate">{{ item.email }}</span>
          </div>
          
          <div class="flex items-center gap-3 text-muted">
            <iconify-icon icon="mdi:phone" class="w-4 h-4"></iconify-icon>
            <span class="font-medium">Tel:</span>
            <span>{{ item.phone }}</span>
          </div>
        </div>
        
        <!-- Botones de Acción -->
        <div class="flex gap-2 pt-4 border-t border-slate-200">
          <button 
            class="btn-secondary-unas flex-1 flex items-center justify-center gap-2 text-sm hover-glow" 
            @click.stop="store.select(item.id); store.showEdit = true"
          >
            <iconify-icon icon="mdi:pencil"></iconify-icon>
            Editar
          </button>
          <button 
            class="btn-danger-unas flex items-center justify-center gap-2 text-sm px-4" 
            @click.stop="confirmDelete(item)"
          >
            <iconify-icon icon="mdi:delete"></iconify-icon>
            Eliminar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Estado Vacío -->
    <div 
      v-if="store.items.length === 0" 
      class="glass-card text-center py-16 animate-fade-in-up"
    >
      <div class="w-20 h-20 gradient-emerald rounded-full flex-center mx-auto mb-4 animate-pulse-soft">
        <iconify-icon icon="mdi:account-group" class="text-white text-3xl"></iconify-icon>
      </div>
      <h3 class="heading-secondary mb-2">No hay personas registradas</h3>
      <p class="text-muted mb-6">Comienza agregando la primera persona a la visita</p>
      <button 
        class="btn-primary-unas hover-glow flex items-center gap-2 mx-auto"
        @click="store.showCreate = true"
      >
        <iconify-icon icon="mdi:plus"></iconify-icon>
        Agregar Primera Persona
      </button>
    </div>
    
    <!-- Paginación -->
    <div class="flex-center gap-4 mt-8" v-if="store.items.length > 0">
      <button 
        :disabled="store.page === 1" 
        @click="store.page--; store.fetchAll()" 
        class="btn-secondary-unas flex items-center gap-2"
        :class="{ 'opacity-50 cursor-not-allowed': store.page === 1 }"
      >
        <iconify-icon icon="mdi:chevron-left"></iconify-icon>
        Anterior
      </button>
      
      <div class="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
        <iconify-icon icon="mdi:page-layout-body" class="text-institutional"></iconify-icon>
        <span class="font-semibold text-slate-700">Página {{ store.page }}</span>
      </div>
      
      <button 
        :disabled="store.items.length < store.pageSize" 
        @click="store.page++; store.fetchAll()" 
        class="btn-secondary-unas flex items-center gap-2"
        :class="{ 'opacity-50 cursor-not-allowed': store.items.length < store.pageSize }"
      >
        Siguiente
        <iconify-icon icon="mdi:chevron-right"></iconify-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVisitPersonStore } from '../Store/visitPersonStore';

export default defineComponent({
  setup() {
    const store = useVisitPersonStore();
    
    function confirmDelete(item: any) {
      if (confirm(`¿Está seguro que desea eliminar a ${item.fullName}?`)) {
        store.remove(item.id);
      }
    }
    
    return { store, confirmDelete };
  }
});
</script>