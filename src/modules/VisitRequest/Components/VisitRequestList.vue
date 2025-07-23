<!-- VisitRequestList.vue -->
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="group relative bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-900/10 rounded-xl p-6 cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 border border-slate-200/50"
        @click="store.select(item.id); store.showEdit = true"
      >
        <!-- Efecto de brillo animado -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
        
        <!-- Header con ID y Estado -->
        <div class="flex justify-between items-center mb-4">
          <span class="text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full tracking-wide">
            #{{ item.id }}
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-bold tracking-wide drop-shadow-sm"
            :class="{
              'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow-500/30': item.status === 'Pending',
              'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/40': item.status === 'Approved',
              'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/40': item.status === 'Rejected'
            }">
            {{ item.status || 'Pending' }}
          </span>
        </div>

        <!-- Contenido principal -->
        <div class="space-y-3">
          <div class="font-bold text-lg text-slate-800 truncate tracking-wide drop-shadow-sm">
            {{ item.requestingInstitution }}
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-slate-600">
              <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              <span class="font-medium">Fecha:</span>
              <span>{{ item.requestDate.split('T')[0] }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-slate-600">
              <div class="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
              <span class="font-medium">Personas:</span>
              <span class="bg-slate-100/80 px-2 py-0.5 rounded-full font-bold text-xs">{{ item.estimatedPeople }}</span>
            </div>
          </div>

          <!-- Comentarios -->
          <div class="bg-slate-50/80 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
            <p class="text-xs text-slate-500 truncate">{{ item.comments }}</p>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex gap-2 mt-4 pt-4 border-t border-slate-200/50">
          <button 
            class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
            @click.stop="store.select(item.id); store.showEdit = true"
          >
            Editar
          </button>
          
          <button 
            class="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
            @click.stop="store.remove(item.id)"
          >
            Eliminar
          </button>
          
          <button 
            class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
            @click.stop="store.receptionRequest = item; store.showReception = true"
          >
            Recepción
          </button>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="mt-8 flex items-center justify-center gap-4">
      <button 
        :disabled="store.page === 1" 
        @click="store.page--; store.fetchAll()" 
        class="bg-white/80 backdrop-blur-xl px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200/50"
      >
        ← Anterior
      </button>
      
      <div class="bg-white/80 backdrop-blur-xl px-4 py-3 rounded-xl shadow-lg border border-slate-200/50">
        <span class="font-bold text-slate-800 tracking-wide">Página {{ store.page }}</span>
      </div>
      
      <button 
        :disabled="store.items.length < store.pageSize" 
        @click="store.page++; store.fetchAll()" 
        class="bg-white/80 backdrop-blur-xl px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200/50"
      >
        Siguiente →
      </button>
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