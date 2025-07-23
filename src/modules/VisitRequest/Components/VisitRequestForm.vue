<template>
  <div 
    v-if="store.showEdit && store.selected" 
    class="fixed right-0 top-0 w-full max-w-xl h-full 
           bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-auto
           border-l border-slate-200/50"
  >
    <!-- Header -->
    <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 
                text-white p-6 shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-1">
            Editar Solicitud
          </h2>
          <p class="text-blue-100 text-sm">
            ID: #{{ store.selected.id }} | Modificación de datos
          </p>
        </div>
        <button 
          @click="store.showEdit = false; store.clearSelected()"
          class="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
        >
          <Icon icon="mdi:close" width="24" />
        </button>
      </div>
    </div>

    <!-- Form Content -->
    <div class="p-6">
      <form @submit.prevent="onSubmit" class="space-y-6">
        
        <!-- Fecha de Solicitud -->
        <div class="form-group">
          <label class="form-label">
            <Icon icon="mdi:calendar" width="18" class="text-blue-600" />
            Fecha de Solicitud
          </label>
          <input 
            v-model="store.selected.requestDate" 
            type="date" 
            class="form-input"
            required 
          />
        </div>

        <!-- Institución -->
        <div class="form-group">
          <label class="form-label">
            <Icon icon="mdi:domain" width="18" class="text-emerald-600" />
            Institución Solicitante
          </label>
          <input 
            v-model="store.selected.requestingInstitution" 
            class="form-input"
            placeholder="Nombre de la institución..."
            required 
          />
        </div>

        <!-- Personas Estimadas -->
        <div class="form-group">
          <label class="form-label">
            <Icon icon="mdi:account-group" width="18" class="text-purple-600" />
            Número de Personas
          </label>
          <input 
            v-model.number="store.selected.estimatedPeople" 
            type="number" 
            min="1" 
            max="200"
            class="form-input"
            placeholder="Cantidad estimada..."
            required 
          />
          <div class="form-hint">
            Cantidad estimada de visitantes
          </div>
        </div>

        <!-- Tipo de Visita -->
        <div class="form-group">
          <label class="form-label">
            <Icon icon="mdi:clipboard-list" width="18" class="text-orange-600" />
            Tipo de Visita
          </label>
          <select v-model="store.selected.visitType" class="form-input" required>
            <option value="">Seleccionar tipo...</option>
            <option value="Académica">Visita Académica</option>
            <option value="Institucional">Visita Institucional</option>
            <option value="Técnica">Visita Técnica</option>
            <option value="Investigación">Visita de Investigación</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <!-- Comentarios -->
        <div class="form-group">
          <label class="form-label">
            <Icon icon="mdi:comment-text" width="18" class="text-teal-600" />
            Observaciones y Comentarios
          </label>
          <textarea 
            v-model="store.selected.comments" 
            class="form-input min-h-24"
            placeholder="Detalles adicionales sobre la visita..."
            rows="4"
          />
        </div>

        <!-- Estado (si es edición) -->
        <div class="form-group">
          <label class="form-label">
            <Icon icon="mdi:flag" width="18" class="text-red-600" />
            Estado de la Solicitud
          </label>
          <select v-model="store.selected.status" class="form-input">
            <option value="Pending">Pendiente</option>
            <option value="Approved">Aprobada</option>
            <option value="Rejected">Rechazada</option>
            <option value="In Progress">En Proceso</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-6 border-t border-slate-200">
          <button 
            type="submit" 
            class="btn-primary flex-1"
            :disabled="isSubmitting"
          >
            <Icon icon="mdi:content-save" width="18" />
            {{ isSubmitting ? 'Actualizando...' : 'Actualizar Solicitud' }}
          </button>
          <button 
            type="button" 
            class="btn-secondary"
            @click="store.showEdit = false; store.clearSelected()"
          >
            <Icon icon="mdi:cancel" width="18" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useVisitRequestStore();
    const isSubmitting = ref(false);

    async function onSubmit() {
      if (store.selected?.id) {
        isSubmitting.value = true;
        try {
          await store.update(store.selected.id, store.selected);
          store.showEdit = false;
          store.clearSelected();
        } finally {
          isSubmitting.value = false;
        }
      }
    }

    return { store, onSubmit, isSubmitting };
  }
});
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2;
}

.form-input {
  @apply w-full px-4 py-3 border border-slate-200 rounded-xl 
         bg-white/80 backdrop-blur-sm
         focus:outline-none focus:ring-2 focus:ring-blue-500/50 
         focus:border-blue-500 
         transition-all duration-200
         hover:border-slate-300;
}

.form-hint {
  @apply text-xs text-slate-500 mt-1;
}

.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 
         text-white font-semibold rounded-xl shadow-lg
         hover:shadow-xl hover:scale-105 
         transition-all duration-200 ease-out
         disabled:opacity-50 disabled:cursor-not-allowed
         flex items-center justify-center gap-2;
}

.btn-secondary {
  @apply px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl
         hover:bg-slate-200 transition-colors duration-200
         flex items-center gap-2;
}
</style>