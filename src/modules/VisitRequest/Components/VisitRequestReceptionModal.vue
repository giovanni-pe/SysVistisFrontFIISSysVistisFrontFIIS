<!-- VisitRequestReceptionModal.vue -->
<template>
  <div v-if="store.showReception && store.receptionRequest" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <form @submit.prevent="onSubmit" class="bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/20 p-8 rounded-2xl w-full max-w-2xl space-y-6 border border-slate-200/50 relative overflow-hidden">
      <!-- Efecto decorativo -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600"></div>
      
      <div class="space-y-2">
        <h2 class="text-2xl font-bold text-slate-800 tracking-wide drop-shadow-sm">Registrar Recepción</h2>
        <div class="bg-slate-50/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50">
          <span class="text-sm font-medium text-slate-600">
            Solicitud <span class="font-bold text-emerald-600">#{{ store.receptionRequest.id }}</span> | 
            <span class="font-bold text-slate-800">{{ store.receptionRequest.requestingInstitution }}</span>
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label class="block space-y-2">
          <span class="text-sm font-bold text-slate-700 tracking-wide">Hora inicio</span>
          <input 
            v-model="form.startTime" 
            type="datetime-local" 
            class="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            required 
          />
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-bold text-slate-700 tracking-wide">Hora fin</span>
          <input 
            v-model="form.endTime" 
            type="datetime-local" 
            class="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            required 
          />
        </label>
      </div>

      <label class="block space-y-2">
        <span class="text-sm font-bold text-slate-700 tracking-wide">Estado</span>
        <input 
          v-model="form.status" 
          class="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          required 
        />
      </label>

      <label class="block space-y-2">
        <span class="text-sm font-bold text-slate-700 tracking-wide">Notas</span>
        <textarea 
          v-model="form.notes" 
          rows="4"
          class="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl resize-none font-medium"
          placeholder="Ingrese notas adicionales..."
        ></textarea>
      </label>

      <label class="block space-y-2">
        <span class="text-sm font-bold text-slate-700 tracking-wide">Responsable check-in</span>
        <input 
          v-model="form.checkinResponsible" 
          class="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          required 
        />
      </label>

      <div class="flex gap-4 justify-end pt-4 border-t border-slate-200/50">
        <button 
          type="button" 
          class="px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl font-bold text-slate-700 hover:bg-slate-100/80 transition-all duration-300 shadow-lg hover:shadow-xl"
          @click="store.showReception = false; store.receptionRequest = null"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 tracking-wide"
        >
          Registrar Recepción
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';

export default defineComponent({
  setup() {
    const store = useVisitRequestStore();
    const form = reactive({
      requestId: 0,
      startTime: '',
      endTime: '',
      status: '',
      notes: '',
      checkinResponsible: ''
    });

    watch(
      () => store.receptionRequest,
      (val) => {
        if (val) form.requestId = val.id;
      },
      { immediate: true }
    );

    async function onSubmit() {
      await store.createReception(form);
      store.showReception = false;
      store.receptionRequest = null;
      Object.assign(form, { requestId: 0, startTime: '', endTime: '', status: '', notes: '', checkinResponsible: '' });
    }

    return { store, form, onSubmit };
  }
});
</script>