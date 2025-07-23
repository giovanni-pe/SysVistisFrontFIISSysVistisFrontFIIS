<template>
  <div 
    v-if="store.showCreate" 
    class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm 
           flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl 
                w-full max-w-2xl max-h-[90vh] overflow-hidden
                border border-white/20">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-emerald-600 to-teal-700 
                  text-white px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold mb-1">
              Nueva Solicitud de Visita
            </h2>
            <p class="text-emerald-100 text-sm">
              Registro de nueva solicitud para FIIS - UNAS
            </p>
          </div>
          <button 
            @click="store.showCreate = false"
            class="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <Icon icon="mdi:close" width="24" />
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
        <form @submit.prevent="onSubmit" class="space-y-6">
          
          <!-- Row 1: Fecha y Institución -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="form-label">
                <Icon icon="mdi:calendar-clock" width="18" class="text-blue-600" />
                Fecha Solicitada
              </label>
              <input 
                v-model="form.requestDate" 
                type="date" 
                class="form-input"
                :min="today"
                required 
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <Icon icon="mdi:account-group" width="18" class="text-purple-600" />
                Número de Visitantes
              </label>
              <input 
                v-model.number="form.estimatedPeople" 
                type="number" 
                min="1" 
                max="200"
                class="form-input"
                placeholder="Ej: 25"
                required 
              />
            </div>
          </div>

          <!-- Institución -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:domain" width="18" class="text-emerald-600" />
              Institución o Entidad Solicitante
            </label>
            <input 
              v-model="form.requestingInstitution" 
              class="form-input"
              placeholder="Universidad, colegio, empresa, etc..."
              required 
            />
            <div class="form-hint">
              Nombre completo de la institución que solicita la visita
            </div>
          </div>

          <!-- Tipo de Visita -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:clipboard-list" width="18" class="text-orange-600" />
              Tipo de Visita
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label 
                v-for="type in visitTypes" 
                :key="type.value"
                class="visit-type-card"
                :class="{ 'selected': form.visitType === type.value }"
              >
                <input 
                  v-model="form.visitType" 
                  type="radio" 
                  :value="type.value" 
                  class="sr-only"
                  required
                />
                <Icon :icon="type.icon" width="20" class="mb-1" />
                <span class="text-sm font-medium">{{ type.label }}</span>
              </label>
            </div>
          </div>

          <!-- Información de Contacto -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="form-label">
                <Icon icon="mdi:account" width="18" class="text-indigo-600" />
                Persona de Contacto
              </label>
              <input 
                v-model="form.contactPerson" 
                class="form-input"
                placeholder="Nombre del responsable"
                required 
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <Icon icon="mdi:phone" width="18" class="text-green-600" />
                Teléfono de Contacto
              </label>
              <input 
                v-model="form.contactPhone" 
                type="tel" 
                class="form-input"
                placeholder="Número de teléfono"
                required 
              />
            </div>
          </div>

          <!-- Observaciones -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:comment-text" width="18" class="text-teal-600" />
              Observaciones y Detalles
            </label>
            <textarea 
              v-model="form.comments" 
              class="form-input min-h-28"
              placeholder="Detalles específicos sobre la visita, áreas de interés, objetivos, etc..."
              rows="4"
            />
            <div class="form-hint">
              Incluya información relevante sobre el propósito y necesidades específicas de la visita
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-6 border-t border-slate-200">
            <button 
              type="button" 
              class="btn-secondary flex-1"
              @click="store.showCreate = false"
            >
              <Icon icon="mdi:cancel" width="18" />
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn-primary flex-1"
              :disabled="isSubmitting"
            >
              <Icon icon="mdi:send" width="18" />
              {{ isSubmitting ? 'Enviando...' : 'Enviar Solicitud' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useVisitRequestStore();
    const isSubmitting = ref(false);

    const today = computed(() => {
      return new Date().toISOString().split('T')[0];
    });

    const visitTypes = [
      { value: 'Académica', label: 'Académica', icon: 'mdi:school' },
      { value: 'Institucional', label: 'Institucional', icon: 'mdi:domain' },
      { value: 'Técnica', label: 'Técnica', icon: 'mdi:cog' },
      { value: 'Investigación', label: 'Investigación', icon: 'mdi:flask' },
      { value: 'Cultural', label: 'Cultural', icon: 'mdi:palette' },
      { value: 'Otro', label: 'Otro', icon: 'mdi:dots-horizontal' }
    ];

    const form = reactive({
      requestDate: '',
      requestingInstitution: '',
      estimatedPeople: 1,
      visitType: '',
      comments: '',
      contactPerson: '',
      contactPhone: ''
    });

    async function onSubmit() {
      isSubmitting.value = true;
      try {
        await store.create(form);
        store.showCreate = false;
        // Limpiar el formulario
        Object.assign(form, {
          requestDate: '',
          requestingInstitution: '',
          estimatedPeople: 1,
          visitType: '',
          comments: '',
          contactPerson: '',
          contactPhone: ''
        });
      } finally {
        isSubmitting.value = false;
      }
    }

    return { 
      store, 
      form, 
      onSubmit, 
      visitTypes, 
      today, 
      isSubmitting 
    };
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
         focus:outline-none focus:ring-2 focus:ring-emerald-500/50 
         focus:border-emerald-500 
         transition-all duration-200
         hover:border-slate-300;
}

.form-hint {
  @apply text-xs text-slate-500 mt-1;
}

.visit-type-card {
  @apply p-4 border-2 border-slate-200 rounded-xl cursor-pointer
         flex flex-col items-center text-center
         hover:border-emerald-300 hover:bg-emerald-50/50
         transition-all duration-200;
}

.visit-type-card.selected {
  @apply border-emerald-500 bg-emerald-50 text-emerald-700;
}

.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 
         text-white font-semibold rounded-xl shadow-lg
         hover:shadow-xl hover:scale-105 
         transition-all duration-200 ease-out
         disabled:opacity-50 disabled:cursor-not-allowed
         flex items-center justify-center gap-2;
}

.btn-secondary {
  @apply px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl
         hover:bg-slate-200 transition-colors duration-200
         flex items-center justify-center gap-2;
}
</style>