<!-- VisitRequestPage.vue -->
<template>
  <div class="space-y-8">
    <!-- Header con gradiente institucional -->
    <div class="bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-900/10 rounded-2xl p-8 border border-slate-200/50 relative overflow-hidden">
      <!-- Efecto decorativo superior -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-700"></div>
      
      <div class="flex items-center justify-between">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold text-slate-800 tracking-wide drop-shadow-sm">Solicitudes de Visita</h1>
          <p class="text-slate-600 font-medium">Gestión integral de solicitudes institucionales</p>
        </div>
        
        <button 
          class="group relative bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
          @click="store.showCreate = true"
        >
          <!-- Efecto de brillo -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
          <span class="relative tracking-wide">+ Nueva Solicitud</span>
        </button>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="space-y-6">
      <VisitRequestList />
      <VisitRequestForm />
      <VisitRequestCreateForm />
      <VisitRequestReceptionModal />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';
import VisitRequestList from '../Components/VisitRequestList.vue';
import VisitRequestForm from '../Components/VisitRequestForm.vue';
import VisitRequestCreateForm from '../Components/VisitRequestCreateForm.vue';
import VisitRequestReceptionModal from '../Components/VisitRequestReceptionModal.vue';

export default defineComponent({
  components: {
    VisitRequestList,
    VisitRequestForm,
    VisitRequestCreateForm,
    VisitRequestReceptionModal
  },
  setup() {
    const store = useVisitRequestStore();
    
    onMounted(() => {
      store.fetchAll();
    });
    
    return { store };
  }
});
</script>
